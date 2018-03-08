class Block extends Phaser.Sprite {
  constructor(state, x, y, data) {
    super();
    this.game = state.game;
    this.state = state;
    this.anchor.setTo(0.5);
  }
}
