"use strict";

var CABLES=CABLES||{};
CABLES.OPS=CABLES.OPS||{};

var Ops=Ops || {};
Ops.Gl=Ops.Gl || {};
Ops.Data=Ops.Data || {};
Ops.Math=Ops.Math || {};
Ops.Vars=Ops.Vars || {};
Ops.Array=Ops.Array || {};
Ops.Number=Ops.Number || {};
Ops.Devices=Ops.Devices || {};
Ops.Trigger=Ops.Trigger || {};
Ops.Gl.Meshes=Ops.Gl.Meshes || {};
Ops.Gl.Shader=Ops.Gl.Shader || {};
Ops.Data.Compose=Ops.Data.Compose || {};
Ops.Devices.Mouse=Ops.Devices.Mouse || {};
Ops.Gl.ImageCompose=Ops.Gl.ImageCompose || {};
Ops.Data.Compose.Array=Ops.Data.Compose.Array || {};



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
// Ops.Number.TriggerOnChangeNumber
// 
// **************************************************************

Ops.Number.TriggerOnChangeNumber = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    inval = op.inFloat("Value"),
    next = op.outTrigger("Next"),
    number = op.outNumber("Number");

inval.onChange = function ()
{
    number.set(inval.get());
    next.trigger();
};


};

Ops.Number.TriggerOnChangeNumber.prototype = new CABLES.Op();
CABLES.OPS["f5c8c433-ce13-49c4-9a33-74e98f110ed0"]={f:Ops.Number.TriggerOnChangeNumber,objName:"Ops.Number.TriggerOnChangeNumber"};




// **************************************************************
// 
// Ops.Data.Compose.Array.CompArray
// 
// **************************************************************

Ops.Data.Compose.Array.CompArray = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    update = op.inTrigger("Update"),
    active = op.inBool("Active", true),
    clear = op.inBool("Clear", true),
    inReset = op.inTriggerButton("Reset"),
    next = op.outTrigger("Next"),
    outArr = op.outArray("Result");

inReset.onTriggered = () =>
{
    arr = [];
    outArr.setRef([]);
};

let arr = [];

update.onTriggered = () =>
{
    if (!active.get()) return next.trigger();

    op.patch.tempData.compArray = op.patch.tempData.compArray || [];

    if (clear.get())
    {
        arr = [];
    }

    op.patch.tempData.compArray.push(arr);
    next.trigger();

    outArr.setRef(op.patch.tempData.compArray.pop());
};


};

Ops.Data.Compose.Array.CompArray.prototype = new CABLES.Op();
CABLES.OPS["16f1ce37-9e0d-4632-a9ba-dfd42c4eb254"]={f:Ops.Data.Compose.Array.CompArray,objName:"Ops.Data.Compose.Array.CompArray"};




// **************************************************************
// 
// Ops.Data.Compose.Array.CompArrayPushArrayItems
// 
// **************************************************************

Ops.Data.Compose.Array.CompArrayPushArrayItems = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    update = op.inTrigger("Update"),
    inArr = op.inArray("Array"),
    next = op.outTrigger("Next");

update.onTriggered = () =>
{
    if (op.patch.tempData.compArray && op.patch.tempData.compArray.length > 0)
    {
        let arr = op.patch.tempData.compArray[op.patch.tempData.compArray.length - 1];

        try
        {
            const newArr = inArr.get() || [];

            for (let i = 0; i < newArr.length; i++)
            {
                arr.push(newArr[i]);
            }
        }
        catch (e)
        {
            op.log("error comparraupusharray");
        }
    }
    next.trigger();
};


};

Ops.Data.Compose.Array.CompArrayPushArrayItems.prototype = new CABLES.Op();
CABLES.OPS["4107c3c2-40ad-4bee-b809-022377bf5601"]={f:Ops.Data.Compose.Array.CompArrayPushArrayItems,objName:"Ops.Data.Compose.Array.CompArrayPushArrayItems"};




// **************************************************************
// 
// Ops.Trigger.TriggerOnce
// 
// **************************************************************

Ops.Trigger.TriggerOnce = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    exe = op.inTriggerButton("Exec"),
    reset = op.inTriggerButton("Reset"),
    next = op.outTrigger("Next"),
    outTriggered = op.outBoolNum("Was Triggered");

let triggered = false;

op.toWorkPortsNeedToBeLinked(exe);

reset.onTriggered = function ()
{
    triggered = false;
    outTriggered.set(triggered);
};

exe.onTriggered = function ()
{
    if (triggered) return;

    triggered = true;
    next.trigger();
    outTriggered.set(triggered);
};


};

Ops.Trigger.TriggerOnce.prototype = new CABLES.Op();
CABLES.OPS["cf3544e4-e392-432b-89fd-fcfb5c974388"]={f:Ops.Trigger.TriggerOnce,objName:"Ops.Trigger.TriggerOnce"};




// **************************************************************
// 
// Ops.Array.ArrayLength_v2
// 
// **************************************************************

Ops.Array.ArrayLength_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    array = op.inArray("array"),
    outLength = op.outNumber("length");

outLength.ignoreValueSerialize = true;

function update()
{
    let l = 0;
    if (array.get()) l = array.get().length;
    outLength.set(l);
}

array.onChange = update;


};

Ops.Array.ArrayLength_v2.prototype = new CABLES.Op();
CABLES.OPS["6f665caa-96ed-45d8-8620-e34f0f8e062c"]={f:Ops.Array.ArrayLength_v2,objName:"Ops.Array.ArrayLength_v2"};




// **************************************************************
// 
// Ops.Array.Array3PushNumbers_v2
// 
// **************************************************************

Ops.Array.Array3PushNumbers_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    exePort = op.inTriggerButton('Execute'),
    inArrayPort = op.inArray('Array'),
    value1Port = op.inValue('Value 1'),
    value2Port = op.inValue('Value 2'),
    value3Port = op.inValue('Value 3'),

    inReset=op.inTriggerButton("Reset"),
    nextPort = op.outTrigger('Next'),
    outArray=op.outArray("Result Array");

const newArr=[];
exePort.onTriggered = update;


inReset.onTriggered=
inArrayPort.onChange=function()
{
    let arr=inArrayPort.get();
    if(!arr)
    {
        outArray.set([]);
        return;
    }
    newArr.length=arr.length;
    for(let i=0;i<arr.length;i++)
    {
        newArr[i]=arr[i];
    }

    outArray.set(null);
    outArray.set(newArr);
};



function update() {
    var arr = newArr;
    if(arr) {
        arr.push(value1Port.get(), value2Port.get(), value3Port.get());
        nextPort.trigger();
    }



    outArray.set(null);
    outArray.set(arr);
}


};

Ops.Array.Array3PushNumbers_v2.prototype = new CABLES.Op();
CABLES.OPS["e898374c-5651-4f43-82d5-f06c7695444b"]={f:Ops.Array.Array3PushNumbers_v2,objName:"Ops.Array.Array3PushNumbers_v2"};




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
// Ops.Math.RandomNumbers_v3
// 
// **************************************************************

Ops.Math.RandomNumbers_v3 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    inSeed = op.inValueFloat("Seed", 1),
    min = op.inValueFloat("Min", 0),
    max = op.inValueFloat("Max", 1),
    outX = op.outNumber("X"),
    outY = op.outNumber("Y"),
    outZ = op.outNumber("Z"),
    outW = op.outNumber("W");

inSeed.onChange =
    min.onChange =
    max.onChange = update;
update();

function update()
{
    const inMin = min.get();
    const inMax = max.get();
    Math.randomSeed = Math.abs(inSeed.get() || 0) * 571.1 + 1.0;
    outX.set(Math.seededRandom() * (inMax - inMin) + inMin);
    outY.set(Math.seededRandom() * (inMax - inMin) + inMin);
    outZ.set(Math.seededRandom() * (inMax - inMin) + inMin);
    outW.set(Math.seededRandom() * (inMax - inMin) + inMin);
}


};

Ops.Math.RandomNumbers_v3.prototype = new CABLES.Op();
CABLES.OPS["d2b970e1-9406-4459-995c-5a594acd88e3"]={f:Ops.Math.RandomNumbers_v3,objName:"Ops.Math.RandomNumbers_v3"};




// **************************************************************
// 
// Ops.Math.TriggerRandomNumber_v2
// 
// **************************************************************

Ops.Math.TriggerRandomNumber_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    exe = op.inTriggerButton("Generate"),
    min = op.inValue("min", 0),
    max = op.inValue("max", 1),
    outTrig = op.outTrigger("next"),
    result = op.outNumber("result"),
    inInteger = op.inValueBool("Integer", false),
    noDupe = op.inValueBool("No consecutive duplicates", false);

op.setPortGroup("Value Range", [min, max]);

exe.onTriggered =
    max.onChange =
    min.onChange =
    inInteger.onChange = genRandom;

genRandom();

function genRandom()
{
    let r = (Math.random() * (max.get() - min.get())) + min.get();

    if (inInteger.get())r = randInt();

    if (min.get() != max.get() && max.get() > min.get())
        while (noDupe.get() && r == result.get()) r = randInt();

    result.set(r);
    outTrig.trigger();
}

function randInt()
{
    return Math.floor((Math.random() * ((max.get() - min.get() + 1))) + min.get());
}


};

Ops.Math.TriggerRandomNumber_v2.prototype = new CABLES.Op();
CABLES.OPS["26f446cc-9107-4164-8209-5254487fa132"]={f:Ops.Math.TriggerRandomNumber_v2,objName:"Ops.Math.TriggerRandomNumber_v2"};




// **************************************************************
// 
// Ops.Array.ArrayMathArray
// 
// **************************************************************

Ops.Array.ArrayMathArray = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const inArray_0 = op.inArray("array 0"),
    inArray_1 = op.inArray("array 1"),
    mathSelect = op.inSwitch("Math function", ["+", "-", "*", "/", "%", "min", "max"], "+"),
    outArray = op.outArray("Array result"),
    outArrayLength = op.outNumber("Array length");

let mathFunc;

let showingError = false;

const mathArray = [];

op.toWorkPortsNeedToBeLinked(inArray_1, inArray_0);

mathSelect.onChange = onFilterChange;

inArray_0.onChange = inArray_1.onChange = update;
onFilterChange();

function onFilterChange()
{
    const mathSelectValue = mathSelect.get();

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
    const array0 = inArray_0.get();
    const array1 = inArray_1.get();

    if (!array0 || !array1)
    {
        outArray.set(null);
        outArrayLength.set(0);
        return;
    }

    const l = mathArray.length = array0.length;

    for (let i = 0; i < l; i++)
    {
        mathArray[i] = mathFunc(array0[i], array1[i]);
    }

    outArrayLength.set(mathArray.length);
    outArray.setRef(mathArray);
}


};

Ops.Array.ArrayMathArray.prototype = new CABLES.Op();
CABLES.OPS["f31a1764-ce14-41de-9b3f-dc2fe249bb52"]={f:Ops.Array.ArrayMathArray,objName:"Ops.Array.ArrayMathArray"};




// **************************************************************
// 
// Ops.Gl.Shader.PointMaterial_v6
// 
// **************************************************************

