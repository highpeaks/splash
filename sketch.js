
var w, h;

var star_particles = [];
var wave_particles = [];
var cell_particles = [];
var snow_particles = [];
var x_vals = [];
var y_vals = [];

var x, y, a, rad;
var counter = 10000;
var dir = false;
var paused = false;
var pink = false;
var alpha = 0;

function preload(){
  w = document.getElementById('canvas').offsetWidth;
  h = document.getElementById('canvas').offsetHeight;
}

function setup(){
  var c = createCanvas(w, h);
  c.parent("#canvas");
  a = 0;
}

function draw(){

  background(255);

  userInterface();

}

function windowResized(){
  w = document.getElementById('canvas').offsetWidth;
  h = document.getElementById('canvas').offsetHeight;
  resizeCanvas(w, h);
}

function star(){

  rad =  map(sin((frameCount / 10) * TAU), 0, 1, 10, 12);

  translate(width/2, height/2);

  a = a + TAU / 50;
  x = rad * sin(a);
  y = rad * cos(a);

  if (star_particles.length < 400){
    let p = new star_particle(x, y, 0.05 * x, 0.05 * y);
    star_particles.push(p);
  }

  for (let i = 0; i < star_particles.length; i++){
    star_particles[i].emitter();
    star_particles[i].render();
  }
}

class star_particle {

  constructor(startX, startY, xVel, yVel) {
    this.startX = startX;
    this.startY = startY;
    this.x = this.startX;
    this.y = this.startY;
    this.a = 50;
    this.xVel = xVel;
    this.yVel = yVel;
    this.diam = 5;
  }

  // if only we were brave enough to live the life we stole

  emitter(){
    this.x = this.x + this.xVel;
    this.y = this.y + this.yVel;
    this.a = this.a + 1;
    if (this.a == 250){
      this.x = this.startX;
      this.y = this.startY;
      this.a = 50;
    }

    this.c1 = color(255, 204, 204, this.a);
    this.c2 = color(255, this.a);
    // this.c2 = color(253, 242, 233, this.a);

    this.lerp = map(this.a, 50, 250, 0, 1);
    this.c = lerpColor(this.c1, this.c2, this.lerp);
  }

  render(){
    noStroke();
    fill(this.c);
    ellipse(this.x, this.y, this.diam);
  }
}

function wave(){

  x = 100 * sin((frameCount / 200) * TAU);
  x = x + width/2;
  y = height/2;


  if (wave_particles.length < 400){

    let p1 = new wave_particle(x, y, dir);
    wave_particles.push(p1);
    dir = !dir;
    let p2 = new wave_particle(x, y, dir);
    wave_particles.push(p2);

  } else {
    wave_particles.splice(0,16);
  }

  for (var i = wave_particles.length - 1; i >= 0; i--){
    wave_particles[i].emitter();
    wave_particles[i].render();
  }
}

class wave_particle {

	constructor(startX, startY) {
		this.startX = startX;
		this.startY = startY;
		this.x = this.startX;
		this.y = this.startY;
		this.a = 50;
    if(dir){
      this.xVel = 0.05;
      this.yVel = 1.5;
    }else{
      this.xVel = 0.05;
      this.yVel = -1.5;
    }
	}

	emitter(){
		this.x = this.x + this.xVel;
		this.y = this.y + this.yVel;
		this.a = this.a + 2;
		if (this.a == 250){
			this.x = this.startX;
			this.y = this.startY;
			this.a = 50;
		}
		this.c1 = color(51, 255, 255, this.a);
    // this.c2 = color(204, 255, 0, this.a);
    this.c3 = color(255, this.a);
		this.diam = map(this.a, 50, 250, 20, 10);
		this.lerp = map(this.a, 50, 250, 0, 1);
		this.c = lerpColor(this.c1, this.c3, this.lerp);

	}

	render(){
		noStroke();
		fill(this.c);
		ellipse(this.x, this.y, this.diam);
	}
}

function cell(){

  push();
  for (var i = 0; i <= height * 0.5; i = i + 5){
    rad = i + (10 * sin((frameCount / 300) * TAU));
    fill(255,0,102, 5);
    noStroke();
    ellipse(width/2, height/2, rad);
  }
  pop();

  if (cell_particles.length < 100){
      let p = new cell_particle();
      cell_particles.push(p);
  }

  for (var i = 0; i < cell_particles.length; i++){
    cell_particles[i].emitter();
    cell_particles[i].render();
  }

}

class cell_particle {

	constructor() {
		this.x = width/2;
		this.y = height/2;
		this.xVel = random(-1,1);
		this.yVel = random(-1,1);
		// this.period = 150;
		this.startDiameter = random(1,10);
		this.diameter = this.startDiameter;
		this.a = 255;
		this.lrp = 0;
	}

	emitter(){
		this.c1 = color(153,0,51,this.a);
		this.c2 = color(255,102,153,this.a);
		this.lrp = map(this.a, 255, 0, 0, 1);
		this.col = lerpColor(this.c1, this.c2, this.lrp);
		this.a = this.a - 3;
		this.diameter = this.diameter + 0.05;
		this.x = this.x + this.xVel;
		this.y = this.y + this.yVel;

		if (this.a <= 0){
			this.x = width/2;
			this.y = height/2;
			this.a = 255;
			this.diameter = this.startDiameter;
		}

	}

