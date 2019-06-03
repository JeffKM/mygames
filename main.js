var ball = [];
var rad = 6;
var speed = 4;
var randRange = [];

var canvas;
var ctx;
var width;
var height;


$(document).ready(function(){
	'use strict';
	console.log('main.js loaded');
	
	canvas=document.getElementById('mainCanvas');
	ctx=canvas.getContext("2d");
	width = canvas.width;
	height = canvas.height;
	setSpeed(speed);
	
	
	canvas.addEventListener("keydown",function(){
		newBall(0,0);
	});
	canvas.addEventListener("click",function(event){
		console.log(event);
		newBall(event.layerX,event.layerY);
	});
	
	
	setInterval(frame,10);
})

function frame() {
	moveBall();
	drawBall();
	console.log('frame');
}

function setSpeed(speed) {
	for (var i = 1; i < speed + 1; i++) {
		randRange[randRange.length] = i;
		randRange[randRange.length] = -i;
	}
}

function drawBall() {
	ctx.clearRect(0,0,width+100,height+100);
	
	for (var i = 0; i < ball.length; i++) {
		ctx.beginPath();
		ctx.arc(ball[i].point.x, ball[i].point.y, rad,0,Math.PI*2);
		ctx.fillStyle="#0095DD";
		ctx.fill();
		ctx.closePath();
	}
	
}

function newBall(bx, by) {
	console.log('New ball is comming!');
	var l = ball.length;
	ball[l] = {
		point : {
			x : bx,
			y : by
		},
		move : {
			x:randRange[randSpeed(randRange.length-1)],
			y:randRange[randSpeed(randRange.length-1)]
		}
	};
	console.log(ball);
}

function moveBall() {
	for (var i = 0; i < ball.length; i++) {
		ball[i].point.x += ball[i].move.x;
		ball[i].point.y += ball[i].move.y;
		if (ball[i].point.x < 0) {
			ball[i].point.x = 0;
			ball[i].move.x = -ball[i].move.x;
		} else if (ball[i].point.x > width) {
			ball[i].point.x = width;
			ball[i].move.x = -ball[i].move.x;
		}
		if (ball[i].point.y < 0) {
			ball[i].point.y = 0;
			ball[i].move.y = -ball[i].move.y;
		} else if (ball[i].point.y > height) {
			ball[i].point.y = height;
			ball[i].move.y = -ball[i].move.y;
		}
	}
}

function randSpeed(size){  //0~size
	return Math.floor(Math.random()*size);
}

