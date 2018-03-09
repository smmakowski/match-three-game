// MyGame = MyGame || {};

class Block extends Phaser.Sprite {
  constructor(state, x, y, data) {
    super(state, x, y, data.asset);
    this.row = data.row;
    this.col = data.col;

    this.anchor.setTo(0.5);
  }

  reset(x, y, data) {
    Phaser.Sprite.prototype.reset.call(this, x, y); // fucntion takes context, x,y and health(if applicable)
    this.loadTexture(data.asset);
    this.row = data.row;
    this.col = data.col;
  }
}
