document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.querySelector('.game-canvas');
    const ctx = canvas.getContext('2d');

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    let plane = new Aircraft(100, 100);

    let lastT = performance.now();
    function update(t) {
        window.requestAnimationFrame(update);

        dt = (t - lastT) / 1000;
        lastT = t;

        if (Keyboard.keydown(Keyboard.LEFT_KEY)) {
            plane.angle += 0.02;
        } else if (Keyboard.keydown(Keyboard.RIGHT_KEY)) {
            plane.angle -= 0.02;
        }

        if (Keyboard.keydown(Keyboard.UP_KEY)) {
            plane.thrust();
        }

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, width, height);

        plane.update(dt);
        plane.draw(ctx);

        ctx.fillStyle = '#fff';
        ctx.fillText(`dt: ${dt}`, 10, 30);
    }

    window.requestAnimationFrame(update);

});


