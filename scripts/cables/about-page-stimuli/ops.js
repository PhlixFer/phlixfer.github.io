"use strict";

var CABLES=CABLES||{};
CABLES.OPS=CABLES.OPS||{};

var Ops=Ops || {};
Ops.Gl=Ops.Gl || {};
Ops.Date=Ops.Date || {};
Ops.Math=Ops.Math || {};
Ops.Array=Ops.Array || {};
Ops.Number=Ops.Number || {};
Ops.Trigger=Ops.Trigger || {};
Ops.Gl.Meshes=Ops.Gl.Meshes || {};



// **************************************************************
// 
// Ops.Gl.MainLoop_v2
// 
// **************************************************************

Ops.Gl.MainLoop_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    hdpi = op.inFloat("Max Pixel Density (DPR)", 2),
    fpsLimit = op.inValue("FPS Limit", 0),
    reduceFocusFPS = op.inValueBool("Reduce FPS unfocussed", false),
    clear = op.inValueBool("Transparent", false),
    active = op.inValueBool("Active", 1),
    trigger = op.outTrigger("trigger"),
    width = op.outNumber("width"),
    height = op.outNumber("height"),
    outPixel = op.outNumber("Pixel Density");

op.onAnimFrame = render;
hdpi.onChange = updateHdpi;

const cgl = op.patch.cgl;
let rframes = 0;
let rframeStart = 0;
let timeOutTest = null;
let addedListener = false;
if (!op.patch.cgl) op.uiAttr({ "error": "No webgl cgl context" });

const identTranslate = vec3.create();
vec3.set(identTranslate, 0, 0, 0);
const identTranslateView = vec3.create();
vec3.set(identTranslateView, 0, 0, -2);

let fsElement = null;
let winhasFocus = true;
let winVisible = true;

window.addEventListener("blur", () => { winhasFocus = false; });
window.addEventListener("focus", () => { winhasFocus = true; });
document.addEventListener("visibilitychange", () => { winVisible = !document.hidden; });

testMultiMainloop();

op.patch.tempData.mainloopOp = this;

function updateHdpi()
{
    setPixelDensity();

    if (CABLES.UI)
    {
        if (hdpi.get() < 1)
            op.patch.cgl.canvas.style.imageRendering = "pixelated";
    }

    op.patch.cgl.updateSize();
    if (CABLES.UI) gui.setLayout();
}

active.onChange = function ()
{
    op.patch.removeOnAnimFrame(op);

    if (active.get())
    {
        op.setUiAttrib({ "extendTitle": "" });
        op.onAnimFrame = render;
        op.patch.addOnAnimFrame(op);
        op.log("adding again!");
    }
    else
    {
        op.setUiAttrib({ "extendTitle": "Inactive" });
    }
};

function getFpsLimit()
{
    if (reduceFocusFPS.get())
    {
        if (!winVisible) return 10;
        if (!winhasFocus) return 30;
    }

    return fpsLimit.get();
}

op.onDelete = function ()
{
    cgl.gl.clearColor(0, 0, 0.0, 0);
    cgl.gl.clear(cgl.gl.COLOR_BUFFER_BIT | cgl.gl.DEPTH_BUFFER_BIT);
};

function setPixelDensity()
{
    if (hdpi.get() != 0) op.patch.cgl.pixelDensity = Math.min(hdpi.get(), window.devicePixelRatio);
    else op.patch.cgl.pixelDensity = window.devicePixelRatio;
}

function render(time)
{
    if (!active.get()) return;
    if (cgl.aborted || cgl.canvas.clientWidth === 0 || cgl.canvas.clientHeight === 0) return;

    op.patch.cg = cgl;

    setPixelDensity();

    // if (hdpi.get())op.patch.cgl.pixelDensity = window.devicePixelRatio;

    const startTime = performance.now();

    op.patch.config.fpsLimit = getFpsLimit();

    if (cgl.canvasWidth == -1)
    {
        cgl.setCanvas(op.patch.config.glCanvasId);
        return;
    }

    if (cgl.canvasWidth != width.get() || cgl.canvasHeight != height.get())
    {
        width.set(cgl.canvasWidth / 1);
        height.set(cgl.canvasHeight / 1);
    }

    if (CABLES.now() - rframeStart > 1000)
    {
        CGL.fpsReport = CGL.fpsReport || [];
        if (op.patch.loading.getProgress() >= 1.0 && rframeStart !== 0)CGL.fpsReport.push(rframes);
        rframes = 0;
        rframeStart = CABLES.now();
    }
    CGL.MESH.lastShader = null;
    CGL.MESH.lastMesh = null;

    cgl.renderStart(cgl, identTranslate, identTranslateView);

    if (!clear.get()) cgl.gl.clearColor(0, 0, 0, 1);
    else cgl.gl.clearColor(0, 0, 0, 0);

    cgl.gl.clear(cgl.gl.COLOR_BUFFER_BIT | cgl.gl.DEPTH_BUFFER_BIT);

    trigger.trigger();

    if (CGL.MESH.lastMesh)CGL.MESH.lastMesh.unBind();

    if (CGL.Texture.previewTexture)
    {
        if (!CGL.Texture.texturePreviewer) CGL.Texture.texturePreviewer = new CGL.Texture.texturePreview(cgl);
        CGL.Texture.texturePreviewer.render(CGL.Texture.previewTexture);
    }
    cgl.renderEnd(cgl);

    op.patch.cg = null;

    if (!clear.get())
    {
        cgl.gl.clearColor(1, 1, 1, 1);
        cgl.gl.colorMask(false, false, false, true);
        cgl.gl.clear(cgl.gl.COLOR_BUFFER_BIT);
        cgl.gl.colorMask(true, true, true, true);
    }

    if (!cgl.tempData.phong)cgl.tempData.phong = {};
    rframes++;

    outPixel.set(op.patch.cgl.pixelDensity);
    op.patch.cgl.profileData.profileMainloopMs = performance.now() - startTime;
}

function testMultiMainloop()
{
    clearTimeout(timeOutTest);
    timeOutTest = setTimeout(
        () =>
        {
            if (op.patch.getOpsByObjName(op.name).length > 1)
            {
                op.setUiError("multimainloop", "there should only be one mainloop op!");
                if (!addedListener)addedListener = op.patch.addEventListener("onOpDelete", testMultiMainloop);
            }
            else op.setUiError("multimainloop", null, 1);
        }, 500);
}


};

Ops.Gl.MainLoop_v2.prototype = new CABLES.Op();
CABLES.OPS["f1029550-d877-42da-9b1e-63a5163a0350"]={f:Ops.Gl.MainLoop_v2,objName:"Ops.Gl.MainLoop_v2"};




