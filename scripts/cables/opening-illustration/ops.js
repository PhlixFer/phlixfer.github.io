"use strict";

var CABLES=CABLES||{};
CABLES.OPS=CABLES.OPS||{};

var Ops=Ops || {};
Ops.Gl=Ops.Gl || {};
Ops.Ui=Ops.Ui || {};
Ops.Anim=Ops.Anim || {};
Ops.Date=Ops.Date || {};
Ops.Html=Ops.Html || {};
Ops.Math=Ops.Math || {};
Ops.User=Ops.User || {};
Ops.Vars=Ops.Vars || {};
Ops.Array=Ops.Array || {};
Ops.Color=Ops.Color || {};
Ops.Number=Ops.Number || {};
Ops.String=Ops.String || {};
Ops.Devices=Ops.Devices || {};
Ops.Trigger=Ops.Trigger || {};
Ops.Graphics=Ops.Graphics || {};
Ops.Html.CSS=Ops.Html.CSS || {};
Ops.Gl.Matrix=Ops.Gl.Matrix || {};
Ops.Gl.Meshes=Ops.Gl.Meshes || {};
Ops.Gl.Shader=Ops.Gl.Shader || {};
Ops.Gl.Textures=Ops.Gl.Textures || {};
Ops.Math.Compare=Ops.Math.Compare || {};
Ops.Devices.Mouse=Ops.Devices.Mouse || {};
Ops.Html.Elements=Ops.Html.Elements || {};
Ops.User.flowergal=Ops.User.flowergal || {};
Ops.Array.PointArray=Ops.Array.PointArray || {};
Ops.Graphics.Geometry=Ops.Graphics.Geometry || {};



// **************************************************************
// 
// Ops.User.flowergal.LerpToPosOverTime
// 
// **************************************************************

Ops.User.flowergal.LerpToPosOverTime = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={"inc_gen_ports_js":"const port_vkwg0lr1r=op.inFloat(\"vkwg0lr1r\",-0.990625);\nport_vkwg0lr1r.setUiAttribs({title:\"number1\",});\n\nconst port_6esetnea0=op.inFloat(\"6esetnea0\",0.16874999999999996);\nport_6esetnea0.setUiAttribs({title:\"number1\",});\n\nconst port_flu3xmwpv=op.inTrigger(\"flu3xmwpv\");\nport_flu3xmwpv.setUiAttribs({title:\"exe\",display:\"button\",});\n\nconst port_k2ekyreab=op.inFloat(\"k2ekyreab\",0.2);\nport_k2ekyreab.setUiAttribs({title:\"Percentage\",display:\"range\",});\n\nconst port_j5ik0twai=op.outNumber(\"j5ik0twai\");\nport_j5ik0twai.setUiAttribs({title:\"Result\",});\n\nconst port_qlpbxa25u=op.outNumber(\"qlpbxa25u\");\nport_qlpbxa25u.setUiAttribs({title:\"Result\",});\n\nop.initInnerPorts=function(addedOps)\n{\n  for(let i=0;i<addedOps.length;i++)\n  {\n    if(addedOps[i].innerInput)\n    {\nconst innerOut_vkwg0lr1r = addedOps[i].outNumber(\"innerOut_vkwg0lr1r\");\ninnerOut_vkwg0lr1r.set(port_vkwg0lr1r.get() );\ninnerOut_vkwg0lr1r.setUiAttribs({title:\"number1\"});\nport_vkwg0lr1r.on(\"change\", (a,v) => { innerOut_vkwg0lr1r.set(a); });\n\nconst innerOut_6esetnea0 = addedOps[i].outNumber(\"innerOut_6esetnea0\");\ninnerOut_6esetnea0.set(port_6esetnea0.get() );\ninnerOut_6esetnea0.setUiAttribs({title:\"number1\"});\nport_6esetnea0.on(\"change\", (a,v) => { innerOut_6esetnea0.set(a); });\n\nconst innerOut_flu3xmwpv = addedOps[i].outTrigger(\"innerOut_flu3xmwpv\");\ninnerOut_flu3xmwpv.setUiAttribs({title:\"exe\"});\nport_flu3xmwpv.onTriggered = () => { innerOut_flu3xmwpv.trigger(); };\n\nconst innerOut_k2ekyreab = addedOps[i].outNumber(\"innerOut_k2ekyreab\");\ninnerOut_k2ekyreab.set(port_k2ekyreab.get() );\ninnerOut_k2ekyreab.setUiAttribs({title:\"Percentage\"});\nport_k2ekyreab.on(\"change\", (a,v) => { innerOut_k2ekyreab.set(a); });\n\n    }\nif(addedOps[i].innerOutput)\n{\nconst innerIn_j5ik0twai = addedOps[i].inFloat(\"innerIn_j5ik0twai\");\ninnerIn_j5ik0twai.setUiAttribs({title:\"Result\"});\ninnerIn_j5ik0twai.on(\"change\", (a,v) => { port_j5ik0twai.set(a); });\n\nconst innerIn_qlpbxa25u = addedOps[i].inFloat(\"innerIn_qlpbxa25u\");\ninnerIn_qlpbxa25u.setUiAttribs({title:\"Result\"});\ninnerIn_qlpbxa25u.on(\"change\", (a,v) => { port_qlpbxa25u.set(a); });\n\n}\n}\n};\n","subpatch_json":"{\"ops\":[{\"id\":\"r68aa4hqg\",\"uiAttribs\":{\"subPatch\":\"2h5vdus98\"},\"storage\":{},\"portsOut\":[{\"name\":\"Result\",\"links\":[{\"portIn\":\"Value\",\"portOut\":\"Result\",\"objIn\":\"e7rkessik\",\"objOut\":\"r68aa4hqg\"},{\"portIn\":\"innerIn_j5ik0twai\",\"portOut\":\"Result\",\"objIn\":\"yqqcwl3fg\",\"objOut\":\"r68aa4hqg\"}]}],\"objName\":\"Ops.Math.Interpolate\"},{\"id\":\"e7rkessik\",\"uiAttribs\":{\"subPatch\":\"2h5vdus98\"},\"storage\":{},\"portsIn\":[{\"name\":\"Clear on Change\",\"value\":0},{\"name\":\"easing index\",\"value\":1},{\"name\":\"easing\",\"value\":\"absolute\"}],\"portsOut\":[{\"name\":\"Result\",\"links\":[{\"portIn\":\"Value 1\",\"portOut\":\"Result\",\"objIn\":\"r68aa4hqg\",\"objOut\":\"e7rkessik\"}]}],\"objName\":\"Ops.Number.DelayedNumber\"},{\"id\":\"85g9o7d9y\",\"uiAttribs\":{\"subPatch\":\"2h5vdus98\"},\"storage\":{},\"portsIn\":[{\"name\":\"Clear on Change\",\"value\":0},{\"name\":\"easing index\",\"value\":2},{\"name\":\"easing\",\"value\":\"smoothstep\"}],\"portsOut\":[{\"name\":\"Result\",\"links\":[{\"portIn\":\"Value 1\",\"portOut\":\"Result\",\"objIn\":\"rul7kazo0\",\"objOut\":\"85g9o7d9y\"}]}],\"objName\":\"Ops.Number.DelayedNumber\"},{\"id\":\"rul7kazo0\",\"uiAttribs\":{\"subPatch\":\"2h5vdus98\"},\"storage\":{},\"portsOut\":[{\"name\":\"Result\",\"links\":[{\"portIn\":\"Value\",\"portOut\":\"Result\",\"objIn\":\"85g9o7d9y\",\"objOut\":\"rul7kazo0\"},{\"portIn\":\"innerIn_qlpbxa25u\",\"portOut\":\"Result\",\"objIn\":\"yqqcwl3fg\",\"objOut\":\"rul7kazo0\"}]}],\"objName\":\"Ops.Math.Interpolate\"},{\"id\":\"i1gc6csan\",\"uiAttribs\":{\"subPatch\":\"2h5vdus98\"},\"storage\":{},\"portsIn\":[{\"name\":\"Smooth\",\"value\":1},{\"name\":\"Seconds\",\"value\":1}],\"portsOut\":[{\"name\":\"trigger\",\"links\":[{\"portIn\":\"Update\",\"portOut\":\"trigger\",\"objIn\":\"e7rkessik\",\"objOut\":\"i1gc6csan\"},{\"portIn\":\"Update\",\"portOut\":\"trigger\",\"objIn\":\"85g9o7d9y\",\"objOut\":\"i1gc6csan\"}]},{\"name\":\"result\",\"links\":[{\"portIn\":\"Delay\",\"portOut\":\"result\",\"objIn\":\"e7rkessik\",\"objOut\":\"i1gc6csan\"},{\"portIn\":\"Delay\",\"portOut\":\"result\",\"objIn\":\"85g9o7d9y\",\"objOut\":\"i1gc6csan\"}]}],\"objName\":\"Ops.Anim.TimeDelta\"},{\"id\":\"bj3sctrio\",\"uiAttribs\":{\"subPatch\":\"2h5vdus98\"},\"storage\":{},\"portsOut\":[{\"name\":\"innerOut_vkwg0lr1r\",\"title\":\"X\",\"links\":[{\"portIn\":\"Value 2\",\"portOut\":\"innerOut_vkwg0lr1r\",\"objIn\":\"r68aa4hqg\",\"objOut\":\"bj3sctrio\"}]},{\"name\":\"innerOut_6esetnea0\",\"title\":\"Y\",\"links\":[{\"portIn\":\"Value 2\",\"portOut\":\"innerOut_6esetnea0\",\"objIn\":\"rul7kazo0\",\"objOut\":\"bj3sctrio\"}]},{\"name\":\"innerOut_flu3xmwpv\",\"title\":\"exe\",\"links\":[{\"portIn\":\"exe\",\"portOut\":\"innerOut_flu3xmwpv\",\"objIn\":\"i1gc6csan\",\"objOut\":\"bj3sctrio\"}]},{\"name\":\"innerOut_k2ekyreab\",\"title\":\"Percentage\",\"links\":[{\"portIn\":\"Percentage\",\"portOut\":\"innerOut_k2ekyreab\",\"objIn\":\"r68aa4hqg\",\"objOut\":\"bj3sctrio\"},{\"portIn\":\"Percentage\",\"portOut\":\"innerOut_k2ekyreab\",\"objIn\":\"rul7kazo0\",\"objOut\":\"bj3sctrio\"}]}],\"objName\":\"Ops.Ui.SubPatchInput\"},{\"id\":\"yqqcwl3fg\",\"uiAttribs\":{\"subPatch\":\"2h5vdus98\"},\"storage\":{},\"portsIn\":[{\"name\":\"innerIn_j5ik0twai\",\"title\":\"Result\"},{\"name\":\"innerIn_qlpbxa25u\",\"title\":\"Result\"}],\"objName\":\"Ops.Ui.SubPatchOutput\"},{\"id\":\"ziq53uqxj\",\"uiAttribs\":{\"subPatch\":\"2h5vdus98\"},\"portsIn\":[{\"name\":\"title\",\"value\":\"Lerping over Time\"},{\"name\":\"text\",\"value\":\"This patch interpolates between the last position and the\\nnew position over time, creating a smooth animation.\\nThis can be used in a patch to transform objects smoothly\\nto the cursor, for example.\"}],\"storage\":{\"ref\":\"ziq53uqxj\"},\"objName\":\"Ops.Ui.Comment_v2\"}]}",};
const port_vkwg0lr1r=op.inFloat("vkwg0lr1r",-0.990625);
port_vkwg0lr1r.setUiAttribs({title:"number1",});

const port_6esetnea0=op.inFloat("6esetnea0",0.16874999999999996);
port_6esetnea0.setUiAttribs({title:"number1",});

const port_flu3xmwpv=op.inTrigger("flu3xmwpv");
port_flu3xmwpv.setUiAttribs({title:"exe",display:"button",});

const port_k2ekyreab=op.inFloat("k2ekyreab",0.2);
port_k2ekyreab.setUiAttribs({title:"Percentage",display:"range",});

const port_j5ik0twai=op.outNumber("j5ik0twai");
port_j5ik0twai.setUiAttribs({title:"Result",});

const port_qlpbxa25u=op.outNumber("qlpbxa25u");
port_qlpbxa25u.setUiAttribs({title:"Result",});

op.initInnerPorts=function(addedOps)
{
  for(let i=0;i<addedOps.length;i++)
  {
    if(addedOps[i].innerInput)
    {
const innerOut_vkwg0lr1r = addedOps[i].outNumber("innerOut_vkwg0lr1r");
innerOut_vkwg0lr1r.set(port_vkwg0lr1r.get() );
innerOut_vkwg0lr1r.setUiAttribs({title:"number1"});
port_vkwg0lr1r.on("change", (a,v) => { innerOut_vkwg0lr1r.set(a); });

const innerOut_6esetnea0 = addedOps[i].outNumber("innerOut_6esetnea0");
innerOut_6esetnea0.set(port_6esetnea0.get() );
innerOut_6esetnea0.setUiAttribs({title:"number1"});
port_6esetnea0.on("change", (a,v) => { innerOut_6esetnea0.set(a); });

const innerOut_flu3xmwpv = addedOps[i].outTrigger("innerOut_flu3xmwpv");
innerOut_flu3xmwpv.setUiAttribs({title:"exe"});
port_flu3xmwpv.onTriggered = () => { innerOut_flu3xmwpv.trigger(); };

const innerOut_k2ekyreab = addedOps[i].outNumber("innerOut_k2ekyreab");
innerOut_k2ekyreab.set(port_k2ekyreab.get() );
innerOut_k2ekyreab.setUiAttribs({title:"Percentage"});
port_k2ekyreab.on("change", (a,v) => { innerOut_k2ekyreab.set(a); });

    }
if(addedOps[i].innerOutput)
{
const innerIn_j5ik0twai = addedOps[i].inFloat("innerIn_j5ik0twai");
innerIn_j5ik0twai.setUiAttribs({title:"Result"});
innerIn_j5ik0twai.on("change", (a,v) => { port_j5ik0twai.set(a); });

const innerIn_qlpbxa25u = addedOps[i].inFloat("innerIn_qlpbxa25u");
innerIn_qlpbxa25u.setUiAttribs({title:"Result"});
innerIn_qlpbxa25u.on("change", (a,v) => { port_qlpbxa25u.set(a); });

}
}
};

const patchId = "bp2sub_" + op.id;

new CABLES.SubPatchOp(op, { "subId": patchId });

initializeSubpatch();

function initializeSubpatch()
{
    if(!attachments || !attachments.subpatch_json) return;

    const p = JSON.parse(attachments.subpatch_json);

    CABLES.Patch.replaceOpIds(p,
        {
            "parentSubPatchId": patchId,
            "prefixHash": patchId,
            "oldIdAsRef": true,
            "doNotUnlinkLostLinks": true
        });

    for (let i = 0; i < p.ops.length; i++)
    {
        p.ops[i].uiAttribs.blueprintSubpatch2 = true;
    }

    op.loadDependencies(p, () =>
    {
        op.patch.deSerialize(p, { "opsCreated": op.initInnerPorts });
        if (CABLES.UI)gui.savedState.setSaved("blueprintloaded", patchId);
        op.patch.emitEvent("subpatchExpose", patchId);
        op.setStorage({ "blueprintVer": 2 });
        op.patch.emitEvent("subpatchExpose", patchId);
    });
}


};

