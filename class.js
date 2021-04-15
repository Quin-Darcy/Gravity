class Point {
    constructor(x, y, u, v, m, id, r) {
        this.t = 0;
        this.pos = createVector(x, y);
        this.vel = createVector(u, v);
        this.id = id;
        this.r = r;
        this.m = m;
        this.dist = 1;
    }
    collision(i) {
        let dx = points[i].pos.x - this.pos.x;
        let dy = points[i].pos.y - this.pos.y;
        let center_dist = dist(dx, dy, 0, 0);
        let touching_dist = points[i].r + this.r;
        if (center_dist < touching_dist) {
            let theta = atan2(dy, dx);
            let new_x = this.pos.x + cos(theta) * touching_dist;
            let new_y = this.pos.y + sin(theta) * touching_dist;
            let a_x = (new_x - points[i].pos.x) * COR;// - this.m;
            let a_y = (new_y - points[i].pos.y) * COR;// - this.m;
            this.vel.x -= a_x * HARDNESS;// / Math.pow(this.m, 2);
            this.vel.y -= a_y * HARDNESS;// / Math.pow(this.m, 2);
            points[i].vel.x += a_x * HARDNESS;
            points[i].vel.y += a_y * HARDNESS; 
        }
        
    }
    calculate_force(p) {
        const force = p5.Vector.sub(this.pos, p.pos);
        const mag_sq = force.magSq() + SOFTEN;
        force.setMag(G * (this.m * p.m) / mag_sq);
        return force;
        
    }
    apply_force(force) {
        this.vel.add(force); 
    }
    update() {
        this.pos.add(this.vel);
        this.pos.x = this.pos.x;
        this.pos.y = this.pos.y;
        
        if (this.pos.x + this.r > W) {
            this.pos.x = W - this.r;
            this.vel.x = this.vel.x * COR * MU;
        } else if (this.pos.x - this.r < 0) {
            this.pos.x = this.r;
            this.vel.x = this.vel.x * COR * MU;
        }
        if (this.pos.y + this.r >= H) {
            this.pos.y = H - this.r;
            this.vel.y = this.vel.y * COR * MU;
        } else if (this.pos.y - this.r < 0) {
            this.pos.y = this.r;
            this.vel.y = this.vel.y * COR * MU;
        }
    }
    show() {
        let V = this.vel.magSq();
        //console.log(V);
        colorMode(HSB, MAX_VEL, 1, 1)
        fill(V, 1, 1);
        //noStroke();
        ellipse(this.pos.x, this.pos.y, 2 * this.r);
    }
}