// **************************************************************
// 
// Ops.Trigger.Sequence
// 
// **************************************************************

Ops.Trigger.Sequence = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    exe = op.inTrigger("exe"),
    cleanup = op.inTriggerButton("Clean up connections");

op.setUiAttrib({ "resizable": true, "resizableY": false, "stretchPorts": true });
const
    exes = [],
    triggers = [],
    num = 16;

let
    updateTimeout = null,
    connectedOuts = [];

exe.onTriggered = triggerAll;
cleanup.onTriggered = clean;
cleanup.setUiAttribs({ "hideParam": true, "hidePort": true });

for (let i = 0; i < num; i++)
{
    const p = op.outTrigger("trigger " + i);
    triggers.push(p);
    p.onLinkChanged = updateButton;

    if (i < num - 1)
    {
        let newExe = op.inTrigger("exe " + i);
        newExe.onTriggered = triggerAll;
        exes.push(newExe);
    }
}

updateConnected();

function updateConnected()
{
    connectedOuts.length = 0;
    for (let i = 0; i < triggers.length; i++)
        if (triggers[i].links.length > 0) connectedOuts.push(triggers[i]);
}

function updateButton()
{
    updateConnected();
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() =>
    {
        let show = false;
        for (let i = 0; i < triggers.length; i++)
            if (triggers[i].links.length > 1) show = true;

        cleanup.setUiAttribs({ "hideParam": !show });

        if (op.isCurrentUiOp()) op.refreshParams();
    }, 60);
}

function triggerAll()
{
    // for (let i = 0; i < triggers.length; i++) triggers[i].trigger();
    for (let i = 0; i < connectedOuts.length; i++) connectedOuts[i].trigger();
}

function clean()
{
    let count = 0;
    for (let i = 0; i < triggers.length; i++)
    {
        let removeLinks = [];

        if (triggers[i].links.length > 1)
            for (let j = 1; j < triggers[i].links.length; j++)
            {
                while (triggers[count].links.length > 0) count++;

                removeLinks.push(triggers[i].links[j]);
                const otherPort = triggers[i].links[j].getOtherPort(triggers[i]);
                op.patch.link(op, "trigger " + count, otherPort.op, otherPort.name);
                count++;
            }

        for (let j = 0; j < removeLinks.length; j++) removeLinks[j].remove();
    }
    updateButton();
    updateConnected();
}


};

Ops.Trigger.Sequence.prototype = new CABLES.Op();
CABLES.OPS["a466bc1f-06e9-4595-8849-bffb9fe22f99"]={f:Ops.Trigger.Sequence,objName:"Ops.Trigger.Sequence"};




// **************************************************************
// 
// Ops.Date.Milliseconds
// 
// **************************************************************

Ops.Date.Milliseconds = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    inUpdate = op.inTrigger("update"),
    res = op.outNumber("Result");

inUpdate.onTriggered = function ()
{
    res.set(performance.now());
};


};

Ops.Date.Milliseconds.prototype = new CABLES.Op();
CABLES.OPS["2f447fcb-3c20-4c2f-9527-84daed3a6b0e"]={f:Ops.Date.Milliseconds,objName:"Ops.Date.Milliseconds"};




// **************************************************************
// 
// Ops.Gl.Meshes.SplineMesh_v2
// 
// **************************************************************

Ops.Gl.Meshes.SplineMesh_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    render = op.inTrigger("Render"),
    inPoints = op.inArray("Points"),
    inHardEdges = op.inBool("Tesselate Edges", false),
    inRenderMesh = op.inBool("Render Mesh", true),
    next = op.outTrigger("Next");

const geom = new CGL.Geometry("splinemesh_2");
geom.vertices = [];
geom.clear();

let thePoints = [];
const cgl = op.patch.cgl;
let points = new Float32Array();
let points2 = new Float32Array();
let points3 = new Float32Array();
let doDraw = new Float32Array();
let splineIndex = null;

let pointsProgress = new Float32Array();
const pointsDoDraw = new Float32Array();
const arrEdges = [];

const verts = [0, 0, 0];

let mesh = new CGL.Mesh(cgl, geom);
mesh.addVertexNumbers = true;

let rebuildLater = true;

inHardEdges.onChange =
    inPoints.onChange = () => { rebuildLater = true; };

render.onTriggered = renderMesh;

let shader = null;

function renderMesh()
{
    if (rebuildLater)rebuild();
    if (mesh && inRenderMesh.get())
    {
        if (shader != cgl.getShader())
        {
            shader = cgl.getShader();
            if (!shader) return;
            if (shader.getName() != "splinemesh_material") op.setUiError("nosplinemat", "Splinemesh needs a SplineMeshMaterial!");
            else op.setUiError("nosplinemat");

            shader = cgl.getShader();
        }

        if (verts.length > 0) mesh.render(shader);
    }

    next.trigger();
}

function buildMesh()
{
    verts.length = 0;

    const max = 1;
    const min = -max;

    for (let i = 0; i < thePoints.length / 3; i++)
    {
        verts.push(
            max, min, 0, 0, min, 0, max, max, 0, 0, min, 0, 0, max, 0, max, max, 0
        );
    }
    geom.vertices = verts;

    // if(mesh)mesh.dispose();
    if (!mesh) mesh = new CGL.Mesh(cgl, geom);

    mesh.addVertexNumbers = true;
    mesh.setGeom(geom);
    mesh.addVertexNumbers = true;
}