Ops.Gl.Shader.PointMaterial_v6 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={"pointmat_frag":"\n{{MODULES_HEAD}}\n\nUNI vec4 color;\nUNI float atlasNumX;\n\n// IN vec2 pointCoord;\nIN float ps;\nIN vec2 texCoord;\n\n#ifdef HAS_TEXTURE_DIFFUSE\n    UNI sampler2D diffTex;\n#endif\n#ifdef HAS_TEXTURE_MASK\n    UNI sampler2D texMask;\n#endif\n#ifdef HAS_TEXTURE_COLORIZE\n    IN vec4 colorize;\n#endif\n#ifdef HAS_TEXTURE_OPACITY\n    IN float opacity;\n#endif\n\n#ifdef HAS_TEXTURE_ROT\n    UNI sampler2D texRot;\n#endif\n\n\n#ifdef USE_ATLAS\n    IN float randAtlas;\n    #ifdef HAS_TEXTURE_ATLASLOOKUP\n        UNI sampler2D texAtlasLookup;\n    #endif\n#endif\n\n\n#ifdef VERTEX_COLORS\n    IN vec4 vertexColor;\n#endif\n\nvec3 lumcoeff = vec3(0.299,0.587,0.114);\n\n#define PI 3.14159265\n#define TAU (2.0*PI)\n\nvoid pR(inout vec2 p, float a)\n{\n\tp = cos(a)*p + sin(a)*vec2(p.y, -p.x);\n}\n\n\nvoid main()\n{\n    #ifdef FLIP_TEX\n        vec2 pointCoord=vec2(gl_PointCoord.x,(1.0-gl_PointCoord.y));\n    #endif\n    #ifndef FLIP_TEX\n        vec2 pointCoord=gl_PointCoord;\n    #endif\n\n    #ifdef HAS_TEXTURE_ROT\n        float r=texture(texRot,texCoord).r;\n        pointCoord-=vec2(0.5);\n        pR(pointCoord,r*TAU);\n        pointCoord+=vec2(0.5);\n    #endif\n\n    vec2 origPointCoord=pointCoord;\n\n\n    #ifdef USE_ATLAS\n\n        float atlasIdx=randAtlas;\n\n        #ifdef HAS_TEXTURE_ATLASLOOKUP\n            atlasIdx=texture(texAtlasLookup,texCoord).r;\n        #endif\n\n        #ifdef ATLAS_XFADE\n            vec2 pointCoord2=vec2(origPointCoord);\n            pointCoord2.x=origPointCoord.x/atlasNumX+ceil(atlasIdx)*(1.0/atlasNumX);\n        #endif\n\n        pointCoord.x=origPointCoord.x/atlasNumX+floor(atlasIdx)*(1.0/atlasNumX);\n\n\n    #endif\n\n    {{MODULE_BEGIN_FRAG}}\n\n    if(ps<1.0)discard;\n\n    vec4 col=color;\n\n    #ifdef HAS_TEXTURE_MASK\n        float mask;\n        #ifdef TEXTURE_MASK_R\n            mask=texture(texMask,pointCoord).r;\n        #endif\n        #ifdef TEXTURE_MASK_A\n            mask=texture(texMask,pointCoord).a;\n        #endif\n        #ifdef TEXTURE_MASK_LUMI\n        \tmask = dot(texture(texMask,pointCoord).rgb, lumcoeff);\n        #endif\n\n        #ifdef ATLAS_XFADE\n            float mask2=texture(texMask,pointCoord2).r;\n\n            #ifdef TEXTURE_MASK_A\n                mask2=texture(texMask,pointCoord2).a;\n            #endif\n            #ifdef TEXTURE_MASK_LUMI\n            \tmask2 = dot(texture(texMask,pointCoord2).rgb, lumcoeff);\n            #endif\n\n            mask=mix(mask,mask2,fract(atlasIdx));\n        #endif\n    #endif\n\n    #ifdef HAS_TEXTURE_DIFFUSE\n\n        col=texture(diffTex,pointCoord);\n\n        #ifdef ATLAS_XFADE\n            vec4 col2=texture(diffTex,pointCoord2);\n            col=mix(col,col2,fract(atlasIdx));\n        #endif\n\n        #ifdef COLORIZE_TEXTURE\n            col.rgb*=color.rgb;\n        #endif\n    #endif\n\n    col.a*=color.a;\n\n\n    #ifdef MAKE_ROUND\n\n        #ifndef MAKE_ROUNDAA\n            if ((gl_PointCoord.x-0.5)*(gl_PointCoord.x-0.5) + (gl_PointCoord.y-0.5)*(gl_PointCoord.y-0.5) > 0.25) discard; //col.a=0.0;\n        #endif\n\n        #ifdef MAKE_ROUNDAA\n            float circ=(gl_PointCoord.x-0.5)*(gl_PointCoord.x-0.5) + (gl_PointCoord.y-0.5)*(gl_PointCoord.y-0.5);\n\n            float a=smoothstep(0.25,0.25-fwidth(gl_PointCoord.x),circ);\n            if(a==0.0)discard;\n            col.a=a*color.a;\n        #endif\n    #endif\n\n    #ifdef HAS_TEXTURE_COLORIZE\n        col*=colorize;\n    #endif\n\n    #ifdef TEXTURE_COLORIZE_MUL\n        col*=color;\n    #endif\n\n    #ifdef HAS_TEXTURE_MASK\n        col.a*=mask;\n    #endif\n\n    #ifdef HAS_TEXTURE_OPACITY\n        col.a*=opacity;\n    #endif\n\n    #ifdef VERTEX_COLORS\n        col.rgb = vertexColor.rgb;\n        col.a *= vertexColor.a;\n    #endif\n\n    if (col.a <= 0.0) discard;\n\n    #ifdef HAS_TEXTURE_COLORIZE\n        col*=colorize;\n    #endif\n\n    {{MODULE_COLOR}}\n\n\n    outColor = col;\n}\n","pointmat_vert":"{{MODULES_HEAD}}\n\n\n\nIN vec3 vPosition;\nIN vec2 attrTexCoord;\nIN vec3 attrVertNormal;\nIN vec3 attrTangent;\nIN vec3 attrBiTangent;\nIN float attrPointSize;\n\n#ifdef VERTEX_COLORS\n    IN vec4 attrVertColor;\n    OUT vec4 vertexColor;\n#endif\n\nOUT vec3 norm;\nOUT float ps;\n\nOUT vec2 texCoord;\n\n\n#ifdef HAS_TEXTURES\n#endif\n\n#ifdef HAS_TEXTURE_COLORIZE\n   UNI sampler2D texColorize;\n   OUT vec4 colorize;\n#endif\n#ifdef HAS_TEXTURE_OPACITY\n    UNI sampler2D texOpacity;\n    OUT float opacity;\n#endif\n\n#ifdef HAS_TEXTURE_POINTSIZE\n   UNI sampler2D texPointSize;\n   UNI float texPointSizeMul;\n#endif\n\nUNI mat4 projMatrix;\nUNI mat4 modelMatrix;\nUNI mat4 viewMatrix;\n\nUNI float pointSize;\nUNI vec3 camPos;\n\nUNI float canvasWidth;\nUNI float canvasHeight;\nUNI float camDistMul;\nUNI float randomSize;\nUNI float minPointSize;\nUNI float pixelRatio;\n\nIN float attrVertIndex;\n\nUNI float atlasNumX;\n\n#ifdef USE_ATLAS\n    OUT float randAtlas;\n#endif\n\nfloat rand(float n){return fract(sin(n) * 5711.5711123);}\n\n#define POINTMATERIAL\n\nvoid main()\n{\n    norm=attrVertNormal;\n    #ifdef PIXELSIZE\n        float psMul=1.0;\n    #endif\n\n    #ifndef PIXELSIZE\n        float psMul=sqrt(canvasWidth/canvasHeight)+0.00000000001;\n    #endif\n\n    #ifdef USE_ATLAS\n        randAtlas=atlasNumX*rand(attrVertIndex+vPosition.x);\n    #endif\n\n    vec3 tangent=attrTangent;\n    vec3 bitangent=attrBiTangent;\n\n\n    #ifdef VERTEX_COLORS\n        vertexColor=attrVertColor;\n    #endif\n\n    // #ifdef HAS_TEXTURES\n        texCoord=attrTexCoord;\n    // #endif\n\n    #ifdef HAS_TEXTURE_OPACITY\n        // opacity=texture(texOpacity,vec2(rand(attrVertIndex+texCoord.x*texCoord.y+texCoord.y+texCoord.x),rand(texCoord.y*texCoord.x-texCoord.x-texCoord.y-attrVertIndex))).r;\n        opacity=texture(texOpacity,texCoord).r;\n    #endif\n\n\n    #ifdef HAS_TEXTURE_COLORIZE\n        #ifdef RANDOM_COLORIZE\n            colorize=texture(texColorize,vec2(rand(attrVertIndex+texCoord.x*texCoord.y+texCoord.y+texCoord.x),rand(texCoord.y*texCoord.x-texCoord.x-texCoord.y-attrVertIndex)));\n        #endif\n        #ifndef RANDOM_COLORIZE\n            colorize=texture(texColorize,texCoord);\n        #endif\n    #endif\n\n\n\n\n\n    mat4 mMatrix=modelMatrix;\n    vec4 pos = vec4( vPosition, 1. );\n\n    gl_PointSize=0.0;\n\n    {{MODULE_VERTEX_POSITION}}\n\n    vec4 model=mMatrix * pos;\n\n    psMul+=rand(texCoord.x*texCoord.y+texCoord.y*3.0+texCoord.x*2.0+attrVertIndex)*randomSize;\n\n    float addPointSize=0.0;\n    #ifdef HAS_TEXTURE_POINTSIZE\n\n        #ifdef POINTSIZE_CHAN_R\n            addPointSize=texture(texPointSize,texCoord).r;\n        #endif\n        #ifdef POINTSIZE_CHAN_G\n            addPointSize=texture(texPointSize,texCoord).g;\n        #endif\n        #ifdef POINTSIZE_CHAN_B\n            addPointSize=texture(texPointSize,texCoord).b;\n        #endif\n\n        #ifdef DOTSIZEREMAPABS\n            addPointSize=1.0-(distance(addPointSize,0.5)*2.0);\n            addPointSize=addPointSize*addPointSize*addPointSize*2.0;\n        #endif\n\n        addPointSize*=texPointSizeMul;\n\n    #endif\n\n    ps=0.0;\n    #ifndef SCALE_BY_DISTANCE\n        ps = (pointSize+addPointSize+attrPointSize) * psMul;\n    #endif\n    #ifdef SCALE_BY_DISTANCE\n        float cameraDist = distance(model.xyz, camPos);\n        ps = ( (pointSize+addPointSize+attrPointSize) / cameraDist) * psMul;\n    #endif\n    ps=max(minPointSize,ps);\n    ps*=pixelRatio;\n\n    gl_PointSize += ps;\n\n\n    gl_Position = projMatrix * viewMatrix * model;\n}\n",};
const cgl = op.patch.cgl;

const
    render = op.inTrigger("render"),
    pointSize = op.inValueFloat("PointSize", 3),
    inPixelSize = op.inBool("Size in Pixels", false),
    randomSize = op.inValue("Random Size", 0),
    makeRound = op.inValueBool("Round", true),
    makeRoundAA = op.inValueBool("Round Antialias", false),
    doScale = op.inValueBool("Scale by Distance", false),
    r = op.inValueSlider("r", Math.random()),
    g = op.inValueSlider("g", Math.random()),
    b = op.inValueSlider("b", Math.random()),
    a = op.inValueSlider("a", 1),
    vertCols = op.inBool("Vertex Colors", false),
    texture = op.inTexture("texture"),
    textureMulColor = op.inBool("Colorize Texture"),
    textureMask = op.inTexture("Texture Mask"),
    texMaskChan = op.inSwitch("Mask Channel", ["R", "A", "Luminance"], "R"),
    textureColorize = op.inTexture("Texture Colorize"),
    colorizeRandom = op.inValueBool("Colorize Randomize", false),
    textureOpacity = op.inTexture("Texture Opacity"),
    texturePointSize = op.inTexture("Texture Point Size"),
    texturePointSizeChannel = op.inSwitch("Point Size Channel", ["R", "G", "B"], "R"),
    texturePointSizeMul = op.inFloat("Texture Point Size Mul", 1),
    texturePointSizeMap = op.inSwitch("Map Size 0", ["Black", "Grey"], "Black"),
    flipTex = op.inValueBool("Flip Texture", false),

    inAtlasXFade = op.inBool("Atlas Cross Fade", false),
    inAtlasRepeatX = op.inFloat("Atlas Repeat X ", 1),
    inAtlasLookupTex = op.inTexture("Atlas Lookup"),
    inRotTex = op.inTexture("Rotate Texture"),
    minPointSize = op.inValueFloat("Min Point Size", 0),

    trigger = op.outTrigger("trigger"),
    shaderOut = op.outObject("shader", null, "shader");

op.setPortGroup("Texture", [texture, textureMulColor, textureMask, texMaskChan, textureColorize, textureOpacity, colorizeRandom]);
op.setPortGroup("Color", [r, g, b, a, vertCols]);
op.setPortGroup("Size", [pointSize, randomSize, makeRound, makeRoundAA, doScale, inPixelSize, texturePointSize, texturePointSizeMul, texturePointSizeChannel, texturePointSizeMap]);

op.setPortGroup("Atlas", [inAtlasRepeatX, inAtlasLookupTex, inAtlasXFade]);

r.setUiAttribs({ "colorPick": true });

const shader = new CGL.Shader(cgl, "PointMaterial", this);
shader.setModules(["MODULE_VERTEX_POSITION", "MODULE_COLOR", "MODULE_BEGIN_FRAG"]);
shader.define("MAKE_ROUND");

op.toWorkPortsNeedToBeLinked(render);

const
    uniPointSize = new CGL.Uniform(shader, "f", "pointSize", pointSize),
    texturePointSizeMulUniform = new CGL.Uniform(shader, "f", "texPointSizeMul", texturePointSizeMul),
    uniRandomSize = new CGL.Uniform(shader, "f", "randomSize", randomSize),
    uniMinPointSize = new CGL.Uniform(shader, "f", "minPointSize", minPointSize),
    uniColor = new CGL.Uniform(shader, "4f", "color", r, g, b, a),
    uniRandAtlasX = new CGL.Uniform(shader, "f", "atlasNumX", inAtlasRepeatX),
    uniDpr = new CGL.Uniform(shader, "f", "pixelRatio", 1),
    uniWidth = new CGL.Uniform(shader, "f", "canvasWidth", cgl.canvasWidth),
    uniHeight = new CGL.Uniform(shader, "f", "canvasHeight", cgl.canvasHeight),
    textureUniform = new CGL.Uniform(shader, "t", "diffTex"),
    textureColorizeUniform = new CGL.Uniform(shader, "t", "texColorize"),
    textureOpacityUniform = new CGL.Uniform(shader, "t", "texOpacity"),
    textureColoPointSize = new CGL.Uniform(shader, "t", "texPointSize"),
    texturePointSizeUniform = new CGL.Uniform(shader, "t", "texPointSize"),
    textureMaskUniform = new CGL.Uniform(shader, "t", "texMask"),
    textureAtlasLookupUniform = new CGL.Uniform(shader, "t", "texAtlasLookup"),
    texRotUni = new CGL.Uniform(shader, "t", "texRot");

shader.setSource(attachments.pointmat_vert, attachments.pointmat_frag);
shader.glPrimitive = cgl.gl.POINTS;
shaderOut.set(shader);
shaderOut.ignoreValueSerialize = true;

doScale.onChange =
    inAtlasRepeatX.onChange =
    makeRound.onChange =
    makeRoundAA.onChange =
    texture.onChange =
    textureColorize.onChange =
    textureMask.onChange =
    colorizeRandom.onChange =
    flipTex.onChange =
    texMaskChan.onChange =
    inPixelSize.onChange =
    textureOpacity.onChange =
    texturePointSize.onChange =
    texturePointSizeMap.onChange =
    texturePointSizeChannel.onChange =
    textureMulColor.onChange =
    inAtlasLookupTex.onLinkChanged =
    inRotTex.onLinkChanged =
    vertCols.onChange = updateDefines;

render.onTriggered = doRender;
updateUi();

op.preRender = function ()
{
    if (shader)shader.bind();
    doRender();
};

function doRender()
{
    uniWidth.setValue(cgl.canvasWidth);
    uniHeight.setValue(cgl.canvasHeight);

    cgl.pushShader(shader);
    shader.popTextures();
    if (texture.get() && !texture.get().deleted) shader.pushTexture(textureUniform, texture.get());
    if (textureMask.get()) shader.pushTexture(textureMaskUniform, textureMask.get());
    if (textureColorize.get()) shader.pushTexture(textureColorizeUniform, textureColorize.get());
    if (textureOpacity.get()) shader.pushTexture(textureOpacityUniform, textureOpacity.get());
    if (texturePointSize.get()) shader.pushTexture(texturePointSizeUniform, texturePointSize.get());
    if (inAtlasLookupTex.get()) shader.pushTexture(textureAtlasLookupUniform, inAtlasLookupTex.get());
    if (inRotTex.get()) shader.pushTexture(texRotUni, inRotTex.get());

    uniDpr.set(cgl.pixelDensity);

    trigger.trigger();

    cgl.popShader();
}

function useAtlas()
{
    return inAtlasRepeatX.get() > 0 || inAtlasLookupTex.isLinked();
}

function updateUi()
{
    inAtlasRepeatX.setUiAttribs({ "greyout": !useAtlas() });
    texMaskChan.setUiAttribs({ "greyout": !textureMask.isLinked() });

    texturePointSizeChannel.setUiAttribs({ "greyout": !texturePointSize.isLinked() });
    texturePointSizeMul.setUiAttribs({ "greyout": !texturePointSize.isLinked() });
    texturePointSizeMap.setUiAttribs({ "greyout": !texturePointSize.isLinked() });
}

function updateDefines()
{
    shader.toggleDefine("USE_ATLAS", useAtlas());

    shader.toggleDefine("SCALE_BY_DISTANCE", doScale.get());
    shader.toggleDefine("MAKE_ROUND", makeRound.get());
    shader.toggleDefine("MAKE_ROUNDAA", makeRoundAA.get());

    shader.toggleDefine("ATLAS_XFADE", inAtlasXFade.get());

    shader.toggleDefine("VERTEX_COLORS", vertCols.get());
    shader.toggleDefine("RANDOM_COLORIZE", colorizeRandom.get());
    shader.toggleDefine("HAS_TEXTURE_DIFFUSE", texture.get());
    shader.toggleDefine("HAS_TEXTURE_MASK", textureMask.isLinked());
    shader.toggleDefine("HAS_TEXTURE_COLORIZE", textureColorize.isLinked());
    shader.toggleDefine("HAS_TEXTURE_OPACITY", textureOpacity.isLinked());
    shader.toggleDefine("HAS_TEXTURE_POINTSIZE", texturePointSize.isLinked());
    shader.toggleDefine("HAS_TEXTURE_ATLASLOOKUP", inAtlasLookupTex.isLinked());
    shader.toggleDefine("HAS_TEXTURE_ROT", inRotTex.isLinked());

    shader.toggleDefine("TEXTURE_COLORIZE_MUL", textureMulColor.get());

    shader.toggleDefine("FLIP_TEX", flipTex.get());
    shader.toggleDefine("TEXTURE_MASK_R", texMaskChan.get() == "R");
    shader.toggleDefine("TEXTURE_MASK_A", texMaskChan.get() == "A");
    shader.toggleDefine("TEXTURE_MASK_LUMI", texMaskChan.get() == "Luminance");
    shader.toggleDefine("PIXELSIZE", inPixelSize.get());

    shader.toggleDefine("POINTSIZE_CHAN_R", texturePointSizeChannel.get() == "R");
    shader.toggleDefine("POINTSIZE_CHAN_G", texturePointSizeChannel.get() == "G");
    shader.toggleDefine("POINTSIZE_CHAN_B", texturePointSizeChannel.get() == "B");

    shader.toggleDefine("DOTSIZEREMAPABS", texturePointSizeMap.get() == "Grey");
    updateUi();
}


};

