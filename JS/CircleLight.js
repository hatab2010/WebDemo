var Width = document.documentElement.clientWidth;
var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
var svgNS = svg.namespaceURI;
var container = document.getElementById("lightContainer");

var rects = {
    "quantity": 10,
    "offsetX": 0.5,
    "height": 250,
    "width": 400
};

//color and stop-opacity for diodes
var radialGradients = {
    "rgbColors": [
        //RED
        "rgb(0,128,255)",
        //GREEN
        "rgb(0,255,0)",
        //BLUE
        "rgb(255,0,0)"],
    "stops": [
        {
            "offset": "0%",
            "stop-opacity": 1
        }, {
            "offset": "20%",
            "stop-opacity": 0.8
        }, {
            "offset": "70%",
            "stop-opacity": 0.1
        }, {
            "offset": "100%",
            "stop-opacity": 00
        }]
}

//gradient for light reflex effect
var reflex = {
    "rgbColors": ["rgb(255, 255, 255)"],
    "stops": [
        {
            "offset": "0%",
            "stop-opacity": 1
        }, {
            "offset": "50%",
            "stop-opacity": 1
        }, {
            "offset": "100%",
            "stop-opacity": 0
        }]
}
//create a <defs> element
var defs = document.createElementNS(svgNS, "defs");

//generate <radialGradient> elements
for (var color = 0; color < radialGradients.rgbColors.length; color++) {
    var cg = document.createElementNS(svgNS, "radialGradient");
    cg.setAttribute("cx", 0.5);
    cg.setAttribute("cy", 0.5);
    cg.setAttribute("fx", 0.5);
    cg.setAttribute("fy", 0);
    cg.setAttribute("r", 0.5);
    cg.id = "color" + color;

    //generate a <stops> for <circleGradient>
    for (var s = 0; s < radialGradients.stops.length; s++) {
        var stop = document.createElementNS(svgNS, "stop");
        stop.setAttribute("offset", radialGradients.stops[s].offset);
        stop.setAttribute("style", "stop-color:" + radialGradients.rgbColors[color] + "; stop-opacity:" + radialGradients.stops[s]["stop-opacity"]);
        cg.appendChild(stop);
    }

    //Append <radialGradient> to <defs> and <defs> to <svg>
    defs.appendChild(cg);
}

//create a group for rect elements
var group = document.createElementNS(svgNS, "g");
//group.setAttribute("filter", "url(#blurFilter)");
var reflexGroup = document.createElementNS(svgNS, "g");

//create white <radialGradient> (light reflex)
//for (var color = 0; color < reflex.rgbColors.length; color++) {
//    var rg = document.createElementNS(svgNS, "radialGradient");
//    rg.setAttribute("cx", 0.5);
//    rg.setAttribute("cy", 0.5);
//    rg.setAttribute("fx", 0.5);
//    rg.setAttribute("fy", 0);
//    rg.setAttribute("r", 0.5);
//    rg.id = "whiteLight";

//    //generate a <stops> for <circleGradient>
//    for (var s = 0; s < reflex.stops.length; s++) {
//        var stop = document.createElementNS(svgNS, "stop");
//        stop.setAttribute("offset", reflex.stops[s].offset);
//        stop.setAttribute("style", "stop-color:" + reflex.rgbColors[color] + "; stop-opacity:" + reflex.stops[s]["stop-opacity"]);
//        rg.appendChild(stop);
//    }

//    defs.appendChild(rg);
//}



//generate <rect> colors elements
for (var i = 0; i < rects.quantity; i++) {
    var r = document.createElementNS(svgNS, "rect");
    //sin(x+1)*x + 10
    var delta = (rects.quantity * Math.sin(i + 1) * i + 10) / 80 + 1.5 ;
    r.setAttribute("x", i * Width / rects.quantity);
    r.setAttribute("y", -15);
    r.setAttribute("width", rects.width);
    r.setAttribute("height", rects.height*delta);
    r.setAttribute("fill", "url(#color"+i%radialGradients.rgbColors.length+")");
    group.appendChild(r);
}
//TODO генерировать delta пропорционально
//generate white light <rect>
for (var i = 0; i < rects.quantity; i++) {
    var delta = 3;
    var sinDelta = (rects.quantity * Math.sin(i + 1) * i + 10) / 80 + 1.5;
    var r = document.createElementNS(svgNS, "rect");
    r.setAttribute("x", i * Width / rects.quantity + (rects.width - rects.width / delta)/2);
    r.setAttribute("y", -15);
    r.setAttribute("width", rects.width / delta);
    r.setAttribute("height", rects.height / 5 * sinDelta);
    r.setAttribute("fill", "url(#whiteLight)");
    reflexGroup.appendChild(r);
}

//Upset all elements to <svg>
svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
svg.setAttribute("class", "diode-light");
svg.appendChild(defs);
svg.appendChild(group);
svg.appendChild(reflexGroup);
document.body.insertBefore(svg, document.body.firstChild);