function rebuild()
{
    const inpoints = inPoints.get();

    if (!inpoints || inpoints.length === 0)
    {
        mesh = null;
        return;
    }

    if (inpoints[0] && inpoints[0].length)
    {
        const arr = [];
        splineIndex = [];
        let count = 0;

        for (let i = 0; i < inpoints.length; i++)
        {
            for (let j = 0; j < inpoints[i].length / 3; j++)
            {
                splineIndex[(count - 3) / 3] = i;// (i) / inpoints.length;

                arr[count++] = inpoints[i][j * 3 + 0];
                arr[count++] = inpoints[i][j * 3 + 1];
                arr[count++] = inpoints[i][j * 3 + 2];
            }
        }
        thePoints = arr;
    }
    else
    {
        splineIndex = null;
        thePoints = inpoints;
    }

    if (inHardEdges.get()) thePoints = tessEdges(thePoints);

    buildMesh();

    const newLength = thePoints.length * 6;
    let count = 0;
    let lastIndex = 0;
    let drawable = 0;

    if (points.length != newLength)
    {
        points = new Float32Array(newLength);
        points2 = new Float32Array(newLength);
        points3 = new Float32Array(newLength);

        doDraw = new Float32Array(newLength / 3);
        pointsProgress = new Float32Array(newLength / 3);

        for (let i = 0; i < newLength / 3; i++) pointsProgress[i] = i / (newLength / 3);
    }

    for (let i = 0; i < thePoints.length / 3; i++)
    {
        if (splineIndex)
        {
            if (i > 1 && lastIndex != splineIndex[i]) drawable = 0.0;
            else drawable = 1.0;
            lastIndex = splineIndex[i];
        }
        else drawable = 1.0;

        for (let j = 0; j < 6; j++)
        {
            doDraw[count / 3] = drawable;

            for (let k = 0; k < 3; k++)
            {
                points[count] = thePoints[(Math.max(0, i - 1)) * 3 + k];
                points2[count] = thePoints[(i + 0) * 3 + k];
                points3[count] = thePoints[(i + 1) * 3 + k];
                count++;
            }
        }
    }

    mesh.setAttribute("spline", points, 3);
    mesh.setAttribute("spline2", points2, 3);
    mesh.setAttribute("spline3", points3, 3);
    mesh.setAttribute("splineDoDraw", doDraw, 1);
    mesh.setAttribute("splineProgress", pointsProgress, 1);

    rebuildLater = false;
}

function ip(a, b, p)
{
    return a + p * (b - a);
}

function tessEdges(oldArr)
{
    let count = 0;
    const step = 0.001;
    const oneMinusStep = 1 - step;
    const l = oldArr.length * 3 - 3;
    arrEdges.length = l;

    const tessSplineIndex = [];

    if (splineIndex) tessSplineIndex[0] = splineIndex[1];

    for (let i = 0; i < oldArr.length - 3; i += 3)
    {
        arrEdges[count++] = oldArr[i + 0];
        arrEdges[count++] = oldArr[i + 1];
        arrEdges[count++] = oldArr[i + 2];
        if (splineIndex) tessSplineIndex[count / 3] = splineIndex[i / 3];

        arrEdges[count++] = ip(oldArr[i + 0], oldArr[i + 3], step);
        arrEdges[count++] = ip(oldArr[i + 1], oldArr[i + 4], step);
        arrEdges[count++] = ip(oldArr[i + 2], oldArr[i + 5], step);
        if (splineIndex) tessSplineIndex[count / 3] = splineIndex[i / 3];

        arrEdges[count++] = ip(oldArr[i + 0], oldArr[i + 3], oneMinusStep);
        arrEdges[count++] = ip(oldArr[i + 1], oldArr[i + 4], oneMinusStep);
        arrEdges[count++] = ip(oldArr[i + 2], oldArr[i + 5], oneMinusStep);
        if (splineIndex) tessSplineIndex[count / 3] = splineIndex[i / 3];
    }

    if (splineIndex) splineIndex = tessSplineIndex;

    return arrEdges;
}


};

Ops.Gl.Meshes.SplineMesh_v2.prototype = new CABLES.Op();
CABLES.OPS["287abf6c-5501-4bc9-a627-70ec3c3766d2"]={f:Ops.Gl.Meshes.SplineMesh_v2,objName:"Ops.Gl.Meshes.SplineMesh_v2"};




// **************************************************************
// 
// Ops.Gl.Meshes.SplineMeshMaterial_v2
// 
// **************************************************************

Ops.Gl.Meshes.SplineMeshMaterial_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={"splinemat_frag":"IN vec2 texCoord;\nIN float splineDoDrawFrag;\nUNI vec4 color;\nUNI sampler2D tex;\nUNI sampler2D texMask;\n\n{{MODULES_HEAD}}\n\nvoid main()\n{\n    vec4 col=color;\n\n    #ifdef USE_TEXTURE\n        #ifdef TEX_COLORIZE\n            col*=texture(tex,texCoord);\n        #endif\n        #ifndef TEX_COLORIZE\n            col=texture(tex,texCoord);\n        #endif\n    #endif\n\n    col.a=color.a;\n\n    #ifdef USE_TEXMASK\n        col.a*=texture(texMask,texCoord).r;\n        if(col.a==0.0) discard;\n    #endif\n\n    {{MODULE_COLOR}}\n\n    // if(splineDoDrawFrag==0.0) col.rgb=vec3(1.0,0.0,0.0);\n    if(splineDoDrawFrag==0.0) discard;\n\n    outColor = col;\n}","splinemat_vert":"{{MODULES_HEAD}}\n\nIN vec3 vPosition;\nIN float attrVertIndex;\nIN float splineProgress;\nIN vec3 spline,spline2,spline3;\nIN float splineDoDraw;\n\nOUT float splineDoDrawFrag;\nOUT vec2 texCoord;\nOUT vec3 norm;\nUNI mat4 projMatrix;\nUNI mat4 viewMatrix;\nUNI mat4 modelMatrix;\n\nUNI float width;\nUNI float texOffset;\nUNI float aspect;\n\n#define PI 3.1415926538\n\nvec2 rotate(vec2 v, float a)\n{\n\tfloat s = sin(a);\n\tfloat c = cos(a);\n\tmat2 m = mat2(c, -s, s, c);\n\treturn m * v;\n}\n\nvec2 fix( vec4 i )\n{\n    vec2 res = i.xy / i.w;\n    return res;\n}\n\nvoid main()\n{\n    texCoord=vPosition.xy;\n    texCoord.y=texCoord.y*0.5+0.5;\n    #ifdef TEX_MAP_FULL\n        texCoord.x=splineProgress;\n    #endif\n    texCoord.x+=texOffset;\n\n    mat4 mMatrix=modelMatrix;\n    mat4 mvMatrix=viewMatrix * mMatrix;\n\n    splineDoDrawFrag=splineDoDraw;\n\n    // vec4 pos=vec4((spline2+spline3+spline)/3.0*vPosition,1.0);\n    vec4 pos=vec4(spline2,1.0);\n\n    {{MODULE_VERTEX_POSITION}}\n\n    vec4 finalPosition  = projMatrix * mvMatrix * (vec4(spline2,1.0));\n    vec4 finalPosition2 = projMatrix * mvMatrix * (vec4(spline3,1.0));\n\n    vec2 screenPos =fix(projMatrix * mvMatrix * vec4(spline,1.0));\n    vec2 screenPos2=fix(projMatrix * mvMatrix * vec4(spline2,1.0));\n    vec2 screenPos3=fix(projMatrix * mvMatrix * vec4(spline3,1.0));\n\n    float wid=width/10.0;\n\n    #ifndef PERSPWIDTH\n        wid=width*finalPosition.w*0.0025;\n    #endif\n\n    vec2 dir1 = normalize( screenPos2 - screenPos );\n    vec2 dir2 = normalize( screenPos3 - screenPos2 );\n\n\tif( screenPos2 == screenPos ) dir1 = normalize( screenPos3 - screenPos2 );\n\n    vec2 normal = vec2( -dir1.y/aspect, dir1.x ) * 0.5 * wid;\n    vec2 normal2 = vec2( -dir2.y/aspect, dir2.x ) * 0.5 * wid;\n\n    vec4 offset = vec4( mix(normal,normal2,vPosition.x) * vPosition.y, 0.0, 1.0 );\n\n    finalPosition = mix(finalPosition,finalPosition2,vPosition.x);\n\tfinalPosition.xy += offset.xy;\n\n    gl_Position = finalPosition;\n}\n",};
const
    render = op.inTrigger("Render"),
    inWidth = op.inFloat("Width", 0.2),
    inPerspective = op.inBool("Width Perspective", true),
    inTexture = op.inTexture("Texture"),
    inTextureMask = op.inTexture("Texture Mask"),
    inTexMap = op.inSwitch("Mapping", ["Full", "Face"], "Full"),
    inTexColorize = op.inBool("Colorize Texture", false),
    inTexOffset = op.inFloat("Offset", 0),
    r = op.inValueSlider("r", Math.random()),
    g = op.inValueSlider("g", Math.random()),
    b = op.inValueSlider("b", Math.random()),
    a = op.inValueSlider("a", 1),
    trigger = op.outTrigger("Trigger"),
    shaderOut = op.outObject("Shader");