Ops.User.flowergal.LerpToPosOverTime.prototype = new CABLES.Op();
CABLES.OPS["725c1044-d80f-409b-af95-8017a6924f61"]={f:Ops.User.flowergal.LerpToPosOverTime,objName:"Ops.User.flowergal.LerpToPosOverTime"};




// **************************************************************
// 
// Ops.Math.Interpolate
// 
// **************************************************************

Ops.Math.Interpolate = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    val1 = op.inFloat("Value 1"),
    val2 = op.inFloat("Value 2"),
    perc = op.inFloatSlider("Percentage"),
    result = op.outNumber("Result");

val1.onChange =
val2.onChange =
perc.onChange = update;

function update()
{
    result.set((val2.get() - val1.get()) * perc.get() + val1.get());
}


};

Ops.Math.Interpolate.prototype = new CABLES.Op();
CABLES.OPS["d126e2c8-221e-428f-8ff4-8b8c5f6b8905"]={f:Ops.Math.Interpolate,objName:"Ops.Math.Interpolate"};




// **************************************************************
// 
// Ops.Number.DelayedNumber
// 
// **************************************************************

Ops.Number.DelayedNumber = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    exe = op.inTrigger("Update"),
    v = op.inValue("Value", 0),
    delay = op.inValue("Delay", 0.5),
    result = op.outNumber("Result", 0),
    clear = op.inValueBool("Clear on Change", false);

const anim = new CABLES.Anim();
anim.createPort(op, "easing", function () {}).set("absolute");

exe.onTriggered = function ()
{
    result.set(anim.getValue(op.patch.freeTimer.get()) || 0);
};

v.onChange = function ()
{
    const current = anim.getValue(op.patch.freeTimer.get());
    const t = op.patch.freeTimer.get();

    if (clear.get()) anim.clear(t);

    anim.setValue(t + delay.get(), v.get());

    let lastKey = 0;
    for (let i = 0; i < anim.keys.length; i++)
        if (anim.keys[i] && anim.keys[i].time < t)lastKey = i;

    if (lastKey > 2) anim.keys.splice(0, lastKey);
};


};

Ops.Number.DelayedNumber.prototype = new CABLES.Op();
CABLES.OPS["8e7741e0-0b1b-40f3-a62c-ac8a8828dffb"]={f:Ops.Number.DelayedNumber,objName:"Ops.Number.DelayedNumber"};




// **************************************************************
// 
// Ops.Anim.TimeDelta
// 
// **************************************************************

Ops.Anim.TimeDelta = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    exe = op.inTriggerButton("exe"),
    smooth = op.inValueBool("Smooth", false),
    seconds = op.inValueBool("Seconds", false),
    trigger = op.outTrigger("trigger"),
    result = op.outNumber("result");

let lastTime = CABLES.now();
let diff = 0;
let smoothed = -1;

exe.onTriggered = function ()
{
    diff = (CABLES.now() - lastTime);
    if (seconds.get()) diff /= 1000;

    if (smooth.get())
    {
        if (smoothed == -1)smoothed = diff;
        else
        {
            smoothed = smoothed * 0.8 + diff * 0.2;
            diff = smoothed;
        }
    }

    result.set(diff);
    lastTime = CABLES.now();
    trigger.trigger();
};

exe.onTriggered();


};

Ops.Anim.TimeDelta.prototype = new CABLES.Op();
CABLES.OPS["fba0e516-b50e-4372-9a0c-dc605669ffed"]={f:Ops.Anim.TimeDelta,objName:"Ops.Anim.TimeDelta"};




// **************************************************************
// 
// Ops.Ui.SubPatchInput
// 
// **************************************************************

Ops.Ui.SubPatchInput = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
op.innerInput = true;

const goto = op.inTriggerButton("Goto SubPatchOp");
goto.setUiAttribs({ "hidePort": true });
goto.onTriggered = () =>
{
    const parent = op.patch.getSubPatchOuterOp(op.uiAttribs.subPatch);
    gui.patchView.centerSelectOp(parent.id);
};


};

Ops.Ui.SubPatchInput.prototype = new CABLES.Op();
CABLES.OPS["c4e4e933-136e-479e-8de8-0b35b75d9217"]={f:Ops.Ui.SubPatchInput,objName:"Ops.Ui.SubPatchInput"};




// **************************************************************
// 
// Ops.Ui.SubPatchOutput
// 
// **************************************************************

Ops.Ui.SubPatchOutput = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
op.innerOutput = true;


};

Ops.Ui.SubPatchOutput.prototype = new CABLES.Op();
CABLES.OPS["02d45073-7936-4830-81ad-59a162febf1f"]={f:Ops.Ui.SubPatchOutput,objName:"Ops.Ui.SubPatchOutput"};




// **************************************************************
// 
// Ops.Ui.Comment_v2
// 
// **************************************************************

Ops.Ui.Comment_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    inTitle = op.inString("title", "New comment"),
    inText = op.inTextarea("text");
inTitle.setUiAttribs({ "hidePort": true });
inText.setUiAttribs({ "hidePort": true });

op.init =
    inTitle.onChange =
    inText.onChange =
    op.onLoaded = update;

update();

function update()
{
    if (CABLES.UI)
    {
        op.uiAttr(
            {
                "comment_title": inTitle.get(),
                "comment_text": inText.get(),
                "extendTitle": inTitle.get()
            });
    }
}


};

Ops.Ui.Comment_v2.prototype = new CABLES.Op();
CABLES.OPS["93492eeb-bf35-4a62-98f7-d85b0b79bfe5"]={f:Ops.Ui.Comment_v2,objName:"Ops.Ui.Comment_v2"};




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
// Ops.String.StringIterator_v2
// 
// **************************************************************

Ops.String.StringIterator_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    inExe = op.inTrigger("Exec"),
    inString = op.inString("String", "cables"),
    next = op.outTrigger("Next"),
    outChar = op.outString("Character"),
    outIndex = op.outNumber("Index"),
    outLength = op.outNumber("Length");

inExe.onTriggered = function ()
{
    let str = inString.get();
    outLength.set(str.length);

    for (let i = 0; i < str.length; i++)
    {
        outChar.set(str[i]);
        outIndex.set(i);
        next.trigger();
    }
};


};

Ops.String.StringIterator_v2.prototype = new CABLES.Op();
CABLES.OPS["2def6fdb-de39-4f56-9818-05b7a302583c"]={f:Ops.String.StringIterator_v2,objName:"Ops.String.StringIterator_v2"};




// **************************************************************
// 
// Ops.String.StringEditor
// 
// **************************************************************

Ops.String.StringEditor = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    v = op.inStringEditor("value", ""),
    syntax = op.inValueSelect("Syntax", ["text", "glsl", "css", "html", "xml", "json", "javascript", "inline-css", "sql"], "text"),
    result = op.outString("Result");

syntax.onChange = updateSyntax;

function updateSyntax()
{
    let s = syntax.get();
    if (s == "javascript")s = "js";
    v.setUiAttribs({ "editorSyntax": s });
}

v.onChange = function ()
{
    result.set(v.get());
};


};

Ops.String.StringEditor.prototype = new CABLES.Op();
CABLES.OPS["6468b7c1-f63e-4db4-b809-4b203d27ead3"]={f:Ops.String.StringEditor,objName:"Ops.String.StringEditor"};




// **************************************************************
// 
// Ops.Array.PointArray.CircularPoints_v2
// 
// **************************************************************

Ops.Array.PointArray.CircularPoints_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    radius = op.inValue("Radius", 1),
    segments = op.inValue("Round Segments", 40),
    percent = op.inFloat("Rounds", 1),
    inRoundOffset = op.inFloat("Radius Add Round", 0),
    inPointRadOffset = op.inFloat("Radius Add Point", 0),
    inOffset = op.inFloat("Offset", 0),
    inPointOffset = op.inFloat("Point Offset XY", 0),
    inPointOffsetZ = op.inFloat("Point Offset Z", 0),
    inOffsetRot = op.inFloat("Offset rotation"),
    planeSelection = op.inSwitch("Plane", ["XY", "XZ", "YZ"], "XY"),
    inClose = op.inBool("Loop", false),
    rotationDirection = op.inSwitch("Rotation Direction", ["Clockwise", "Anticlockwise"], "Anticlockwise"),
    outArr = op.outArray("Points", 3),
    outRotArr = op.outArray("Rotation", 3),
    outTotalPoints = op.outNumber("Total points"),
    outArrayLength = op.outNumber("Array lengths");

inOffset.onChange =
    inClose.onChange =
    inOffsetRot.onChange =
    inPointRadOffset.onChange =
    inPointOffset.onChange =
    radius.onChange =
    inPointOffsetZ.onChange =
    inRoundOffset.onChange =
    percent.onChange =
    segments.onChange =
    planeSelection.onChange =
    rotationDirection.onChange = calcArray;

function calcArray()
{
    const segs = Math.max(3, Math.floor(segments.get()));
    const points = [];
    const rots = [];

    let progressOffset = 0.0;
    const offsetRotRad = inOffsetRot.get() * (Math.PI / 180); // Convert offset rotation to radians
    const r = radius.get();
    const offZ = inPointOffsetZ.get();

    let degInRadMul = 1;
    if (rotationDirection.get() === "Clockwise") degInRadMul *= -1; // Reverse direction for clockwise rotation

    for (let i = 0; i < segs * percent.get(); i++)
    {
        progressOffset = i * inPointOffset.get() + inOffset.get();
        const radiusOff = Math.floor(i / segs) * inRoundOffset.get();

        let degInRad = (360 / segs) * (i + progressOffset) * (Math.PI / 180); // Convert degrees to radians

        degInRad *= degInRadMul;

        const posR = r + radiusOff + inPointRadOffset.get() * i; // Effective radius with offsets
        const posx = Math.cos(degInRad) * posR;
        const posy = Math.sin(degInRad) * posR;
        const posz = i * offZ; // Z-coordinate progresses with each segment

        switch (planeSelection.get())
        {
        case "XY":
            points.push(posx, posy, posz);
            break;
        case "XZ":
            points.push(posx, posz, posy);
            break;
        case "YZ":
            points.push(posz, posx, posy);
            break;
        }

        rots.push(0, 0, (degInRad - offsetRotRad) * (180 / Math.PI)); // Rotation in degrees, adjusted for offset
    }

    if (inClose.get())
    {
        points.push(points[0], points[1], points[2]);
        rots.push(rots[0], rots[1], rots[2]);
    }

    outArr.setRef(points);
    outRotArr.setRef(rots);
    outTotalPoints.set(points.length / 3);
    outArrayLength.set(points.length);
}

calcArray();


};

Ops.Array.PointArray.CircularPoints_v2.prototype = new CABLES.Op();
CABLES.OPS["5d2de367-c2b8-4702-abf0-b16bbeb22f37"]={f:Ops.Array.PointArray.CircularPoints_v2,objName:"Ops.Array.PointArray.CircularPoints_v2"};




// **************************************************************
// 
// Ops.Gl.Matrix.Transform
// 
// **************************************************************

Ops.Gl.Matrix.Transform = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    render = op.inTrigger("render"),
    posX = op.inValue("posX", 0),
    posY = op.inValue("posY", 0),
    posZ = op.inValue("posZ", 0),
    scale = op.inValue("scale", 1),
    rotX = op.inValue("rotX", 0),
    rotY = op.inValue("rotY", 0),
    rotZ = op.inValue("rotZ", 0),
    trigger = op.outTrigger("trigger");

op.setPortGroup("Rotation", [rotX, rotY, rotZ]);
op.setPortGroup("Position", [posX, posY, posZ]);
op.setPortGroup("Scale", [scale]);
op.setUiAxisPorts(posX, posY, posZ);

op.toWorkPortsNeedToBeLinked(render, trigger);

const vPos = vec3.create();
const vScale = vec3.create();
const transMatrix = mat4.create();
mat4.identity(transMatrix);

let
    doScale = false,
    doTranslate = false,
    translationChanged = true,
    scaleChanged = true,
    rotChanged = true;

rotX.onChange = rotY.onChange = rotZ.onChange = setRotChanged;
posX.onChange = posY.onChange = posZ.onChange = setTranslateChanged;
scale.onChange = setScaleChanged;

render.onTriggered = function ()
{
    // if(!CGL.TextureEffect.checkOpNotInTextureEffect(op)) return;

    let updateMatrix = false;
    if (translationChanged)
    {
        updateTranslation();
        updateMatrix = true;
    }
    if (scaleChanged)
    {
        updateScale();
        updateMatrix = true;
    }
    if (rotChanged) updateMatrix = true;

    if (updateMatrix) doUpdateMatrix();

    const cg = op.patch.cg || op.patch.cgl;
    cg.pushModelMatrix();
    mat4.multiply(cg.mMatrix, cg.mMatrix, transMatrix);

    trigger.trigger();
    cg.popModelMatrix();

    if (CABLES.UI)
    {
        if (!posX.isLinked() && !posY.isLinked() && !posZ.isLinked())
        {
            gui.setTransform(op.id, posX.get(), posY.get(), posZ.get());

            if (op.isCurrentUiOp())
                gui.setTransformGizmo(
                    {
                        "posX": posX,
                        "posY": posY,
                        "posZ": posZ,
                    });
        }
    }
};

// op.transform3d = function ()
// {
//     return { "pos": [posX, posY, posZ] };
// };

function doUpdateMatrix()
{
    mat4.identity(transMatrix);
    if (doTranslate)mat4.translate(transMatrix, transMatrix, vPos);

    if (rotX.get() !== 0)mat4.rotateX(transMatrix, transMatrix, rotX.get() * CGL.DEG2RAD);
    if (rotY.get() !== 0)mat4.rotateY(transMatrix, transMatrix, rotY.get() * CGL.DEG2RAD);
    if (rotZ.get() !== 0)mat4.rotateZ(transMatrix, transMatrix, rotZ.get() * CGL.DEG2RAD);

    if (doScale)mat4.scale(transMatrix, transMatrix, vScale);
    rotChanged = false;
}

function updateTranslation()
{
    doTranslate = false;
    if (posX.get() !== 0.0 || posY.get() !== 0.0 || posZ.get() !== 0.0) doTranslate = true;
    vec3.set(vPos, posX.get(), posY.get(), posZ.get());
    translationChanged = false;
}

function updateScale()
{
    // doScale=false;
    // if(scale.get()!==0.0)
    doScale = true;
    vec3.set(vScale, scale.get(), scale.get(), scale.get());
    scaleChanged = false;
}

function setTranslateChanged()
{
    translationChanged = true;
}

function setScaleChanged()
{
    scaleChanged = true;
}

function setRotChanged()
{
    rotChanged = true;
}

doUpdateMatrix();


};

Ops.Gl.Matrix.Transform.prototype = new CABLES.Op();
CABLES.OPS["650baeb1-db2d-4781-9af6-ab4e9d4277be"]={f:Ops.Gl.Matrix.Transform,objName:"Ops.Gl.Matrix.Transform"};




// **************************************************************
// 
// Ops.Array.Array3GetNumbers
// 
// **************************************************************

Ops.Array.Array3GetNumbers = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    pArr = op.inArray("Array", 3),
    pIndex = op.inValueInt("Index"),
    outX = op.outNumber("X"),
    outY = op.outNumber("Y"),
    outZ = op.outNumber("Z");

