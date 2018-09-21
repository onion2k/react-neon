import Fx from "../Fx";

export default class Sparks extends Fx {

    constructor(){
        super();

        this.particles = [];
        this.particleCount = 25;

        this.sparkState = false;

    }

    draw() {
        if (this.ctx!==null) {

            this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);

            if (this.particles.length) {
                this.particles.forEach((m, i)=>{
                    if (--m[4]<0){
                        this.particles.splice(i, 1);
                    }
                    this.ctx.fillStyle = 'hsla(64,100%,50%,'+(m[4] / 100)+')';
                    this.ctx.beginPath();
                    this.ctx.arc(m[0], m[1], 2, 0, 2 * Math.PI);
                    this.ctx.fill();
                    m[0] +=  Math.sin( m[2] ) / 2;
                    m[1] +=  Math.cos( m[3] ) / 2;
                });    
            }

        }
        this.raf = requestAnimationFrame(this.draw);
    }

    listeners(el) {

        el.addEventListener('mousemove', (e) => {

            const a = {
                x: e.x - this.bb.left,
                y: e.y - this.bb.top,
                width: 1,
                height: 1
            }

            const b = this.childPositions[0];

            const spark = (a.x < b.x + b.width &&
                a.x + a.width > b.x &&
                a.y < b.y + b.height &&
                a.height + a.y > b.y);

            if (spark !== this.sparkState) {

                this.sparkState = spark;

                let a = Math.atan2(e.movementX, e.movementY);
                if (a < 0) { a += 2 * Math.PI }

                for (let x=0; x< this.particleCount; x++) {
                    this.particles.push(
                        [e.x - this.bb.left, e.y - this.bb.top, (a - 1 + Math.random() * 2), (a - 1 + Math.random() * 2), 50 + Math.random() * 100]
                    );                    
                }

            }

        })

    }
}