r.setUiAttribs({ "colorPick": true });
shaderOut.ignoreValueSerialize = true;

const cgl = op.patch.cgl;

op.toWorkPortsNeedToBeLinked(render);
op.setPortGroup("Color", [r, g, b, a]);
op.setPortGroup("Texture", [inTexture, inTexMap, inTexColorize]);

const shader = new CGL.Shader(cgl, "splinemesh_material", this);
shader.setModules(["MODULE_VERTEX_POSITION", "MODULE_COLOR", "MODULE_BEGIN_FRAG"]);
shader.setSource(attachments.splinemat_vert, attachments.splinemat_frag);
shaderOut.set(shader);

const uniTex = shader.addUniformFrag("t", "tex");
const uniTexMask = shader.addUniformFrag("t", "texMask");

let aspect = 1.7777;

shader.addUniformFrag("4f", "color", r, g, b, a);
shader.addUniformFrag("f", "width", inWidth);
shader.addUniformFrag("f", "texOffset", inTexOffset);
shader.addUniformFrag("f", "aspect", aspect);
shader.toggleDefine("PERSPWIDTH", inPerspective);
shader.toggleDefine("USE_TEXTURE", inTexture);
shader.toggleDefine("TEX_COLORIZE", inTexColorize);
shader.toggleDefine("USE_TEXMASK", inTextureMask);

inTexMap.on("change", updateMapping);

render.onTriggered = doRender;
updateMapping();

function doRender()
{
    if (!shader) return;

    const vp = op.patch.cgl.getViewPort();
    const newAspect = vp[2] / vp[3];
    if (newAspect != aspect)
    {
        aspect = newAspect;
        shader.addUniformFrag("f", "aspect", aspect);
    }

    cgl.pushShader(shader);
    shader.popTextures();

    if (uniTex && inTexture.get()) shader.pushTexture(uniTex, inTexture.get().tex);
    if (uniTexMask && inTextureMask.get()) shader.pushTexture(uniTexMask, inTextureMask.get().tex);

    trigger.trigger();

    cgl.popShader();
}

function updateMapping()
{
    shader.toggleDefine("TEX_MAP_FULL", inTexMap.get() === "Full");
}


};

Ops.Gl.Meshes.SplineMeshMaterial_v2.prototype = new CABLES.Op();
CABLES.OPS["5ff7c643-cbea-44cc-9f34-fb18a44bcfff"]={f:Ops.Gl.Meshes.SplineMeshMaterial_v2,objName:"Ops.Gl.Meshes.SplineMeshMaterial_v2"};




// **************************************************************
// 
// Ops.Array.SubdivideArray1
// 
// **************************************************************

Ops.Array.SubdivideArray1 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
let inArr = op.inArray("Points");
let subDivs = op.inInt("Num Subdivs", 5);
let bezier = op.inValueBool("Smooth", true);
let bezierEndPoints = op.inValueBool("Bezier Start/End Points", true);

let result = op.outArray("Result");

op.toWorkPortsNeedToBeLinked(inArr);

subDivs.onChange = calc;
bezier.onChange = calc;
inArr.onChange = calc;
bezierEndPoints.onChange = calc;

function ip(x0, x1, x2, t)// Bezier
{
    let r = (x0 * (1 - t) * (1 - t) + 2 * x1 * (1 - t) * t + x2 * t * t);
    return r;
}

let arr = [];

function calc()
{
    if (!inArr.get())
    {
        result.set(null);
        return;
    }
    const subd = Math.floor(subDivs.get());
    let inPoints = inArr.get();

    if (inPoints.length < 3) return;

    let i = 0;
    let j = 0;
    let k = 0;
    let count = 0;

    if (subd > 0 && !bezier.get())
    {
        const newLen = (inPoints.length - 1) * subd;
        if (newLen != arr.length)
        {
            arr.length = newLen;
        }

        count = 0;
        for (i = 0; i < inPoints.length - 1; i++)
        {
            for (j = 0; j < subd; j++)
            {
                arr[count] =
                        inPoints[i] + (inPoints[i + 1] - inPoints[i]) * j / subd;
                count++;
            }
        }
    }
    else
    if (subd > 0 && bezier.get())
    {
        let newLen = (inPoints.length - 6) * (subd - 1);
        if (bezierEndPoints.get())newLen += 6;

        if (newLen != arr.length) arr.length = Math.floor(Math.abs(newLen));
        count = 0;

        if (bezierEndPoints.get())
        {
            arr[0] = inPoints[0];
            count = 1;
        }

        for (i = 1; i < inPoints.length - 1; i++)
        {
            for (j = 0; j < subd; j++)
            {
                let p = ip(
                    (inPoints[i - 1] + inPoints[i]) / 2,
                    inPoints[i + 0],
                    (inPoints[i + 1] + inPoints[i]) / 2,
                    j / subd
                );
                arr[count] = p;
                count++;
            }
        }

        if (bezierEndPoints.get())
        {
            arr[count] = inPoints[inPoints.length - 1];
        }
    }
    result.set(null);
    result.set(arr);
}


};

