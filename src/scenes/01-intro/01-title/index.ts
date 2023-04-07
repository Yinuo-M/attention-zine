import Phaser from 'phaser';
import { colours } from '../../../consts';
import { getFullsizeBg, getScreenCenter } from '../../../utils';

export default class IntroTitle extends Phaser.Scene {
  constructor() {
    super('intro-title');
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
    const blackDottedBg = getFullsizeBg('black-dotted-1', this, 'sprite');
    this.anims.create({
      key: 'black-dotted-swap',
      frames: [
        { key: 'black-dotted-1' },
        { key: 'black-dotted-2' },
        { key: 'black-dotted-3' },
      ],
      frameRate: 12,
      repeat: -1,
    });
    (blackDottedBg as Phaser.GameObjects.Sprite).play('black-dotted-swap');

    // Text
    const screenCenter = getScreenCenter(this);
    this.add
      .text(screenCenter.x, screenCenter.y, 'FOCUS... BUT WHERE? ', {
        fontSize: '128px',
        color: colours.white,
        fontFamily: 'RoadRage',
      })
      .setOrigin(0.5);

    // Fade out the scene on click
    this.input.once('pointerdown', () => {
      this.cameras.main.fadeOut(200, 10, 9, 9);
    });

    this.cameras.main.once(
      Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
      () => {
        this.scene.start('intro-choice');
      }
    );
  }
}