pArr.onChange =
    pIndex.onChange = update;

function update()
{
    let arr = pArr.get();
    if (!arr)
    {
        outX.set(0);
        outY.set(0);
        outZ.set(0);
        return;
    }
    let ind = Math.min(arr.length - 3, pIndex.get() * 3);
    if (arr)
    {
        outX.set(arr[ind + 0]);
        outY.set(arr[ind + 1]);
        outZ.set(arr[ind + 2]);
    }
}


};

Ops.Array.Array3GetNumbers.prototype = new CABLES.Op();
CABLES.OPS["56882cc4-c40d-4dc0-bf7c-db1b5a7acad0"]={f:Ops.Array.Array3GetNumbers,objName:"Ops.Array.Array3GetNumbers"};




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
// Ops.Math.MathExpression
// 
// **************************************************************

Ops.Math.MathExpression = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const inA = op.inFloat("A", 0);
const inB = op.inFloat("B", 1);
const inC = op.inFloat("C", 2);
const inD = op.inFloat("D", 3);
op.setPortGroup("Parameters", [inA, inB, inC, inD]);
const inExpression = op.inString("Expression", "a*(b+c+d)");
op.setPortGroup("Expression", [inExpression]);
const outResult = op.outNumber("Result");
const outExpressionIsValid = op.outBool("Expression Valid");

let currentFunction = inExpression.get();
let functionValid = false;

const createFunction = () =>
{
    try
    {
        currentFunction = new Function("m", "a", "b", "c", "d", `with(m) { return ${inExpression.get()} }`);
        functionValid = true;
        evaluateFunction();
        outExpressionIsValid.set(functionValid);
    }
    catch (e)
    {
        functionValid = false;
        outExpressionIsValid.set(functionValid);
        if (e instanceof ReferenceError || e instanceof SyntaxError) return;
    }
};

const evaluateFunction = () =>
{
    if (functionValid)
    {
        outResult.set(currentFunction(Math, inA.get(), inB.get(), inC.get(), inD.get()));
        if (!inExpression.get()) outResult.set(0);
    }

    outExpressionIsValid.set(functionValid);
};


inA.onChange = inB.onChange = inC.onChange = inD.onChange = evaluateFunction;
inExpression.onChange = createFunction;
createFunction();


};

Ops.Math.MathExpression.prototype = new CABLES.Op();
CABLES.OPS["d2343a1e-64ea-45b2-99ed-46e167bbdcd3"]={f:Ops.Math.MathExpression,objName:"Ops.Math.MathExpression"};




// **************************************************************
// 
// Ops.Devices.Mouse.Mouse_v3
// 
// **************************************************************

Ops.Devices.Mouse.Mouse_v3 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    inCoords = op.inSwitch("Coordinates", ["-1 to 1", "Pixel Display", "Pixel", "0 to 1"], "-1 to 1"),
    area = op.inValueSelect("Area", ["Canvas", "Document", "Parent Element", "Canvas Area"], "Canvas"),
    flipY = op.inValueBool("flip y", true),
    rightClickPrevDef = op.inBool("right click prevent default", true),
    touchscreen = op.inValueBool("Touch support", true),
    inPassive = op.inValueBool("Passive Events", false),
    active = op.inValueBool("Active", true),
    outMouseX = op.outNumber("x", 0),
    outMouseY = op.outNumber("y", 0),
    mouseClick = op.outTrigger("click"),
    mouseClickRight = op.outTrigger("click right"),
    mouseDown = op.outBoolNum("Button is down"),
    mouseOver = op.outBoolNum("Mouse is hovering"),
    outMovementX = op.outNumber("Movement X", 0),
    outMovementY = op.outNumber("Movement Y", 0);

const cgl = op.patch.cgl;
let normalize = 1;
let listenerElement = null;
let sizeElement = null;

inPassive.onChange =
area.onChange = addListeners;

inCoords.onChange = updateCoordNormalizing;
op.onDelete = removeListeners;

addListeners();

op.on("loadedValueSet", onStart);

function onStart()
{
    if (normalize == 0)
    {
        if (sizeElement.clientWidth === 0) setTimeout(onStart, 50);

        outMouseX.set(sizeElement.clientWidth / 2);
        outMouseY.set(sizeElement.clientHeight / 2);
    }
    else if (normalize == 1)
    {
        outMouseX.set(0);
        outMouseY.set(0);
    }
    else if (normalize == 2)
    {
        outMouseX.set(0.5);
        outMouseY.set(0.5);
    }
    else if (normalize == 3)
    {
        if (sizeElement.clientWidth === 0)
        {
            setTimeout(onStart, 50);
        }

        outMouseX.set(sizeElement.clientWidth / 2 / cgl.pixelDensity);
        outMouseY.set(sizeElement.clientHeight / 2 / cgl.pixelDensity);
    }
    else console.error("unknown normalize mouse", normalize);
}

function setValue(x, y)
{
    x = x || 0;
    y = y || 0;

    if (normalize == 0) // pixel
    {
        outMouseX.set(x);
        outMouseY.set(y);
    }
    else
    if (normalize == 3) // pixel css
    {
        outMouseX.set(x * cgl.pixelDensity);
        outMouseY.set(y * cgl.pixelDensity);
    }
    else
    {
        let w = sizeElement.clientWidth / cgl.pixelDensity;
        let h = sizeElement.clientHeight / cgl.pixelDensity;

        w = w || 1;
        h = h || 1;

        if (normalize == 1) // -1 to 1
        {
            let xx = (x / w * 2.0 - 1.0);
            let yy = (y / h * 2.0 - 1.0);
            xx = CABLES.clamp(xx, -1, 1);
            yy = CABLES.clamp(yy, -1, 1);

            outMouseX.set(xx);
            outMouseY.set(yy);
        }
        else if (normalize == 2) // 0 to 1
        {
            let xx = x / w;
            let yy = y / h;

            xx = CABLES.clamp(xx, 0, 1);
            yy = CABLES.clamp(yy, 0, 1);

            outMouseX.set(xx);
            outMouseY.set(yy);
        }
    }
}

function checkHovering(e)
{
    const r = sizeElement.getBoundingClientRect();

    return (
        e.clientX > r.left &&
        e.clientX < r.left + r.width &&
        e.clientY > r.top &&
        e.clientY < r.top + r.height
    );
}

touchscreen.onChange = function ()
{
    removeListeners();
    addListeners();
};

active.onChange = function ()
{
    if (listenerElement)removeListeners();
    if (active.get())addListeners();
};

function updateCoordNormalizing()
{
    if (inCoords.get() == "Pixel") normalize = 0;
    else if (inCoords.get() == "-1 to 1") normalize = 1;
    else if (inCoords.get() == "0 to 1") normalize = 2;
    else if (inCoords.get() == "Pixel Display") normalize = 3;
}

function onMouseEnter(e)
{
    mouseDown.set(false);
    mouseOver.set(checkHovering(e));
}

function onMouseDown(e)
{
    if (!checkHovering(e)) return;
    mouseDown.set(true);
}

function onMouseUp(e)
{
    mouseDown.set(false);
}

function onClickRight(e)
{
    if (!checkHovering(e)) return;
    mouseClickRight.trigger();
    if (rightClickPrevDef.get()) e.preventDefault();
}

function onmouseclick(e)
{
    if (!checkHovering(e)) return;
    mouseClick.trigger();
}

function onMouseLeave(e)
{
    mouseDown.set(false);
    mouseOver.set(checkHovering(e));
}

function setCoords(e)
{
    let x = e.clientX;
    let y = e.clientY;

    if (area.get() != "Document")
    {
        x = e.offsetX;
        y = e.offsetY;
    }
    if (area.get() === "Canvas Area")
    {
        const r = sizeElement.getBoundingClientRect();
        x = e.clientX - r.left;
        y = e.clientY - r.top;
    }

    if (flipY.get()) y = sizeElement.clientHeight - y;

    setValue(x / cgl.pixelDensity, y / cgl.pixelDensity);
}

function onmousemove(e)
{
    mouseOver.set(checkHovering(e));
    setCoords(e);

    outMovementX.set(e.movementX / cgl.pixelDensity);
    outMovementY.set(e.movementY / cgl.pixelDensity);
}

function ontouchmove(e)
{
    if (event.touches && event.touches.length > 0) setCoords(e.touches[0]);
}

function ontouchstart(event)
{
    mouseDown.set(true);

    if (event.touches && event.touches.length > 0) onMouseDown(event.touches[0]);
}

function ontouchend(event)
{
    mouseDown.set(false);
    onMouseUp();
}

function removeListeners()
{
    if (!listenerElement) return;
    listenerElement.removeEventListener("touchend", ontouchend);
    listenerElement.removeEventListener("touchstart", ontouchstart);
    listenerElement.removeEventListener("touchmove", ontouchmove);

    listenerElement.removeEventListener("click", onmouseclick);
    listenerElement.removeEventListener("mousemove", onmousemove);
    listenerElement.removeEventListener("mouseleave", onMouseLeave);
    listenerElement.removeEventListener("mousedown", onMouseDown);
    listenerElement.removeEventListener("mouseup", onMouseUp);
    listenerElement.removeEventListener("mouseenter", onMouseEnter);
    listenerElement.removeEventListener("contextmenu", onClickRight);
    listenerElement = null;
}

function addListeners()
{
    if (listenerElement || !active.get())removeListeners();
    if (!active.get()) return;

    listenerElement = sizeElement = cgl.canvas;
    if (area.get() == "Canvas Area")
    {
        sizeElement = cgl.canvas.parentElement;
        listenerElement = document.body;
    }
    if (area.get() == "Document") sizeElement = listenerElement = document.body;
    if (area.get() == "Parent Element") listenerElement = sizeElement = cgl.canvas.parentElement;

    let passive = false;
    if (inPassive.get())passive = { "passive": true };

    if (touchscreen.get())
    {
        listenerElement.addEventListener("touchend", ontouchend, passive);
        listenerElement.addEventListener("touchstart", ontouchstart, passive);
        listenerElement.addEventListener("touchmove", ontouchmove, passive);
    }

    listenerElement.addEventListener("mousemove", onmousemove, passive);
    listenerElement.addEventListener("mouseleave", onMouseLeave, passive);
    listenerElement.addEventListener("mousedown", onMouseDown, passive);
    listenerElement.addEventListener("mouseup", onMouseUp, passive);
    listenerElement.addEventListener("mouseenter", onMouseEnter, passive);
    listenerElement.addEventListener("contextmenu", onClickRight, passive);
    listenerElement.addEventListener("click", onmouseclick, passive);
}

//


};

Ops.Devices.Mouse.Mouse_v3.prototype = new CABLES.Op();
CABLES.OPS["6d1edbc0-088a-43d7-9156-918fb3d7f24b"]={f:Ops.Devices.Mouse.Mouse_v3,objName:"Ops.Devices.Mouse.Mouse_v3"};




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
// Ops.Math.Pi
// 
// **************************************************************

Ops.Math.Pi = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    multiply = op.inValueFloat("Multiply amount", 1.0),
    p = op.outNumber("Pi", Math.PI);

multiply.onChange = function ()
{
    p.setValue(Math.PI * multiply.get());
};


};

Ops.Math.Pi.prototype = new CABLES.Op();
CABLES.OPS["311e8179-9a7c-43de-9eb2-84577d702974"]={f:Ops.Math.Pi,objName:"Ops.Math.Pi"};




// **************************************************************
// 
// Ops.Html.Elements.ImageElement_v3
// 
// **************************************************************

Ops.Html.Elements.ImageElement_v3 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    filename = op.inUrl("File", [".jpg", ".png", ".webp", ".jpeg", ".avif", ".svg"]),
    inPos = op.inSwitch("Position", ["Absolute", "Static", "Relative", "Fixed"], "Absolute"),
    inClass = op.inString("Class"),
    inStyle = op.inStringEditor("Style", "", "inline-css"),
    inDisplay = op.inSwitch("CSS Display", ["not set", "none"], "not set"),
    inAlt = op.inString("Alt Text"),
    outImage = op.outObject("Image Element", null, "element"),
    outWidth = op.outNumber("Width"),
    outHeight = op.outNumber("Height");

let element = op.patch.getDocument().createElement("img");

op.patch.cgl.canvas.parentElement.appendChild(element);

op.onDelete = removeEle;

inClass.onChange = updateClass;

filename.onChange = filenameChanged;
inStyle.onChange =
    inAlt.onChange =
    inPos.onChange = updateStyle;

filenameChanged();
updateStyle();

element.onload = () =>
{
    if (element)
    {
        outWidth.set(element.width);
        outHeight.set(element.height);
    }
    else
    {
        outWidth.set(0);
        outHeight.set(0);
    }
};
function filenameChanged(cacheBuster)
{
    let url = filename.get();

    if (cacheBuster)url = CABLES.cacheBust(url);

    element.setAttribute("src", url);
    op.setUiAttrib({ "extendTitle": CABLES.basename(filename.get()) });
    element.setAttribute("crossOrigin", "anonymous");
    outImage.setRef(element);
}

op.onFileChanged = function (fn)
{
    if (filename.get() && filename.get().indexOf(fn) > -1)
    {
        filenameChanged(true);
    }
};

function removeEle()
{
    if (element)element.remove();
    element = null;
    outImage.set(element);
}

let oldClassesStr = "";

inDisplay.onChange = () =>
{
    if (inDisplay.get() == "not set") element.style.removeProperty("display");
    else element.style.display = inDisplay.get();
};

function removeClasses()
{
    if (!element) return;

    const classes = (inClass.get() || "").split(" ");
    for (let i = 0; i < classes.length; i++)
    {
        if (classes[i]) element.classList.remove(classes[i]);
    }
    oldClassesStr = "";
}

function updateClass()
{
    const classes = (inClass.get() || "").split(" ");
    const oldClasses = (oldClassesStr || "").split(" ");

    let found = false;

    for (let i = 0; i < oldClasses.length; i++)
    {
        if (
            oldClasses[i] &&
            classes.indexOf(oldClasses[i].trim()) == -1)
        {
            found = true;
            element.classList.remove(oldClasses[i]);
        }
    }

    for (let i = 0; i < classes.length; i++)
    {
        if (classes[i])
        {
            element.classList.add(classes[i].trim());
        }
    }

    oldClassesStr = inClass.get();
}

function updateStyle()
{
    element.setAttribute("style", inStyle.get());
    element.style.position = inPos.get().toLowerCase();
    outImage.setRef(element);
    element.classList.add("cablesEle");
    element.dataset.op = op.id;
    element.setAttribute("alt", inAlt.get());
    outImage.setRef(element);
}

//


};

Ops.Html.Elements.ImageElement_v3.prototype = new CABLES.Op();
CABLES.OPS["c760cd5e-0b4f-4c78-bd6c-c1dd87f4759e"]={f:Ops.Html.Elements.ImageElement_v3,objName:"Ops.Html.Elements.ImageElement_v3"};




// **************************************************************
// 
// Ops.Html.CSS.ElementCss3DTransform
// 
// **************************************************************

Ops.Html.CSS.ElementCss3DTransform = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    inEle = op.inObject("Element"),

    x = op.inFloat("X", 0),
    y = op.inFloat("Y", 0),
    z = op.inFloat("Z", 0),

    rotx = op.inFloat("Rot X", 0),
    roty = op.inFloat("Rot Y", 0),
    rotz = op.inFloat("Rot Z", 0),

    persp = op.inFloat("Perspective", 640),
    backface = op.inBool("Backface-Visibility", true),

    outEle = op.outObject("HTML Element", null, "element");