Ops.Array.SubdivideArray1.prototype = new CABLES.Op();
CABLES.OPS["fa10c94d-d14e-41d3-b690-26d7cac5f146"]={f:Ops.Array.SubdivideArray1,objName:"Ops.Array.SubdivideArray1"};




// **************************************************************
// 
// Ops.Array.Array_v3
// 
// **************************************************************

Ops.Array.Array_v3 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    inLength = op.inValueInt("Array length", 10),
    modeSelect = op.inSwitch("Mode select", ["Number", "1,2,3,4", "0-1"], "Number"),
    inDefaultValue = op.inValueFloat("Default Value"),
    inReverse = op.inBool("Reverse", false),
    outArr = op.outArray("Array"),
    outArrayLength = op.outNumber("Array length out");

let arr = [];
let selectIndex = 0;
const MODE_NUMBER = 0;
const MODE_1_TO_4 = 1;
const MODE_0_TO_1 = 2;

modeSelect.onChange = onFilterChange;

inReverse.onChange =
    inDefaultValue.onChange =
    inLength.onChange = reset;

onFilterChange();
reset();

function onFilterChange()
{
    let selectedMode = modeSelect.get();
    if (selectedMode === "Number") selectIndex = MODE_NUMBER;
    else if (selectedMode === "1,2,3,4") selectIndex = MODE_1_TO_4;
    else if (selectedMode === "0-1") selectIndex = MODE_0_TO_1;

    inDefaultValue.setUiAttribs({ "greyout": selectIndex !== MODE_NUMBER });

    op.setUiAttrib({ "extendTitle": modeSelect.get() });

    reset();
}

function reset()
{
    arr.length = 0;

    let arrLength = inLength.get();
    let valueForArray = inDefaultValue.get();
    let i;

    // mode 0 - fill all array values with one number
    if (selectIndex === MODE_NUMBER)
    {
        for (i = 0; i < arrLength; i++)
        {
            arr[i] = valueForArray;
        }
    }
    // mode 1 Continuous number array - increments up to array length
    else if (selectIndex === MODE_1_TO_4)
    {
        for (i = 0; i < arrLength; i++)
        {
            arr[i] = i;
        }
    }
    // mode 2 Normalized array
    else if (selectIndex === MODE_0_TO_1)
    {
        if (arrLength > 1) { 
            for (i = 0; i < arrLength; i++)
                {
                    arr[i] = i / (arrLength - 1);
                }
        } else 
        {
            //When array length is only 1 
            arr = [0];
        }
    }

    if (inReverse.get())arr = arr.reverse();

    outArr.setRef(arr);
    outArrayLength.set(arr.length);
}


};

Ops.Array.Array_v3.prototype = new CABLES.Op();
CABLES.OPS["e4d31a46-bf64-42a8-be34-4cbb2bbc2600"]={f:Ops.Array.Array_v3,objName:"Ops.Array.Array_v3"};




// **************************************************************
// 
// Ops.Array.PerlinArray
// 
// **************************************************************

Ops.Array.PerlinArray = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    inArrayX = op.inArray("Array in X"),
    inTimeArray = op.inArray("Array time"),
    inTime = op.inFloat("Time in Y", 0),
    seed = op.inFloatSlider("Seed 0-1", 0.0),
    inFrequency = op.inFloat("Frequency", 10),
    outArray = op.outArray("Array out"),
    outArrayLength = op.outNumber("Array length out");

let showingError = false;

let newArr = [];
outArray.set(newArr);

seed.set(Math.random());

inArrayX.onChange = inTimeArray.onChange = inTime.onChange = inFrequency.onChange = update;

seed.onChange = function ()
{
    Math.randomSeed = seed.get();
    noise.seed(Math.seededRandom());
    update();
};

function update()
{
    let arr = inArrayX.get();
    let arrTime = inTimeArray.get();

    let time = inTime.get();
    let mult = inFrequency.get();

    if (arrTime)
    {
        if (!arr || !arrTime)
        {
            outArray.set(null);
            return;
        }
        if (arr.length != arrTime.length)
        {
            if (!showingError)
            {
                op.uiAttr({ "error": "Arrays do not have the same length !" });
                outArrayLength.set(0);
                showingError = true;
            }
            outArray.set(null);
            return;
        }
        if (showingError)
        {
            showingError = false;
            op.uiAttr({ "error": null });
        }

        if (newArr.length != arr.length)newArr.length = arr.length;

        for (var i = 0; i < arr.length; i++)
        {
            newArr[i] = noise.perlin2(arr[i] * mult, arrTime[i] + time);
        }
    }
    else if (!arrTime)
    {
        if (!arr)
        {
            outArray.set(null);
            return;
        }

        if (newArr.length != arr.length)newArr.length = arr.length;

        for (var i = 0; i < arr.length; i++)
        {
            newArr[i] = noise.perlin2(arr[i] * mult, time);
        }
    }

    outArray.set(null);
    outArray.set(newArr);
    outArrayLength.set(newArr.length);
}


};

Ops.Array.PerlinArray.prototype = new CABLES.Op();
CABLES.OPS["ed55556e-f319-47cc-bce6-ea015b45650b"]={f:Ops.Array.PerlinArray,objName:"Ops.Array.PerlinArray"};




// **************************************************************
// 
// Ops.Array.ArrayPack3Simple
// 
// **************************************************************

Ops.Array.ArrayPack3Simple = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    inArr1 = op.inArray("Array 1"),
    inArr2 = op.inArray("Array 2"),
    inArr3 = op.inArray("Array 3"),

    outArr = op.outArray("Array out", 3),
    outNum = op.outNumber("Num Points"),
    outArrayLength = op.outNumber("Array length");

let showingError = false;

let arr = [];
let emptyArray = [];
let needsCalc = true;

inArr1.onChange = inArr2.onChange = inArr3.onChange = update;

function update()
{
    let array1 = inArr1.get();
    let array2 = inArr2.get();
    let array3 = inArr3.get();

    if (!array1 && !array2 && !array3)
    {
        outArr.set(null);
        outNum.set(0);
        return;
    }
    let arrlen = 0;

    if (!array1 || !array2 || !array3)
    {
        if (array1) arrlen = array1.length;
        else if (array2) arrlen = array2.length;
        else if (array3) arrlen = array3.length;

        if (emptyArray.length != arrlen)
            for (let i = 0; i < arrlen; i++) emptyArray[i] = 0;

        if (!array1)array1 = emptyArray;
        if (!array2)array2 = emptyArray;
        if (!array3)array3 = emptyArray;
    }

    if ((array1.length !== array2.length) || (array2.length !== array3.length))
    {
        //
        op.setUiError("arraylen", "Arrays do not have the same length !");
        return;
    }
    op.setUiError("arraylen", null);

    arr.length = array1.length;
    for (let i = 0; i < array1.length; i++)
    {
        arr[i * 3 + 0] = array1[i];
        arr[i * 3 + 1] = array2[i];
        arr[i * 3 + 2] = array3[i];
    }

    needsCalc = false;
    outArr.setRef(arr);
    outNum.set(arr.length / 3);
    outArrayLength.set(arr.length);
}


};