Ops.Gl.Shader.PointMaterial_v6.prototype = new CABLES.Op();
CABLES.OPS["e44df958-00c7-46e4-95bb-3e6ac6c4188f"]={f:Ops.Gl.Shader.PointMaterial_v6,objName:"Ops.Gl.Shader.PointMaterial_v6"};




// **************************************************************
// 
// Ops.Gl.Meshes.PointCloudFromArray_v2
// 
// **************************************************************

Ops.Gl.Meshes.PointCloudFromArray_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    exe = op.inTrigger("exe"),
    arr = op.inArray("Array", 3),
    numPoints = op.inValueInt("Num Points"),
    outTrigger = op.outTrigger("Trigger out"),
    outGeom = op.outObject("Geometry"),
    pTexCoordRand = op.inValueBool("Scramble Texcoords", true),
    seed = op.inValue("Seed", 1),
    inCoords = op.inArray("Coordinates", 2),
    inPointSizes = op.inArray("Point sizes", 1),
    vertCols = op.inArray("Vertex Colors", 4);

op.toWorkPortsNeedToBeLinked(arr, exe);
op.setPortGroup("Texture Coordinates", [pTexCoordRand, seed, inCoords]);

const cgl = op.patch.cgl;
const geom = new CGL.Geometry("pointcloudfromarray");
let deactivated = false;
let mesh = null;
let texCoords = [];
let needsRebuild = true;
let showingError = false;

arr.setUiAttribs({ "title": "Positions" });
inCoords.setUiAttribs({ "title": "Texture Coordinates" });

op.onDelete = disposeMesh;

inCoords.onChange =
    pTexCoordRand.onChange = updateTexCoordsPorts;
vertCols.onChange = updateVertCols;
numPoints.onChange = updateNumVerts;
inPointSizes.onChange = updatePointSizes;

seed.onChange =
    arr.onChange =
    vertCols.onLinkChanged =
    inPointSizes.onLinkChanged = reset;

exe.onTriggered = doRender;

function doRender()
{
    let shader = cgl.getShader();

    if (CABLES.UI && shader)
    {
        if (shader.glPrimitive != cgl.gl.POINTS) op.setUiError("nopointmat", "Using a Material not made for point rendering. Try to use PointMaterial.");
        else op.setUiError("nopointmat", null);
    }

    if (needsRebuild || !mesh) rebuild();
    if (!deactivated && mesh) mesh.render(shader);
    outTrigger.trigger();
}

function reset()
{
    deactivated = arr.get() == null;

    if (!deactivated)needsRebuild = true;
    else needsRebuild = false;
}

function updateTexCoordsPorts()
{
    if (inCoords.isLinked())
    {
        seed.setUiAttribs({ "greyout": true });
        pTexCoordRand.setUiAttribs({ "greyout": true });
    }
    else
    {
        pTexCoordRand.setUiAttribs({ "greyout": false });

        if (!pTexCoordRand.get()) seed.setUiAttribs({ "greyout": true });
        else seed.setUiAttribs({ "greyout": false });
    }

    disposeMesh();
    needsRebuild = true;
}

function updatePointSizes()
{
    if (!inPointSizes.get()) return;

    if (!geom.getAttribute("attrPointSize")) reset();

    if (mesh)mesh.setAttribute("attrPointSize", inPointSizes.get(), 1);
}

function updateVertCols()
{
    needsRebuild = true;
}

function updateNumVerts()
{
    if (mesh)
    {
        mesh.setNumVertices(Math.min(geom.vertices.length / 3, numPoints.get()));
        if (numPoints.get() == 0)mesh.setNumVertices(geom.vertices.length / 3);
    }
}

function disposeMesh()
{
    if (mesh)mesh.dispose();
    mesh = null;
}

function rebuild()
{
    let verts = arr.get() || [];

    if (verts.length % 3 !== 0)
    {
        op.setUiError("div3", "Array length not multiple of 3");

        return;
    }
    else op.setUiError("div3", null);

    if (geom.vertices.length == verts.length && mesh && !inCoords.isLinked() && !vertCols.isLinked() && !geom.getAttribute("attrPointSize"))
    {
        mesh.setAttribute(CGL.SHADERVAR_VERTEX_POSITION, verts, 3);
        geom.vertices = verts;
        needsRebuild = false;

        return;
    }

    // if (geom.getAttribute("attrPointSize" && inPointSizes.isLinked())) changed = true;

    geom.clear();
    let num = verts.length / 3;
    num = Math.abs(Math.floor(num));

    if (num == 0) return;

    if (!texCoords || texCoords.length != num * 2) texCoords = new Float32Array(num * 2); // num*2;//=

    let rndTc = pTexCoordRand.get();

    if (!inCoords.isLinked())
    {
        Math.randomSeed = seed.get();
        texCoords = []; // needed otherwise its using the reference to input incoords port

        for (let i = 0; i < num; i++)
        {
            if (geom.vertices[i * 3] != verts[i * 3] ||
                geom.vertices[i * 3 + 1] != verts[i * 3 + 1] ||
                geom.vertices[i * 3 + 2] != verts[i * 3 + 2])
            {
                if (rndTc)
                {
                    texCoords[i * 2] = Math.seededRandom();
                    texCoords[i * 2 + 1] = Math.seededRandom();
                }
                else
                {
                    texCoords[i * 2] = i / num;
                    texCoords[i * 2 + 1] = i / num;
                }
            }
        }
    }

    if (vertCols.get())
    {
        if (vertCols.get().length != num * 4)
        {
            op.setUiError("vertColWrongLength", "Color array does not have the correct length! (should be " + num * 4 + ")");

            disposeMesh();
            return;
        }
        else op.setUiError("vertColWrongLength", null);

        geom.vertexColors = vertCols.get();
    }
    else
    {
        op.setUiError("vertColWrongLength", null);
        geom.vertexColors = [];
    }

    if (inPointSizes.get())
    {
        if (inPointSizes.get().length != num)
        {
            op.setUiError("pointsizeWrongLength", "Color array does not have the correct length! (should be " + num + ")");
            disposeMesh();
            return;
        }
        else op.setUiError("pointsizeWrongLength", null);

        geom.setAttribute("attrPointSize", inPointSizes.get(), 1);
    }
    else
    {
        op.setUiError("pointsizeWrongLength", null);
        geom.setAttribute("attrPointSize", [], 1);
    }

    if (inCoords.isLinked()) texCoords = inCoords.get();

    geom.setPointVertices(verts);
    geom.setTexCoords(texCoords);

    if (!mesh)mesh = new CGL.Mesh(cgl, geom, { "glPrimitive": cgl.gl.POINTS });

    mesh.addVertexNumbers = true;
    mesh.setGeom(geom);

    outGeom.setRef(geom);

    updateNumVerts();
    needsRebuild = false;
}


};

Ops.Gl.Meshes.PointCloudFromArray_v2.prototype = new CABLES.Op();
CABLES.OPS["53bc6de5-8d22-4687-9f03-ccfd3e50d106"]={f:Ops.Gl.Meshes.PointCloudFromArray_v2,objName:"Ops.Gl.Meshes.PointCloudFromArray_v2"};




// **************************************************************
// 
// Ops.Trigger.TriggerButton
// 
// **************************************************************

Ops.Trigger.TriggerButton = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    inTrig = op.inTriggerButton("Trigger"),
    outTrig = op.outTrigger("Next");

inTrig.onTriggered = function ()
{
    outTrig.trigger();
};


};

Ops.Trigger.TriggerButton.prototype = new CABLES.Op();
CABLES.OPS["21630924-39e4-4df5-9965-b9136510d156"]={f:Ops.Trigger.TriggerButton,objName:"Ops.Trigger.TriggerButton"};




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
// Ops.Array.ArrayUnpack3
// 
// **************************************************************

Ops.Array.ArrayUnpack3 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const inArray1 = op.inArray("Array in xyz"),
    outArray1 = op.outArray("Array 1 out"),
    outArray2 = op.outArray("Array 2 out"),
    outArray3 = op.outArray("Array 3 out"),
    outArrayLength = op.outNumber("Array lengths");

let showingError = false;

const arr1 = [];
const arr2 = [];
const arr3 = [];

inArray1.onChange = update;

function update()
{
    let array1 = inArray1.get();

    if (!array1)
    {
        outArray1.set(null);
        return;
    }

    if (array1.length % 3 !== 0)
    {
        if (!showingError)
        {
            op.uiAttr({ "error": "Arrays length not divisible by 3 !" });
            outArrayLength.set(0);
            showingError = true;
        }
        return;
    }

    if (showingError)
    {
        showingError = false;
        op.uiAttr({ "error": null });
    }

    arr1.length = Math.floor(array1.length / 3);
    arr2.length = Math.floor(array1.length / 3);
    arr3.length = Math.floor(array1.length / 3);

    for (let i = 0; i < array1.length / 3; i++)
    {
        arr1[i] = array1[i * 3];
        arr2[i] = array1[i * 3 + 1];
        arr3[i] = array1[i * 3 + 2];
    }

    // outArray1.set(null);
    // outArray2.set(null);
    // outArray3.set(null);
    outArray1.setRef(arr1);
    outArray2.setRef(arr2);
    outArray3.setRef(arr3);
    outArrayLength.set(arr1.length);
}


};

Ops.Array.ArrayUnpack3.prototype = new CABLES.Op();
CABLES.OPS["fa671f66-6957-41e6-ac35-d615b7c29285"]={f:Ops.Array.ArrayUnpack3,objName:"Ops.Array.ArrayUnpack3"};




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
// Ops.Trigger.DelayedTrigger
// 
// **************************************************************

Ops.Trigger.DelayedTrigger = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    exe = op.inTrigger("exe"),
    delay = op.inValueFloat("delay", 1),
    cancel = op.inTriggerButton("Cancel"),
    next = op.outTrigger("next"),
    outDelaying = op.outBool("Delaying");

let lastTimeout = null;

cancel.onTriggered = function ()
{
    if (lastTimeout)clearTimeout(lastTimeout);
    lastTimeout = null;
};

exe.onTriggered = function ()
{
    outDelaying.set(true);
    if (lastTimeout)clearTimeout(lastTimeout);

    lastTimeout = setTimeout(
        function ()
        {
            outDelaying.set(false);
            lastTimeout = null;
            next.trigger();
        },
        delay.get() * 1000);
};


};

Ops.Trigger.DelayedTrigger.prototype = new CABLES.Op();
CABLES.OPS["f4ff66b0-8500-46f7-9117-832aea0c2750"]={f:Ops.Trigger.DelayedTrigger,objName:"Ops.Trigger.DelayedTrigger"};




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
// Ops.Gl.GradientTexture
// 
// **************************************************************

Ops.Gl.GradientTexture = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
// STOP UPDATING THIS OP ... use Ops.Color.GradientColorArray

const inGrad = op.inGradient("Gradient"),
    inDir = op.inValueSelect("Direction", ["X", "XX", "Y", "YY", "XY", "YX", "Radial"], "X"),
    inSmoothstep = op.inValueBool("Smoothstep", false),
    inStep = op.inBool("Step", false),
    inFlip = op.inBool("Flip", false),
    inSRGB = op.inBool("sRGB", false),
    inOklab = op.inBool("Oklab", false),
    inSize = op.inValueInt("Size", 256),
    tfilter = op.inSwitch("filter", ["nearest", "linear", "mipmap"], "linear"),
    twrap = op.inValueSelect("wrap", ["clamp to edge", "repeat", "mirrored repeat"], "clamp to edge"),
    inNoise = op.inFloatSlider("Dither", 0),
    inGradArray = op.inArray("Gradient Array"),
    inRandom = op.inTriggerButton("Randomize Colors"),
    outTex = op.outTexture("Texture"),
    outColors = op.outArray("Colors", null, 3),
    outColorPos = op.outArray("Colors Pos", null, 1);

const cgl = op.patch.cgl;
let timeout = null;
inGrad.setUiAttribs({ "editShortcut": true });