let ele = null;

inEle.onChange =
    inEle.onLinkChanged =
    backface.onChange =
    x.onChange = y.onChange = z.onChange =
    rotx.onChange = roty.onChange = rotz.onChange =
    persp.onChange = update;

op.onDelete = remove;

function remove()
{
    if (ele)
    {
        ele.style.removeProperty("perspective");
        ele.style.removeProperty("transform");
        ele.style.removeProperty("backface-visibility");
    }
}

function update()
{
    remove();
    ele = inEle.get();

    if (ele && ele.style)
    {
        let tr = "";

        tr += "translate3d(" + x.get() + "px," + y.get() + "px," + z.get() + "px) ";

        tr += "rotateX(" + rotx.get() + "deg)";
        tr += "rotateY(" + roty.get() + "deg)";
        tr += "rotateZ(" + rotz.get() + "deg)";

        ele.parentElement.style.perspective = persp.get() + "px";
        ele.style.transform = tr;
        ele.style["backface-visibility"] = backface.get() ? "visible" : "hidden";
    }
    else
    {
        setTimeout(update, 50);
    }

    if (outEle != inEle.get())
        outEle.setRef(inEle.get());
}


};

Ops.Html.CSS.ElementCss3DTransform.prototype = new CABLES.Op();
CABLES.OPS["ee4f2f09-17df-4d26-bda3-9db51cf78b9d"]={f:Ops.Html.CSS.ElementCss3DTransform,objName:"Ops.Html.CSS.ElementCss3DTransform"};




// **************************************************************
// 
// Ops.Html.Elements.DivElement_v3
// 
// **************************************************************

Ops.Html.Elements.DivElement_v3 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    inText = op.inString("Text", "Hello Div"),
    inId = op.inString("Id"),
    inClass = op.inString("Class"),
    inStyle = op.inStringEditor("Style", "position:absolute;\nz-index:100;", "inline-css"),
    inInteractive = op.inValueBool("Interactive", false),
    inVisible = op.inValueBool("Visible", true),
    inBreaks = op.inValueBool("Convert Line Breaks", false),
    inPropagation = op.inValueBool("Propagate Click-Events", true),
    outElement = op.outObject("DOM Element", null, "element"),
    outHover = op.outBoolNum("Hover"),
    outClicked = op.outTrigger("Clicked");

let listenerElement = null;
let oldStr = null;
let prevDisplay = "block";
let div = null;

const canvas = op.patch.cgl.canvas.parentElement;

createElement();

inClass.onChange = updateClass;
inBreaks.onChange = inText.onChange = updateText;
inStyle.onChange = updateStyle;
inInteractive.onChange = updateInteractive;
inVisible.onChange = updateVisibility;

updateText();
updateStyle();
warning();
updateInteractive();

op.onDelete = removeElement;

outElement.onLinkChanged = updateStyle;

inInteractive.onLinkChanged =
outClicked.onLinkChanged = () =>
{
    op.setUiError("interactiveProblem", null);
    if (outClicked.isLinked() && !inInteractive.get() && !inInteractive.isLinked())
        op.setUiError("interactiveProblem", "Interactive should be activated when linking clicked port");
};

function createElement()
{
    div = op.patch.getDocument().createElement("div");
    div.dataset.op = op.id;
    div.classList.add("cablesEle");

    if (inId.get()) div.id = inId.get();

    canvas.appendChild(div);
    outElement.setRef(div);
}

function removeElement()
{
    if (div) removeClasses();
    if (div && div.parentNode) div.parentNode.removeChild(div);
    oldStr = null;
    div = null;
}

function setCSSVisible(visible)
{
    if (!visible)
    {
        div.style.visibility = "hidden";
        prevDisplay = div.style.display || "inherit";
        div.style.display = "none";
    }
    else
    {
        // prevDisplay=div.style.display||'inherit';
        if (prevDisplay == "none") prevDisplay = "inherit";
        div.style.visibility = "visible";
        div.style.display = prevDisplay;
    }
}

function updateVisibility()
{
    setCSSVisible(inVisible.get());
}

function updateText()
{
    let str = inText.get();

    if (oldStr === str) return;
    oldStr = str;

    if (str && inBreaks.get()) str = str.replace(/(?:\r\n|\r|\n)/g, "<br>");

    if (div.innerHTML != str) div.innerHTML = str;

    outElement.setRef(div);
}

// inline css inisde div
function updateStyle()
{
    if (!div) return;
    // if (inStyle.get() != div.style)
    // {
    div.setAttribute("style", inStyle.get());
    updateVisibility();
    outElement.setRef(div);
    // }

    if (!div.parentElement) canvas.appendChild(div);

    warning();
}

let oldClassesStr = "";

function removeClasses()
{
    if (!div) return;

    const classes = (inClass.get() || "").split(" ");
    for (let i = 0; i < classes.length; i++)
    {
        if (classes[i]) div.classList.remove(classes[i]);
    }
    oldClassesStr = "";
}

function updateClass()
{
    const classes = (inClass.get() || "").split(" ");
    const oldClasses = (oldClassesStr || "").split(" ");

    let found = false;

    for (let i = 0; i < oldClasses.length; i++)
    {
        if (
            oldClasses[i] &&
            classes.indexOf(oldClasses[i].trim()) == -1)
        {
            found = true;
            div.classList.remove(oldClasses[i]);
        }
    }

    for (let i = 0; i < classes.length; i++)
    {
        if (classes[i])
        {
            div.classList.add(classes[i].trim());
        }
    }

    oldClassesStr = inClass.get();
    warning();
}

function onMouseEnter(e)
{
    outHover.set(true);
}

function onMouseLeave(e)
{
    outHover.set(false);
}

function onMouseClick(e)
{
    if (!inPropagation.get())
    {
        e.stopPropagation();
    }
    outClicked.trigger();
}

function updateInteractive()
{
    op.setUiError("interactiveProblem", null);

    removeListeners();
    if (inInteractive.get()) addListeners();
}

inId.onChange = function ()
{
    div.id = inId.get();
};

function removeListeners()
{
    if (listenerElement)
    {
        listenerElement.removeEventListener("pointerdown", onMouseClick);
        listenerElement.removeEventListener("pointerleave", onMouseLeave);
        listenerElement.removeEventListener("pointerenter", onMouseEnter);
        listenerElement = null;
    }
}

function addListeners()
{
    if (listenerElement)removeListeners();

    listenerElement = div;

    if (listenerElement)
    {
        listenerElement.addEventListener("pointerdown", onMouseClick);
        listenerElement.addEventListener("pointerleave", onMouseLeave);
        listenerElement.addEventListener("pointerenter", onMouseEnter);
    }
}

op.addEventListener("onEnabledChange", function (enabled)
{
    removeElement();
    if (enabled)
    {
        createElement();
        updateStyle();
        updateClass();
        updateText();
        updateInteractive();
    }
    // if(enabled) updateVisibility();
    // else setCSSVisible(false);
});

function warning()
{
    if (inClass.get() && inStyle.get())
    {
        op.setUiError("error", "Element uses external and inline CSS", 1);
    }
    else
    {
        op.setUiError("error", null);
    }
}


};

Ops.Html.Elements.DivElement_v3.prototype = new CABLES.Op();
CABLES.OPS["d55d398c-e68e-486b-b0ce-d9c4bdf7df05"]={f:Ops.Html.Elements.DivElement_v3,objName:"Ops.Html.Elements.DivElement_v3"};




// **************************************************************
// 
// Ops.Html.ElementChilds_v2
// 
// **************************************************************

Ops.Html.ElementChilds_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    parentPort = op.inObject("Parent", null, "element"),
    outParent = op.outObject("Parent Out", null, "element");

const canvas = op.patch.cgl.canvas.parentElement;

op.toWorkPortsNeedToBeLinked(parentPort);

const inPorts = [];
for (let i = 0; i < 10; i++)
{
    const p = op.inObject("Child " + (i + 1), null, "element");
    inPorts.push(p);
    p.onChange = () =>
    {
        rebuild();
        if (!p.get())
        {
            const selector = "[data-cables-child-id='" + op.id + "_" + i + "']";
            const currentChild = canvas.querySelector(selector);
            if (currentChild) delete currentChild.dataset.cablesChildId;
        }
    };
    p.onLinkChanged = () =>
    {
        if (!p.isLinked())
        {
            const selector = "[data-cables-child-id='" + op.id + "_" + i + "']";
            const currentChild = canvas.querySelector(selector);
            if (currentChild) currentChild.remove();
        }
    };
}

parentPort.onLinkChanged = () =>
{
    if (!parentPort.isLinked())
    {
        cleanUp();
    }
    else
    {
        rebuild();
    }
};

outParent.onLinkChanged = () =>
{
    if (!outParent.isLinked())
    {
        const parentDiv = parentPort.get();
        if (parentDiv && parentDiv.dataset.op)
        {
            const inDoc = canvas.querySelector("[data-op=' " + parentDiv.dataset.op + " ']");
            if (!inDoc)
            {
                canvas.appendChild(parentDiv);
            }
        }
    }
};

parentPort.onChange = () =>
{
    if (!parentPort.get())
    {
        cleanUp();
    }
    rebuild();
};

function cleanUp()
{
    for (let i = 0; i < inPorts.length; i++)
    {
        const selector = "[data-cables-child-id='" + op.id + "_" + i + "']";
        const currentChild = canvas.querySelector(selector);
        if (currentChild && currentChild.parentNode)
        {
            currentChild.remove();
        }
    }
    outParent.set(null);
}

function rebuild()
{
    const parent = parentPort.get();
    if (!parent)
    {
        outParent.set(null);
        return;
    }

    if (!parent.querySelector)
    {
        outParent.set(null);
        return;
    }

    op.setUiError("id", null);
    try
    {
        op.setUiError("multilinks", null);

        for (let i = 0; i < inPorts.length; i++)
        {
            const selector = "[data-cables-child-id='" + op.id + "_" + i + "']";
            const currentChild = parent.querySelector(selector);
            if (currentChild)
            {
                currentChild.remove();
            }
            const p = inPorts[i].get();
            if (inPorts[i].links.length > 1)
            {
                op.setUiError("multilinks", "Every port should only have not more then one connection");
            }
            if (p && parent)
            {
                if (!p.dataset)console.warn("[elementChilds] p no dataset ?!");
                else p.dataset.cablesChildId = op.id + "_" + i;
                parent.appendChild(p);
            }
        }
    }
    catch (e)
    {
        op.setUiError("id", e.message);
    }
    outParent.setRef(parent);
}


};

Ops.Html.ElementChilds_v2.prototype = new CABLES.Op();
CABLES.OPS["ad7eea9a-f4af-4ab7-bb70-922242529681"]={f:Ops.Html.ElementChilds_v2,objName:"Ops.Html.ElementChilds_v2"};




// **************************************************************
// 
// Ops.Gl.MeshInstancer_v4
// 
// **************************************************************

Ops.Gl.MeshInstancer_v4 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={"billboard_vert":"\n#ifdef BILLBOARDING\n\n    modelViewMatrix[0][0] = 1.0;\n    modelViewMatrix[0][1] = 0.0;\n    modelViewMatrix[0][2] = 0.0;\n\n    #ifndef BILLBOARDING_CYLINDRIC\n        modelViewMatrix[1][0] = 0.0;\n        modelViewMatrix[1][1] = 1.0;\n        modelViewMatrix[1][2] = 0.0;\n    #endif\n\n    modelViewMatrix[2][0] = 0.0;\n    modelViewMatrix[2][1] = 0.0;\n    modelViewMatrix[2][2] = 1.0;\n\n#endif","instancer_body_frag":"#define INSTANCING\n#ifdef COLORIZE_INSTANCES\n    #ifdef BLEND_MODE_MULTIPLY\n        col.rgb *= frag_instColor.rgb;\n        col.a *= frag_instColor.a;\n    #endif\n\n    #ifdef BLEND_MODE_ADD\n        col.rgb += frag_instColor.rgb;\n        col.a += frag_instColor.a;\n    #endif\n\n    #ifdef BLEND_MODE_NONE\n        col.rgb = frag_instColor.rgb;\n        col.a = frag_instColor.a;\n    #endif\n#endif\n","instancer_body_vert":"\n\n#ifdef HAS_TEXCOORDS\ntexCoord=(texCoord*instTexCoords.zw)+instTexCoords.xy;\n#endif\n\nmMatrix*=instMat;\npos.xyz*=MOD_scale;\n\n#ifdef HAS_COLORS\nfrag_instColor=instColor;\n#endif\n#ifndef HAS_COLORS\nfrag_instColor=vec4(1.0);\n#endif\n\n\nfrag_instIndex=instanceIndex;\n\n","instancer_head_frag":"IN vec4 frag_instColor;\n\n#ifdef WEBGL2\n    flat IN float frag_instIndex;\n#endif\n#ifdef WEBGL1\n    IN float frag_instIndex;\n#endif\n","instancer_head_vert":"\nIN vec4 instColor;\nIN mat4 instMat;\nIN vec4 instTexCoords;\nIN float instanceIndex;\nOUT mat4 instModelMat;\nOUT vec4 frag_instColor;\n\n#ifdef WEBGL2\n    flat OUT float frag_instIndex;\n#endif\n#ifdef WEBGL1\n    OUT float frag_instIndex;\n#endif\n\n\n\n#define INSTANCING\n\n",};
const
    exe = op.inTrigger("exe"),
    geom = op.inObject("geom", null, "geometry"),
    inScale = op.inValue("Scale", 1),
    doLimit = op.inValueBool("Limit Instances", false),
    inLimit = op.inValueInt("Limit", 100),
    inTranslates = op.inArray("positions", 3),
    inScales = op.inArray("Scale Array", 3),
    inRot = op.inArray("Rotations", 3),
    inRotMeth = op.inSwitch("Rotation Type", ["Euler", "Quaternions", "Normals"], "Euler"),

    inBillboarding = op.inSwitch("Billboarding", ["Off", "Spherical", "Cylindrical"], "Off"),

    inBlendMode = op.inSwitch("Material blend mode", ["Multiply", "Add", "Normal"], "Multiply"),
    inColor = op.inArray("Colors", 4),
    inTexCoords = op.inArray("TexCoords", 4),
    outTrigger = op.outTrigger("Trigger Out"),
    outNum = op.outNumber("Num");

op.setPortGroup("Limit Number of Instances", [inLimit, doLimit]);
op.setPortGroup("Parameters", [inScales, inRot, inTranslates, inRotMeth]);
op.toWorkPortsNeedToBeLinked(geom);
op.toWorkPortsNeedToBeLinked(exe);

geom.ignoreValueSerialize = true;

const cgl = op.patch.cgl;
const m = mat4.create();
let
    matrixArray = new Float32Array(1),
    instColorArray = new Float32Array(1),
    instTexcoordArray = new Float32Array(1),
    mesh = null,
    recalc = true,
    num = 0,
    arrayChangedColor = true,
    arrayChangedTexcoords = true,
    arrayChangedTrans = true;

const mod = new CGL.ShaderModifier(cgl, op.name, { "opId": op.id });
mod.addModule({
    "name": "MODULE_VERTEX_POSITION",
    "title": op.name,
    "priority": -2,
    "srcHeadVert": attachments.instancer_head_vert,
    "srcBodyVert": attachments.instancer_body_vert
});