Ops.Array.ArrayPack3Simple.prototype = new CABLES.Op();
CABLES.OPS["9c48785b-4cac-472c-a70f-dbd3c240b782"]={f:Ops.Array.ArrayPack3Simple,objName:"Ops.Array.ArrayPack3Simple"};




// **************************************************************
// 
// Ops.Gl.Orthogonal_v2
// 
// **************************************************************

Ops.Gl.Orthogonal_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    render = op.inTrigger("render"),
    bounds = op.inValue("bounds", 2),
    fixAxis = op.inSwitch("Axis", ["X", "Y", "None"], "X"),
    zNear = op.inValue("frustum near", -100),
    zFar = op.inValue("frustum far", 100),
    trigger = op.outTrigger("trigger"),
    outRatio = op.outNumber("Ratio"),
    outWidth = op.outNumber("Width"),
    outHeight = op.outNumber("Height");
const cgl = op.patch.cgl;

render.onTriggered = function ()
{
    const vp = cgl.getViewPort();

    if (fixAxis.get() == "X")
    {
        const ratio = vp[3] / vp[2];

        cgl.pushPMatrix();
        mat4.ortho(
            cgl.pMatrix,
            -bounds.get(),
            bounds.get(),
            -bounds.get() * ratio,
            bounds.get() * ratio,
            parseFloat(zNear.get()),
            parseFloat(zFar.get())
        );

        outWidth.set(bounds.get() * 2);
        outHeight.set(bounds.get() * ratio * 2);
        outRatio.set(ratio);
    }
    else if (fixAxis.get() == "Y")
    {
        const ratio = vp[2] / vp[3];

        cgl.pushPMatrix();
        mat4.ortho(
            cgl.pMatrix,
            -bounds.get() * ratio,
            bounds.get() * ratio,
            -bounds.get(),
            bounds.get(),
            parseFloat(zNear.get()),
            parseFloat(zFar.get())
        );

        outWidth.set(bounds.get() * ratio * 2);
        outHeight.set(bounds.get() * 2);
        outRatio.set(ratio);
    }
    else
    {
        cgl.pushPMatrix();
        mat4.ortho(
            cgl.pMatrix,
            -bounds.get(),
            bounds.get(),
            -bounds.get(),
            bounds.get(),
            parseFloat(zNear.get()),
            parseFloat(zFar.get())
        );

        outWidth.set(bounds.get() * 2);
        outHeight.set(bounds.get() * 2);
        outRatio.set(1);
    }

    trigger.trigger();
    cgl.popPMatrix();
};


};

Ops.Gl.Orthogonal_v2.prototype = new CABLES.Op();
CABLES.OPS["b9235490-eaf2-4960-b1be-4279a4051ec6"]={f:Ops.Gl.Orthogonal_v2,objName:"Ops.Gl.Orthogonal_v2"};




// **************************************************************
// 
// Ops.Array.MapRangeArray
// 
// **************************************************************

Ops.Array.MapRangeArray = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    v = op.inArray("array"),
    old_min = op.inValueFloat("old min"),
    old_max = op.inValueFloat("old max"),
    new_min = op.inValueFloat("new min"),
    new_max = op.inValueFloat("new max"),
    easing = op.inValueSelect("Easing", ["Linear", "Smoothstep", "Smootherstep"], "Linear"),
    result = op.outArray("result");

op.setPortGroup("Input Range", [old_min, old_max]);
op.setPortGroup("Output Range", [new_min, new_max]);

let ease = 0;
let r = 0;

easing.onChange = function ()
{
    if (easing.get() === "Smoothstep")
    {
        ease = 1;
    }
    else if (easing.get() === "Smootherstep")
    {
        ease = 2;
    }
    else
    {
        ease = 0;
    }
    exec();
};

let outArray = Array(1);

function exec()
{
    const inArray = v.get();
    if (!inArray || inArray.length === 0)
    {
        result.set([]);
        return;
    }
    // const outArray = Array(inArray.length);
    outArray.length = inArray.length;
    for (let i = 0; i < inArray.length; i++)
    {
        let x = inArray[i];

        if (x >= Math.max(old_max.get(), old_min.get()))
        {
            outArray[i] = new_max.get();
        }
        else if (x <= Math.min(old_max.get(), old_min.get()))
        {
            outArray[i] = new_min.get();
        }
        else
        {
            const nMin = new_min.get();
            const nMax = new_max.get();
            const oMin = old_min.get();
            const oMax = old_max.get();

            let reverseInput = false;
            const oldMin = Math.min(oMin, oMax);
            const oldMax = Math.max(oMin, oMax);
            if (oldMin !== oMin) reverseInput = true;

            let reverseOutput = false;
            const newMin = Math.min(nMin, nMax);
            const newMax = Math.max(nMin, nMax);
            if (newMin !== nMin) reverseOutput = true;

            let portion = 0;

            if (reverseInput)
            {
                portion = (oldMax - x) * (newMax - newMin) / (oldMax - oldMin);
            }
            else
            {
                portion = (x - oldMin) * (newMax - newMin) / (oldMax - oldMin);
            }

            if (reverseOutput)
            {
                r = newMax - portion;
            }
            else
            {
                r = portion + newMin;
            }

            if (ease === 0)
            {
                outArray[i] = r;
            }
            else if (ease === 1)
            {
                x = Math.max(0, Math.min(1, (r - nMin) / (nMax - nMin)));
                outArray[i] = nMin + x * x * (3 - 2 * x) * (nMax - nMin); // smoothstep
            }
            else if (ease === 2)
            {
                x = Math.max(0, Math.min(1, (r - nMin) / (nMax - nMin)));
                outArray[i] = nMin + x * x * x * (x * (x * 6 - 15) + 10) * (nMax - nMin); // smootherstep
            }
        }
    }
    result.setRef(outArray);
}

v.set(null);
old_min.set(0);
old_max.set(1);
new_min.set(-1);
new_max.set(1);

