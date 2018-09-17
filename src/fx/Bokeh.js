import Fx from "../Fx";

export default class Bokeh extends Fx {

    points = [
        [0.1,0.3,3],
        [0.2,0.4,2],
        [0.3,0.2,2],
        [0.4,0.6,1.5],
        [0.6,0.2,2],
        [-0.1,0.6,1.5],
        [0.75,0.9,2]
    ];

    time = 0;

    mouse = [0, 0];

    drawShape(ctx, x, y, points, radius1, radius2, alpha0) {
        let i, angle, radius;
        if (radius2 !== radius1) {
            points = 2 * points;
        }
        for (i = 0; i <= points; i++) {
            angle = i * 2 * Math.PI / points - Math.PI / 2 + alpha0;
            radius = i % 2 === 0 ? radius1 : radius2;
            ctx.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
        }
    }

    draw() {
        if (this.ctx!==null) {
            this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);
            this.points.forEach((p)=>{
                this.ctx.beginPath();
                this.ctx.fillStyle = 'hsla(64,'+(30 * p[2])+'%,50%,'+(0.2 * p[2])+')';
                this.drawShape(this.ctx, (this.bb.width * p[0]) + ((this.bb.width / 2) - (this.mouse[0] / p[2])), (this.bb.height * p[1]) + (this.bb.height / 2 - (this.mouse[1] / p[2])), 7, 50 * (4 - p[2]), 50 * (4 - p[2]), 0);
                this.ctx.fill();
            });
        }
        this.raf = requestAnimationFrame(this.draw);
    }

    listeners(el) {
        el.addEventListener('mousemove', (e) => {
            this.mouse = [e.x - this.bb.left, e.y - this.bb.top];
        })
    }

}
