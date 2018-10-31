var canvas = document.querySelector(".game");

var ctx = canvas.getContext("2d");

//-------------------STRART SCREEN-------------------

var startscreenImg = new Image();
startscreenImg.src = "./images/titlescreen.png";

var startCounter = 0;
var pressedStart = false;

drawStartScreen();

function drawStartScreen () {
	ctx.clearRect(0, 0, 1000, 1000);

	ctx.drawImage(startscreenImg, 0, 0, 1000, 1000);



//-------------------------start screen--------------

	if (startCounter <= 30){
		ctx.fillStyle = "white";
		ctx.font = "bold 60px SolidSans"
		ctx.fillText("PRESS ANY KEY TO START", 185, 850);
	};

	if (startCounter > 30){
		ctx.fillStyle = "transparent";
		ctx.font = "bold 60px SolidSans"
		ctx.fillText("PRESS ANY KEY TO START", 185, 850);
	};

	if (startCounter === 60) {
		startCounter = 0;
	};

	startCounter ++;
	
	document.onkeydown = function () {
		pressedStart = true;
		console.log("pressed start");
	};

	requestAnimationFrame(function () {
		if (pressedStart === false) {
			drawStartScreen();
		} 

		else if (pressedStart) {
			drawingLoopGame();

		}
	});
};


//-------------moving background------------


var background = new Image();
background.src = "./images/track-background-waves.png";

var backgroundWaves2 = {
	x: -1000,
	y: 0,
	width: 1000,
	height: 1000,

	drawMe: function () {
		ctx.drawImage(background, this.x, this.y, this.width, this.height);
	}
};
var backgroundWaves1 = {
	x: 0,
	y: 0,
	width: 1000,
	height: 1000,

	drawMe: function () {
		ctx.drawImage(background, this.x, this.y, this.width, this.height);
	}
};

function movingBackground (image1, image2) {
	image1.drawMe();
	image2.drawMe();

	image1.x +=2;
	image2.x +=2;

	if(image1.x === 1000) {
		image1.x = -1000
	};
	if(image2.x === 1000) {
		image2.x = -1000;
	};
}


//-----------------------game screen-----------------

var carImg = new Image();
carImg.src = "./images/car1.png";

var car = {
	x: 0,
	y: 0,
	width: 34,
	height: 58,
	isCrashed: false,
	rotation: 90,
	speed: 0,
	acceleration: 0.5,
	maxSpeed: 30,
	brake: 1,
	maniability : 7,
	rotate: function (){
		return this.rotation * Math.PI/180;
	},
	drawMe: function () {

		ctx.translate(this.x+this.width/2, this.y+this.height/2	)
		ctx.rotate(this.rotate());


		ctx.drawImage(carImg, -this.width/2, -this.height/2, this.width, this.height);
	}
};


class Border {
	constructor (borderX, borderY, borderWidth, borderHeight) {
		this.x = borderX;
		this.y = borderY;
		this.width = borderWidth;
		this.height = borderHeight;
		this.isCrashed = false;
	}

	drawMe () {
		ctx.fillStyle = "#C83A3A"
			
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}

class FinishLine {
	constructor (lineX, lineY, lineWidth, lineHeight) {
		this.x = lineX;
		this.y = lineY;
		this.width = lineWidth;
		this.height = lineHeight;
		this.isCrossed = -1
	}