mod.addModule({
    "name": "MODULE_VERTEX_MODELVIEW",
    "title": op.name + "_billboard",
    "srcBodyVert": attachments.billboard_vert
});

mod.addModule({
    "name": "MODULE_COLOR",
    "priority": -2,
    "title": op.name,
    "srcHeadFrag": attachments.instancer_head_frag,
    "srcBodyFrag": attachments.instancer_body_frag,
});

mod.addUniformVert("f", "MOD_scale", inScale);

let needsUpdateDefines = true;

inBlendMode.onChange = () => { needsUpdateDefines = true; };

doLimit.onChange = updateLimit;
exe.onTriggered = doRender;
exe.onLinkChanged = function ()
{
    if (!exe.isLinked()) removeModule();
};

updateLimit();

inRot.onChange =
inScales.onChange =
inTranslates.onChange =
inRotMeth.onChange =
    function ()
    {
        arrayChangedTrans = true;
        recalc = true;
    };

inBillboarding.onChange =
inTexCoords.onChange = function ()
{
    arrayChangedTexcoords = true;
    recalc = true;
    needsUpdateDefines = true;
};

inColor.onChange = function ()
{
    arrayChangedColor = true;
    recalc = true;
    needsUpdateDefines = true;
};

function reset()
{
    arrayChangedColor = true,
    arrayChangedTrans = true;
    recalc = true;
}

function updateDefines()
{
    mod.toggleDefine("BILLBOARDING", inBillboarding.get() != "Off");
    mod.toggleDefine("BILLBOARDING_CYLINDRIC", inBillboarding.get() == "Cylindrical");

    mod.toggleDefine("COLORIZE_INSTANCES", inColor.get());
    mod.toggleDefine("TEXCOORDS_INSTANCES", inTexCoords.get());
    mod.toggleDefine("BLEND_MODE_MULTIPLY", inBlendMode.get() === "Multiply");
    mod.toggleDefine("BLEND_MODE_ADD", inBlendMode.get() === "Add");
    mod.toggleDefine("BLEND_MODE_NONE", inBlendMode.get() === "Normal");
    needsUpdateDefines = false;
}

geom.onChange = function ()
{
    if (mesh)mesh.dispose();
    if (!geom.get())
    {
        mesh = null;
        return;
    }

    mesh = new CGL.Mesh(cgl, geom.get());
    reset();
};

function removeModule()
{

}

function setupArray()
{
    if (!mesh) return;

    let transforms = inTranslates.get();
    if (!transforms) transforms = [0, 0, 0];

    num = Math.floor(transforms.length / 3);

    if (needsUpdateDefines)updateDefines();

    const colArr = inColor.get();
    const tcArr = inTexCoords.get();
    const scales = inScales.get();
    const useQuats = inRotMeth.get() == "Quaternions";
    const useEuler = inRotMeth.get() == "Euler";
    const useNormals = inRotMeth.get() == "Normals";

    let stride = 3;
    if (useQuats)stride = 4;
    inRot.setUiAttribs({ "stride": stride });

    if (scales && scales.length != transforms.length) op.setUiError("lengthScales", "Scales array has wrong length");
    else op.setUiError("lengthScales", null);

    if (matrixArray.length != num * 16) matrixArray = new Float32Array(num * 16);
    if (instColorArray.length != num * 4)
    {
        arrayChangedColor = true;
        instColorArray = new Float32Array(num * 4);
    }
    if (instTexcoordArray.length != num * 4)
    {
        arrayChangedTexcoords = true;
        instTexcoordArray = new Float32Array(num * 4);
    }

    const rotArr = inRot.get();

    for (let i = 0; i < num; i++)
    {
        mat4.identity(m);

        mat4.translate(m, m, [
            transforms[i * 3],
            transforms[i * 3 + 1],
            transforms[i * 3 + 2]
        ]);

        if (rotArr)
        {
            if (useQuats)
            {
                const mq = mat4.create();
                const q = [rotArr[i * 4 + 0], rotArr[i * 4 + 1], rotArr[i * 4 + 2], rotArr[i * 4 + 3]];
                quat.normalize(q, q);
                mat4.fromQuat(mq, q);
                mat4.mul(m, m, mq);
            }
            else
            if (useNormals)
            {
                const n = [rotArr[i * 3 + 0], rotArr[i * 3 + 1], rotArr[i * 3 + 2]];
                const up = [1, 0, 0];
                const v = vec3.create();

                vec3.cross(v, up, n);
                vec3.normalize(v, v);

                const angle = Math.acos(vec3.dot(up, n));
                const q = quat.create();

                quat.setAxisAngle(q, v, angle);
                quat.normalize(q, q);

                const mq = mat4.create();

                mat4.fromQuat(mq, q);
                mat4.mul(m, m, mq);
            }
            if (useEuler)
            {
                mat4.rotateX(m, m, rotArr[i * 3 + 0] * CGL.DEG2RAD);
                mat4.rotateY(m, m, rotArr[i * 3 + 1] * CGL.DEG2RAD);
                mat4.rotateZ(m, m, rotArr[i * 3 + 2] * CGL.DEG2RAD);
            }
        }

        if (arrayChangedColor && colArr)
        {
            instColorArray[i * 4 + 0] = colArr[i * 4 + 0];
            instColorArray[i * 4 + 1] = colArr[i * 4 + 1];
            instColorArray[i * 4 + 2] = colArr[i * 4 + 2];
            instColorArray[i * 4 + 3] = colArr[i * 4 + 3];
        }

        if (arrayChangedTexcoords && tcArr)
        {
            instTexcoordArray[i * 4 + 0] = tcArr[i * 4 + 0];
            instTexcoordArray[i * 4 + 1] = tcArr[i * 4 + 1];
            instTexcoordArray[i * 4 + 2] = tcArr[i * 4 + 2];
            instTexcoordArray[i * 4 + 3] = tcArr[i * 4 + 3];
        }

        if (scales && scales.length > i) mat4.scale(m, m, [scales[i * 3], scales[i * 3 + 1], scales[i * 3 + 2]]);
        else mat4.scale(m, m, [1, 1, 1]);

        for (let a = 0; a < 16; a++) matrixArray[i * 16 + a] = m[a];
    }

    // mesh.numInstances = num;
    mesh.setNumInstances(num);

    if (arrayChangedTrans) mesh.addAttribute("instMat", matrixArray, 16);
    if (arrayChangedColor) mesh.addAttribute("instColor", instColorArray, 4, { "instanced": true });
    if (arrayChangedTexcoords) mesh.addAttribute("instTexCoords", instTexcoordArray, 4, { "instanced": true });

    mod.toggleDefine("HAS_TEXCOORDS", tcArr);
    mod.toggleDefine("HAS_COLORS", colArr);

    arrayChangedColor = false;
    recalc = false;
}

function updateLimit()
{
    inLimit.setUiAttribs({ "greyout": !doLimit.get() });
}

function doRender()
{
    if (!mesh) return;
    if (recalc) setupArray();

    mod.bind();

    if (doLimit.get()) mesh.setNumInstances(Math.min(num, inLimit.get()));
    else mesh.setNumInstances(num);

    outNum.set(mesh.numInstances);

    if (mesh.numInstances > 0) mesh.render(cgl.getShader());

    outTrigger.trigger();

    mod.unbind();
}


};

Ops.Gl.MeshInstancer_v4.prototype = new CABLES.Op();
CABLES.OPS["cb58f461-a0bd-4159-a3cb-5e396198b4e9"]={f:Ops.Gl.MeshInstancer_v4,objName:"Ops.Gl.MeshInstancer_v4"};




// **************************************************************
// 
// Ops.Gl.Meshes.Rectangle_v4
// 
// **************************************************************

Ops.Gl.Meshes.Rectangle_v4 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    render = op.inTrigger("render"),
    doRender = op.inValueBool("Render Mesh", true),
    width = op.inValue("width", 1),
    height = op.inValue("height", 1),
    pivotX = op.inSwitch("pivot x", ["left", "center", "right"], "center"),
    pivotY = op.inSwitch("pivot y", ["top", "center", "bottom"], "center"),
    axis = op.inSwitch("axis", ["xy", "xz"], "xy"),
    flipTcX = op.inBool("Flip TexCoord X", false),
    flipTcY = op.inBool("Flip TexCoord Y", true),
    nColumns = op.inValueInt("num columns", 1),
    nRows = op.inValueInt("num rows", 1),
    trigger = op.outTrigger("trigger"),
    geomOut = op.outObject("geometry", null, "geometry");

geomOut.ignoreValueSerialize = true;

// const cgl = op.patch.cg || op.patch.cgl;
const geom = new CGL.Geometry("rectangle");

doRender.setUiAttribs({ "title": "Render" });
render.setUiAttribs({ "title": "Trigger" });
trigger.setUiAttribs({ "title": "Next" });
op.setPortGroup("Pivot", [pivotX, pivotY, axis]);
op.setPortGroup("Size", [width, height]);
op.setPortGroup("Structure", [nColumns, nRows]);
op.toWorkPortsNeedToBeLinked(render);
op.toWorkShouldNotBeChild("Ops.Gl.TextureEffects.ImageCompose", CABLES.OP_PORT_TYPE_TRIGGER);

const AXIS_XY = 0;
const AXIS_XZ = 1;

let curAxis = AXIS_XY;
let mesh = null;
let needsRebuild = true;
let doScale = true;

const vScale = vec3.create();
vec3.set(vScale, 1, 1, 1);

axis.onChange =
    pivotX.onChange =
    pivotY.onChange =
    flipTcX.onChange =
    flipTcY.onChange =
    nRows.onChange =
    nColumns.onChange = rebuildLater;
updateScale();

width.onChange =
    height.onChange =
    () =>
    {
        if (doScale) updateScale();
        else needsRebuild = true;
    };

function updateScale()
{
    if (curAxis === AXIS_XY) vec3.set(vScale, width.get(), height.get(), 1);
    if (curAxis === AXIS_XZ) vec3.set(vScale, width.get(), 1, height.get());
}

geomOut.onLinkChanged = () =>
{
    doScale = !geomOut.isLinked();
    updateScale();
    needsRebuild = true;
};

function rebuildLater()
{
    needsRebuild = true;
}

render.onTriggered = () =>
{
    if (needsRebuild) rebuild();
    const cg = op.patch.cg;
    if (cg && mesh && doRender.get())
    {
        if (doScale)
        {
            cg.pushModelMatrix();
            mat4.scale(cg.mMatrix, cg.mMatrix, vScale);
        }

        mesh.render(cg.getShader());

        if (doScale) cg.popModelMatrix();
    }

    trigger.trigger();
};

op.onDelete = () =>
{
    if (mesh) mesh.dispose();
    rebuildLater();
};

function rebuild()
{
    if (axis.get() == "xy") curAxis = AXIS_XY;
    if (axis.get() == "xz") curAxis = AXIS_XZ;

    updateScale();
    let w = width.get();
    let h = height.get();

    if (doScale) w = h = 1;

    let x = 0;
    let y = 0;

    if (pivotX.get() == "center") x = 0;
    else if (pivotX.get() == "right") x = -w / 2;
    else if (pivotX.get() == "left") x = +w / 2;

    if (pivotY.get() == "center") y = 0;
    else if (pivotY.get() == "top") y = -h / 2;
    else if (pivotY.get() == "bottom") y = +h / 2;

    const numRows = Math.max(1, Math.round(nRows.get()));
    const numColumns = Math.max(1, Math.round(nColumns.get()));

    const stepColumn = w / numColumns;
    const stepRow = h / numRows;

    const indices = [];
    const tc = new Float32Array((numColumns + 1) * (numRows + 1) * 2);
    const verts = new Float32Array((numColumns + 1) * (numRows + 1) * 3);
    const norms = new Float32Array((numColumns + 1) * (numRows + 1) * 3);
    const tangents = new Float32Array((numColumns + 1) * (numRows + 1) * 3);
    const biTangents = new Float32Array((numColumns + 1) * (numRows + 1) * 3);

    let idxTc = 0;
    let idxVert = 0;
    let idxNorms = 0;
    let idxTangent = 0;
    let idxBiTangent = 0;

    for (let r = 0; r <= numRows; r++)
    {
        for (let c = 0; c <= numColumns; c++)
        {
            verts[idxVert++] = c * stepColumn - w / 2 + x;
            if (curAxis == AXIS_XZ) verts[idxVert++] = 0;
            verts[idxVert++] = r * stepRow - h / 2 + y;

            if (curAxis == AXIS_XY)verts[idxVert++] = 0;

            tc[idxTc++] = c / numColumns;
            tc[idxTc++] = r / numRows;

            if (curAxis == AXIS_XY) // default
            {
                norms[idxNorms++] = 0;
                norms[idxNorms++] = 0;
                norms[idxNorms++] = 1;

                tangents[idxTangent++] = 1;
                tangents[idxTangent++] = 0;
                tangents[idxTangent++] = 0;

                biTangents[idxBiTangent++] = 0;
                biTangents[idxBiTangent++] = 1;
                biTangents[idxBiTangent++] = 0;
            }
            else if (curAxis == AXIS_XZ)
            {
                norms[idxNorms++] = 0;
                norms[idxNorms++] = 1;
                norms[idxNorms++] = 0;

                biTangents[idxBiTangent++] = 0;
                biTangents[idxBiTangent++] = 0;
                biTangents[idxBiTangent++] = 1;
            }
        }
    }

    indices.length = numColumns * numRows * 6;
    let idx = 0;

    for (let c = 0; c < numColumns; c++)
    {
        for (let r = 0; r < numRows; r++)
        {
            const ind = c + (numColumns + 1) * r;
            const v1 = ind;
            const v2 = ind + 1;
            const v3 = ind + numColumns + 1;
            const v4 = ind + 1 + numColumns + 1;

            if (curAxis == AXIS_XY) // default
            {
                indices[idx++] = v1;
                indices[idx++] = v2;
                indices[idx++] = v3;

                indices[idx++] = v3;
                indices[idx++] = v2;
                indices[idx++] = v4;
            }
            else
            if (curAxis == AXIS_XZ)
            {
                indices[idx++] = v1;
                indices[idx++] = v3;
                indices[idx++] = v2;

                indices[idx++] = v2;
                indices[idx++] = v3;
                indices[idx++] = v4;
            }
        }
    }

    if (flipTcY.get()) for (let i = 0; i < tc.length; i += 2)tc[i + 1] = 1.0 - tc[i + 1];
    if (flipTcX.get()) for (let i = 0; i < tc.length; i += 2)tc[i] = 1.0 - tc[i];

    geom.clear();
    geom.vertices = verts;
    geom.texCoords = tc;
    geom.verticesIndices = indices;
    geom.vertexNormals = norms;
    geom.tangents = tangents;
    geom.biTangents = biTangents;

    if (op.patch.cg)
        if (!mesh) mesh = op.patch.cg.createMesh(geom, { "opId": op.id });
        else mesh.setGeom(geom);

    geomOut.setRef(geom);
    needsRebuild = false;
}


};

Ops.Gl.Meshes.Rectangle_v4.prototype = new CABLES.Op();
CABLES.OPS["cc8c3ede-7103-410b-849f-a645793cab39"]={f:Ops.Gl.Meshes.Rectangle_v4,objName:"Ops.Gl.Meshes.Rectangle_v4"};




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
// Ops.Gl.Shader.BasicMaterial_v3
// 
// **************************************************************

