
export default class Particles {

    constructor() {

        this.ctx = null;
        this.raf = null;
        this.bb = {};
        this.particles = [];
        this.particleCount = 4;

        this.draw = this.draw.bind(this);

    }

    draw() {

        if (this.ctx!==null) {

            this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);

            if (this.particles.length) {
                this.particles.forEach((m, i)=>{
                    if (--m[4]<0){
                        this.particles.splice(i, 1);
                    }
                    this.ctx.fillStyle = 'hsla(0,100%,100%,'+(m[4] / 100)+')';
                    this.ctx.beginPath();
                    this.ctx.arc(m[0], m[1], 2, 0, 2 * Math.PI);
                    this.ctx.fill();
                    m[0] +=  Math.sin( (Math.PI * 2) * m[2] );
                    m[1] +=  Math.cos( (Math.PI * 2) * m[3] );
                });    
            }

        }

        this.raf = requestAnimationFrame(this.draw);

    }

    cancel() {
        if (this.raf) {
            cancelAnimationFrame(this.raf);
        }
    }

    listeners(el) {

        el.addEventListener('mousemove', (e) => {
            for (let x=0; x< this.particleCount; x++) {
                this.particles.push(
                    [e.x - this.bb.left, e.y - this.bb.top, Math.random(), Math.random(), 50 + Math.random() * 100]
                );                    
            }
        })

        el.addEventListener('click', (e) => {
            for (let x=0; x< this.particleCount*4; x++) {
                this.particles.push(
                    [e.x - this.bb.left, e.y - this.bb.top, Math.random(), Math.random(), 50 + Math.random() * 100]
                );                    
            }
        })

    }

    attach(ctx, bb) {

        this.ctx = ctx;
        this.bb = bb;

    }

}

