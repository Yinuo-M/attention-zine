import Phaser from 'phaser';

export default class Intro extends Phaser.Scene {
  constructor() {
    super('Intro');
  }

  preload() {
    // Black dotted backgrounds
    this.load.image(
      'black-dotted-1',
      'assets/backgrounds/black-dotted/black-dotted-1.jpg'
    );
    this.load.image(
      'black-dotted-2',
      'assets/backgrounds/black-dotted/black-dotted-2.jpg'
    );
    this.load.image(
      'black-dotted-3',
      'assets/backgrounds/black-dotted/black-dotted-3.jpg'
    );
  }

  create() {
    // Black dotted background
    const blackDottedBg = this.add.sprite(0, 0, 'black-dotted-1');
    this.anims.create({
      key: 'black-dotted-swap',
      frames: [
        { key: 'black-dotted-1' },
        { key: 'black-dotted-2' },
        { key: 'black-dotted-3' },
      ],
      repeat: -1,
      duration: 375,
    });
    blackDottedBg.play('black-dotted-swap');

    // Text
    const screenCenterX =
      this.cameras.main.worldView.x + this.cameras.main.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y + this.cameras.main.height / 2;
    this.add
      .text(screenCenterX, screenCenterY, 'Focus... But Where? ', {
        fontSize: '128px',
        color: '#fff',
        fontFamily: 'RoadRage',
      })
      .setOrigin(0.5);

    blackDottedBg.setInteractive();
    blackDottedBg.on('pointerdown', () => {
      console.log('clicked');
    });
  }
}