	render(){
		fill(this.col, this.a);
		noStroke();
		ellipse(this.x, this.y, this.diameter, this.diameter);
	}
}

function ribbon(){

  rad = 0.6;

  a = a + TAU / 2000;
  x = rad * sin(a);
  y = rad * cos(a);
  x_vals.push(x);
  y_vals.push(y);

  for (var i = x_vals.length - 1; i >= 0; i--){
    rp = new ribbon_particle(x_vals[i], y_vals[i]);
    rp.display();
  }

  if (x_vals.length >= 150){
    x_vals.splice(0,1);
    y_vals.splice(0,1);
  }


}

class ribbon_particle {

  constructor(temp_x, temp_y) {
    this.x = temp_x;
    this.y = temp_y;
   }

  display() {

    this.x1 = noise(this.x + 1000) * width;
    this.y1 = noise(this.y + 2000) * height;
    this.x2 = noise(this.x + 3000) * width;
    this.y2 = noise(this.y + 4000) * height;
    this.r = noise(this.x + 5000) * 255;
    this.g = noise(this.x + 6000) * 255;
    this.b = noise(this.x + 7000) * 255;

    strokeWeight(7);
    stroke(this.r, this.g, this.b, 10);
    line(this.x1, this.y1, this.x2, this.y2);
  }
}

function snow(){
  if (snow_particles.length < 200){
		let f = new snow_particle();
		snow_particles.push(f);
	}

	for (var j = 0; j < snow_particles.length; j++){
		snow_particles[j].emitter();
		snow_particles[j].render();
	}
}

class snow_particle {

  constructor() {

    this.x = random(0, width);
    this.y = -10;
    this.w = random(3,9);
    this.spd = this.w * 0.5;
    this.lerpVal = random(1);
    this.sid = random(-0.5,0.5);


  }

  emitter(){
    this.y = this.y + this.spd;

    this.x = this.x + this.sid;

    if (this.x < 0 || this.x > width){
      this.x = random(0, width);
    }

    if (this.y < height * 0.25){
      this.alpha = map(this.y, -10, height * 0.25, 0, 255);
    } else if (this.y >= height * 0.25 && this.y < height * 0.75){
      this.alpha = 255;
    } else if (this.y >= height * 0.75) {
      this.alpha = map(this.y, height * 0.75, height + 10, 255, 0);
    }

    if (this.y > height + 10) {
      this.y = -10;
    }

    this.c1 = color(190, 200, 215, this.alpha);
    this.c2 = color(204, 153, 204, this.alpha);
    this.c = lerpColor(this.c1, this.c2, this.lerpVal);
  }

  render() {
    stroke(this.c);
    strokeWeight(this.w);
    point(this.x, this.y);
  }
}

function mousePressed(){
  if (mouseX >= width * 0.5){
    counter++;
  } else{
    counter--;
  }
}

function keyPressed(){
  if (keyCode === LEFT_ARROW) {
    counter--;
  } else if (keyCode === RIGHT_ARROW) {
    counter++;
  } else if (keyCode === 32) {
    paused = !paused;
  }

  if(paused){
    noLoop();
  } else{
    loop();
  }
}

function userInterface(){

  push();
  fill(215);
  noStroke();
  textFont("Comfortaa");
  textSize(36);
  text("splash", 0, 40);
  pop();

  noFill();
  strokeWeight(2);
  stroke(215);

  line(width - 10, height - 20, width - 40, height);
  line(width - 10, height - 20, width - 40, height - 40);
  line(10, height - 20, 40, height);
  line(10, height - 20, 40, height - 40);


  if (counter % 5 == 0){
    push();
    noFill();
    strokeWeight(2);
    stroke(215);
    ellipse(width * 0.5 - 90, height - 20, 15);
    pop();

    star_particles = [];
    wave_particles = [];
    cell_particles = [];
    snow_particles = [];

    ribbon();
  }
  if (counter % 5 == 1){
    push();
    noFill();
    strokeWeight(2);
    stroke(215);
    ellipse(width * 0.5 - 30, height - 20, 15);
    pop();

    wave_particles = [];
    cell_particles = [];
    snow_particles = [];
    x_vals = [];
    y_vals = [];

    star();
  }
  if (counter % 5 == 2){
    push();
    noFill();
    strokeWeight(2);
    stroke(215);
    ellipse(width * 0.5, height - 20, 15);
    pop();

    star_particles = [];
    cell_particles = [];
    snow_particles = [];
    x_vals = [];
    y_vals = [];

    wave();
  }
  if (counter % 5 == 3){
    push();
    noFill();
    strokeWeight(2);
    stroke(215);
    ellipse(width * 0.5 + 30, height - 20, 15);
    pop();

    star_particles = [];
    wave_particles = [];
    snow_particles = [];
    x_vals = [];
    y_vals = [];

    cell();
  }
  if (counter % 5 == 4){
    push();
    noFill();
    strokeWeight(2);
    stroke(215);
    ellipse(width * 0.5 + 90, height - 20, 15);
    pop();

    star_particles = [];
    wave_particles = [];
    cell_particles = [];
    x_vals = [];
    y_vals = [];

    snow();
  }
}
