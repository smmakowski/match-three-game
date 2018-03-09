MyGame = MyGame || {};

class Block extends Phaser.Sprite {
  constructor(state, x, y, data) {
    super(state, x, y, data.asset);
    this.row = data.row;
    this.col = data.col;

    this.anchor.setTo(0.5);
    //listen for input
    this.inputEnabled = true; // allow input
    this.events.onInputDown.add(state.pickBlock, state); // add callbac kfor iput
  }

  reset(x, y, data) {
    Phaser.Sprite.prototype.reset.call(this, x, y); // fucntion takes context, x,y and health(if applicable)
    this.loadTexture(data.asset);
    this.row = data.row;
    this.col = data.col;
  }

  kill() {
    this.loadTexture('deadBlock');
    this.col = null;
    this.row = null;

    // calls Phaser.Sprite.prototype.kill() after animation is complete
    this.game.time.events.add(MyGame.GameState.ANIMATION_TIME / 2, () => {
      Phaser.Sprite.prototype.kill.call(this);
    }, this);
  }
}
