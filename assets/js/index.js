window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

function game() {
    const barWidth = 212;
    const barHeight = 30;
    let wins = 0;
    let loses = 0;
    let frame;

    const scene = new Scene({ el: document.getElementsByTagName("canvas")[0], width: barWidth + 20, height: barHeight + 10 })
    const bar = new Bar({ width: barWidth, height: barHeight});
    const cursor = new Cursor({ bar, image: document.getElementById('cursor') });
    const checkpoint = new Checkpoint({ bar });
    
    scene.drawings = function(context) {
        bar.draw(context)
        checkpoint.draw(context)
        cursor.draw(context)
    }

    function startGame() {
        checkpoint.getRandomPosition()
        play();
        window.addEventListener("keydown", (e) => {
            if(e.keyCode == 32) {
                cursor.hit()
                if(checkpoint.checkWin(cursor.lastHit())) {
                    this.wins++
                    checkpoint.getRandomPosition()
                } else {
                    this.loses++
                }
            }
        }, false);
    }

        function update() {
            cursor.nextPosition(scene.context)
        }

        function play() {
            frame = requestAnimFrame(play, scene);
            update();
            scene.draw();
        }

        function pause() {
            cancelAnimationFrame(frame)
        }

        function stop() {
            pause()
            cursor.reset()
            scene.draw();
        }
        
    return {
        startGame,
        cursor,
        cursorSpeed: cursor.speed,
        bar,
        checkpoint,
        checkpointWidth: checkpoint.width,
        wins,
        loses,
        pause,
        play,
        stop
    }
}