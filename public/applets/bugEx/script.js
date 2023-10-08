var canvas = document.createElement("canvas");
var canvas_context = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;
canvas.style.boxShadow = "0px 0px 3px #999999";
canvas.style.borderRadius = "5px";

document.body.appendChild(canvas);

var background_ready = false;
var background_image = new Image();
background_image.onload = function () {
	background_ready = true;
};
background_image.src = "img/bg_base.png";

var bug_ready = false;
var bug_sprite = new Image();
bug_sprite.onload = function () {
	bug_ready = true;
};
bug_sprite.src = "img/spr_bug.png";

var bug = {};
var bug_kills = 0;
var bug_timerMax = 100;
var bug_timer = bug_timerMax;
var mouse_x, mouse_y;

window.addEventListener("click", mouseClick, false);
window.addEventListener("mousemove", saveMousePosition, false);

function findMouse(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

function saveMousePosition(e) {
	var position = findMouse(canvas, e);
	mouse_x = position.x;
	mouse_y = position.y;
}

function reset() {
	if (bug_timer <= 0) {
		bug.x = 32 + (Math.random() * (canvas.width - 64));
		bug.y = 32 + (Math.random() * (canvas.height - 64));
		bug_timer = bug_timerMax;
	} else {
		bug_timer--;
	}
};

function mouseClick() {
	var xClickDelta = mouse_x - bug.x;
	var yClickDelta = mouse_y - bug.y;
	if(xClickDelta <= 31 && xClickDelta >=0 && yClickDelta <= 31 && yClickDelta >= 0) {
		bugKill();
	}
}

function bugKill() {
	bug.x = 32 + (Math.random() * (canvas.width - 64));
	bug.y = 32 + (Math.random() * (canvas.height - 64));
	if (bug_timerMax > 1) {
		bug_timerMax--;
	} else {
		bug_timerMax = 1;
	}
	bug_kills++;
	bug_timer = bug_timerMax;
}

function update() {
	reset();
};

function resetScore() {
	bug_kills = 0;
}

function resetSpeed() {
	bug_timerMax = 100;
	bug_timer = 100;
}

function render() {
	if (background_ready) {
		canvas_context.drawImage(background_image, 0, 0);
	}

	if (bug_ready) {
		canvas_context.drawImage(bug_sprite, bug.x, bug.y);
	}

	canvas_context.fillStyle = "rgb(20, 20, 20)";
	canvas_context.font = "18px Verdana";
	canvas_context.textAlign = "left";
	canvas_context.textBaseline = "top";
	canvas_context.fillText("Bugs Killed: " + bug_kills, 16, 16);
	canvas_context.fillText("Bug Timer: " + bug_timer, 16, 36);
	canvas_context.fillText("Difficulty: " + (100 - bug_timerMax), 16, 56);

};

function main() {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;
	requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();