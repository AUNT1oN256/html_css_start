var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var strokeColor = "#ffffff";
var circles = [];
var colorIndex = 0;

canvas.addEventListener("mousemove", function(e) {
        if (e.buttons & 1) {
            var circle = {
                x: e.clientX,
                y: e.clientY,
                r: randomRadius(),
                c: randomColor(),
                vx: randomSpeed(),
                vy: randomSpeed()
            };
            circles.push(circle);
        }
    });
    

function randomColor() {
        var r = Math.floor(Math.random() * 256);
        var g = Math.floor(Math.random() * 256);
        var b = Math.floor(Math.random() * 256);
        return "rgba(" + r + "," + g + "," + b + ", 0.5)";
    }

function randomRadius(){
    var r = Math.floor(Math.random() * 91) + 10;
    return r;
}

function randomSpeed(){
    var s = Math.floor(Math.random() * 11) - 5;
    return s;
}

function onCanvasClick(e){
    var circle = {
        x: e.clientX,
        y: e.clientY,
        r: randomRadius(),
        c: randomColor(),
        vx: randomSpeed(),
        vy: randomSpeed()
    };
    circles.push(circle);
}

function updateCircles(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < circles.length; i++){
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = 2;
        ctx.stroke();
        var circle = circles[i];
        ctx.fillStyle = circle.c;
        ctx.beginPath();
        ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2);
        ctx.fill();
        circle.x += circle.vx;
        circle.y += circle.vy;
        if (circle.x - circle.r < 0 || circle.x + circle.r > canvas.width){
            circle.vx = -circle.vx;
        }
        if (circle.y - circle.r < 0 || circle.y + circle.r > canvas.height){
            circle.vy = -circle.vy;
        }
    }
    requestAnimationFrame(updateCircles);
}

canvas.addEventListener("click", onCanvasClick);
updateCircles();