	drawMe () {
		ctx.fillStyle = "#6152D3"
		
			
		ctx.fillRect(this.x, this.y, this.width, this.height);

		//bottom bar
		ctx.fillStyle = "#B3C3E8";
		ctx.fillRect(150, 880, 700, 120);

		ctx.font = "bold 40px SolidSans";
		ctx.fillStyle = "#4E4E4E";
		if (this.isCrossed >=0) {
			ctx.fillText("lap counter " + this.isCrossed, 200, 950);
		}
		else {
			ctx.fillText("Get ready", 200, 950);
		}
	}
}

//----------------------TRACKS--------------------

//------------------track 1---------------------
var track1Background = new Image();
track1Background.src = "./images/track-1-outline.png";

var track1 = [
	//straight top
	new Border(200, 270, 600, 15),
	new Border(300, 415, 400, 15),

	//curve left outer
	new Border(180, 280, 40, 15),
	new Border(150, 290, 40, 15),
	new Border(120, 300, 40, 15),
	new Border(100, 310, 40, 15),
	new Border(80, 325, 40, 15),
	new Border(60, 340, 40, 15),
	new Border(45, 355, 40, 15),
	new Border(45, 370, 15, 30),
	new Border(35, 400, 15, 30),
	new Border(25, 430, 15, 30),
	new Border(15, 460, 15, 30),
	new Border(5, 490, 20, 90),
	new Border(15, 580, 15, 30),
	new Border(25, 610, 15, 30),
	new Border(35, 640, 15, 30),
	new Border(45, 670, 15, 30),
	new Border(45, 700, 40, 15),
	new Border(60, 715, 40, 15),
	new Border(80, 730, 40, 15),
	new Border(100, 745, 40, 15),
	new Border(120, 760, 40, 15),
	new Border(150, 775, 40, 15),
	new Border(180, 790, 40, 15),

	// right curve outer
	new Border(790, 280, 40, 15),
	new Border(820, 290, 40, 15),
	new Border(850, 300, 40, 15),
	new Border(870, 310, 40, 15),
	new Border(890, 325, 40, 15),
	new Border(910, 340, 40, 15),
	new Border(925, 355, 40, 15),
	new Border(940, 370, 15, 30),
	new Border(955, 400, 15, 30),
	new Border(965, 430, 15, 30),
	new Border(975, 460, 15, 160),
	new Border(965, 620, 15, 30),
	new Border(950, 650, 15, 30),
	new Border(935, 680, 15, 30),
	new Border(910, 710, 40, 15),
	new Border(890, 725, 40, 15),
	new Border(870, 740, 40, 15),
	new Border(850, 755, 40, 15),
	new Border(830, 770, 40, 15),
	new Border(800, 780, 40, 25),

	//straight bottom
	new Border(300, 650, 400, 10),
	new Border(200, 790, 600, 15),

	//center isle
	new Border(300, 430, 400, 220),
	new Border(270, 435, 455, 210),
	new Border(235, 440, 520, 190),
	new Border(220, 460, 550, 160),
	new Border(205, 480, 580, 120),
];

var finishLine1 = new FinishLine(600, 660, 10, 129);


//-------------------track 2-------------------

var track2Background = new Image();
track2Background.src = "./images/track-2-outline.png"

var track2 = [
	//straight top
	new Border(390, 165, 310, 15),
	new Border(380, 330, 320, 15),
	new Border(120, 20, 890, 15),
	new Border(990, 20, 15, 600),

	//straight left
	new Border(120, 20, 15, 550),
	new Border(270, 270, 15, 550),
	new Border(360, 270, 15, 550),
	new Border(0, 800, 1000, 15),

	//straight right
	new Border(700, 650, 300, 15),
	new Border(700, 480, 300, 15),

	new Border(700, 490, 15, 160),
	new Border(700, 180, 15, 160),
	new Border(380, 180, 15, 160),
	new Border(280, 270, 150, 15),
	new Border(700, 490, 15, 160),

	//left curve
	new Border(0, 650, 30, 15),
	new Border(30, 635, 30, 15),
	new Border(60, 620, 30, 15),
	new Border(90, 605, 20, 15),
	new Border(110, 580, 10, 25),
	new Border(110, 580, 10, 25),
];

var finishLine2 = new FinishLine(500, 20, 10, 140)

//-----------------LEVEL 3-----------------

var track3Background = new Image();
track3Background.src = "./images/track-3-outline.png"

var track3 = [
	new Border(0, 145, 750, 15),
	new Border(0, 290, 1000, 15),
	new Border(0, 365, 1000, 15),
	new Border(190, 505, 810, 15),
	new Border(150, 650, 850, 15),
	new Border(150, 790, 850, 15),

	new Border(0, 350, 15, 315),
	new Border(0, 790, 15, 210), 
	new Border(145, 790, 15, 210),
	new Border(935, 0, 15, 315),
	new Border(795, 0, 15, 120),
	new Border(145, 540, 15, 120),

	new Border(160, 525, 15, 15),
	new Border(175, 510, 15, 15),
	new Border(750, 130, 30, 15),
	new Border(780, 115, 15, 15),
];

var finishLine3 = new FinishLine(350, 660, 10, 140);

//--------------------LEVEL 4--------------------

var track4Background = new Image();
track4Background.src = "./images/track-4-outline.png";

var track4 = [
	new Border(0, 145, 1000, 15),
	new Border(0, 790, 1000, 15),
	new Border(0, 0, 15, 1000),
	new Border(945, 0, 15, 1000),
	new Border(0, 430, 430, 15),
	new Border(590, 580, 430, 15),
	new Border(430, 0, 15, 440),
	new Border(580, 580, 15, 440),
	new Border(585, 300, 215, 100),
	new Border(585, 300, 170, 140),
	new Border(170, 585, 270, 50),
	new Border(190, 605, 250, 50),
];

var finishLine4 = new FinishLine(300, 440, 10, 140);

//---------------check for keyPressed-------------
var keyPressed = false;
document.onkeyup = function (event) {
	switch(event.keyCode) {
		case 90: 
			keyPressed = false;
			break;
		case 83: 
			keyPressed = false;
			break;
		default:	
		break;
	};
};

//------------go forward depending on rotation-----------
function goForward () {
	car.y -= car.speed * Math.cos(car.rotate());	
	car.x += car.speed * Math.sin(car.rotate());
};
	
//----------------go reverse---------------
function goBackwards () {
	if (car.speed < car.maxSpeed) {
		car.speed -= car.acceleration;
	};
};

//-------------------acceleration-------------
function accelerate () {
	if (car.speed < car.maxSpeed) {
		car.speed += car.acceleration;
	};
};

//---------------------brake--------------------
function brake () {
	if (car.speed > 0) {
		car.speed -= car.brake
	};
};

//--------------deceleration---------------------
function decelerate () {
	if (car.speed > 0) {
		car.speed -= car.acceleration/6
	};
	if (car.speed < 0) {
		car.speed += car.acceleration/3
	};
	if (car.speed > -0.5 && car.speed < 0.5) {
		car.speed = 0;
	};
};

//--------------collision detection-----------
function collision (car, border) {
	return car.y + car.height >= border.y
		&&	car.y <= border.y + border.height
		&& car.x + car.width >= border.x
		&& car.x <= border.x + border.width;	
};

//--------------movement system-------------
function movementSystem () {
	document.onkeydown = function (event) {
		if (!car.isCrashed) {
			switch (event.keyCode) {
				case 90: //z
					accelerate();
					keyPressed = true;
					break;
				case 83: //s
					keyPressed = true;
					if (car.speed > 0) {
						brake();
					}
					else{
						goBackwards();
						console.log(car.speed);
					}
					break;
				case 81: //q
					if (car.speed >= 0) {
						car.rotation -= car.maniability;
					}

					else if (car.speed < 0) {
						car.rotation += car.maniability;
					}

					if (car.rotation < 0) {
						car.rotation += 360;
					};
					if (car.rotation === 360) {
						car.rotation = 0;
					};
					console.log(car.rotation);		
					break;
				case 68: //d
					if (car.speed >= 0) {
						car.rotation += car.maniability;
					}

					else if (car.speed < 0) {
						car.rotation -= car.maniability;
					}

					if (car.rotation === 360) {
						car.rotation = 0;
					};
					console.log(car.rotation);
					break;
				case 38: //uparrow
					car.y -= 1;
					console.log("car Y = " + car.y);
					break;
				case 40: //downarrow
					car.y += 1;
					console.log("car Y = " + car.y);
					break;
				case 37: //left arrow
					car.x -=1;
					console.log("car X = " + car.x);
					break;
				case 39: //right arrow
					car.x +=1;
					console.log("car X = " + car.x);
					break;
			};
		};
	};
};

//---------------game over screen-----------
var gameOver = {
	opacity: 0,
	drawMe: function () {
		this.opacity += 0.01;
		ctx.globalAlpha = this.opacity;
		ctx.font = "bold 70px SolidSans";

		ctx.fillStyle = "#00CEBF";
		ctx.fillText("Game Over", 400, 500);

		ctx.lineWidth = 3;
		ctx.strokeStyle = "#C031BB";
		ctx.strokeText("Game Over", 400, 500);

		ctx.globalAlpha = 1;
	}
};

//-------------counting laps------------- 
function lap (finishLine) {
	if (buffer > 0 && endOfCross === true) {
		finishLine.isCrossed += 1;
		buffer = 0;
		endOfCross = false;
	};
};

var endOfCross = false;
var buffer = 0;

//----------------------timer----------------------

//using drawing loop

var frame = 0;
var dseconds = 0;
var seconds = 0;
var minutes = 0;

function timer () {
	//tenth of a second
	if (frame % 6 === 0) { 
		dseconds++;
	}
	//second
	if (frame % 60 === 0) {
		seconds++;
		dseconds = 0;
	}
	//minute
	if (frame % 3600 === 0) {
		minutes++;
		seconds = 0;
	}

	ctx.font = "bold 40px SolidSans";
	ctx.fillStyle = "#4E4E4E";
	ctx.fillText( "Time: " + minutes + " : " + seconds + " : " + dseconds, 550, 950)
}

//---------------level completion------------

var level1completed = false;
var level2completed = false;
var level3completed = false;
var level4completed = false;
var level5completed = false;


//-------------------------------------------------------------------

//drawing elements on canvas

function drawingLoopGame () {


	ctx.clearRect(0, 0, 1000, 1000)

	movingBackground(backgroundWaves1, backgroundWaves2);

	ctx.lineWidth = 8;
	ctx.strokeStyle = "#000000";
	ctx.strokeRect(0, 0, 1000, 1000);

	levelSwitcher();

	//--------------movement system----------------
	movementSystem();
	requestAnimationFrame(function () {

		drawingLoopGame();
	});
};
		var reset = 0

//level switcher
function levelSwitcher () {
	if (!level1completed) {
		drawLevel1();
	}
	else if (level1completed && !level2completed) {
		if (reset === 0) {
			car.speed = 0;
			minutes = 0;
			dseconds = 0;
			seconds = 0;
			carCounter = 0;
			frame = 0;
			
			reset ++;
		};

		drawLevel2();
		
	}
	else if (level2completed && !level3completed) {
		if (reset === 1) {
			car.speed = 0;
			minutes = 0;
			dseconds = 0;
			seconds = 0;
			carCounter = 0;
			frame = 0;
			
			reset ++;
		};

		drawLevel3();
	}
	else if (level3completed && !level4completed) {
		if (reset === 2) {
			car.speed = 0;
			minutes = 0;
			dseconds = 0;
			seconds = 0;
			carCounter = 0;
			frame = 0;
			
			reset ++;
		};

		drawLevel4();
	}
		
}


var carCounter = 0;


//---------------------LEVEL 1------------------
function drawLevel1 () {
	
	ctx.drawImage(track1Background, 0, 0, 1000, 1000);
	track1.forEach(function (border) {
		border.drawMe();

		if (collision(car, border)) {
			car.y += (car.speed) * Math.cos(car.rotate())	
			car.x -= (car.speed) * Math.sin(car.rotate())

			if (!collision(car, border)) {
				car.speed = 0;
			};
		};
	});
	finishLine1.drawMe(track1laps);

	//----------------lap count-----------
	if (collision(car, finishLine1)) {
		buffer ++;
		endOfCross = false;
	};
	if (!collision(car, finishLine1) && buffer > 0) {
		endOfCross = true;
	}
	lap(finishLine1);

	//----------timer------------------
	//starting timer atfer lap started
	if (finishLine1.isCrossed >= 0) {
		frame++;
		timer()
	};

	//-------------draw car----------------
	//set starting position and rotation
	if (carCounter === 0) {
		car.x = 500;
		car.y = 680;
		car.rotation = 90;
		carCounter++;
	};

	ctx.save();
	car.drawMe();
	ctx.restore();

	//------------acceleration & deceleration----------
	movementSystem();
	goForward();

	if (keyPressed === false) {
		decelerate();
	};

	//set winning parameters
	var track1laps = 3;
	var track1minutes = 1;

	// if completed
	if (finishLine1.isCrossed === track1laps && minutes <= track1minutes) {
		level1completed = true;
	}
	else if (minutes > track1minutes) {
		gameOver.drawMe();
		car.speed = 0;
	};

	level1completed = true;

};

//---------------------LEVEL 2---------------

function drawLevel2 () {

	ctx.drawImage(track2Background, 0, 0, 1000, 1000);
	track2.forEach(function (border) {
		border.drawMe();

		if (collision(car, border)) {
			car.y += (car.speed) * Math.cos(car.rotate())	
			car.x -= (car.speed) * Math.sin(car.rotate())

			if (!collision(car, border)) {
				car.speed = 0;
			};
		};
	});

	finishLine2.drawMe(track2laps);

	//----------------lap count-----------
	if (collision(car, finishLine2)) {
		buffer ++;
		endOfCross = false;
	};
	if (!collision(car, finishLine2) && buffer >0) {
		endOfCross = true;
	}
	lap(finishLine2);

	//----------timer------------------
	//starting timer atfer lap started

	if (finishLine2.isCrossed >= 0) {
		frame++;
		timer()
	};

	//-------------draw car----------------
	//set starting position and rotation

	if (carCounter === 0) {
		car.x = 600;
		car.y = 50;
		car.rotation = 270;
		carCounter++;
	};

	ctx.save();
	car.drawMe();
	ctx.restore();

	//------right to left teleportation-------
	if (car.x > 1000) {
		car.x = 0 - car.width;
	};

	if (car.x + car.width < 0) {
		car.x = 1000;
	};

	//------------acceleration & deceleration----------
	movementSystem()
	goForward();

	if (keyPressed === false) {
		decelerate();
	};

	//-----------set winning parameters----------------
	var track2laps = 3;
	var track2minutes = 1;
	//------------if completed---------------
	if (finishLine2.isCrossed === track2laps && minutes <= track2minutes) {
		level2completed = true;
	};

	level2completed = true;
};


//-------------------LEVEL 3---------------

function drawLevel3 () {

	ctx.drawImage(track3Background, 0, 0, 1000, 1000);
	track3.forEach(function (border) {
		border.drawMe();

		if (collision(car, border)) {
			car.y += (car.speed) * Math.cos(car.rotate())	
			car.x -= (car.speed) * Math.sin(car.rotate())

			if (!collision(car, border)) {
				car.speed = 0;
			};
		};
	});

	finishLine3.drawMe(track3laps);

	//----------------lap count-----------
	if (collision(car, finishLine3)) {
		buffer ++;
		endOfCross = false;
	};
	if (!collision(car, finishLine3) && buffer >0) {
		endOfCross = true;
	}
	lap(finishLine3);

	//----------timer------------------
	//starting timer atfer lap started
	if (finishLine3.isCrossed >= 0) {
		frame++;
		timer()
	};

	//-------------draw car----------------
	//set starting position and rotation
	if (carCounter === 0) {
		car.x = 400;
		car.y = 700;
		car.rotation = 270;
		carCounter++;
	};
	ctx.save();
	car.drawMe();
	ctx.restore();

	//--------------teleportation---------------
	if (car.x + car.width < 0 && (car.y >600 && car.y < 800)) {
		car.x = 1000 + car.width;
		car.y -= 285; 
	};

	if (car.y - car.height > 1000 && (car.x > 0 && car.x < 200)) {
		car.y = 0 - car.height;
		car.x += 792;
	};

	if (car.x + car.width < 0 && (car.y > 180 && car.y < 240)) {
		car.x = 1000 + car.width;
		car.y += 495;
	};

	//------------acceleration & deceleration----------
	movementSystem()
	goForward();

	if (keyPressed === false) {
		decelerate();
	};

	//-----------set winning parameters----------------
	var track3laps = 4;
	var track3minutes = 1;
	//------------if completed---------------
	if (finishLine3.isCrossed === track3laps && minutes <= track3minutes) {
		level3completed = true;
	};

	level3completed = true;
};

function drawLevel4 () {

	ctx.drawImage(track4Background, 0, 0, 1000, 1000);
	track4.forEach(function (border) {
		border.drawMe();

		if (collision(car, border)) {
			car.y += (car.speed) * Math.cos(car.rotate())	
			car.x -= (car.speed) * Math.sin(car.rotate())

			if (!collision(car, border)) {
				car.speed = 0;
			};
		};
	});

	finishLine4.drawMe(track4laps);

	//----------------lap count-----------
	if (collision(car, finishLine4)) {
		buffer ++;
		endOfCross = false;
	};
	if (!collision(car, finishLine4) && buffer >0) {
		endOfCross = true;
	}
	lap(finishLine4);

	//----------timer------------------
	//starting timer atfer lap started
	if (finishLine4.isCrossed >= 0) {
		frame++;
		timer()
	};

	//-------------draw car----------------
	//set starting position and rotation
	if (carCounter === 0) {
		car.x = 200;
		car.y = 500;
		car.rotation = 90;
		carCounter++;
	};

	ctx.save();
	car.drawMe();
	ctx.restore();

	//------------acceleration & deceleration----------
	movementSystem()
	goForward();

	if (keyPressed === false) {
		decelerate();
	};

	//-----------set winning parameters----------------
	var track4laps = 3;
	var track4minutes = 1;

	//------------if completed---------------
	if (finishLine4.isCrossed === track4laps && minutes <= track4minutes) {
		level4completed = true;
	};
};