const bluenoise = [221, 125, 40, 94, 163, 50, 214, 174, 69, 229, 135, 79, 25, 92, 217, 129, 103, 155, 16, 237, 168, 75, 212, 126, 203, 157, 104, 223, 50, 96, 115, 189, 0, 104, 199, 16, 185, 242, 83, 26, 123, 95, 191, 175, 247, 159, 32, 170, 0, 88, 203, 133, 106, 46, 227, 14, 35, 246, 66, 20, 240, 205, 36, 159, 74, 252, 148, 231, 132, 117, 6, 145, 254, 39, 222, 5, 111, 46, 67, 197, 228, 116, 181, 66, 25, 245, 98, 139, 172, 89, 190, 149, 127, 177, 64, 138, 210, 169, 58, 28, 70, 100, 206, 188, 164, 107, 60, 150, 203, 126, 235, 142, 56, 249, 38, 222, 148, 178, 195, 56, 115, 230, 45, 108, 7, 84, 234, 21, 44, 90, 110, 216, 178, 37, 226, 53, 14, 77, 212, 31, 86, 180, 100, 23, 82, 14, 162, 93, 122, 6, 81, 156, 24, 209, 75, 255, 163, 218, 196, 121, 237, 187, 9, 152, 247, 136, 158, 91, 128, 232, 169, 137, 251, 10, 216, 154, 188, 131, 211, 71, 200, 34, 236, 216, 129, 13, 179, 136, 32, 54, 99, 146, 33, 131, 202, 49, 84, 18, 64, 197, 245, 114, 21, 193, 52, 74, 118, 44, 243, 105, 173, 50, 252, 110, 63, 166, 41, 102, 199, 62, 117, 184, 15, 77, 250, 162, 69, 120, 231, 107, 213, 2, 177, 43, 67, 102, 159, 238, 171, 206, 64, 29, 233, 10, 151, 135, 185, 87, 247, 147, 223, 91, 241, 152, 225, 175, 3, 102, 220, 25, 191, 170, 36, 143, 81, 152, 209, 224, 133, 35, 93, 2, 145, 87, 124, 193, 97, 22, 228, 1, 120, 51, 171, 8, 26, 210, 108, 48, 205, 59, 179, 92, 147, 253, 124, 99, 237, 186, 11, 120, 19, 181, 229, 112, 198, 160, 220, 76, 42, 210, 160, 71, 202, 31, 78, 190, 130, 67, 86, 138, 115, 156, 243, 14, 46, 74, 57, 219, 28, 51, 90, 250, 59, 81, 140, 47, 255, 17, 58, 181, 243, 114, 56, 178, 239, 139, 228, 156, 251, 40, 167, 232, 28, 38, 82, 136, 206, 161, 9, 196, 106, 139, 167, 204, 150, 195, 218, 70, 172, 35, 132, 103, 146, 27, 89, 128, 16, 107, 96, 57, 119, 201, 15, 187, 239, 126, 194, 225, 112, 182, 234, 131, 174, 240, 72, 39, 109, 29, 8, 100, 122, 207, 231, 4, 166, 224, 198, 153, 217, 44, 183, 212, 4, 93, 143, 72, 99, 172, 64, 0, 97, 34, 85, 66, 20, 208, 3, 125, 243, 164, 186, 235, 156, 82, 191, 67, 248, 49, 80, 10, 253, 68, 23, 162, 244, 179, 49, 215, 24, 151, 246, 51, 214, 153, 251, 118, 45, 157, 98, 224, 53, 88, 134, 62, 42, 23, 116, 94, 140, 33, 121, 188, 169, 141, 113, 76, 33, 131, 227, 110, 11, 202, 78, 122, 168, 18, 141, 194, 221, 80, 187, 142, 177, 210, 18, 249, 144, 221, 180, 12, 201, 215, 106, 60, 91, 226, 200, 236, 150, 85, 61, 164, 185, 133, 42, 229, 187, 73, 55, 101, 27, 235, 59, 12, 35, 75, 113, 199, 101, 163, 237, 57, 152, 174, 234, 134, 1, 37, 53, 123, 193, 6, 208, 253, 34, 91, 145, 104, 8, 240, 211, 175, 129, 164, 109, 253, 123, 230, 171, 6, 50, 79, 27, 127, 73, 43, 19, 246, 161, 211, 103, 17, 172, 96, 46, 117, 70, 241, 219, 27, 162, 115, 88, 38, 4, 148, 204, 92, 189, 154, 63, 130, 217, 188, 111, 254, 208, 101, 86, 191, 144, 75, 180, 249, 65, 137, 233, 157, 18, 171, 192, 49, 66, 201, 137, 246, 218, 51, 71, 15, 43, 214, 29, 95, 239, 38, 139, 165, 7, 225, 124, 30, 59, 112, 221, 154, 28, 197, 217, 106, 58, 85, 209, 128, 232, 151, 15, 79, 182, 120, 238, 168, 134, 81, 248, 146, 173, 16, 88, 195, 65, 150, 183, 205, 242, 11, 41, 89, 126, 80, 8, 183, 121, 141, 3, 98, 180, 31, 108, 58, 196, 97, 24, 222, 107, 198, 2, 116, 70, 207, 52, 230, 22, 109, 47, 80, 165, 132, 199, 235, 170, 52, 148, 247, 165, 23, 242, 74, 45, 254, 170, 226, 155, 36, 142, 179, 60, 158, 48, 182, 223, 154, 124, 98, 178, 250, 140, 5, 231, 96, 68, 19, 116, 204, 32, 227, 43, 200, 113, 161, 213, 122, 87, 0, 130, 248, 77, 13, 241, 92, 229, 30, 102, 13, 244, 77, 160, 33, 209, 119, 55, 176, 143, 190, 255, 103, 71, 93, 186, 62, 223, 145, 12, 189, 68, 202, 47, 211, 114, 192, 41, 127, 203, 141, 65, 189, 40, 135, 198, 61, 89, 222, 158, 24, 216, 45, 1, 157, 213, 130, 239, 83, 104, 26, 55, 134, 238, 29, 159, 95, 63, 167, 149, 7, 78, 255, 119, 166, 212, 1, 233, 19, 105, 186, 37, 244, 110, 86, 135, 56, 173, 11, 151, 36, 176, 196, 230, 94, 149, 109, 184, 226, 20, 236, 215, 105, 175, 22, 219, 52, 87, 111, 174, 128, 248, 149, 78, 125, 63, 184, 227, 242, 118, 22, 220, 138, 252, 119, 76, 168, 39, 250, 10, 136, 84, 123, 54, 69, 194, 37, 95, 147, 241, 73, 153, 48, 68, 7, 194, 17, 207, 161, 31, 76, 201, 90, 166, 69, 4, 48, 215, 21, 204, 57, 73, 176, 200, 30, 249, 155, 133, 233, 163, 9, 197, 32, 183, 220, 205, 137, 232, 167, 94, 144, 9, 105, 181, 44, 111, 207, 99, 132, 155, 182, 85, 127, 219, 147, 42, 97, 184, 5, 83, 208, 108, 61, 125, 228, 21, 100, 39, 90, 114, 53, 218, 41, 252, 129, 61, 234, 143, 30, 192, 245, 12, 112, 236, 101, 2, 244, 113, 165, 225, 118, 47, 20, 176, 251, 142, 84, 117, 160, 254, 177, 26, 238, 121, 72, 193, 213, 153, 13, 55, 173, 79, 224, 65, 140, 34, 195, 158, 54, 17, 206, 62, 144, 240, 190, 72, 40, 214, 54, 192, 5, 146, 60, 82, 185, 3, 138, 169, 25, 83, 245];
const bluenoiseSize = 32;

inNoise.onChange =
twrap.onChange =
    tfilter.onChange =
    inStep.onChange =
    inFlip.onChange =
    inSRGB.onChange =
    inOklab.onChange =
    inSize.onChange =
    inGrad.onChange =
    inSmoothstep.onChange =
    inDir.onChange =
    inGradArray.onChange = update;

inGrad.set("{\"keys\" : [{\"pos\":0,\"r\":0,\"g\":0,\"b\":0},{\"pos\":1,\"r\":1,\"g\":1,\"b\":1}]}");

op.onLoaded = update;

inRandom.onTriggered = () =>
{
    const keys = parseKeys();
    if (keys)
    {
        keys.forEach((key) =>
        {
            key.r = Math.random();
            key.g = Math.random();
            key.b = Math.random();
        });
        const newKeys = JSON.stringify({ "keys": keys });
        inGrad.set(newKeys);
    }
};

function rgbToOklab(r, g, b)
{
    let l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
    let m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
    let s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
    l = Math.cbrt(l); m = Math.cbrt(m); s = Math.cbrt(s);
    return [
        l * +0.2104542553 + m * +0.7936177850 + s * -0.0040720468,
        l * +1.9779984951 + m * -2.4285922050 + s * +0.4505937099,
        l * +0.0259040371 + m * +0.7827717662 + s * -0.8086757660
    ];
}

function oklabToRGB(L, a, b)
{
    let l = L + a * +0.3963377774 + b * +0.2158037573;
    let m = L + a * -0.1055613458 + b * -0.0638541728;
    let s = L + a * -0.0894841775 + b * -1.2914855480;
    l **= 3; m **= 3; s **= 3;
    let rgb_r = l * +4.0767416621 + m * -3.3077115913 + s * +0.2309699292;
    let rgb_g = l * -1.2684380046 + m * +2.6097574011 + s * -0.3413193965;
    let rgb_b = l * -0.0041960863 + m * -0.7034186147 + s * +1.7076147010;
    rgb_r = CABLES.clamp(rgb_r, 0, 1); rgb_g = CABLES.clamp(rgb_g, 0, 1); rgb_b = CABLES.clamp(rgb_b, 0, 1);
    return [rgb_r, rgb_g, rgb_b];
}

function lin2srgb(r, g, b)
{
    r /= 255;
    const thr = 0.0031308;
    let c_loR = 12.92 * r;
    let c_hiR = 1.055 * Math.pow(r, 0.41666) - 0.055;
    return ((r < thr) ? c_loR : c_hiR) * 255;
}

function update()
{
    cgl.addNextFrameOnceCallback(doUpdate);
}

function doUpdate()
{
    const keys = parseKeys();
    if (keys) updateGradient(keys);
}

function parseKeys()
{
    let keys = null;
    op.setUiError("nodata", null);
    op.setUiError("parse", null);

    if (Array.isArray(inGradArray.get()))
    {
        keys = inGradArray.get();
    }
    else
    {
        let grad = null;
        if (!inGrad.get() || inGrad.get() === "")
        {
            // op.setUiError("nodata", "gradient no data");
            return null;
        }

        try
        {
            grad = JSON.parse(inGrad.get());
        }
        catch (e)
        {
            op.setUiError("parse", "could not parse gradient data");
        }

        if (!grad || !grad.keys)
        {
            op.setUiError("nodata", "gradient no data");
            return null;
        }
        keys = grad.keys;
    }
    return keys;
}

function noise(x, y)
{
    x %= bluenoiseSize;
    y %= bluenoiseSize;

    return bluenoise[x + y * bluenoiseSize] / 255 - 0.5;
}

function addNoise(pixels, width, height)
{
    if (inNoise.get() == 0.0) return pixels;

    for (let x = 0; x < width; x++)
        for (let y = 0; y < height; y++)
        {
            const r1 = pixels[(x + (y * width)) * 4 + 0];
            const g1 = pixels[(x + (y * width)) * 4 + 1];
            const b1 = pixels[(x + (y * width)) * 4 + 2];

            let offX = (width / 8) * inNoise.get() * noise(x, y);
            let offY = (height / 8) * inNoise.get() * noise(x + bluenoiseSize / 2, y + bluenoiseSize / 2);

            if (height == 1) offY = 0;
            if (width == 1) offX = 0;

            offX = Math.round(offX);
            offY = Math.round(offY);

            const yOffY = CABLES.clamp(y + offY, 0, height - 1);
            const xOffX = CABLES.clamp(x + offX, 0, width - 1);

            const r2 = pixels[(xOffX + ((yOffY) * width)) * 4 + 0];
            const g2 = pixels[(xOffX + ((yOffY) * width)) * 4 + 1];
            const b2 = pixels[(xOffX + ((yOffY) * width)) * 4 + 2];

            pixels[(x + y * width) * 4 + 0] = r2;
            pixels[(x + y * width) * 4 + 1] = g2;
            pixels[(x + y * width) * 4 + 2] = b2;

            pixels[(xOffX + ((yOffY) * width)) * 4 + 0] = r1;
            pixels[(xOffX + ((yOffY) * width)) * 4 + 1] = g1;
            pixels[(xOffX + ((yOffY) * width)) * 4 + 2] = b1;
        }
    return pixels;
}

function updateGradient(keys)
{
    let width = Math.round(inSize.get());
    if (width < 4) width = 4;

    inGrad.setUiAttribs(
        {
            "editShortcut": true,
            "gradEditSmoothstep": inSmoothstep.get(),
            "gradEditStep": inStep.get(),
            "gradOklab": inOklab.get()
        });

    let selectedWrap = 0;
    let selectedFilter = 0;
    if (twrap.get() == "repeat") selectedWrap = CGL.Texture.WRAP_REPEAT;
    else if (twrap.get() == "mirrored repeat") selectedWrap = CGL.Texture.WRAP_MIRRORED_REPEAT;
    else if (twrap.get() == "clamp to edge") selectedWrap = CGL.Texture.WRAP_CLAMP_TO_EDGE;

    if (tfilter.get() == "nearest") selectedFilter = CGL.Texture.FILTER_NEAREST;
    else if (tfilter.get() == "linear") selectedFilter = CGL.Texture.FILTER_LINEAR;
    else if (tfilter.get() == "mipmap") selectedFilter = CGL.Texture.FILTER_MIPMAP;

    const tex = new CGL.Texture(cgl);

    let pixels = new Uint8Array(width * 4);

    for (let i = 0; i < keys.length - 1; i++)
    {
        const keyA = keys[i];
        const keyB = keys[i + 1];

        for (let x = keyA.pos * width; x < keyB.pos * width; x++)
        {
            let p = CABLES.map(x, keyA.pos * width, keyB.pos * width, 0, 1);
            if (inStep.get())p = Math.round(p);
            if (inSmoothstep.get()) p = CABLES.smoothStep(p);
            x = Math.round(x);

            let xx = x;
            if (inFlip.get())xx = width - x - 1;

            if (inOklab.get())
            {
                const klabA = rgbToOklab(keyA.r, keyA.g, keyA.b);
                const labA_r = klabA[0];
                const labA_g = klabA[1];
                const labA_b = klabA[2];

                const klabB = rgbToOklab(keyB.r, keyB.g, keyB.b);
                const labB_r = klabB[0];
                const labB_g = klabB[1];
                const labB_b = klabB[2];

                const l = ((p * labB_r + (1.0 - p) * labA_r));
                const a = ((p * labB_g + (1.0 - p) * labA_g));
                const b = ((p * labB_b + (1.0 - p) * labA_b));

                const pixCol = oklabToRGB(l, a, b);
                pixels[xx * 4 + 0] = Math.round(pixCol[0] * 255);
                pixels[xx * 4 + 1] = Math.round(pixCol[1] * 255);
                pixels[xx * 4 + 2] = Math.round(pixCol[2] * 255);
            }
            else
            {
                pixels[xx * 4 + 0] = Math.round((p * keyB.r + (1.0 - p) * keyA.r) * 255);
                pixels[xx * 4 + 1] = Math.round((p * keyB.g + (1.0 - p) * keyA.g) * 255);
                pixels[xx * 4 + 2] = Math.round((p * keyB.b + (1.0 - p) * keyA.b) * 255);
            }

            if (typeof keyA.a !== "undefined" && typeof keyB.a !== "undefined")
            {
                const alpha = Math.round((p * keyB.a + (1.0 - p) * keyA.a) * 255);
                pixels[xx * 4 + 3] = alpha;
            }
            else
            {
                pixels[xx * 4 + 3] = Math.round(255);
            }
        }
    }
    if (inSRGB.get())
        for (let i = 0; i < pixels.length; i += 4)
        {
            pixels[i + 0] = lin2srgb(pixels[i + 0]);
            pixels[i + 1] = lin2srgb(pixels[i + 1]);
            pixels[i + 2] = lin2srgb(pixels[i + 2]);
        }

    if (inDir.get() == "X") tex.initFromData(addNoise(pixels, width, 1), width, 1, selectedFilter, selectedWrap);
    if (inDir.get() == "Y") tex.initFromData(addNoise(pixels, 1, width), 1, width, selectedFilter, selectedWrap);

    if (inDir.get() == "Radial")
    {
        const rpixels = new Uint8Array(width * width * 4);

        for (let x = 0; x < width; x++)
        {
            for (let y = 0; y < width; y++)
            {
                const dx = x - (width - 1) / 2;
                const dy = y - (width - 1) / 2;
                let pos = Math.sqrt(dx * dx + dy * dy) / (width) * 2;

                if (inSmoothstep.get()) pos = CABLES.smoothStep(pos);

                let aa = Math.round(pos * width) * 4;
                if (aa >= width * 4)aa = width * 4 - 4;

                rpixels[(x * 4) + (y * 4 * width) + 0] = pixels[aa + 0];
                rpixels[(x * 4) + (y * 4 * width) + 1] = pixels[aa + 1];
                rpixels[(x * 4) + (y * 4 * width) + 2] = pixels[aa + 2];
                rpixels[(x * 4) + (y * 4 * width) + 3] = Math.round(255);
            }
        }

        pixels = rpixels;

        tex.initFromData(addNoise(pixels, width, width), width, width, selectedFilter, selectedWrap);
    }

    if (inDir.get() == "XX")
    {
        const rpixels = new Uint8Array(width * width * 4);
        for (let x = 0; x < width; x++)
            for (let y = 0; y < width; y++)
            {
                const aa = x * 4;
                rpixels[(x * 4) + (y * 4 * width) + 0] = pixels[aa + 0];
                rpixels[(x * 4) + (y * 4 * width) + 1] = pixels[aa + 1];
                rpixels[(x * 4) + (y * 4 * width) + 2] = pixels[aa + 2];
                rpixels[(x * 4) + (y * 4 * width) + 3] = Math.round(255);
            }
        pixels = rpixels;
        tex.initFromData(addNoise(pixels, width, width), width, width, selectedFilter, selectedWrap);
    }

    if (inDir.get() == "YY")
    {
        const rpixels = new Uint8Array(width * width * 4);
        for (let x = 0; x < width; x++)
            for (let y = 0; y < width; y++)
            {
                const aa = x * 4;
                rpixels[(y * 4) + (x * 4 * width) + 0] = pixels[aa + 0];
                rpixels[(y * 4) + (x * 4 * width) + 1] = pixels[aa + 1];
                rpixels[(y * 4) + (x * 4 * width) + 2] = pixels[aa + 2];
                rpixels[(y * 4) + (x * 4 * width) + 3] = Math.round(255);
            }
        pixels = rpixels;
        tex.initFromData(addNoise(pixels, width, width), width, width, selectedFilter, selectedWrap);
    }

    if (inDir.get() == "XY" || inDir.get() == "YX")
    {
        const rpixels = new Uint8Array(width * width * 4);

        for (let x = 0; x < width; x++)
        {
            let xx = x;
            if (inDir.get() == "YX")xx = width - x - 1;

            for (let y = 0; y < width; y++)
            {
                let aa = Math.round(((xx) + y) / 2) * 4;

                rpixels[(x * 4) + (y * 4 * width) + 0] = pixels[aa + 0];
                rpixels[(x * 4) + (y * 4 * width) + 1] = pixels[aa + 1];
                rpixels[(x * 4) + (y * 4 * width) + 2] = pixels[aa + 2];
                rpixels[(x * 4) + (y * 4 * width) + 3] = Math.round(255);
            }
        }

        pixels = rpixels;

        tex.initFromData(addNoise(pixels, width, width), width, width, selectedFilter, selectedWrap);
    }

    const colorArr = [];
    for (let i = 0; i < keys.length - 1; i++)
    {
        colorArr.push(keys[i].r, keys[i].g, keys[i].b);
    }

    const colorPosArr = [];
    for (let i = 0; i < keys.length - 1; i++)
    {
        colorPosArr.push(keys[i].pos);
    }

    outColors.set(colorArr);
    outColorPos.set(colorPosArr);

    // outTex.set(null);
    outTex.setRef(tex);
}


};