v.onChange = exec;
old_min.onChange = exec;
old_max.onChange = exec;
new_min.onChange = exec;
new_max.onChange = exec;

result.set(null);

exec();


};

Ops.Array.MapRangeArray.prototype = new CABLES.Op();
CABLES.OPS["20f921bf-adc2-45fb-b387-834af4f5e19b"]={f:Ops.Array.MapRangeArray,objName:"Ops.Array.MapRangeArray"};




// **************************************************************
// 
// Ops.Number.Number
// 
// **************************************************************

Ops.Number.Number = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    v = op.inValueFloat("value"),
    result = op.outNumber("result");

v.onChange = exec;

function exec()
{
    result.set(Number(v.get()));
}


};

Ops.Number.Number.prototype = new CABLES.Op();
CABLES.OPS["8fb2bb5d-665a-4d0a-8079-12710ae453be"]={f:Ops.Number.Number,objName:"Ops.Number.Number"};




// **************************************************************
// 
// Ops.Math.Multiply
// 
// **************************************************************

Ops.Math.Multiply = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    number1 = op.inValueFloat("number1", 1),
    number2 = op.inValueFloat("number2", 1),
    result = op.outNumber("result");

op.setUiAttribs({ "mathTitle": true });

number1.onChange = number2.onChange = update;
update();

function update()
{
    const n1 = number1.get();
    const n2 = number2.get();

    result.set(n1 * n2);
}


};

Ops.Math.Multiply.prototype = new CABLES.Op();
CABLES.OPS["1bbdae06-fbb2-489b-9bcc-36c9d65bd441"]={f:Ops.Math.Multiply,objName:"Ops.Math.Multiply"};




// **************************************************************
// 
// Ops.Array.ArrayMathExpression
// 
// **************************************************************

Ops.Array.ArrayMathExpression = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    inA = op.inArray("A"),
    inB = op.inArray("B"),
    inC = op.inArray("C"),

    inX = op.inFloat("X", 1),
    inY = op.inFloat("Y", 1),
    inZ = op.inFloat("Z", 1),

    inExpression = op.inString("Expression", "a*(b+c+d)"),

    outResultArray = op.outArray("Result Array"),
    outLength = op.outNumber("Array Length"),
    outExpressionIsValid = op.outBoolNum("Expression Valid");

op.setPortGroup("Expression", [inExpression]);
op.setPortGroup("Parameters", [inA, inB, inC, inX, inY, inZ]);

const functionChanged = false;
const inputsChanged = false;
const resultArray = [];
let currentFunction = inExpression.get();
let functionValid = false;
let showingError = false;

inA.onChange = inB.onChange = inC.onChange
    = inX.onChange = inY.onChange = inZ.onChange = evaluateFunction;
inExpression.onChange = createFunction;

function createFunction()
{
    try
    {
        currentFunction = new Function("m", "a", "b", "c", "x", "y", "z", "i", "len", `with(m) { return ${inExpression.get()} }`);
        functionValid = true;
        evaluateFunction();

        outExpressionIsValid.set(functionValid);
    }
    catch (e)
    {
        functionValid = false;

        outExpressionIsValid.set(functionValid);
        outResultArray.set(null);

        if (e instanceof ReferenceError || e instanceof SyntaxError) return;
    }
}

function evaluateFunction()
{
    const arrayA = inA.get();
    const arrayB = inB.get();
    const arrayC = inC.get();
    const arrays = [arrayA, arrayB, arrayC];

    const x = inX.get();
    const y = inY.get();
    const z = inZ.get();

    // * check if we have at least 2 arrays that are valid
    if (arrays.filter(Boolean).length === 0)
    {
        outResultArray.set(null);
        outLength.set(0);
        outResultArray.set(null);
        return;
    }
    else
    {
        const arrayLengths = arrays.map((arr) => { return (arr ? arr.length : undefined); });
        const firstValidArrayLength = arrayLengths.find(Boolean);
        const sameLength = arrayLengths.filter(Boolean).every((length) => { return length === firstValidArrayLength; });

        let validArrays = [];

        if (sameLength)
        {
            op.setUiError("notsamelength", null);
            const firstValidArray = arrays.find(Boolean);
            validArrays = arrays.map((arr, index) =>
            {
                // * map all undefined arrays to 0 values
                if (!arr) arr = arrays.find(Boolean).map((x) => { return 0; });

                return arr;
            });

            resultArray.length = firstValidArray.length;

            if (functionValid)
            {
                for (let i = 0; i < firstValidArray.length; i += 1)
                {
                    resultArray[i] = currentFunction(
                        Math,
                        validArrays[0][i], validArrays[1][i], validArrays[2][i],
                        x, y, z,
                        i,
                        resultArray.length
                    );
                }

                outResultArray.set(null);
                outResultArray.set(resultArray);
                outLength.set(resultArray.length);
            }
        }
        else
        {
            outResultArray.set(null);
            outLength.set(0);
            op.setUiError("notsamelength", "Arrays do not have the same length!", 2);
            showingError = true;
        }
    }

    outExpressionIsValid.set(functionValid);
}


};

Ops.Array.ArrayMathExpression.prototype = new CABLES.Op();
CABLES.OPS["663e32a2-45a1-4141-a387-d8a44d4977d5"]={f:Ops.Array.ArrayMathExpression,objName:"Ops.Array.ArrayMathExpression"};




// **************************************************************
// 
// Ops.Trigger.Repeat_v2
// 
// **************************************************************

Ops.Trigger.Repeat_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    exe=op.inTrigger("Execute"),
    num=op.inValueInt("Repeats",5),
    dir=op.inSwitch("Direction",['Forward','Backward'],'Forward'),
    next=op.outTrigger("Next"),
    idx=op.addOutPort(new CABLES.Port(op,"index"));

dir.onChange=updateDir;
updateDir();

function updateDir()
{
    if(dir.get()=="Forward") exe.onTriggered=forward;
    else exe.onTriggered=backward;
}

function forward()
{
    const max=Math.floor(num.get());

    for(var i=0;i<max;i++)
    {
        idx.set(i);
        next.trigger();
    }
}

function backward()
{
    const numi=Math.floor(num.get());
    for(var i=numi-1;i>-1;i--)
    {
        idx.set(i);
        next.trigger();
    }
}


};

Ops.Trigger.Repeat_v2.prototype = new CABLES.Op();
CABLES.OPS["a4deea80-db97-478f-ad1a-5ee30f2f47cc"]={f:Ops.Trigger.Repeat_v2,objName:"Ops.Trigger.Repeat_v2"};




// **************************************************************
// 
// Ops.Array.ArrayGetNumber
// 
// **************************************************************