Ops.Gl.Shader.BasicMaterial_v3 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={"basicmaterial_frag":"{{MODULES_HEAD}}\n\nIN vec2 texCoord;\n\n#ifdef VERTEX_COLORS\nIN vec4 vertCol;\n#endif\n\n#ifdef HAS_TEXTURES\n    IN vec2 texCoordOrig;\n    #ifdef HAS_TEXTURE_DIFFUSE\n        UNI sampler2D tex;\n    #endif\n    #ifdef HAS_TEXTURE_OPACITY\n        UNI sampler2D texOpacity;\n   #endif\n#endif\n\n\n\nvoid main()\n{\n    {{MODULE_BEGIN_FRAG}}\n    vec4 col=color;\n\n\n    #ifdef HAS_TEXTURES\n        vec2 uv=texCoord;\n\n        #ifdef CROP_TEXCOORDS\n            if(uv.x<0.0 || uv.x>1.0 || uv.y<0.0 || uv.y>1.0) discard;\n        #endif\n\n        #ifdef HAS_TEXTURE_DIFFUSE\n            col=texture(tex,uv);\n\n            #ifdef COLORIZE_TEXTURE\n                col.r*=color.r;\n                col.g*=color.g;\n                col.b*=color.b;\n            #endif\n        #endif\n        col.a*=color.a;\n        #ifdef HAS_TEXTURE_OPACITY\n            #ifdef TRANSFORMALPHATEXCOORDS\n                uv=texCoordOrig;\n            #endif\n            #ifdef ALPHA_MASK_IR\n                col.a*=1.0-texture(texOpacity,uv).r;\n            #endif\n            #ifdef ALPHA_MASK_IALPHA\n                col.a*=1.0-texture(texOpacity,uv).a;\n            #endif\n            #ifdef ALPHA_MASK_ALPHA\n                col.a*=texture(texOpacity,uv).a;\n            #endif\n            #ifdef ALPHA_MASK_LUMI\n                col.a*=dot(vec3(0.2126,0.7152,0.0722), texture(texOpacity,uv).rgb);\n            #endif\n            #ifdef ALPHA_MASK_R\n                col.a*=texture(texOpacity,uv).r;\n            #endif\n            #ifdef ALPHA_MASK_G\n                col.a*=texture(texOpacity,uv).g;\n            #endif\n            #ifdef ALPHA_MASK_B\n                col.a*=texture(texOpacity,uv).b;\n            #endif\n            // #endif\n        #endif\n    #endif\n\n    {{MODULE_COLOR}}\n\n    #ifdef DISCARDTRANS\n        if(col.a<0.2) discard;\n    #endif\n\n    #ifdef VERTEX_COLORS\n        col*=vertCol;\n    #endif\n\n    outColor = col;\n}\n","basicmaterial_vert":"\n{{MODULES_HEAD}}\n\nOUT vec2 texCoord;\nOUT vec2 texCoordOrig;\n\nUNI mat4 projMatrix;\nUNI mat4 modelMatrix;\nUNI mat4 viewMatrix;\n\n#ifdef HAS_TEXTURES\n    UNI float diffuseRepeatX;\n    UNI float diffuseRepeatY;\n    UNI float texOffsetX;\n    UNI float texOffsetY;\n#endif\n\n#ifdef VERTEX_COLORS\n    in vec4 attrVertColor;\n    out vec4 vertCol;\n\n#endif\n\n\nvoid main()\n{\n    mat4 mMatrix=modelMatrix;\n    mat4 modelViewMatrix;\n\n    norm=attrVertNormal;\n    texCoordOrig=attrTexCoord;\n    texCoord=attrTexCoord;\n    #ifdef HAS_TEXTURES\n        texCoord.x=texCoord.x*diffuseRepeatX+texOffsetX;\n        texCoord.y=(1.0-texCoord.y)*diffuseRepeatY+texOffsetY;\n    #endif\n\n    #ifdef VERTEX_COLORS\n        vertCol=attrVertColor;\n    #endif\n\n    vec4 pos = vec4(vPosition, 1.0);\n\n    #ifdef BILLBOARD\n       vec3 position=vPosition;\n       modelViewMatrix=viewMatrix*modelMatrix;\n\n       gl_Position = projMatrix * modelViewMatrix * vec4((\n           position.x * vec3(\n               modelViewMatrix[0][0],\n               modelViewMatrix[1][0],\n               modelViewMatrix[2][0] ) +\n           position.y * vec3(\n               modelViewMatrix[0][1],\n               modelViewMatrix[1][1],\n               modelViewMatrix[2][1]) ), 1.0);\n    #endif\n\n    {{MODULE_VERTEX_POSITION}}\n\n    #ifndef BILLBOARD\n        modelViewMatrix=viewMatrix * mMatrix;\n\n        {{MODULE_VERTEX_MODELVIEW}}\n\n    #endif\n\n    // mat4 modelViewMatrix=viewMatrix*mMatrix;\n\n    #ifndef BILLBOARD\n        // gl_Position = projMatrix * viewMatrix * modelMatrix * pos;\n        gl_Position = projMatrix * modelViewMatrix * pos;\n    #endif\n}\n",};
const render = op.inTrigger("render");
const trigger = op.outTrigger("trigger");
const shaderOut = op.outObject("shader", null, "shader");

shaderOut.ignoreValueSerialize = true;

op.toWorkPortsNeedToBeLinked(render);
op.toWorkShouldNotBeChild("Ops.Gl.TextureEffects.ImageCompose", CABLES.OP_PORT_TYPE_FUNCTION);

const cgl = op.patch.cgl;
const shader = new CGL.Shader(cgl, "basicmaterialnew", this);
shader.addAttribute({ "type": "vec3", "name": "vPosition" });
shader.addAttribute({ "type": "vec2", "name": "attrTexCoord" });
shader.addAttribute({ "type": "vec3", "name": "attrVertNormal", "nameFrag": "norm" });
shader.addAttribute({ "type": "float", "name": "attrVertIndex" });

shader.setModules(["MODULE_VERTEX_POSITION", "MODULE_COLOR", "MODULE_BEGIN_FRAG", "MODULE_VERTEX_MODELVIEW"]);

shader.setSource(attachments.basicmaterial_vert, attachments.basicmaterial_frag);

shaderOut.setRef(shader);

render.onTriggered = doRender;

// rgba colors
const r = op.inValueSlider("r", Math.random());
const g = op.inValueSlider("g", Math.random());
const b = op.inValueSlider("b", Math.random());
const a = op.inValueSlider("a", 1);
r.setUiAttribs({ "colorPick": true });

// const uniColor=new CGL.Uniform(shader,'4f','color',r,g,b,a);
const colUni = shader.addUniformFrag("4f", "color", r, g, b, a);

shader.uniformColorDiffuse = colUni;

// diffuse outTexture

const diffuseTexture = op.inTexture("texture");
let diffuseTextureUniform = null;
diffuseTexture.onChange = updateDiffuseTexture;

const colorizeTexture = op.inValueBool("colorizeTexture", false);
const vertexColors = op.inValueBool("Vertex Colors", false);

// opacity texture
const textureOpacity = op.inTexture("textureOpacity");
let textureOpacityUniform = null;

const alphaMaskSource = op.inSwitch("Alpha Mask Source", ["Luminance", "R", "G", "B", "A", "1-A", "1-R"], "Luminance");
alphaMaskSource.setUiAttribs({ "greyout": true });
textureOpacity.onChange = updateOpacity;

const texCoordAlpha = op.inValueBool("Opacity TexCoords Transform", false);
const discardTransPxl = op.inValueBool("Discard Transparent Pixels");

// texture coords
const
    diffuseRepeatX = op.inValue("diffuseRepeatX", 1),
    diffuseRepeatY = op.inValue("diffuseRepeatY", 1),
    diffuseOffsetX = op.inValue("Tex Offset X", 0),
    diffuseOffsetY = op.inValue("Tex Offset Y", 0),
    cropRepeat = op.inBool("Crop TexCoords", false);

shader.addUniformFrag("f", "diffuseRepeatX", diffuseRepeatX);
shader.addUniformFrag("f", "diffuseRepeatY", diffuseRepeatY);
shader.addUniformFrag("f", "texOffsetX", diffuseOffsetX);
shader.addUniformFrag("f", "texOffsetY", diffuseOffsetY);

const doBillboard = op.inValueBool("billboard", false);

alphaMaskSource.onChange =
    doBillboard.onChange =
    discardTransPxl.onChange =
    texCoordAlpha.onChange =
    cropRepeat.onChange =
    vertexColors.onChange =
    colorizeTexture.onChange = updateDefines;

op.setPortGroup("Color", [r, g, b, a]);
op.setPortGroup("Color Texture", [diffuseTexture, vertexColors, colorizeTexture]);
op.setPortGroup("Opacity", [textureOpacity, alphaMaskSource, discardTransPxl, texCoordAlpha]);
op.setPortGroup("Texture Transform", [diffuseRepeatX, diffuseRepeatY, diffuseOffsetX, diffuseOffsetY, cropRepeat]);

updateOpacity();
updateDiffuseTexture();

op.preRender = function ()
{
    shader.bind();
    doRender();
};

function doRender()
{
    if (!shader) return;

    cgl.pushShader(shader);
    shader.popTextures();

    if (diffuseTextureUniform && diffuseTexture.get()) shader.pushTexture(diffuseTextureUniform, diffuseTexture.get());
    if (textureOpacityUniform && textureOpacity.get()) shader.pushTexture(textureOpacityUniform, textureOpacity.get());

    trigger.trigger();

    cgl.popShader();
}

function updateOpacity()
{
    if (textureOpacity.get())
    {
        if (textureOpacityUniform !== null) return;
        shader.removeUniform("texOpacity");
        shader.define("HAS_TEXTURE_OPACITY");
        if (!textureOpacityUniform)textureOpacityUniform = new CGL.Uniform(shader, "t", "texOpacity");
    }
    else
    {
        shader.removeUniform("texOpacity");
        shader.removeDefine("HAS_TEXTURE_OPACITY");
        textureOpacityUniform = null;
    }

    updateDefines();
}

function updateDiffuseTexture()
{
    if (diffuseTexture.get())
    {
        if (!shader.hasDefine("HAS_TEXTURE_DIFFUSE"))shader.define("HAS_TEXTURE_DIFFUSE");
        if (!diffuseTextureUniform)diffuseTextureUniform = new CGL.Uniform(shader, "t", "texDiffuse");
    }
    else
    {
        shader.removeUniform("texDiffuse");
        shader.removeDefine("HAS_TEXTURE_DIFFUSE");
        diffuseTextureUniform = null;
    }
    updateUi();
}

function updateUi()
{
    const hasTexture = diffuseTexture.isLinked() || textureOpacity.isLinked();
    diffuseRepeatX.setUiAttribs({ "greyout": !hasTexture });
    diffuseRepeatY.setUiAttribs({ "greyout": !hasTexture });
    diffuseOffsetX.setUiAttribs({ "greyout": !hasTexture });
    diffuseOffsetY.setUiAttribs({ "greyout": !hasTexture });
    colorizeTexture.setUiAttribs({ "greyout": !hasTexture });

    alphaMaskSource.setUiAttribs({ "greyout": !textureOpacity.get() });
    texCoordAlpha.setUiAttribs({ "greyout": !textureOpacity.get() });

    let notUsingColor = true;
    notUsingColor = diffuseTexture.get() && !colorizeTexture.get();
    r.setUiAttribs({ "greyout": notUsingColor });
    g.setUiAttribs({ "greyout": notUsingColor });
    b.setUiAttribs({ "greyout": notUsingColor });
}

function updateDefines()
{
    shader.toggleDefine("VERTEX_COLORS", vertexColors.get());
    shader.toggleDefine("CROP_TEXCOORDS", cropRepeat.get());
    shader.toggleDefine("COLORIZE_TEXTURE", colorizeTexture.get());
    shader.toggleDefine("TRANSFORMALPHATEXCOORDS", texCoordAlpha.get());
    shader.toggleDefine("DISCARDTRANS", discardTransPxl.get());
    shader.toggleDefine("BILLBOARD", doBillboard.get());

    shader.toggleDefine("ALPHA_MASK_ALPHA", alphaMaskSource.get() == "A");
    shader.toggleDefine("ALPHA_MASK_IALPHA", alphaMaskSource.get() == "1-A");
    shader.toggleDefine("ALPHA_MASK_IR", alphaMaskSource.get() == "1-R");
    shader.toggleDefine("ALPHA_MASK_LUMI", alphaMaskSource.get() == "Luminance");
    shader.toggleDefine("ALPHA_MASK_R", alphaMaskSource.get() == "R");
    shader.toggleDefine("ALPHA_MASK_G", alphaMaskSource.get() == "G");
    shader.toggleDefine("ALPHA_MASK_B", alphaMaskSource.get() == "B");
    updateUi();
}


};

Ops.Gl.Shader.BasicMaterial_v3.prototype = new CABLES.Op();
CABLES.OPS["ec55d252-3843-41b1-b731-0482dbd9e72b"]={f:Ops.Gl.Shader.BasicMaterial_v3,objName:"Ops.Gl.Shader.BasicMaterial_v3"};




// **************************************************************
// 
// Ops.Gl.Meshes.Triangle_v2
// 
// **************************************************************

Ops.Gl.Meshes.Triangle_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    render = op.inTrigger("render"),
    trigger = op.outTrigger("trigger"),
    sizeW = op.inValueFloat("width", 1),
    sizeH = op.inValueFloat("height", 1),
    draw = op.inValueBool("Draw", true),
    geom = new CGL.Geometry("triangle"),
    geomOut = op.outObject("geometry");

geomOut.ignoreValueSerialize = true;

op.toWorkPortsNeedToBeLinked(render);
op.setPortGroup("Size", [sizeW, sizeH]);

const cgl = op.patch.cgl;
let mesh = null;
sizeW.onChange = sizeH.onChange = () => { mesh = null; };

render.onLinkChanged = () =>
{
    if (!render.isLinked()) geomOut.set(null);
    else create();
};

render.onTriggered = function ()
{
    if (!mesh)create();
    if (draw.get() && mesh)mesh.render(cgl.getShader());
    trigger.trigger();
};

function create()
{
    geom.vertices = [
        0.0, sizeH.get(), 0.0,
        -sizeW.get(), -sizeH.get(), 0.0,
        sizeW.get(), -sizeH.get(), 0.0
    ];

    geom.vertexNormals = [
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0
    ];
    geom.tangents = [
        1, 0, 0,
        1, 0, 0,
        1, 0, 0
    ];
    geom.biTangents = [
        0, 1, 0,
        0, 1, 0,
        0, 1, 0
    ];

    geom.texCoords = [
        0.5, 0.0,
        1.0, 1.0,
        0.0, 1.0,
    ];

    geom.verticesIndices = [
        0, 1, 2
    ];

    mesh = new CGL.Mesh(cgl, geom);
    geomOut.setRef(geom);
}


};

Ops.Gl.Meshes.Triangle_v2.prototype = new CABLES.Op();
CABLES.OPS["ef522d4a-9712-4063-8a99-c6b409f26456"]={f:Ops.Gl.Meshes.Triangle_v2,objName:"Ops.Gl.Meshes.Triangle_v2"};