Ops.Gl.GradientTexture.prototype = new CABLES.Op();
CABLES.OPS["01380a50-2dbb-4465-ae80-86349b0b717a"]={f:Ops.Gl.GradientTexture,objName:"Ops.Gl.GradientTexture"};




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
// Ops.Gl.ClearColor
// 
// **************************************************************

Ops.Gl.ClearColor = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    render = op.inTrigger("render"),
    trigger = op.outTrigger("trigger"),
    r = op.inFloatSlider("r", 0.1),
    g = op.inFloatSlider("g", 0.1),
    b = op.inFloatSlider("b", 0.1),
    a = op.inFloatSlider("a", 1);

r.setUiAttribs({ "colorPick": true });

const cgl = op.patch.cgl;

render.onTriggered = function ()
{
    cgl.gl.clearColor(r.get(), g.get(), b.get(), a.get());
    cgl.gl.clear(cgl.gl.COLOR_BUFFER_BIT | cgl.gl.DEPTH_BUFFER_BIT);
    trigger.trigger();
};


};

Ops.Gl.ClearColor.prototype = new CABLES.Op();
CABLES.OPS["19b441eb-9f63-4f35-ba08-b87841517c4d"]={f:Ops.Gl.ClearColor,objName:"Ops.Gl.ClearColor"};




// **************************************************************
// 
// Ops.Array.RandomNumbersArray_v4
// 
// **************************************************************

Ops.Array.RandomNumbersArray_v4 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    numValues = op.inValueInt("Num Values", 100),
    inModeSwitch = op.inSwitch("Mode", ["A", "AB", "ABC", "ABCD"], "A"),
    inSeed = op.inValueFloat("Random Seed ", 0),
    inInteger = op.inBool("Integer", false),
    inClosed = op.inValueBool("Last == First"),
    outValues = op.outArray("Array Out"),
    outTotalPoints = op.outNumber("Chunks Amount"),
    outArrayLength = op.outNumber("Array length");

const letters = ["A", "B", "C", "D"];
const arr = [];

const inArray = letters.map(function (value)
{
    return {
        "min": op.inValueFloat("Min " + value, -1),
        "max": op.inValueFloat("Max " + value, 1),
    };
});

for (let i = 0; i < inArray.length; i += 1)
{
    const portObj = inArray[i];
    const keys = Object.keys(portObj);

    op.setPortGroup("Value Range " + letters[i], keys.map(function (key) { return portObj[key]; }));

    if (i > 0) keys.forEach(function (key) { portObj[key].setUiAttribs({ "greyout": true }); });
}

inModeSwitch.onChange = function ()
{
    const mode = inModeSwitch.get();
    const modes = inModeSwitch.uiAttribs.values;

    outValues.setUiAttribs({ "stride": inModeSwitch.get().length });

    const index = modes.indexOf(mode);

    inArray.forEach(function (portObj, i)
    {
        const keys = Object.keys(portObj);
        keys.forEach(function (key, j)
        {
            if (i <= index) portObj[key].setUiAttribs({ "greyout": false });
            else portObj[key].setUiAttribs({ "greyout": true });
        });
    });
    init();
};

outValues.ignoreValueSerialize = true;

inClosed.onChange =
    numValues.onChange =
    inSeed.onChange =
    inInteger.onChange = init;

const minMaxArray = [];

init();

function init()
{
    const mode = inModeSwitch.get();
    const modes = inModeSwitch.uiAttribs.values;
    const index = modes.indexOf(mode);

    const n = Math.floor(Math.abs(numValues.get()));
    Math.randomSeed = inSeed.get();

    op.setUiAttrib({ "extendTitle": n + "*" + mode.length });

    const dimension = index + 1;
    const length = n * dimension;

    arr.length = length;
    const tupleLength = length / dimension;
    const isInteger = inInteger.get();

    // optimization: we only need to fetch the max min for each component once
    for (let i = 0; i < dimension; i += 1)
    {
        const portObj = inArray[i];
        const max = portObj.max.get();
        const min = portObj.min.get();
        minMaxArray[i] = [min, max];
    }

    for (let j = 0; j < tupleLength; j += 1)
    {
        for (let k = 0; k < dimension; k += 1)
        {
            const min = minMaxArray[k][0];
            const max = minMaxArray[k][1];
            const index = j * dimension + k;

            if (isInteger) arr[index] = Math.floor(Math.seededRandom() * ((max + 1) - min) + min);
            else arr[index] = Math.seededRandom() * (max - min) + min;
        }
    }

    if (inClosed.get() && arr.length > dimension)
    {
        for (let i = 0; i < dimension; i++)
            arr[arr.length - 3 + i] = arr[i];
    }

    outValues.setRef(arr);
    outTotalPoints.set(arr.length / dimension);
    outArrayLength.set(arr.length);
}

// assign change handler
inArray.forEach(function (obj)
{
    Object.keys(obj).forEach(function (key)
    {
        const x = obj[key];
        x.onChange = init;
    });
});


};

Ops.Array.RandomNumbersArray_v4.prototype = new CABLES.Op();
CABLES.OPS["8a9fa2c6-c229-49a9-9dc8-247001539217"]={f:Ops.Array.RandomNumbersArray_v4,objName:"Ops.Array.RandomNumbersArray_v4"};




// **************************************************************
// 
// Ops.Gl.RenderToTexture_v3
// 
// **************************************************************

Ops.Gl.RenderToTexture_v3 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={};
const
    render = op.inTrigger("render"),
    inSize = op.inSwitch("Size", ["Canvas", "Manual"], "Canvas"),
    width = op.inValueInt("texture width", 512),
    height = op.inValueInt("texture height", 512),
    aspect = op.inBool("Auto Aspect", true),
    tfilter = op.inSwitch("filter", ["nearest", "linear", "mipmap"], "linear"),
    twrap = op.inSwitch("Wrap", ["Clamp", "Repeat", "Mirror"], "Repeat"),
    msaa = op.inSwitch("MSAA", ["none", "2x", "4x", "8x"], "none"),
    trigger = op.outTrigger("trigger"),
    tex = op.outTexture("texture"),
    texDepth = op.outTexture("textureDepth"),
    inPixelFormat = op.inDropDown("Pixel Format", CGL.Texture.PIXELFORMATS, CGL.Texture.PFORMATSTR_RGBA8UB),
    depth = op.inValueBool("Depth", true),
    clear = op.inValueBool("Clear", true);

const cgl = op.patch.cgl;
let fb = null;
let reInitFb = true;

op.setPortGroup("Size", [inSize, width, height, aspect]);

inPixelFormat.onChange =
    depth.onChange =
    clear.onChange =
    tfilter.onChange =
    twrap.onChange =
    msaa.onChange = initFbLater;

inSize.onChange = updateUi;

render.onTriggered =
    op.preRender = doRender;

updateUi();

function updateUi()
{
    width.setUiAttribs({ "greyout": inSize.get() != "Manual" });
    height.setUiAttribs({ "greyout": inSize.get() != "Manual" });
    aspect.setUiAttribs({ "greyout": inSize.get() != "Manual" });
}

function initFbLater()
{
    reInitFb = true;
}

function doRender()
{
    CGL.TextureEffect.checkOpNotInTextureEffect(op);

    if (!fb || reInitFb)
    {
        if (fb) fb.delete();

        let selectedWrap = CGL.Texture.WRAP_REPEAT;
        if (twrap.get() == "Clamp") selectedWrap = CGL.Texture.WRAP_CLAMP_TO_EDGE;
        else if (twrap.get() == "Mirror") selectedWrap = CGL.Texture.WRAP_MIRRORED_REPEAT;

        let selectFilter = CGL.Texture.FILTER_NEAREST;
        if (tfilter.get() == "nearest") selectFilter = CGL.Texture.FILTER_NEAREST;
        else if (tfilter.get() == "linear") selectFilter = CGL.Texture.FILTER_LINEAR;
        else if (tfilter.get() == "mipmap") selectFilter = CGL.Texture.FILTER_MIPMAP;

        if (inPixelFormat.get().indexOf("loat") && tfilter.get() == "mipmap") op.setUiError("fpmipmap", "Can't use mipmap and float texture at the same time");
        else op.setUiError("fpmipmap", null);

        if (cgl.glVersion >= 2)
        {
            let ms = true;
            let msSamples = 4;

            if (msaa.get() == "none")
            {
                msSamples = 0;
                ms = false;
            }
            if (msaa.get() == "2x") msSamples = 2;
            if (msaa.get() == "4x") msSamples = 4;
            if (msaa.get() == "8x") msSamples = 8;

            fb = new CGL.Framebuffer2(cgl, 8, 8,
                {
                    "name": "render2texture " + op.id,
                    "pixelFormat": inPixelFormat.get(),
                    "multisampling": ms,
                    "multisamplingSamples": msSamples,
                    "wrap": selectedWrap,
                    "filter": selectFilter,
                    "depth": depth.get(),
                    "clear": clear.get()
                });
        }
        else
        {
            fb = new CGL.Framebuffer(cgl, 8, 8, { "isFloatingPointTexture": false, "clear": clear.get() });
        }

        if (fb && fb.valid)
        {
            texDepth.setRef(fb.getTextureDepth());
            reInitFb = false;
        }
        else
        {
            fb = null;
            reInitFb = true;
        }
    }

    let setAspect = aspect.get();

    if (inSize.get() == "Canvas")
    {
        setAspect = true;
        width.set(op.patch.cgl.checkTextureSize(cgl.canvasWidth));
        height.set(op.patch.cgl.checkTextureSize(cgl.canvasHeight));
    }

    if (fb.getWidth() != op.patch.cgl.checkTextureSize(width.get()) || fb.getHeight() != op.patch.cgl.checkTextureSize(height.get()))
    {
        fb.setSize(
            op.patch.cgl.checkTextureSize(width.get()),
            op.patch.cgl.checkTextureSize(height.get()));
    }

    fb.renderStart(cgl);

    cgl.pushViewPort(0, 0, width.get(), height.get());

    if (setAspect) mat4.perspective(cgl.pMatrix, 45, width.get() / height.get(), 0.1, 1000.0);

    trigger.trigger();
    fb.renderEnd(cgl);

    cgl.popViewPort();

    texDepth.setRef(fb.getTextureDepth());
    tex.setRef(fb.getTextureColor());
}

//


};

Ops.Gl.RenderToTexture_v3.prototype = new CABLES.Op();
CABLES.OPS["41eec5c7-c480-477a-be81-04c3efac8357"]={f:Ops.Gl.RenderToTexture_v3,objName:"Ops.Gl.RenderToTexture_v3"};




// **************************************************************
// 
// Ops.Gl.Meshes.FullscreenRectangle_v2
// 
// **************************************************************

Ops.Gl.Meshes.FullscreenRectangle_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={"shader_frag":"UNI sampler2D tex;\nIN vec2 texCoord;\n\nvoid main()\n{\n    outColor= texture(tex,texCoord);\n}\n\n","shader_vert":"{{MODULES_HEAD}}\n\nIN vec3 vPosition;\nUNI mat4 projMatrix;\nUNI mat4 mvMatrix;\n\nOUT vec2 texCoord;\nIN vec2 attrTexCoord;\n\nvoid main()\n{\n   vec4 pos=vec4(vPosition,  1.0);\n\n   texCoord=vec2(attrTexCoord.x,(1.0-attrTexCoord.y));\n\n   gl_Position = projMatrix * mvMatrix * pos;\n}\n",};
const
    render = op.inTrigger("render"),
    inScale = op.inSwitch("Scale", ["Stretch", "Fit"], "Fit"),
    flipY = op.inValueBool("Flip Y"),
    flipX = op.inValueBool("Flip X"),
    inTexture = op.inTexture("Texture"),
    trigger = op.outTrigger("trigger");

const cgl = op.patch.cgl;
let mesh = null;
let geom = new CGL.Geometry("fullscreen rectangle");
let x = 0, y = 0, w = 0, h = 0;

op.toWorkShouldNotBeChild("Ops.Gl.TextureEffects.ImageCompose", CABLES.OP_PORT_TYPE_FUNCTION);
op.toWorkPortsNeedToBeLinked(render);

flipX.onChange = rebuildFlip;
flipY.onChange = rebuildFlip;
render.onTriggered = doRender;
inTexture.onLinkChanged = updateUi;
inScale.onChange = updateScale;

const shader = new CGL.Shader(cgl, "fullscreenrectangle", this);
shader.setModules(["MODULE_VERTEX_POSITION", "MODULE_COLOR", "MODULE_BEGIN_FRAG"]);

shader.setSource(attachments.shader_vert, attachments.shader_frag);
shader.fullscreenRectUniform = new CGL.Uniform(shader, "t", "tex", 0);
shader.aspectUni = new CGL.Uniform(shader, "f", "aspectTex", 0);

let useShader = false;
let updateShaderLater = true;
let fitImageAspect = false;

updateUi();
updateScale();

inTexture.onChange = function ()
{
    updateShaderLater = true;
};

function updateUi()
{
    if (!CABLES.UI) return;
    flipY.setUiAttribs({ "greyout": !inTexture.isLinked() });
    flipX.setUiAttribs({ "greyout": !inTexture.isLinked() });
    inScale.setUiAttribs({ "greyout": !inTexture.isLinked() });
}

function updateShader()
{
    let tex = inTexture.get();
    if (tex) useShader = true;
    else useShader = false;
}

op.preRender = function ()
{
    updateShader();
    shader.bind();
    if (mesh)mesh.render(shader);
    doRender();
};

function updateScale()
{
    fitImageAspect = inScale.get() == "Fit";
}

function doRender()
{
    if (cgl.viewPort[2] != w || cgl.viewPort[3] != h || !mesh) rebuild();

    if (updateShaderLater) updateShader();

    cgl.pushPMatrix();
    mat4.identity(cgl.pMatrix);
    mat4.ortho(cgl.pMatrix, 0, w, h, 0, -10.0, 1000);

    cgl.pushModelMatrix();
    mat4.identity(cgl.mMatrix);

    cgl.pushViewMatrix();
    mat4.identity(cgl.vMatrix);

    if (fitImageAspect && inTexture.get())
    {
        const rat = inTexture.get().width / inTexture.get().height;

        let _h = h;
        let _w = h * rat;

        if (_w > w)
        {
            _h = w * 1 / rat;
            _w = w;
        }

        cgl.pushViewPort((w - _w) / 2, (h - _h) / 2, _w, _h);
    }

    if (useShader)
    {
        if (inTexture.get()) cgl.setTexture(0, inTexture.get().tex);
        mesh.render(shader);
    }
    else
    {
        mesh.render(cgl.getShader());
    }

    cgl.gl.clear(cgl.gl.DEPTH_BUFFER_BIT);

    cgl.popPMatrix();
    cgl.popModelMatrix();
    cgl.popViewMatrix();

    if (fitImageAspect && inTexture.get()) cgl.popViewPort();

    trigger.trigger();
}

