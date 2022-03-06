$(document).ready(function(){
    function includeJs(jsFilePath, isAsync = true) {
        let js = document.createElement("script");
        js.type = "text/javascript";
        js.src = jsFilePath;
        js.async = true;
        document.body.appendChild(js);
    }
    setTimeout(function(){
        $.getScript("/assets/js/three.min.js", function() {
            $.getScript("/assets/js/vanta.birds.min.js", function() {
                VANTA.BIRDS({
                    el: "#saas_two_feature",
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    backgroundColor: 0xffffff,
                    color1: 0x2c00ff,
                    birdSize: 0.40,
                    quantity: 3.00,
                    speedLimit: 3.00
                });
            });
        });
    }, 3000);
})