// **************************************************************
// 
// Ops.Gl.RenderGeometry_v2
// 
// **************************************************************

Ops.Gl.RenderGeometry_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    render = op.inTrigger("render"),
    geometry = op.inObject("Geometry", null, "geometry"),
    inActive = op.inBool("Render Mesh", true),

    inVertNums = op.inBool("Add Vertex Numbers", true),
    trigger = op.outTrigger("trigger");

op.toWorkPortsNeedToBeLinked(geometry, render);

geometry.ignoreValueSerialize = true;

let mesh = null;
let needsUpdate = true;

geometry.onLinkChanged =
inVertNums.onChange =
    geometry.onChange = () => { needsUpdate = true; };

render.onTriggered = function ()
{
    if (needsUpdate) update();
    if (mesh && inActive.get()) mesh.render(op.patch.cgl.getShader());
    trigger.trigger();
};

function update()
{
    needsUpdate = false;
    const geom = geometry.get();
    if (geom && geom.isGeometry)
    {
        if (mesh)
        {
            mesh.dispose();
            mesh = null;
        }
        if (!mesh)
        {
            mesh = new CGL.Mesh(op.patch.cgl, geom);
            mesh.addVertexNumbers = inVertNums.get();
            mesh.setGeom(geom);
        }
    }
    else
    {
        mesh = null;
    }
}


};

Ops.Gl.RenderGeometry_v2.prototype = new CABLES.Op();
CABLES.OPS["0a9bdb39-8250-460e-8d99-50fe6825d956"]={f:Ops.Gl.RenderGeometry_v2,objName:"Ops.Gl.RenderGeometry_v2"};




// **************************************************************
// 
// Ops.Graphics.Geometry.TransformGeometry
// 
// **************************************************************

Ops.Graphics.Geometry.TransformGeometry = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    geometry = op.inObject("Geometry"),
    transX = op.inValue("Translate X"),
    transY = op.inValue("Translate Y"),
    transZ = op.inValue("Translate Z"),
    scaleX = op.inValueSlider("Scale X", 1),
    scaleY = op.inValueSlider("Scale Y", 1),
    scaleZ = op.inValueSlider("Scale Z", 1),
    rotX = op.inValue("Rotation X"),
    rotY = op.inValue("Rotation Y"),
    rotZ = op.inValue("Rotation Z"),
    outGeom = op.outObject("Result", null, "geometry");

transX.onChange =
    transY.onChange =
    transZ.onChange =
    scaleX.onChange =
    scaleY.onChange =
    scaleZ.onChange =
    rotX.onChange =
    rotY.onChange =
    rotZ.onChange =
    geometry.onChange = update;

const rotVec = vec3.create();
const emptyVec = vec3.create();
const transVec = vec3.create();
const centerVec = vec3.create();

function update()
{
    const oldGeom = geometry.get();
    const i = 0;

    if (oldGeom && oldGeom.copy)
    {
        const geom = oldGeom.copy();

        for (let i = 0; i < geom.vertices.length; i += 3)
        {
            geom.vertices[i + 0] *= scaleX.get();
            geom.vertices[i + 1] *= scaleY.get();
            geom.vertices[i + 2] *= scaleZ.get();

            geom.vertices[i + 0] += transX.get();
            geom.vertices[i + 1] += transY.get();
            geom.vertices[i + 2] += transZ.get();
        }

        for (let i = 0; i < geom.vertices.length; i += 3)
        {
            vec3.set(rotVec,
                geom.vertices[i + 0],
                geom.vertices[i + 1],
                geom.vertices[i + 2]);

            vec3.rotateX(rotVec, rotVec, transVec, rotX.get() * CGL.DEG2RAD);
            vec3.rotateY(rotVec, rotVec, transVec, rotY.get() * CGL.DEG2RAD);
            vec3.rotateZ(rotVec, rotVec, transVec, rotZ.get() * CGL.DEG2RAD);

            geom.vertices[i + 0] = rotVec[0];
            geom.vertices[i + 1] = rotVec[1];
            geom.vertices[i + 2] = rotVec[2];
        }

        outGeom.setRef(geom);
    }
    else
    {
        outGeom.setRef(null);
    }
}


};

Ops.Graphics.Geometry.TransformGeometry.prototype = new CABLES.Op();
CABLES.OPS["9678fee2-5436-499c-b94d-2603cdbeb380"]={f:Ops.Graphics.Geometry.TransformGeometry,objName:"Ops.Graphics.Geometry.TransformGeometry"};




// **************************************************************
// 
// Ops.Gl.CanvasInfo_v3
// 
// **************************************************************

Ops.Gl.CanvasInfo_v3 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    width = op.outNumber("CSS Width"),
    height = op.outNumber("CSS Height"),
    pixelRatio = op.outNumber("Pixel Ratio"),
    widthPixel = op.outNumber("Pixel Width"),
    heightPixel = op.outNumber("Pixel Height"),
    aspect = op.outNumber("Aspect Ratio"),
    landscape = op.outBool("Landscape"),
    outCanvasEle = op.outObject("Canvas", "element"),
    outCanvasParentEle = op.outObject("Canvas Parent", "element"),
    outResize = op.outTrigger("Resized");

let cgl = op.patch.cgl;
outCanvasEle.set(op.patch.cgl.canvas);
outCanvasParentEle.set(op.patch.cgl.canvas.parentElement);

cgl.on("resize", () =>
{
    outResize.trigger();
    update();
});

update();

function update()
{
    let div = 1;

    if (cgl.canvasHeight == 0)setTimeout(update, 100);

    height.set(cgl.canvasHeight / op.patch.cgl.pixelDensity);
    width.set(cgl.canvasWidth / op.patch.cgl.pixelDensity);

    widthPixel.set(cgl.canvasWidth);
    heightPixel.set(cgl.canvasHeight);

    pixelRatio.set(op.patch.cgl.pixelDensity); // window.devicePixelRatio

    aspect.set(cgl.canvasWidth / cgl.canvasHeight);
    landscape.set(cgl.canvasWidth > cgl.canvasHeight ? 1 : 0);
}


};

Ops.Gl.CanvasInfo_v3.prototype = new CABLES.Op();
CABLES.OPS["be186ff9-427e-409f-b6a4-f8d957bf7bc7"]={f:Ops.Gl.CanvasInfo_v3,objName:"Ops.Gl.CanvasInfo_v3"};




// **************************************************************
// 
// Ops.Gl.Textures.TextTexture_v6
// 
// **************************************************************

Ops.Gl.Textures.TextTexture_v6 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={"text_frag":"{{MODULES_HEAD}}\n\nUNI sampler2D tex;\nUNI float a;\nUNI vec4 color;\nIN vec2 texCoord;\n\nvoid main()\n{\n\n    vec4 col=texture(tex,vec2(texCoord.x,(1.0-texCoord.y)));\n\n    {{MODULE_COLOR}}\n\n    outColor=col;\n}\n","text_vert":"{{MODULES_HEAD}}\n\nIN vec3 vPosition;\nUNI mat4 projMatrix;\nUNI mat4 modelMatrix;\nUNI mat4 viewMatrix;\nUNI float aspect;\nOUT vec2 texCoord;\nIN vec2 attrTexCoord;\n\nvoid main()\n{\n    vec4 pos=vec4(vPosition,  1.0);\n\n    pos.x*=aspect;\n\n    texCoord=vec2(attrTexCoord.x,1.0-attrTexCoord.y);;\n\n    mat4 mMatrix=modelMatrix;\n\n    {{MODULE_VERTEX_POSITION}}\n    mat4 modelViewMatrix=viewMatrix*mMatrix;\n\n    gl_Position = projMatrix * modelViewMatrix * pos;\n}\n",};
const
    render = op.inTriggerButton("Render"),

    text = op.inString("text", "cables"),

    drawMesh = op.inValueBool("Draw Mesh", true),
    meshScale = op.inValueFloat("Scale Mesh", 0.5),

    texSizeMeth = op.inSwitch("Size", ["Auto", "Manual"], "Auto"),

    texSizeManWidth = op.inInt("Width", 512),
    texSizeManHeight = op.inInt("Height", 512),
    texSizeAutoHeight = op.inBool("Auto Height", true),

    texSizeManBreak = op.inBool("Auto Line Breaks", true),

    font = op.inString("font", "Arial"),
    weight = op.inString("weight", "normal"),
    inFontSize = op.inValueFloat("fontSize", 300),
    align = op.inSwitch("align", ["left", "center", "right"], "center"),
    valign = op.inSwitch("Vertical align", ["Top", "Middle", "Bottom"], "Top"),

    inLetterspacing = op.inFloat("Letter Spacing", 0),
    inLineHeight = op.inFloat("Line Height Add", 0),

    inPaddingY = op.inInt("Padding Y Top", 3),
    inPaddingYBot = op.inInt("Padding Y Bottom", 3),
    inPaddingX = op.inInt("Padding X", 0),

    tfilter = op.inSwitch("filter", ["nearest", "linear", "mipmap"], "linear"),
    wrap = op.inValueSelect("Wrap", ["repeat", "mirrored repeat", "clamp to edge"], "clamp to edge"),
    aniso = op.inSwitch("Anisotropic", [0, 1, 2, 4, 8, 16], 0),
    cachetexture = op.inValueBool("Reuse Texture", true),
    drawDebug = op.inBool("Show Debug", false),

    reloadOnFont = op.inBool("Redraw On Font Load", true),

    r = op.inValueSlider("r", 1),
    g = op.inValueSlider("g", 1),
    b = op.inValueSlider("b", 1),
    inOpacity = op.inFloatSlider("Opacity", 1),

    bgR = op.inValueSlider("background R", 0),
    bgG = op.inValueSlider("background G", 0),
    bgB = op.inValueSlider("background B", 0),
    bgA = op.inValueSlider("background A", 1),

    inRedraw = op.inTriggerButton("Force Redraw"),

    next = op.outTrigger("Next"),
    outRatio = op.outNumber("Ratio"),
    textureOut = op.outTexture("texture"),
    outEle = op.outObject("Canvas", null, "element"),
    outAspect = op.outNumber("Aspect", 1),
    outLines = op.outNumber("Num Lines");

const SPACE = " ";

r.setUiAttribs({ "colorPick": true });
bgR.setUiAttribs({ "colorPick": true });

op.toWorkPortsNeedToBeLinked(render);

op.setPortGroup("Text Color", [r, g, b, inOpacity]);
op.setPortGroup("Background", [bgR, bgG, bgB, bgA]);
op.setPortGroup("Font", [font, weight, inFontSize, align, valign, inLetterspacing, inLineHeight]);
op.setPortGroup("Texture", [wrap, tfilter, aniso, cachetexture, drawDebug]);

op.setPortGroup("Rendering", [drawMesh, meshScale]);

render.onLinkChanged = () =>
{
    if (!render.isLinked())textureOut.setRef(CGL.Texture.getEmptyTexture(cgl));
    else textureOut.setRef(tex);
};

inRedraw.onTriggered =
    r.onChange =
    g.onChange =
    b.onChange =
    inOpacity.onChange =
    valign.onChange =
    texSizeManBreak.onChange =
    texSizeAutoHeight.onChange =
    inLineHeight.onChange =
    texSizeMeth.onChange =
    texSizeManWidth.onChange =
    texSizeManHeight.onChange =
    align.onChange =
    inLetterspacing.onChange =
    inPaddingY.onChange =
    inPaddingYBot.onChange =
    inPaddingX.onChange =
    text.onChange =
    inFontSize.onChange =
    weight.onChange =
    aniso.onChange =
    font.onChange =
    drawDebug.onChange =
    cachetexture.onChange = function ()
    {
        needsRefresh = true;
        updateUi();
    };

textureOut.ignoreValueSerialize = true;

const cgl = op.patch.cgl;
let tex = new CGL.Texture(cgl);
let autoHeight = 2;
let autoWidth = 2;

const fontImage = document.createElement("canvas");
fontImage.id = "texturetext_" + CABLES.generateUUID();
fontImage.style.display = "none";
document.body.appendChild(fontImage);
fontImage.style.letterSpacing = "0px";

outEle.setRef(fontImage);

let ctx = fontImage.getContext("2d");
let needsRefresh = true;
const mesh = CGL.MESHES.getSimpleRect(cgl, "texttexture rect");
const vScale = vec3.create();
const shader = new CGL.Shader(cgl, "texttexture");
shader.setModules(["MODULE_VERTEX_POSITION", "MODULE_COLOR", "MODULE_BEGIN_FRAG"]);
shader.setSource(attachments.text_vert, attachments.text_frag);
const texUni = new CGL.Uniform(shader, "t", "tex");
const aspectUni = new CGL.Uniform(shader, "f", "aspect", 0);
const opacityUni = new CGL.Uniform(shader, "f", "a", inOpacity);
const uniColor = new CGL.Uniform(shader, "4f", "color", r, g, b, inOpacity);

if (op.patch.isEditorMode()) CABLES.UI.SIMPLEWIREFRAMERECT = CABLES.UI.SIMPLEWIREFRAMERECT || new CGL.WireframeRect(cgl);

render.onTriggered = doRender;
drawMesh.onChange = updateUi;
updateUi();

op.on("delete", () =>
{
    ctx = null;
    fontImage.remove();
});

aniso.onChange =
    tfilter.onChange =
    wrap.onChange = () =>
    {
        if (tex)tex.delete();
        tex = null;
        needsRefresh = true;
    };

bgR.onChange = bgG.onChange = bgB.onChange = bgA.onChange = r.onChange = g.onChange = b.onChange = inOpacity.onChange = () =>
{
    if (!drawMesh.get() || textureOut.isLinked()) needsRefresh = true;
};

textureOut.onLinkChanged = () =>
{
    if (textureOut.isLinked()) needsRefresh = true;
};

op.patch.on("fontLoaded", (fontName) =>
{
    if (fontName == font.get()) needsRefresh = true;
});

document.fonts.ready.then(() =>
{
    if (reloadOnFont.get()) needsRefresh = true;
});

document.fonts.onloadingdone = function (fontFaceSetEvent)
{
    if (reloadOnFont.get()) needsRefresh = true;
};

function getWidth()
{
    return autoWidth;
}

function getHeight()
{
    return autoHeight;
}

function doRender()
{
    let count = 0;
    while (needsRefresh && count < 10)
    {
        reSize();
        refresh();
        count++;
    }

    if (drawMesh.get())
    {
        vScale[0] = vScale[1] = vScale[2] = meshScale.get();
        cgl.pushBlendMode(CGL.BLEND_NORMAL, false);
        cgl.pushModelMatrix();
        mat4.scale(cgl.mMatrix, cgl.mMatrix, vScale);

        shader.popTextures();
        shader.pushTexture(texUni, tex.tex);
        aspectUni.set(outAspect.get());

        if (cgl.shouldDrawHelpers(op))
            CABLES.UI.SIMPLEWIREFRAMERECT.render(outAspect.get(), 1, 1);

        cgl.pushShader(shader);
        mesh.render(op.patch.cg.getShader());

        cgl.popShader();
        cgl.popBlendMode();
        cgl.popModelMatrix();
    }

    next.trigger();
}

function reSize()
{
    if (tex) tex.setSize(getWidth(), getHeight());

    ctx.canvas.width = fontImage.width = getWidth();
    ctx.canvas.height = fontImage.height = getHeight();

    outAspect.set(fontImage.width / fontImage.height);

    needsRefresh = true;
}

