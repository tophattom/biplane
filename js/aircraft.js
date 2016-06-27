const AIR_DENSITY = 1.3

class Aircraft {
    
    constructor(x, y) {
        this.pos = new Vector(x, y);

        this.vel = new Vector(100, 0, 0);
        this.acc = Vector.zero();
        this.netForce = Vector.zero();

        this.angle = 0;
        this.dir = Vector.zero();
        this.topDir = Vector.zero();
        this.rightWing = new Vector(0, 0, 1);

        this.aoa = 0.0;

        this.rightWing = new Vector(0, 0, 1);

        this.mass = 500;
        this.wingArea = 15;

        this.power = 82000;
        this.maxSpeed = 500;
    }

    update(dt) {
        this.dir.set(Math.cos(this.angle), -Math.sin(this.angle), 0);
        this.topDir = Vector.cross(this.dir, this.rightWing);

        this.aoa = Vector.angle(this.vel, this.topDir) - Math.PI / 2;

        // Gravity
        let g = new Vector(0, 9.81, 0);
        this.applyForce(g.mul(this.mass));
        // -----

        // Calculate lift
        let area = Math.abs(this.wingArea * Math.sin(this.aoa));
        let liftCoef = this.aoa * 18 / Math.PI;
        let lift = 0.5 * AIR_DENSITY * this.vel.lengthSq() * area * liftCoef;
        this.liftForce = this.topDir.clone().mul(lift);
        this.applyForce(this.liftForce); 
        // ----------
        
        // Calculate drag
        let k = 2;
        let dragCoef = 0.05 * k * liftCoef * liftCoef;
        let drag = 0.5 * dragCoef * area * AIR_DENSITY * this.vel.lengthSq();
        let dragForce = this.vel.clone().normalize().mul(-drag);
        this.applyForce(dragForce); 
        // -----------

        this.acc = this.netForce.div(this.mass);
        this.vel.add(this.acc.mul(dt)).clamp(this.maxSpeed);
        this.pos.add(this.vel.clone().mul(dt));

        this.acc.clear();
        this.netForce.clear();
    }

    applyForce(force) {
        this.netForce.add(force);
    }

    thrust() {
        this.applyForce(this.dir.clone().mul(this.power));
    }

    draw(ctx) {
        let [x, y] = this.pos.toArray();

        ctx.fillStyle = '#ff0000';

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(-this.angle);

        
        ctx.fillRect(-30, -10, 60, 20);
        ctx.restore();

        ctx.fillText(`Speed: ${this.vel.length()}`, 10, 10);
        ctx.fillText(`AOA: ${this.aoa * 180 / Math.PI}`, 10, 50);

        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + this.vel.i, y + this.vel.j);
        ctx.stroke();
        ctx.closePath();

        ctx.strokeStyle = '#00ff00';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + this.acc.i * 100, y + this.acc.j * 100);
        ctx.stroke();
        ctx.closePath();

        ctx.strokeStyle = '#0000ff';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + this.liftForce.i / 100, y + this.liftForce.j / 100);
        ctx.stroke();
        ctx.closePath();

        ctx.strokeStyle = '#ffff00';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + this.dir.i * 100, y + this.dir.j * 100);
        ctx.stroke();
        ctx.closePath();

        ctx.strokeStyle = '#ffff00';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + this.topDir.i * 100, y + this.topDir.j * 100);
        ctx.stroke();
        ctx.closePath();

        // ctx.strokeStyle = '#ff00ff';
        // ctx.beginPath();
        // ctx.moveTo(x, y);
        // ctx.lineTo(x + this.drag.i / 10, y + this.drag.j / 10);
        // ctx.stroke();
        // ctx.closePath();
    }
}
