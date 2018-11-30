var mEl = document.getElementsByClassName("services-container")[0];
parallax(mEl);

function parallax(el) {
    el.onmousemove = p;
    var isStart = false;
    function p(event) {
        const X = event.clientX;
        const Y = event.clientY;
        const maxX = el.getBoundingClientRect().left + el.clientWidth;
        const maxY = el.getBoundingClientRect().top + el.clientHeight;
        const minX = el.getBoundingClientRect().left;
        const minY = el.getBoundingClientRect().top;
        const filter = document.getElementById(el.getElementsByTagName("image")[0]
            .getAttribute("filter").replace("url(#", "").replace(")", ""));
        var feImg = filter.getElementsByTagName("feImage")[0];
        var pX = 100 / (maxX - minX) * (X - minX) *0.5;
        var pY = 100 / (maxY - minY) * (Y - minY) *0.5;

        var oldPosition = {
            "x": parseFloat(feImg.getAttribute("x")),
            "y": parseFloat(feImg.getAttribute("y"))
        };

        if (!isStart) {
            //isStart = true;
            animate({
                duration: 5000,
                timing: function (timeFraction) {
                    var test = Math.sqrt(timeFraction);
                    return Math.sqrt(timeFraction);
                },
                draw: function (progress) {
                    feImg.setAttribute("x", oldPosition.x - pX * progress - oldPosition.x * progress + "%");
                    feImg.setAttribute("y", oldPosition.y - pY * progress - oldPosition.y * progress + "%");
                }
            },
                function () {
                    isStart = false;
                });
        }

        function animate({ timing, draw, duration }, callback) {

            const start = performance.now();

            requestAnimationFrame(function animate(time) {
                // timeFraction goes from 0 to 1
                let timeFraction = (performance.now() - start) / duration;
                if (timeFraction > 1) timeFraction = 1;

                // calculate the current animation state
                const progress = timing(timeFraction);

                draw(progress); // draw it

                if (timeFraction < 1) {
                    requestAnimationFrame(animate);
                } else {
                    callback(false);
                }

            });
        }
    }
};