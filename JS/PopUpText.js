(function () {
    splitIntoLines("content");
    animateText("content");
    setTimeout(function() {
        removeSplit("content");
    },600);
})();

function splitIntoLines(className) {
    var curEls = document.getElementsByClassName(className);
    var innerText;
    var spl;

    for (var i = 0; i < curEls.length; i++) {
        innerText = curEls[i].innerHTML.trim().replace(/(?:\r\n|\r|\n)/g, "");
        spl = innerText.split(" ");
        innerText = "";

        //Separated the current element into words
        for (var w = 0; w < spl.length; w++) {
            innerText += "<div class=\"split-wrapper\" style=\"display: inline-block\">"
                + spl[w] + "</div>";
            if (w < spl.length - 1) {
                innerText += " ";
            }
        }
        curEls[i].innerHTML = innerText;

        var splitEls = document.querySelectorAll("." + className+" > .split-wrapper");
        var offsetY = splitEls[0].getBoundingClientRect().top;
        var lineStr = [""];
        var index = 0;
        for (var s = 0; s < splitEls.length; s++) {

            if (offsetY === splitEls[s].getBoundingClientRect().top) {
                lineStr[index] += splitEls[s].innerHTML;

                if (s < splitEls.length - 1) {
                    lineStr[index] += " ";
                }

            } else {
                index++;
                lineStr.push(splitEls[s].innerHTML);

                if (s !== splitEls.length - 1) {
                    lineStr[index] += " ";
                }

                offsetY = splitEls[s].getBoundingClientRect().top;
            }
        }

        var lineHeight = splitEls[0].clientHeight;
        var lineDiv = "";
        for (var d = 0; d < lineStr.length; d++) {
            lineDiv += "<div class = \"line-wrapper\" style=\"overflow:hidden; height:"
                + lineHeight + "px\">" + lineStr[d] + "</div>";
        }
        curEls[i].innerHTML = lineDiv;
    }
}

function removeSplit(className) {
    var curElms = document.getElementsByClassName(className);

    for (var el = 0; el < curElms.length; el++) {

        var lines = curElms[el].getElementsByClassName("line-wrapper");
        var innerText = "";

        for (var line = 0; line < lines.length; line++) {
            innerText += lines[line].innerText;
            if (line < lines.length - 1) {
                innerText += " ";
            }
        }
        curElms[el].innerText = innerText;
        curElms[el].removeAttribute("style");
    }
}

function animateText(className) {
    var fHeight;
    var fWidth;
    var curEls = document.getElementsByClassName(className);

    for (var el = 0; el < curEls.length; el++) {

        //get value style for main element
        try {
            fWidth = window.getComputedStyle(document.getElementsByClassName('content')[0], null)
                .getPropertyValue('width');
            fHeight = window.getComputedStyle(document.getElementsByClassName('content')[0], null)
                .getPropertyValue('height');
        } catch (e) {
            fWidth = document.getElementsByClassName('content').currentStyle.width;
            fHeight = document.getElementsByClassName('content').currentStyle.height;
        } 

        //set static style for main elements
        curEls[el].style.height = fHeight;
        curEls[el].style.width = fWidth;
        curEls[el].style.position = "relative";
        var curLines = curEls[el].getElementsByClassName("line-wrapper");
        var timer = 300;
        var lHeight = curLines[0].clientHeight;

        for (var l = 0; l < curLines.length; l++) {

            //set static style for line
            curLines[l].style.height = lHeight+"px";
            curLines[l].style.position = "absolute";
            curLines[l].style.marginTop = (lHeight * l) + "px";
            setTimeout(animateCss, timer * l, curLines[l]);
        }

        //emergency text animation
        function animateCss(el) {
            var time = 300;
            var start = Date.now();
            var duration = setInterval(function () {

                var durationPassed = Date.now() - start;

                if (durationPassed > time) {
                    clearInterval(duration);
                    el.style.height = (lHeight) + "px";
                    el.style.paddingTop = 0 + "px";
                    return;
                }

                el.style.height = (lHeight * (durationPassed / time)) + "px";
                el.style.paddingTop = (lHeight * ((time - durationPassed )/ time)) + "px";

            }, 20);
        }
    }
}

