function Bar(args = {}) {
    this.width = args.width
    this.height = args.height

    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.rect(10, 0, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.fill()
    }
}