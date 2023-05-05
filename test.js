function preload ()
{
  this.load.image('block', 'assets/sprites/1.jpg');
}

function create ()
{
  var graphics = this.add.graphics()
    .lineStyle(1, 0xffffff, 0.5);

  // A circle curve starts at angle 0, the "3 o'clock" position.
  // Make a circle path of radius 200 starting from (600, 200)
  var path = new Phaser.Curves.Path(600, 300).circleTo(200);
  
  path.draw(graphics, 128);

  var block = this.add.follower(path, 600, 300, 'block')
    .setAlpha(0.5);
  
  // Physics
  
  this.physics.add.existing(block);
  
  // Prevent drift?
  block.body.moves = false;
  
  block.startFollow({
    duration: 10000,
    yoyo: true,
    loop: -1,
    onStart: function () {
      // Avoids a very large `pathVector` at the first path update.
      // `pathVector` is not quite the best thing for this, but —
      path.getPoint(0, block.pathVector);
    },
    onUpdate: function (tween) {
      // Set a velocity from the path movement, for correct collisions.
      // Scale the delta vector to a 1-second velocity vector.
      block.body.velocity
        .copy(block.pathDelta)
        .scale(1000 / tween.parent.systems.game.loop.delta);
    },
    onLoop: function () {
    },
    onComplete: function () {
      block.body.stop();
    }
  });
}

document.getElementById('version').textContent = 'Phaser v' + Phaser.VERSION;

new Phaser.Game({
  type: Phaser.CANVAS,
  width: 800,
  height: 600,
  loader: {
    baseURL: 'https://labs.phaser.io',
    crossOrigin: 'anonymous'
  },
  physics: {
    default: 'arcade',
    arcade: { debug: true }
  },
  scene: {
    preload: preload,
    create: create
  }
});