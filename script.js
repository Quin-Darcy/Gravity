// Constants 
let W = window.innerWidth;
let H = window.innerHeight;
let P = 2;
let R = 10;
let G = -9.8;
let RADIUS;
if (W >= H) {
    RADIUS = H / 2 - H / 4;
} else {
    RADIUS = W / 2 - W / 4;
}
let THETA = 2 * (Math.PI) / P;
let SOFTEN = 1000;
let STAR_MASS = 243;
let POINT_MASS = 1;
let MAX_VEL = 0;
let COR = 0.91;
let HARDNESS = 1;
let MU = -0.1;
let STAR = 1;
let LINES = 1;
let V0 = 1;

// Arrays
let points = [];

function setup() {
    createCanvas(W, H);
    background(0);
    for (let i = 0; i < P; i++) {
        let X = floor(W / 2) + RADIUS * cos(i * THETA);
        let Y = floor(H / 2) + RADIUS * sin(i * THETA);
        let U = V0 * cos(i * THETA + Math.PI / 2);
        let V = V0 * sin(i * THETA + Math.PI / 2);
        points.push(new Point(X, Y, U, V, POINT_MASS, i, R));
    }
    if (STAR === 1) {
        points.unshift(new Point(floor(W / 2), floor(H / 2), 0, 0, STAR_MASS, 0, 0.1));
    }
}

function mouseClicked() {
    points.push(new Point(mouseX, mouseY, random(-1, 1), random(-1, 1), 1, points.length, 5));
}

function draw() {
    background(0);
    //frameRate(10);
    if (STAR === 1) {
        if (LINES === 1) {
            for (let i = 0; i < P+1; i++) {
                for (let j = i + 1; j < P+1; j++) {
                    if (i != 0) {
                        line(points[i].pos.x, points[i].pos.y, points[j].pos.x,points[j].pos.y);
                    }
                }
            }
            line(points[P-1].pos.x, points[P-1].pos.y, points[P].pos.x,points[P].pos.y);
        line(points[P].pos.x, points[P].pos.y, points[1].pos.x,points[1].pos.y);
        }
        for (let i = 0; i < points.length; i++) {
            for (let j = 0; j < points.length; j++) {
                if (i != j && i != 0) {
                    points[i].apply_force(points[i].calculate_force(points[j]));
                    points[i].collision(j);
                    points[i].update();
                }
            }
            if (points[i].vel.magSq() > MAX_VEL) {
                MAX_VEL = points[i].vel.magSq();
            }
            stroke(255);
            points[i].show();
        }
    } else {
        if (LINES === 1) {
            for (let i = 0; i < P; i++) {
                for (let j = i + 1; j < P; j++) {
                    line(points[i].pos.x, points[i].pos.y, points[j].pos.x,points[j].pos.y);
                }
            }
        }
        for (let i = 0; i < points.length; i++) {
            for (let j = 0; j < points.length; j++) {
                if (i != j) {
                    points[i].apply_force(points[i].calculate_force(points[j]));
                    points[i].collision(j);
                    points[i].update();
                }
            }
            if (points[i].vel.magSq() > MAX_VEL) {
                MAX_VEL = points[i].vel.magSq();
            }
            stroke(255);
            points[i].show();
        }
    }
    
}
    