function autoLineBreaks(strings)
{
    let newString = "";

    for (let i = 0; i < strings.length; i++)
    {
        if (!strings[i])
        {
            newString += "\n";
            continue;
        }
        let sumWidth = 0;
        const words = strings[i].split(SPACE);

        for (let j = 0; j < words.length; j++)
        {
            if (!words[j]) continue;
            sumWidth += ctx.measureText(words[j] + SPACE).width;

            if (sumWidth > texSizeManWidth.get())
            {
                // found = true;
                newString += "\n" + words[j] + SPACE;
                sumWidth = ctx.measureText(words[j] + SPACE).width;
            }
            else
            {
                newString += words[j] + SPACE;
            }
        }
        newString += "\n";
    }
    let txt = newString;

    strings = txt.split("\n");

    if (strings[strings.length - 1] == "")strings.pop();

    return strings;
}

function refresh()
{
    cgl.checkFrameStarted("texttrexture refresh");
    const rgbStringClear = "rgba(" + Math.floor(bgR.get() * 255) + "," + Math.floor(bgG.get() * 255) + "," + Math.floor(bgB.get() * 255) + "," + bgA.get() + ")";
    ctx.fillStyle = rgbStringClear;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    const rgbString = "rgba(" + Math.floor(r.get() * 255) + ","
        + Math.floor(g.get() * 255) + "," + Math.floor(b.get() * 255) + ","
        + inOpacity.get() + ")";

    ctx.fillStyle = rgbString;
    let fontSize = parseFloat(inFontSize.get());
    let fontname = font.get();
    if (fontname.indexOf(SPACE) > -1) fontname = "\"" + fontname + "\"";
    ctx.font = weight.get() + SPACE + fontSize + "px " + fontname + "";

    ctx.textBaseline = "top";
    ctx.textAlign = align.get();
    ctx.letterSpacing = inLetterspacing.get() + "px";

    let txt = (text.get() + "").replace(/<br\/>/g, "\n");
    txt = txt.trim();
    let strings = txt.split("\n");

    needsRefresh = false;

    let paddingY = Math.max(0, inPaddingY.get());
    let paddingYBot = Math.max(0, inPaddingYBot.get());
    let paddingX = Math.max(0, inPaddingX.get());

    autoWidth = 0;
    autoHeight = 0;

    if (texSizeManBreak.get() && texSizeMeth.get() == "Manual")
    {
        if (texSizeManWidth.get() > 128)
        {
            strings = autoLineBreaks(strings);
        }
    }

    const lineHeights = [];

    for (let i = 0; i < strings.length; i++)
    {
        const measure = ctx.measureText(strings[i]);
        lineHeights[i] = Math.ceil(measure.fontBoundingBoxAscent) + Math.ceil(measure.fontBoundingBoxDescent) + inLineHeight.get();
    }

    for (let i = 0; i < strings.length; i++)
    {
        const measure = ctx.measureText(strings[i]);
        autoWidth = Math.max(autoWidth, Math.ceil(measure.width));
        autoHeight += lineHeights[i];
    }

    autoWidth += paddingX * 2;

    if (inLineHeight.get() < 0)autoHeight += (inLineHeight.get() / 2) * -1;

    let calcHeight = autoHeight;

    if (texSizeMeth.get() == "Manual")
    {
        autoWidth = texSizeManWidth.get() + paddingX * 2;

        if (!texSizeAutoHeight.get())
        {
            autoHeight = texSizeManHeight.get();
        }
    }

    autoHeight = Math.ceil(autoHeight);
    autoWidth = Math.ceil(autoWidth);

    if (autoWidth > cgl.maxTexSize || autoHeight > cgl.maxTexSize) op.setUiError("textoobig", "Texture too big!");
    else op.setUiError("textoobig", null);

    autoHeight = Math.min(cgl.maxTexSize, autoHeight);
    autoWidth = Math.min(cgl.maxTexSize, autoWidth);

    let posy = 0;
    if (valign.get() == "Middle") posy = (autoHeight - calcHeight) / 2;
    else if (valign.get() == "Bottom") posy = (autoHeight - calcHeight);

    posy += paddingY;

    autoHeight += paddingY + paddingYBot;

    if (ctx.canvas.width != autoWidth || ctx.canvas.height != autoHeight) reSize();

    const dbg = drawDebug.get();

    for (let i = 0; i < strings.length; i++)
    {
        let posx = 0 + paddingX; // left

        if (align.get() == "center") posx = ctx.canvas.width / 2;
        if (align.get() == "right") posx = ctx.canvas.width - paddingX;

        if (texSizeMeth.get() == "Manual") posx += inLetterspacing.get();

        ctx.fillText(strings[i], posx, posy);

        if (dbg)
        {
            ctx.lineWidth = 3;
            ctx.strokeStyle = "#FF0000";
            ctx.beginPath();
            ctx.moveTo(0, posy);
            ctx.lineTo(ctx.canvas.width, posy);
            ctx.stroke();
        }

        posy += lineHeights[i];
    }

    // ctx.restore();

    let cgl_wrap = CGL.Texture.WRAP_REPEAT;
    if (wrap.get() == "mirrored repeat") cgl_wrap = CGL.Texture.WRAP_MIRRORED_REPEAT;
    else if (wrap.get() == "clamp to edge") cgl_wrap = CGL.Texture.WRAP_CLAMP_TO_EDGE;

    let f = CGL.Texture.FILTER_LINEAR;
    if (tfilter.get() == "nearest") f = CGL.Texture.FILTER_NEAREST;
    else if (tfilter.get() == "mipmap") f = CGL.Texture.FILTER_MIPMAP;

    if (!cachetexture.get() || !tex || !textureOut.get() || tex.width != fontImage.width || tex.height != fontImage.height || tex.anisotropic != parseFloat(aniso.get()))
    {
        if (tex)tex.delete();
        tex = new CGL.Texture.createFromImage(cgl, fontImage, { "filter": f, "anisotropic": parseFloat(aniso.get()), "wrap": cgl_wrap });
    }

    tex.unpackAlpha = false;
    tex.flip = false;
    tex.initTexture(fontImage, f);

    outRatio.set(ctx.canvas.height / ctx.canvas.width);
    outLines.set(strings.length);

    textureOut.setRef(tex);
}

function updateUi()
{
    texSizeManWidth.setUiAttribs({ "greyout": texSizeMeth.get() != "Manual" });
    texSizeManHeight.setUiAttribs({ "greyout": texSizeMeth.get() != "Manual" || texSizeAutoHeight.get() });
    texSizeManBreak.setUiAttribs({ "greyout": texSizeMeth.get() != "Manual" });
    valign.setUiAttribs({ "greyout": texSizeMeth.get() != "Manual" });
    texSizeAutoHeight.setUiAttribs({ "greyout": texSizeMeth.get() != "Manual" });

    meshScale.setUiAttribs({ "greyout": !drawMesh.get() });
}


};

Ops.Gl.Textures.TextTexture_v6.prototype = new CABLES.Op();
CABLES.OPS["2c042efa-3604-4717-b8f4-5ad08d6740e5"]={f:Ops.Gl.Textures.TextTexture_v6,objName:"Ops.Gl.Textures.TextTexture_v6"};




// **************************************************************
// 
// Ops.Color.ColorValue
// 
// **************************************************************

Ops.Color.ColorValue = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const r = op.inValueSlider("r", Math.random());
const g = op.inValueSlider("g", Math.random());
const b = op.inValueSlider("b", Math.random());
r.setUiAttribs({ "colorPick": true });
const a = op.inValueSlider("a", 1);

const outR = op.outNumber("outr");
const outG = op.outNumber("outg");
const outB = op.outNumber("outb");
const outA = op.outNumber("outa");
const outHex = op.outNumber("Hex", "000000");
const arrOut = op.outArray("Array");

r.onChange = g.onChange = b.onChange = a.onChange = exec;

/**
 * Float [0..1] -> Hex String [00..FF]
 */
function floatToHex(f)
{
    let s = Math.round(f * 255).toString(16);
    if (s.length === 1)
    {
        s = "0" + s;
    }
    return s.toUpperCase();
}

function exec()
{
    outR.set(r.get());
    outG.set(g.get());
    outB.set(b.get());
    outA.set(a.get());

    let hex = floatToHex(r.get()) + floatToHex(g.get()) + floatToHex(b.get());
    outHex.set(hex);

    arrOut.set([r.get(), g.get(), b.get(), a.get()]);
}

exec();


};

Ops.Color.ColorValue.prototype = new CABLES.Op();
CABLES.OPS["7caa37c8-f2a7-49f2-a29c-96af362abca0"]={f:Ops.Color.ColorValue,objName:"Ops.Color.ColorValue"};




// **************************************************************
// 
// Ops.Math.Compare.GreaterThan
// 
// **************************************************************

Ops.Math.Compare.GreaterThan = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    number1 = op.inValueFloat("number1"),
    number2 = op.inValueFloat("number2"),
    result = op.outBoolNum("result");

op.setUiAttribs({ "mathTitle": true });

number1.onChange = number2.onChange = exec;

function exec()
{
    result.set(number1.get() > number2.get());
}


};

Ops.Math.Compare.GreaterThan.prototype = new CABLES.Op();
CABLES.OPS["b250d606-f7f8-44d3-b099-c29efff2608a"]={f:Ops.Math.Compare.GreaterThan,objName:"Ops.Math.Compare.GreaterThan"};




// **************************************************************
// 
// Ops.Number.SwitchNumber
// 
// **************************************************************

Ops.Number.SwitchNumber = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const idx = op.inValueInt("Index");
const valuePorts = [];
const result = op.outNumber("Result");

idx.onChange = update;

for (let i = 0; i < 16; i++)
{
    let p = op.inValue("Value " + i);
    valuePorts.push(p);
    p.onChange = update;
}

function update()
{
    if (idx.get() >= 0 && valuePorts[idx.get()])
    {
        result.set(valuePorts[idx.get()].get());
    }
}


};

Ops.Number.SwitchNumber.prototype = new CABLES.Op();
CABLES.OPS["fbb89f72-f2e3-4d34-ad01-7d884a1bcdc0"]={f:Ops.Number.SwitchNumber,objName:"Ops.Number.SwitchNumber"};




// **************************************************************
// 
// Ops.Vars.VarSetString_v2
// 
// **************************************************************

Ops.Vars.VarSetString_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const val=op.inString("Value","New String");
op.varName=op.inDropDown("Variable",[],"",true);

new CABLES.VarSetOpWrapper(op,"string",val,op.varName);




};

Ops.Vars.VarSetString_v2.prototype = new CABLES.Op();
CABLES.OPS["0b4d9229-8024-4a30-9cc0-f6653942c2e4"]={f:Ops.Vars.VarSetString_v2,objName:"Ops.Vars.VarSetString_v2"};




// **************************************************************
// 
// Ops.Vars.VarGetString
// 
// **************************************************************

Ops.Vars.VarGetString = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
var val=op.outString("Value");
op.varName=op.inValueSelect("Variable",[],"",true);

new CABLES.VarGetOpWrapper(op,"string",op.varName,val);


};

Ops.Vars.VarGetString.prototype = new CABLES.Op();
CABLES.OPS["3ad08cfc-bce6-4175-9746-fef2817a3b12"]={f:Ops.Vars.VarGetString,objName:"Ops.Vars.VarGetString"};




// **************************************************************
// 
// Ops.Math.Sum
// 
// **************************************************************

Ops.Math.Sum = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    number1 = op.inValueFloat("number1", 0),
    number2 = op.inValueFloat("number2", 0),
    result = op.outNumber("result");

op.setUiAttribs({ "mathTitle": true });

number1.onChange =
number2.onChange = exec;
exec();

function exec()
{
    const v = number1.get() + number2.get();
    if (!isNaN(v))
        result.set(v);
}


};

Ops.Math.Sum.prototype = new CABLES.Op();
CABLES.OPS["c8fb181e-0b03-4b41-9e55-06b6267bc634"]={f:Ops.Math.Sum,objName:"Ops.Math.Sum"};




// **************************************************************
// 
// Ops.Vars.VarSetNumber_v2
// 
// **************************************************************

Ops.Vars.VarSetNumber_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const val = op.inValueFloat("Value", 0);
op.varName = op.inDropDown("Variable", [], "", true);

new CABLES.VarSetOpWrapper(op, "number", val, op.varName);


};

Ops.Vars.VarSetNumber_v2.prototype = new CABLES.Op();
CABLES.OPS["b5249226-6095-4828-8a1c-080654e192fa"]={f:Ops.Vars.VarSetNumber_v2,objName:"Ops.Vars.VarSetNumber_v2"};




// **************************************************************
// 
// Ops.Vars.VarGetNumber_v2
// 
// **************************************************************

Ops.Vars.VarGetNumber_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const val = op.outNumber("Value");
op.varName = op.inValueSelect("Variable", [], "", true);

new CABLES.VarGetOpWrapper(op, "number", op.varName, val);


};

Ops.Vars.VarGetNumber_v2.prototype = new CABLES.Op();
CABLES.OPS["421f5b52-c0fa-47c4-8b7a-012b9e1c864a"]={f:Ops.Vars.VarGetNumber_v2,objName:"Ops.Vars.VarGetNumber_v2"};




// **************************************************************
// 
// Ops.Number.GateNumber
// 
// **************************************************************

Ops.Number.GateNumber = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    valueInPort = op.inValue("Value In", 0),
    passThroughPort = op.inValueBool("Pass Through"),
    inIfNot = op.inSwitch("When False", ["keep last number", "custom"], "keep last number"),
    inCustomNot = op.inFloat("Custom Value", 0),
    valueOutPort = op.outNumber("Value Out");

valueInPort.onChange = update;
passThroughPort.onChange = update;

valueInPort.changeAlways =
    valueOutPort.changeAlways = true;

inIfNot.onChange = updateUi;

function updateUi()
{
    inCustomNot.setUiAttribs({ "greyout": inIfNot.get() != "custom" });
    update();
}

function update()
{
    if (passThroughPort.get())
    {
        valueOutPort.set(valueInPort.get());
    }
    else
    {
        if (inIfNot.get() == "custom") valueOutPort.set(inCustomNot.get());
    }
}


};

Ops.Number.GateNumber.prototype = new CABLES.Op();
CABLES.OPS["594105c8-1fdb-4f3c-bbd5-29b9ad6b33e0"]={f:Ops.Number.GateNumber,objName:"Ops.Number.GateNumber"};




// **************************************************************
// 
// Ops.Math.Divide
// 
// **************************************************************

Ops.Math.Divide = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    number1 = op.inValueFloat("number1", 1),
    number2 = op.inValueFloat("number2", 2),
    result = op.outNumber("result");

op.setUiAttribs({ "mathTitle": true });

number1.onChange = number2.onChange = exec;
exec();

function exec()
{
    result.set(number1.get() / number2.get());
}


};

Ops.Math.Divide.prototype = new CABLES.Op();
CABLES.OPS["86fcfd8c-038d-4b91-9820-a08114f6b7eb"]={f:Ops.Math.Divide,objName:"Ops.Math.Divide"};




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



window.addEventListener('load', function(event) {
CABLES.jsLoaded=new Event('CABLES.jsLoaded');
document.dispatchEvent(CABLES.jsLoaded);
});