function rebuildFlip()
{
    mesh = null;
}

function rebuild()
{
    if (cgl.viewPort[2] == w && cgl.viewPort[3] == h && mesh) return;

    let xx = 0, xy = 0;

    w = cgl.viewPort[2];
    h = cgl.viewPort[3];

    geom.vertices = new Float32Array([
        xx + w, xy + h, 0.0,
        xx, xy + h, 0.0,
        xx + w, xy, 0.0,
        xx, xy, 0.0
    ]);

    let tc = null;

    if (flipY.get())
        tc = new Float32Array([
            1.0, 0.0,
            0.0, 0.0,
            1.0, 1.0,
            0.0, 1.0
        ]);
    else
        tc = new Float32Array([
            1.0, 1.0,
            0.0, 1.0,
            1.0, 0.0,
            0.0, 0.0
        ]);

    if (flipX.get())
    {
        tc[0] = 0.0;
        tc[2] = 1.0;
        tc[4] = 0.0;
        tc[6] = 1.0;
    }

    geom.setTexCoords(tc);

    geom.verticesIndices = new Uint16Array([
        2, 1, 0,
        3, 1, 2
    ]);

    geom.vertexNormals = new Float32Array([
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
    ]);
    geom.tangents = new Float32Array([
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0]);
    geom.biTangents == new Float32Array([
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0]);

    if (!mesh) mesh = new CGL.Mesh(cgl, geom);
    else mesh.setGeom(geom);
}


};

Ops.Gl.Meshes.FullscreenRectangle_v2.prototype = new CABLES.Op();
CABLES.OPS["fb70721a-eac2-4ff5-a5a2-5c59e2393972"]={f:Ops.Gl.Meshes.FullscreenRectangle_v2,objName:"Ops.Gl.Meshes.FullscreenRectangle_v2"};




// **************************************************************
// 
// Ops.Gl.ImageCompose.ImageCompose_v4
// 
// **************************************************************

Ops.Gl.ImageCompose.ImageCompose_v4 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={"imgcomp_frag":"IN vec2 texCoord;\nUNI vec4 bgColor;\nUNI sampler2D tex;\n#ifdef USE_UVTEX\nUNI sampler2D UVTex;\n#endif\n\nvoid main()\n{\n\n    #ifndef USE_TEX\n        outColor=bgColor;\n    #endif\n    #ifdef USE_TEX\n        #ifndef USE_UVTEX\n        outColor=texture(tex,texCoord);\n        #else\n        outColor=texture(tex,texture(UVTex,texCoord).xy);\n        #endif\n    #endif\n\n\n\n}\n",};
const
    cgl = op.patch.cgl,
    render = op.inTrigger("Render"),
    inTex = op.inTexture("Base Texture"),
    inUVTex = op.inTexture("UV Texture"),
    inSize = op.inSwitch("Size", ["Auto", "Canvas", "Manual"], "Auto"),
    width = op.inValueInt("Width", 640),
    height = op.inValueInt("Height", 480),
    inFilter = op.inSwitch("Filter", ["nearest", "linear", "mipmap"], "linear"),
    inWrap = op.inValueSelect("Wrap", ["clamp to edge", "repeat", "mirrored repeat"], "repeat"),
    aniso = op.inSwitch("Anisotropic", ["0", "1", "2", "4", "8", "16"], "0"),

    inPixelFormat = op.inDropDown("Pixel Format", CGL.Texture.PIXELFORMATS, CGL.Texture.PFORMATSTR_RGBA8UB),

    inClear = op.inBool("Clear", true),
    r = op.inValueSlider("R", 0),
    g = op.inValueSlider("G", 0),
    b = op.inValueSlider("B", 0),
    a = op.inValueSlider("A", 0),

    trigger = op.outTrigger("Next"),
    texOut = op.outTexture("texture_out", CGL.Texture.getEmptyTexture(cgl)),
    outRatio = op.outNumber("Aspect Ratio"),
    outWidth = op.outNumber("Texture Width"),
    outHeight = op.outNumber("Texture Height");

op.setPortGroup("Texture Size", [inSize, width, height]);
op.setPortGroup("Texture Parameters", [inWrap, aniso, inFilter, inPixelFormat]);

r.setUiAttribs({ "colorPick": true });
op.setPortGroup("Color", [r, g, b, a, inClear]);

op.toWorkPortsNeedToBeLinked(render);

const prevViewPort = [0, 0, 0, 0];
let effect = null;
let tex = null;
let reInitEffect = true;
let isFloatTex = false;
let copyShader = null;
let copyShaderTexUni = null;
let copyShaderUVTexUni = null;
let copyShaderRGBAUni = null;

inWrap.onChange =
inFilter.onChange =
aniso.onChange =
inPixelFormat.onChange = reInitLater;

inTex.onLinkChanged =
inClear.onChange =
    inSize.onChange =
    inUVTex.onChange = updateUi;

render.onTriggered =
    op.preRender = doRender;

updateUi();

function initEffect()
{
    if (effect)effect.delete();
    if (tex)tex.delete();
    tex = null;
    effect = new CGL.TextureEffect(cgl, { "isFloatingPointTexture": CGL.Texture.isPixelFormatFloat(inPixelFormat.get()), "name": op.name });

    const cgl_aniso = Math.min(cgl.maxAnisotropic, parseFloat(aniso.get()));

    tex = new CGL.Texture(cgl,
        {
            "anisotropic": cgl_aniso,
            "name": "image_compose_v2_" + op.id,
            "pixelFormat": inPixelFormat.get(),
            "filter": getFilter(),
            "wrap": getWrap(),
            "width": getWidth(),
            "height": getHeight()
        });

    effect.setSourceTexture(tex);

    outWidth.set(getWidth());
    outHeight.set(getHeight());
    outRatio.set(getWidth() / getHeight());

    texOut.set(CGL.Texture.getEmptyTexture(cgl));

    reInitEffect = false;
    updateUi();
}

function getFilter()
{
    if (inFilter.get() == "nearest") return CGL.Texture.FILTER_NEAREST;
    else if (inFilter.get() == "linear") return CGL.Texture.FILTER_LINEAR;
    else if (inFilter.get() == "mipmap") return CGL.Texture.FILTER_MIPMAP;
}

function getWrap()
{
    if (inWrap.get() == "repeat") return CGL.Texture.WRAP_REPEAT;
    else if (inWrap.get() == "mirrored repeat") return CGL.Texture.WRAP_MIRRORED_REPEAT;
    else if (inWrap.get() == "clamp to edge") return CGL.Texture.WRAP_CLAMP_TO_EDGE;
}

function getWidth()
{
    let x = 0;
    if (inTex.get() && inSize.get() == "Auto") x = inTex.get().width;
    else if (inSize.get() == "Auto" || inSize.get() == "Canvas") x = cgl.canvasWidth;
    else if (inSize.get() == "ViewPort") x = cgl.getViewPort()[2];
    else x = Math.ceil(width.get());
    return op.patch.cgl.checkTextureSize(x);
}

function getHeight()
{
    let x = 0;

    if (inTex.get() && inSize.get() == "Auto") x = inTex.get().height;
    else if (inSize.get() == "Auto" || inSize.get() == "Canvas") x = cgl.canvasHeight;
    else if (inSize.get() == "ViewPort") x = cgl.getViewPort()[3];
    else x = Math.ceil(height.get());
    return op.patch.cgl.checkTextureSize(x);
}

function reInitLater()
{
    reInitEffect = true;
}

function updateResolution()
{
    if ((
        getWidth() != tex.width ||
        getHeight() != tex.height ||
        // tex.anisotropic != parseFloat(aniso.get()) ||
        // tex.isFloatingPoint() != CGL.Texture.isPixelFormatFloat(inPixelFormat.get()) ||
        tex.pixelFormat != inPixelFormat.get() ||
        tex.filter != getFilter() ||
        tex.wrap != getWrap()
    ) && (getWidth() !== 0 && getHeight() !== 0))
    {
        initEffect();
        effect.setSourceTexture(tex);
        texOut.set(CGL.Texture.getEmptyTexture(cgl));
        texOut.set(tex);
        updateResolutionInfo();
        checkTypes();
    }
}

function updateResolutionInfo()
{
    let info = null;

    if (inSize.get() == "Manual")
    {
        info = null;
    }
    else if (inSize.get() == "Auto")
    {
        if (inTex.get()) info = "Input Texture";
        else info = "Canvas Size";

        info += ": " + getWidth() + " x " + getHeight();
    }

    let changed = false;
    changed = inSize.uiAttribs.info != info;
    inSize.setUiAttribs({ "info": info });
    if (changed)op.refreshParams();
}

function updateDefines()
{
    if (copyShader)copyShader.toggleDefine("USE_TEX", inTex.isLinked() || !inClear.get());
    if (copyShader)copyShader.toggleDefine("USE_UVTEX", inUVTex.isLinked());
}

function updateUi()
{
    aniso.setUiAttribs({ "greyout": getFilter() != CGL.Texture.FILTER_MIPMAP });

    r.setUiAttribs({ "greyout": inTex.isLinked() });
    b.setUiAttribs({ "greyout": inTex.isLinked() });
    g.setUiAttribs({ "greyout": inTex.isLinked() });
    a.setUiAttribs({ "greyout": inTex.isLinked() });

    inClear.setUiAttribs({ "greyout": inTex.isLinked() });
    width.setUiAttribs({ "greyout": inSize.get() != "Manual" });
    height.setUiAttribs({ "greyout": inSize.get() != "Manual" });

    // width.setUiAttribs({ "hideParam": inSize.get() != "Manual" });
    // height.setUiAttribs({ "hideParam": inSize.get() != "Manual" });

    if (tex)
        if (CGL.Texture.isPixelFormatFloat(inPixelFormat.get()) && getFilter() == CGL.Texture.FILTER_MIPMAP) op.setUiError("fpmipmap", "Don't use mipmap and 32bit at the same time, many systems do not support this.");
        else op.setUiError("fpmipmap", null);

    updateResolutionInfo();
    updateDefines();
    checkTypes();
}

function checkTypes()
{
    if (tex)
        if (inTex.isLinked() && inTex.get() && (tex.isFloatingPoint() != inTex.get().isFloatingPoint()))
            op.setUiError("textypediff", "Warning: Mixing floating point and non floating point texture can result in data/precision loss", 1);
        else
            op.setUiError("textypediff", null);
}

op.preRender = () =>
{
    doRender();
};

function copyTexture()
{
    if (!copyShader)
    {
        copyShader = new CGL.Shader(cgl, "copytextureshader");
        copyShader.setSource(copyShader.getDefaultVertexShader(), attachments.imgcomp_frag);
        copyShaderTexUni = new CGL.Uniform(copyShader, "t", "tex", 0);
        copyShaderUVTexUni = new CGL.Uniform(copyShader, "t", "UVTex", 1);
        copyShaderRGBAUni = new CGL.Uniform(copyShader, "4f", "bgColor", r, g, b, a);
        updateDefines();
    }

    cgl.pushShader(copyShader);
    cgl.currentTextureEffect.bind();

    if (inTex.get()) cgl.setTexture(0, inTex.get().tex);
    else if (!inClear.get() && texOut.get()) cgl.setTexture(0, texOut.get().tex);
    if (inUVTex.get()) cgl.setTexture(1, inUVTex.get().tex);

    cgl.currentTextureEffect.finish();
    cgl.popShader();
}

function doRender()
{
    if (!effect || reInitEffect) initEffect();

    cgl.pushBlend(false);

    updateResolution();

    const oldEffect = cgl.currentTextureEffect;
    cgl.currentTextureEffect = effect;
    cgl.currentTextureEffect.imgCompVer = 3;
    cgl.currentTextureEffect.width = width.get();
    cgl.currentTextureEffect.height = height.get();
    effect.setSourceTexture(tex);

    effect.startEffect(inTex.get() || CGL.Texture.getEmptyTexture(cgl, isFloatTex), true);
    copyTexture();

    trigger.trigger();

    cgl.pushViewPort(0, 0, width.get(), height.get());

    effect.endEffect();
    texOut.setRef(effect.getCurrentSourceTexture());

    cgl.popViewPort();

    cgl.popBlend();
    cgl.currentTextureEffect = oldEffect;
}


};

Ops.Gl.ImageCompose.ImageCompose_v4.prototype = new CABLES.Op();
CABLES.OPS["17212e2b-d692-464c-8f8d-2d511dd3410a"]={f:Ops.Gl.ImageCompose.ImageCompose_v4,objName:"Ops.Gl.ImageCompose.ImageCompose_v4"};




// **************************************************************
// 
// Ops.Gl.ImageCompose.Color_v2
// 
// **************************************************************

Ops.Gl.ImageCompose.Color_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={"color_frag":"IN vec2 texCoord;\nUNI sampler2D tex;\nUNI float r;\nUNI float g;\nUNI float b;\nUNI float a;\nUNI float amount;\n\n#ifdef MASK\n    UNI sampler2D mask;\n#endif\n\n{{CGL.BLENDMODES3}}\n\nvoid main()\n{\n    vec4 col=vec4(r,g,b,a);\n    vec4 base=texture(tex,texCoord);\n\n    float am=amount;\n    #ifdef MASK\n        float msk=texture(mask,texCoord).r;\n        #ifdef INVERTMASK\n            msk=1.0-msk;\n        #endif\n        am*=1.0-msk;\n    #endif\n\n    outColor=cgl_blendPixel(base,col,am);\n}\n",};
const
    render = op.inTrigger("render"),
    blendMode = CGL.TextureEffect.AddBlendSelect(op),
    amount = op.inValueSlider("Amount", 1),
    maskAlpha = CGL.TextureEffect.AddBlendAlphaMask(op),

    inMask = op.inTexture("Mask"),
    inMaskInvert = op.inValueBool("Mask Invert"),
    r = op.inValueSlider("r", Math.random()),
    g = op.inValueSlider("g", Math.random()),
    b = op.inValueSlider("b", Math.random()),
    a = op.inValueSlider("A", 1),
    trigger = op.outTrigger("trigger");

r.setUiAttribs({ "colorPick": true });
op.setPortGroup("Color", [r, g, b]);

const TEX_SLOT = 0;
const cgl = op.patch.cgl;
const shader = new CGL.Shader(cgl, "textureeffect color");
const srcFrag = attachments.color_frag || "";
shader.setSource(shader.getDefaultVertexShader(), srcFrag);
CGL.TextureEffect.setupBlending(op, shader, blendMode, amount, maskAlpha);

const
    textureUniform = new CGL.Uniform(shader, "t", "tex", TEX_SLOT),
    makstextureUniform = new CGL.Uniform(shader, "t", "mask", 1),
    uniformR = new CGL.Uniform(shader, "f", "r", r),
    uniformG = new CGL.Uniform(shader, "f", "g", g),
    uniformB = new CGL.Uniform(shader, "f", "b", b),
    uniformA = new CGL.Uniform(shader, "f", "a", a),
    uniformAmount = new CGL.Uniform(shader, "f", "amount", amount);

