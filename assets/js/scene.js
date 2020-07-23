function Scene(config = {}) {
    this.element = config.el;
    this.width = config.width
    this.height = config.height
    this.element.style.marginTop = '10px'

    this.drawings = function(context) {}

    this.context = this.element.getContext("2d");

    this.setConfig = function() {
        this.element.width = this.width
        this.element.height = this.height
    }
    
    this.setConfig()

    this.reset = function () {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    this.draw = function(draws = []) {
        this.reset()
        this.drawings(this.context)
    }
}