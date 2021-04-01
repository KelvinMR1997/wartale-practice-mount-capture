function Cursor(config = {}) {
    this.value,
    this.direction,
    this.width,
    this.speed,
    this.hits,
    this.bar,
    this.image
    this.config = config

    this.reset = function () {
        this.value = 0;
        this.direction = 1;
        this.width = 20;
        this.speed = this.config.speed || 1;
        this.hits = [];
        this.bar = this.config.bar
        this.image = this.config.image
    }

    this.reset()
    
    this.draw = function(ctx) {
        ctx.beginPath();
        
        let x = 10 + this.value,
        y = this.bar.height / 2;
        
        ctx.fillStyle = "yellow";
        ctx.moveTo(x, y);
        ctx.lineTo(x + this.width / 2, y + this.bar.height / 2 + 10);
        ctx.lineTo(x - this.width / 2, y + this.bar.height / 2 + 10);
        ctx.closePath();

        ctx.fill()
    }

    this.pixelPerSec = function () {
      return this.speed / 60
    }

    this.hit = function () {
        this.hits.push(this.value)
    }

    this.lastHit = function () {
        return [...this.hits].pop()
    }

    this.nextPosition = function() {
        if(this.value >= this.bar.width) {
            this.direction = -1
        } else if(this.value <= 0) {
            this.direction = 1
        }
        
        this.value = Math.min(this.bar.width, Math.max(0, this.value + this.pixelPerSec() * this.direction)) 
    }

    this.setSpeed = function(value) {
        this.speed = value
    }
}