inMask.onChange = function ()
{
    if (inMask.isLinked())shader.define("MASK");
    else shader.removeDefine("MASK");
};

inMaskInvert.onChange = function ()
{
    if (inMaskInvert.get())shader.define("INVERTMASK");
    else shader.removeDefine("INVERTMASK");
};

render.onTriggered = function ()
{
    if (!CGL.TextureEffect.checkOpInEffect(op, 3)) return;

    cgl.pushShader(shader);
    cgl.currentTextureEffect.bind();

    cgl.setTexture(TEX_SLOT, cgl.currentTextureEffect.getCurrentSourceTexture().tex);
    if (inMask.get()) cgl.setTexture(1, inMask.get().tex);

    cgl.currentTextureEffect.finish();
    cgl.popShader();

    trigger.trigger();
};


};

Ops.Gl.ImageCompose.Color_v2.prototype = new CABLES.Op();
CABLES.OPS["6dada2b7-da7c-47ee-87a9-a12e87055208"]={f:Ops.Gl.ImageCompose.Color_v2,objName:"Ops.Gl.ImageCompose.Color_v2"};




// **************************************************************
// 
// Ops.Gl.ImageCompose.FastBlur_v2
// 
// **************************************************************

Ops.Gl.ImageCompose.FastBlur_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={"blur_frag":"\nUNI sampler2D tex;\n#ifdef USE_MASK\n    UNI sampler2D texMask;\n#endif\nUNI float amount;\nUNI float pass;\n\nIN vec2 texCoord;\n\nUNI float dirX;\nUNI float dirY;\nUNI float width;\nUNI float height;\n\nIN vec2 coord0;\nIN vec2 coord1;\nIN vec2 coord2;\nIN vec2 coord3;\nIN vec2 coord4;\nIN vec2 coord5;\nIN vec2 coord6;\n\n#ifdef HAS_MASK\n    UNI sampler2D imageMask;\n#endif\n\nvoid main()\n{\n    vec4 color = vec4(0.0);\n\n    #ifdef USE_MASK\n        #ifdef MASK_INVERT\n            if(texture(texMask,texCoord).r<0.5)\n            {\n                outColor= texture(tex, texCoord);\n                return;\n            }\n        #endif\n\n        #ifndef MASK_INVERT\n            if(texture(texMask,texCoord).r>0.5)\n            {\n                outColor= texture(tex, texCoord);\n                return;\n            }\n        #endif\n    #endif\n\n    color += texture(tex, coord0) * 0.06927096443792478;\n    color += texture(tex, coord1) * 0.1383328848652136;\n    color += texture(tex, coord2) * 0.21920904690397863;\n    color += texture(tex, coord3) * 0.14637421;\n    color += texture(tex, coord4) * 0.21920904690397863;\n    color += texture(tex, coord5) * 0.1383328848652136;\n    color += texture(tex, coord6) * 0.06927096443795711;\n\n    outColor= color;\n}","blur_vert":"\nIN vec3 vPosition;\nIN vec2 attrTexCoord;\nIN vec3 attrVertNormal;\nOUT vec2 texCoord;\nOUT vec3 norm;\nUNI mat4 projMatrix;\nUNI mat4 mvMatrix;\nUNI mat4 modelMatrix;\n\nUNI float pass;\nUNI float dirX;\nUNI float dirY;\nUNI float width;\nUNI float height;\n\nOUT vec2 coord0;\nOUT vec2 coord1;\nOUT vec2 coord2;\nOUT vec2 coord3;\nOUT vec2 coord4;\nOUT vec2 coord5;\nOUT vec2 coord6;\n\nvoid main()\n{\n    texCoord=attrTexCoord;\n    norm=attrVertNormal;\n    vec4 pos=vec4(vPosition,  1.0);\n    {{MODULE_VERTEX_POSITION}}\n\n    vec2 dir=vec2(dirX,dirY);\n    vec2 res=vec2( (1.) / width , (1.) / height )*dir;\n\n    coord3= attrTexCoord;\n\n    coord0= attrTexCoord + (-3.0368997744118595 * res);\n    coord1= attrTexCoord + (-2.089778445362373 * res);\n    coord2= attrTexCoord + (-1.2004366090034069 * res);\n    coord4= attrTexCoord + (1.2004366090034069 * res);\n    coord5= attrTexCoord + (2.089778445362373* res);\n    coord6= attrTexCoord + (3.0368997744118595 * res);\n\n    #ifdef CLAMP\n        coord0=clamp(coord0,0.0,1.0);\n        coord1=clamp(coord1,0.0,1.0);\n        coord2=clamp(coord2,0.0,1.0);\n        coord3=clamp(coord3,0.0,1.0);\n        coord4=clamp(coord4,0.0,1.0);\n        coord5=clamp(coord5,0.0,1.0);\n        coord6=clamp(coord6,0.0,1.0);\n    #endif\n\n    gl_Position = projMatrix * mvMatrix * pos;\n}\n",};
// http://dev.theomader.com/gaussian-kernel-calculator/
// http://rastergrid.com/blog/2010/09/efficient-gaussian-blur-with-linear-sampling/

const
    render = op.inTrigger("render"),
    trigger = op.outTrigger("trigger"),
    inPasses = op.inFloat("Passes", 3),
    clamp = op.inBool("Clamp", false),
    direction = op.inDropDown("direction", ["both", "vertical", "horizontal"], "both"),
    mask = op.inTexture("Mask"),
    maskInvert = op.inBool("Mask Invert", false);

const cgl = op.patch.cgl;
const shader = new CGL.Shader(cgl, "fastblur");

op.setPortGroup("Mask", [mask, maskInvert]);

shader.setSource(attachments.blur_vert, attachments.blur_frag);
const
    textureUniform = new CGL.Uniform(shader, "t", "tex", 0),
    uniDirX = new CGL.Uniform(shader, "f", "dirX", 0),
    uniDirY = new CGL.Uniform(shader, "f", "dirY", 0),
    uniWidth = new CGL.Uniform(shader, "f", "width", 0),
    uniHeight = new CGL.Uniform(shader, "f", "height", 0),
    uniPass = new CGL.Uniform(shader, "f", "pass", 0),
    uniAmount = new CGL.Uniform(shader, "f", "amount", inPasses.get()),
    textureAlpha = new CGL.Uniform(shader, "t", "texMask", 1);

inPasses.onChange = () => { uniAmount.setValue(inPasses.get()); };

let dir = 0;
direction.onChange = () =>
{
    if (direction.get() == "both") dir = 0;
    if (direction.get() == "horizontal") dir = 1;
    if (direction.get() == "vertical") dir = 2;
};

clamp.onChange = () => { shader.toggleDefine("CLAMP", clamp.get()); };

maskInvert.onChange =
    mask.onChange = updateDefines;
updateDefines();

function updateDefines()
{
    shader.toggleDefine("USE_MASK", mask.isLinked());
    shader.toggleDefine("MASK_INVERT", maskInvert.get());

    maskInvert.setUiAttribs({ "greyout": !mask.isLinked() });
}

render.onTriggered = function ()
{
    if (!CGL.TextureEffect.checkOpInEffect(op, 3)) return;

    uniWidth.setValue(cgl.currentTextureEffect.getCurrentSourceTexture().width);
    uniHeight.setValue(cgl.currentTextureEffect.getCurrentSourceTexture().height);
    const numPasses = inPasses.get();

    if (mask.get())cgl.setTexture(1, mask.get().tex);

    for (let i = 0; i < numPasses; i++)
    {
        cgl.pushShader(shader);

        uniPass.setValue(i / numPasses);

        // first pass
        if (dir === 0 || dir == 2)
        {
            cgl.currentTextureEffect.bind();
            cgl.setTexture(0, cgl.currentTextureEffect.getCurrentSourceTexture().tex);

            uniDirX.setValue(0.0);
            uniDirY.setValue(1.0 + (i * i));

            cgl.currentTextureEffect.finish();
        }

        // second pass
        if (dir === 0 || dir == 1)
        {
            cgl.currentTextureEffect.bind();
            cgl.setTexture(0, cgl.currentTextureEffect.getCurrentSourceTexture().tex);

            uniDirX.setValue(1.0 + (i * i));
            uniDirY.setValue(0.0);

            cgl.currentTextureEffect.finish();
        }

        cgl.popShader();
    }

    trigger.trigger();
};


};

Ops.Gl.ImageCompose.FastBlur_v2.prototype = new CABLES.Op();
CABLES.OPS["61ed277f-d096-43b2-9de8-dc87fb3a9169"]={f:Ops.Gl.ImageCompose.FastBlur_v2,objName:"Ops.Gl.ImageCompose.FastBlur_v2"};




// **************************************************************
// 
// Ops.Gl.ImageCompose.Alpha
// 
// **************************************************************

Ops.Gl.ImageCompose.Alpha = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={"clearAlpha_frag":"\n// void main()\n// {\n//     outColor.a=0.0;\n// }\n\nIN vec2 texCoord;\nUNI sampler2D tex;\nUNI float amount;\n\n\nvoid main()\n{\n    vec4 base=texture(tex,texCoord);\n\n    outColor=base;\n\n    #ifdef METH_NORM\n        outColor.a=amount;\n    #endif\n    #ifdef METH_ADD\n        outColor.a+=amount;\n    #endif\n    #ifdef METH_SUB\n        outColor.a-=amount;\n    #endif\n    #ifdef METH_MUL\n        outColor.a*=amount;\n    #endif\n\n    #ifdef DO_CLAMP\n    outColor.a=clamp(0.0,1.0,outColor.a);\n    #endif\n\n}\n",};
const
    render = op.inTrigger("Render"),
    amount = op.inValueSlider("Amount", 1),
    meth = op.inSwitch("Method", ["Set", "Add", "Sub", "Mul"], "Set"),
    clamp = op.inBool("Clamp", true),
    trigger = op.outTrigger("Next");

const cgl = op.patch.cgl;
const shader = new CGL.Shader(cgl, "Alpha");
const TEX_SLOT = 0;

shader.setSource(shader.getDefaultVertexShader(), attachments.clearAlpha_frag || "");

const uniformAmount = new CGL.Uniform(shader, "f", "amount", amount);
const textureUniform = new CGL.Uniform(shader, "t", "tex", TEX_SLOT);

clamp.onChange =
    meth.onChange = updateDefines;
updateDefines();

function updateDefines()
{
    shader.toggleDefine("METH_NORM", meth.get() == "Set");
    shader.toggleDefine("METH_ADD", meth.get() == "Add");
    shader.toggleDefine("METH_SUB", meth.get() == "Sub");
    shader.toggleDefine("METH_MUL", meth.get() == "Mul");
    shader.toggleDefine("DO_CLAMP", clamp.get());
}

render.onTriggered = function ()
{
    if (!CGL.TextureEffect.checkOpInEffect(op)) return;

    cgl.pushShader(shader);
    cgl.currentTextureEffect.bind();

    cgl.setTexture(TEX_SLOT, cgl.currentTextureEffect.getCurrentSourceTexture().tex);

    cgl.currentTextureEffect.finish();
    cgl.popShader();

    trigger.trigger();
};


};

Ops.Gl.ImageCompose.Alpha.prototype = new CABLES.Op();
CABLES.OPS["131687e0-77f5-4fd7-be57-864aa6559418"]={f:Ops.Gl.ImageCompose.Alpha,objName:"Ops.Gl.ImageCompose.Alpha"};




// **************************************************************
// 
// Ops.Gl.ImageCompose.DrawImage_v3
// 
// **************************************************************

Ops.Gl.ImageCompose.DrawImage_v3 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={"drawimage_frag":"#ifdef HAS_TEXTURES\n    IN vec2 texCoord;\n    UNI sampler2D tex;\n    UNI sampler2D image;\n#endif\n\n#ifdef TEX_TRANSFORM\n    IN mat3 transform;\n#endif\n// UNI float rotate;\n\n{{CGL.BLENDMODES}}\n\n#ifdef HAS_TEXTUREALPHA\n   UNI sampler2D imageAlpha;\n#endif\n\nUNI float amount;\n\n#ifdef ASPECT_RATIO\n    UNI float aspectTex;\n    UNI float aspectPos;\n#endif\n\nvoid main()\n{\n    vec4 blendRGBA=vec4(0.0,0.0,0.0,1.0);\n\n    #ifdef HAS_TEXTURES\n        vec2 tc=texCoord;\n\n        #ifdef TEX_FLIP_X\n            tc.x=1.0-tc.x;\n        #endif\n        #ifdef TEX_FLIP_Y\n            tc.y=1.0-tc.y;\n        #endif\n\n        #ifdef ASPECT_RATIO\n            #ifdef ASPECT_AXIS_X\n                tc.y=(1.0-aspectPos)-(((1.0-aspectPos)-tc.y)*aspectTex);\n            #endif\n            #ifdef ASPECT_AXIS_Y\n                tc.x=(1.0-aspectPos)-(((1.0-aspectPos)-tc.x)/aspectTex);\n            #endif\n        #endif\n\n        #ifdef TEX_TRANSFORM\n            vec3 coordinates=vec3(tc.x, tc.y,1.0);\n            tc=(transform * coordinates ).xy;\n        #endif\n\n        blendRGBA=texture(image,tc);\n\n        vec3 blend=blendRGBA.rgb;\n        vec4 baseRGBA=texture(tex,texCoord);\n        vec3 base=baseRGBA.rgb;\n\n\n        #ifdef PREMUL\n            blend.rgb = (blend.rgb) + (base.rgb * (1.0 - blendRGBA.a));\n        #endif\n\n        vec3 colNew=_blend(base,blend);\n\n\n\n\n        #ifdef REMOVE_ALPHA_SRC\n            blendRGBA.a=1.0;\n        #endif\n\n        #ifdef HAS_TEXTUREALPHA\n            vec4 colImgAlpha=texture(imageAlpha,tc);\n            float colImgAlphaAlpha=colImgAlpha.a;\n\n            #ifdef ALPHA_FROM_LUMINANCE\n                vec3 gray = vec3(dot(vec3(0.2126,0.7152,0.0722), colImgAlpha.rgb ));\n                colImgAlphaAlpha=(gray.r+gray.g+gray.b)/3.0;\n            #endif\n\n            #ifdef ALPHA_FROM_INV_UMINANCE\n                vec3 gray = vec3(dot(vec3(0.2126,0.7152,0.0722), colImgAlpha.rgb ));\n                colImgAlphaAlpha=1.0-(gray.r+gray.g+gray.b)/3.0;\n            #endif\n\n            #ifdef INVERT_ALPHA\n                colImgAlphaAlpha=clamp(colImgAlphaAlpha,0.0,1.0);\n                colImgAlphaAlpha=1.0-colImgAlphaAlpha;\n            #endif\n\n            blendRGBA.a=colImgAlphaAlpha*blendRGBA.a;\n        #endif\n    #endif\n\n    float am=amount;\n\n    #ifdef CLIP_REPEAT\n        if(tc.y>1.0 || tc.y<0.0 || tc.x>1.0 || tc.x<0.0)\n        {\n            // colNew.rgb=vec3(0.0);\n            am=0.0;\n        }\n    #endif\n\n    #ifdef ASPECT_RATIO\n        #ifdef ASPECT_CROP\n            if(tc.y>1.0 || tc.y<0.0 || tc.x>1.0 || tc.x<0.0)\n            {\n                colNew.rgb=base.rgb;\n                am=0.0;\n            }\n\n        #endif\n    #endif\n\n\n\n    #ifndef PREMUL\n        blendRGBA.rgb=mix(colNew,base,1.0-(am*blendRGBA.a));\n        blendRGBA.a=clamp(baseRGBA.a+(blendRGBA.a*am),0.,1.);\n    #endif\n\n    #ifdef PREMUL\n        // premultiply\n        // blendRGBA.rgb = (blendRGBA.rgb) + (baseRGBA.rgb * (1.0 - blendRGBA.a));\n        blendRGBA=vec4(\n            mix(colNew.rgb,base,1.0-(am*blendRGBA.a)),\n            blendRGBA.a*am+baseRGBA.a\n            );\n    #endif\n\n    #ifdef ALPHA_MASK\n    blendRGBA.a=baseRGBA.a;\n    #endif\n\n    outColor=blendRGBA;\n}\n\n\n\n\n\n\n\n","drawimage_vert":"IN vec3 vPosition;\nIN vec2 attrTexCoord;\nIN vec3 attrVertNormal;\n\nUNI mat4 projMatrix;\nUNI mat4 mvMatrix;\n\nOUT vec2 texCoord;\n// OUT vec3 norm;\n\n#ifdef TEX_TRANSFORM\n    UNI float posX;\n    UNI float posY;\n    UNI float scaleX;\n    UNI float scaleY;\n    UNI float rotate;\n    OUT mat3 transform;\n#endif\n\nvoid main()\n{\n   texCoord=attrTexCoord;\n//   norm=attrVertNormal;\n\n   #ifdef TEX_TRANSFORM\n        vec3 coordinates=vec3(attrTexCoord.x, attrTexCoord.y,1.0);\n        float angle = radians( rotate );\n        vec2 scale= vec2(scaleX,scaleY);\n        vec2 translate= vec2(posX,posY);\n\n        transform = mat3(   scale.x * cos( angle ), scale.x * sin( angle ), 0.0,\n            - scale.y * sin( angle ), scale.y * cos( angle ), 0.0,\n            - 0.5 * scale.x * cos( angle ) + 0.5 * scale.y * sin( angle ) - 0.5 * translate.x*2.0 + 0.5,  - 0.5 * scale.x * sin( angle ) - 0.5 * scale.y * cos( angle ) - 0.5 * translate.y*2.0 + 0.5, 1.0);\n   #endif\n\n   gl_Position = projMatrix * mvMatrix * vec4(vPosition,  1.0);\n}\n",};
const
    render = op.inTrigger("render"),
    blendMode = CGL.TextureEffect.AddBlendSelect(op, "blendMode"),
    amount = op.inValueSlider("amount", 1),

    image = op.inTexture("Image"),
    inAlphaPremul = op.inValueBool("Premultiplied", false),
    inAlphaMask = op.inValueBool("Alpha Mask", false),
    removeAlphaSrc = op.inValueBool("removeAlphaSrc", false),

    imageAlpha = op.inTexture("Mask"),
    alphaSrc = op.inValueSelect("Mask Src", ["alpha channel", "luminance", "luminance inv"], "luminance"),
    invAlphaChannel = op.inValueBool("Invert alpha channel"),

    inAspect = op.inValueBool("Aspect Ratio", false),
    inAspectAxis = op.inValueSelect("Stretch Axis", ["X", "Y"], "X"),
    inAspectPos = op.inValueSlider("Position", 0.0),
    inAspectCrop = op.inValueBool("Crop", false),

    trigger = op.outTrigger("trigger");