Ops.Array.ArrayGetNumber = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    array = op.inArray("array"),
    index = op.inValueInt("index"),
    valueInvalid = op.inFloat("Value Invalid Index", 0),
    value = op.outNumber("value"),
    outValidIndex = op.outBoolNum("Valid Index", true);

array.ignoreValueSerialize = true;

index.onChange = array.onChange = update;

function update()
{
    if (array.get())
    {
        const input = array.get()[index.get()];
        if (isNaN(input))
        {
            value.set(valueInvalid.get());
            outValidIndex.set(false);
        }
        else
        {
            outValidIndex.set(true);
            value.set(parseFloat(input));
        }
    }
}


};

Ops.Array.ArrayGetNumber.prototype = new CABLES.Op();
CABLES.OPS["d1189078-70cf-437d-9a37-b2ebe89acdaf"]={f:Ops.Array.ArrayGetNumber,objName:"Ops.Array.ArrayGetNumber"};




// **************************************************************
// 
// Ops.Math.MapRange
// 
// **************************************************************

Ops.Math.MapRange = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    v = op.inValueFloat("value", 0),
    old_min = op.inValueFloat("old min", 0),
    old_max = op.inValueFloat("old max", 1),
    new_min = op.inValueFloat("new min", 0),
    new_max = op.inValueFloat("new max", 1),
    easing = op.inValueSelect("Easing", ["Linear", "Smoothstep", "Smootherstep"], "Linear"),
    inClamp = op.inBool("Clamp", true),
    result = op.outNumber("result", 0);

op.setPortGroup("Input Range", [old_min, old_max]);
op.setPortGroup("Output Range", [new_min, new_max]);

let doClamp = true;
let ease = 0;
let r = 0;

v.onChange =
    old_min.onChange =
    old_max.onChange =
    new_min.onChange =
    new_max.onChange = exec;

exec();

inClamp.onChange =
() =>
{
    doClamp = inClamp.get();
    exec();
};

easing.onChange = function ()
{
    if (easing.get() == "Smoothstep") ease = 1;
    else if (easing.get() == "Smootherstep") ease = 2;
    else ease = 0;
};

function exec()
{
    const nMin = new_min.get();
    const nMax = new_max.get();
    const oMin = old_min.get();
    const oMax = old_max.get();
    let x = v.get();

    if (doClamp)
    {
        if (x >= Math.max(oMax, oMin))
        {
            result.set(nMax);
            return;
        }
        else
        if (x <= Math.min(oMax, oMin))
        {
            result.set(nMin);
            return;
        }
    }

    let reverseInput = false;
    const oldMin = Math.min(oMin, oMax);
    const oldMax = Math.max(oMin, oMax);
    if (oldMin != oMin) reverseInput = true;

    let reverseOutput = false;
    const newMin = Math.min(nMin, nMax);
    const newMax = Math.max(nMin, nMax);
    if (newMin != nMin) reverseOutput = true;

    let portion = 0;

    if (reverseInput) portion = (oldMax - x) * (newMax - newMin) / (oldMax - oldMin);
    else portion = (x - oldMin) * (newMax - newMin) / (oldMax - oldMin);

    if (reverseOutput) r = newMax - portion;
    else r = portion + newMin;

    if (ease === 0)
    {
        result.set(r);
    }
    else
    if (ease == 1)
    {
        x = Math.max(0, Math.min(1, (r - nMin) / (nMax - nMin)));
        result.set(nMin + x * x * (3 - 2 * x) * (nMax - nMin)); // smoothstep
    }
    else
    if (ease == 2)
    {
        x = Math.max(0, Math.min(1, (r - nMin) / (nMax - nMin)));
        result.set(nMin + x * x * x * (x * (x * 6 - 15) + 10) * (nMax - nMin)); // smootherstep
    }
}


};

Ops.Math.MapRange.prototype = new CABLES.Op();
CABLES.OPS["2617b407-60a0-4ff6-b4a7-18136cfa7817"]={f:Ops.Math.MapRange,objName:"Ops.Math.MapRange"};




// **************************************************************
// 
// Ops.Array.ArrayMath
// 
// **************************************************************

Ops.Array.ArrayMath = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const inArray_0 = op.inArray("array 0"),
    NumberIn = op.inValueFloat("Number for math", 0.0),
    mathSelect = op.inSwitch("Math function", ["+", "-", "*", "/", "%", "min", "max"], "+"),
    outArray = op.outArray("Array result"),
    outArrayLength = op.outNumber("Array length");

op.toWorkPortsNeedToBeLinked(inArray_0);

let mathFunc;
let showingError = false;
let mathArray = [];

inArray_0.onChange = NumberIn.onChange = update;
mathSelect.onChange = onFilterChange;

onFilterChange();

inArray_0.onLinkChanged = () =>
{
    if (inArray_0) inArray_0.copyLinkedUiAttrib("stride", outArray);
};

function onFilterChange()
{
    let mathSelectValue = mathSelect.get();

    if (mathSelectValue === "+") mathFunc = function (a, b) { return a + b; };
    else if (mathSelectValue === "-") mathFunc = function (a, b) { return a - b; };
    else if (mathSelectValue === "*") mathFunc = function (a, b) { return a * b; };
    else if (mathSelectValue === "/") mathFunc = function (a, b) { return a / b; };
    else if (mathSelectValue === "%") mathFunc = function (a, b) { return a % b; };
    else if (mathSelectValue === "min") mathFunc = function (a, b) { return Math.min(a, b); };
    else if (mathSelectValue === "max") mathFunc = function (a, b) { return Math.max(a, b); };
    update();
    op.setUiAttrib({ "extendTitle": mathSelectValue });
}

function update()
{
    let array0 = inArray_0.get();

    mathArray.length = 0;

    if (!array0)
    {
        outArrayLength.set(0);
        outArray.set(null);
        return;
    }

    let num = NumberIn.get();
    mathArray.length = array0.length;

    let i = 0;

    for (i = 0; i < array0.length; i++)
    {
        mathArray[i] = mathFunc(array0[i], num);
    }

    outArray.setRef(mathArray);
    outArrayLength.set(mathArray.length);
}


};

Ops.Array.ArrayMath.prototype = new CABLES.Op();
CABLES.OPS["c7617717-3114-452f-9625-e4fefd841e88"]={f:Ops.Array.ArrayMath,objName:"Ops.Array.ArrayMath"};



window.addEventListener('load', function(event) {
CABLES.jsLoaded=new Event('CABLES.jsLoaded');
document.dispatchEvent(CABLES.jsLoaded);
});