blendMode.set("normal");
const cgl = op.patch.cgl;
const shader = new CGL.Shader(cgl, "drawimage");

imageAlpha.onLinkChanged = updateAlphaPorts;

op.setPortGroup("Mask", [imageAlpha, alphaSrc, invAlphaChannel]);
op.setPortGroup("Aspect Ratio", [inAspect, inAspectPos, inAspectCrop, inAspectAxis]);

function updateAlphaPorts()
{
    if (imageAlpha.isLinked())
    {
        removeAlphaSrc.setUiAttribs({ "greyout": true });
        alphaSrc.setUiAttribs({ "greyout": false });
        invAlphaChannel.setUiAttribs({ "greyout": false });
    }
    else
    {
        removeAlphaSrc.setUiAttribs({ "greyout": false });
        alphaSrc.setUiAttribs({ "greyout": true });
        invAlphaChannel.setUiAttribs({ "greyout": true });
    }
}

op.toWorkPortsNeedToBeLinked(image);

shader.setSource(attachments.drawimage_vert, attachments.drawimage_frag);

const
    textureUniform = new CGL.Uniform(shader, "t", "tex", 0),
    textureImaghe = new CGL.Uniform(shader, "t", "image", 1),
    textureAlpha = new CGL.Uniform(shader, "t", "imageAlpha", 2),
    uniTexAspect = new CGL.Uniform(shader, "f", "aspectTex", 1),
    uniAspectPos = new CGL.Uniform(shader, "f", "aspectPos", inAspectPos);

inAspect.onChange =
    inAspectCrop.onChange =
    inAspectAxis.onChange = updateAspectRatio;

function updateAspectRatio()
{
    shader.removeDefine("ASPECT_AXIS_X");
    shader.removeDefine("ASPECT_AXIS_Y");
    shader.removeDefine("ASPECT_CROP");

    inAspectPos.setUiAttribs({ "greyout": !inAspect.get() });
    inAspectCrop.setUiAttribs({ "greyout": !inAspect.get() });
    inAspectAxis.setUiAttribs({ "greyout": !inAspect.get() });

    if (inAspect.get())
    {
        shader.define("ASPECT_RATIO");

        if (inAspectCrop.get()) shader.define("ASPECT_CROP");

        if (inAspectAxis.get() == "X") shader.define("ASPECT_AXIS_X");
        if (inAspectAxis.get() == "Y") shader.define("ASPECT_AXIS_Y");
    }
    else
    {
        shader.removeDefine("ASPECT_RATIO");
        if (inAspectCrop.get()) shader.define("ASPECT_CROP");

        if (inAspectAxis.get() == "X") shader.define("ASPECT_AXIS_X");
        if (inAspectAxis.get() == "Y") shader.define("ASPECT_AXIS_Y");
    }
}

//
// texture flip
//
const flipX = op.inValueBool("flip x");
const flipY = op.inValueBool("flip y");

//
// texture transform
//

let doTransform = op.inValueBool("Transform");

let scaleX = op.inValueSlider("Scale X", 1);
let scaleY = op.inValueSlider("Scale Y", 1);

let posX = op.inValue("Position X", 0);
let posY = op.inValue("Position Y", 0);

let rotate = op.inValue("Rotation", 0);

const inClipRepeat = op.inValueBool("Clip Repeat", false);

const uniScaleX = new CGL.Uniform(shader, "f", "scaleX", scaleX);
const uniScaleY = new CGL.Uniform(shader, "f", "scaleY", scaleY);
const uniPosX = new CGL.Uniform(shader, "f", "posX", posX);
const uniPosY = new CGL.Uniform(shader, "f", "posY", posY);
const uniRotate = new CGL.Uniform(shader, "f", "rotate", rotate);

doTransform.onChange = updateTransformPorts;

function updateTransformPorts()
{
    shader.toggleDefine("TEX_TRANSFORM", doTransform.get());

    scaleX.setUiAttribs({ "greyout": !doTransform.get() });
    scaleY.setUiAttribs({ "greyout": !doTransform.get() });
    posX.setUiAttribs({ "greyout": !doTransform.get() });
    posY.setUiAttribs({ "greyout": !doTransform.get() });
    rotate.setUiAttribs({ "greyout": !doTransform.get() });
}

CGL.TextureEffect.setupBlending(op, shader, blendMode, amount);

const amountUniform = new CGL.Uniform(shader, "f", "amount", amount);

render.onTriggered = doRender;

inClipRepeat.onChange =
    imageAlpha.onChange =
    inAlphaPremul.onChange =
    inAlphaMask.onChange =
    invAlphaChannel.onChange =
    flipY.onChange =
    flipX.onChange =
    removeAlphaSrc.onChange =
    alphaSrc.onChange = updateDefines;

updateTransformPorts();
updateAlphaPorts();
updateAspectRatio();
updateDefines();

function updateDefines()
{
    shader.toggleDefine("REMOVE_ALPHA_SRC", removeAlphaSrc.get());
    shader.toggleDefine("ALPHA_MASK", inAlphaMask.get());

    shader.toggleDefine("CLIP_REPEAT", inClipRepeat.get());

    shader.toggleDefine("HAS_TEXTUREALPHA", imageAlpha.get() && imageAlpha.get().tex);

    shader.toggleDefine("TEX_FLIP_X", flipX.get());
    shader.toggleDefine("TEX_FLIP_Y", flipY.get());

    shader.toggleDefine("INVERT_ALPHA", invAlphaChannel.get());

    shader.toggleDefine("ALPHA_FROM_LUMINANCE", alphaSrc.get() == "luminance");
    shader.toggleDefine("ALPHA_FROM_INV_UMINANCE", alphaSrc.get() == "luminance_inv");
    shader.toggleDefine("PREMUL", inAlphaPremul.get());
}

function doRender()
{
    if (!CGL.TextureEffect.checkOpInEffect(op)) return;

    const tex = image.get();
    if (tex && tex.tex && amount.get() > 0.0)
    {
        cgl.pushShader(shader);
        cgl.currentTextureEffect.bind();

        const imgTex = cgl.currentTextureEffect.getCurrentSourceTexture();
        cgl.setTexture(0, imgTex.tex);

        // if (imgTex && tex)
        // {
        //     if (tex.textureType != imgTex.textureType && (tex.textureType == CGL.Texture.TYPE_FLOAT))
        //         op.setUiError("textypediff", "Drawing 32bit texture into an 8 bit can result in data/precision loss", 1);
        //     else
        //         op.setUiError("textypediff", null);
        // }

        const asp = 1 / (cgl.currentTextureEffect.getWidth() / cgl.currentTextureEffect.getHeight()) * (tex.width / tex.height);
        // uniTexAspect.setValue(1 / (tex.height / tex.width * imgTex.width / imgTex.height));

        uniTexAspect.setValue(asp);

        cgl.setTexture(1, tex.tex);
        // cgl.gl.bindTexture(cgl.gl.TEXTURE_2D, image.get().tex );

        if (imageAlpha.get() && imageAlpha.get().tex)
        {
            cgl.setTexture(2, imageAlpha.get().tex);
            // cgl.gl.bindTexture(cgl.gl.TEXTURE_2D, imageAlpha.get().tex );
        }

        // cgl.pushBlend(false);

        cgl.pushBlendMode(CGL.BLEND_NONE, true);

        cgl.currentTextureEffect.finish();
        cgl.popBlendMode();

        // cgl.popBlend();

        cgl.popShader();
    }

    trigger.trigger();
}


};

Ops.Gl.ImageCompose.DrawImage_v3.prototype = new CABLES.Op();
CABLES.OPS["8f6b2f15-fcb0-4597-90c0-e5173f2969fe"]={f:Ops.Gl.ImageCompose.DrawImage_v3,objName:"Ops.Gl.ImageCompose.DrawImage_v3"};




// **************************************************************
// 
// Ops.Gl.ImageCompose.AlphaMask_v2
// 
// **************************************************************

Ops.Gl.ImageCompose.AlphaMask_v2 = function()
{
CABLES.Op.apply(this,arguments);
const op=this;
const attachments=op.attachments={"alphamask_frag":"IN vec2 texCoord;\nUNI sampler2D tex;\nUNI sampler2D image;\nUNI float amount;\n\nvoid main()\n{\n    vec4 col=vec4(0.0,0.0,0.0,1.0);\n    col=texture(tex,texCoord);\n\n#ifdef USE_TEXTURE\n    float newAlpha=0.0;\n\n    #ifdef FROM_RED\n       newAlpha=texture(image,texCoord).r;\n    #endif\n\n    #ifdef FROM_GREEN\n       newAlpha=texture(image,texCoord).g;\n    #endif\n\n    #ifdef FROM_BLUE\n       newAlpha=texture(image,texCoord).b;\n    #endif\n\n    #ifdef FROM_ALPHA\n       newAlpha=texture(image,texCoord).a;\n    #endif\n\n    #ifdef FROM_LUMINANCE\n       float gray = dot(vec3(0.2126,0.7152,0.0722), texture(image,texCoord).rgb );\n       newAlpha=gray;\n    #endif\n\n\n    newAlpha*=amount;\n\n    #ifdef INVERT\n        newAlpha=1.0-newAlpha;\n    #endif\n\n    #ifdef METH_OVERRIDE\n        col.a=newAlpha;\n    #endif\n    #ifdef METH_ADD\n        col.a+=newAlpha;\n    #endif\n    #ifdef METH_MUL\n        col.a*=newAlpha;\n    #endif\n\n#endif\n#ifndef USE_TEXTURE\n    col.a*=amount;\n    // col.g=1.0;\n#endif\n\n    outColor= col;\n}",};
const
    render = op.inTrigger("render"),
    inAmount = op.inFloatSlider("Amount", 1),
    inMethod = op.inSwitch("Method", ["Override", "Mul", "Add"], "Override"),
    inInvert = op.inBool("Invert", false),
    image = op.inTexture("image"),
    next = op.outTrigger("trigger");

const cgl = this.patch.cgl;
const shader = new CGL.Shader(cgl, op.name, op);
shader.setSource(shader.getDefaultVertexShader(), attachments.alphamask_frag);

const textureUniform = new CGL.Uniform(shader, "t", "tex", 0);
const textureDisplaceUniform = new CGL.Uniform(shader, "t", "image", 1);
const amountUniform = new CGL.Uniform(shader, "f", "amount", inAmount);

// const method = this.addInPort(new CABLES.Port(this, "method", CABLES.OP_PORT_TYPE_VALUE, { "display": "dropdown", "values": ["luminance", "image alpha", "red", "green", "blue"] }));
const method = op.inDropDown("method", ["luminance", "image alpha", "red", "green", "blue"], "luminance");

image.onChange =
inMethod.onChange =
inInvert.onChange =
method.onChange = function ()
{
    shader.toggleDefine("FROM_LUMINANCE", method.get() == "luminance");
    shader.toggleDefine("FROM_ALPHA", method.get() == "image alpha");
    shader.toggleDefine("FROM_RED", method.get() == "red");
    shader.toggleDefine("FROM_GREEN", method.get() == "green");
    shader.toggleDefine("FROM_BLUR", method.get() == "blue");
    shader.toggleDefine("USE_TEXTURE", image.get());

    shader.toggleDefine("INVERT", inInvert.get());
    shader.toggleDefine("METH_MUL", inMethod.get() == "Mul");
    shader.toggleDefine("METH_ADD", inMethod.get() == "Add");
    shader.toggleDefine("METH_OVERRIDE", inMethod.get() == "Override");
};

render.onTriggered = function ()
{
    if (!CGL.TextureEffect.checkOpInEffect(op, 3)) return;
    // if (!image.get()) return next.trigger();

    cgl.pushShader(shader);
    cgl.currentTextureEffect.bind();

    cgl.setTexture(0, cgl.currentTextureEffect.getCurrentSourceTexture().tex);

    if (image.get() && image.get().tex) cgl.setTexture(1, image.get().tex);

    cgl.currentTextureEffect.finish();
    cgl.popShader();

    next.trigger();
};


};

Ops.Gl.ImageCompose.AlphaMask_v2.prototype = new CABLES.Op();
CABLES.OPS["a971aaa4-565f-47cf-8a4f-61a3a4378183"]={f:Ops.Gl.ImageCompose.AlphaMask_v2,objName:"Ops.Gl.ImageCompose.AlphaMask_v2"};



window.addEventListener('load', function(event) {
CABLES.jsLoaded=new Event('CABLES.jsLoaded');
document.dispatchEvent(CABLES.jsLoaded);
});
