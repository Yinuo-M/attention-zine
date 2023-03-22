import Phaser from 'phaser';
import { getFullsizeBg, getScreenCenter } from '../../utils';
import { colours } from '../../consts';

// TODO
// - button underline's skipped because it's not supported by Phaser. Need to add plugin
// - eye animation skipped - waiting for simplification

export default class IntroChoice extends Phaser.Scene {
  constructor() {
    super('intro-choice');
  }

  preload() {
    // Backgrounds
    this.load.image('white-bg', 'assets/backgrounds/lined-paper/off-white.png');
    this.load.image('paper', 'assets/backgrounds/lined-paper/paper.png');

    // Eyes
    this.load.image('rolled-eye', 'assets/eyes/rolled.png');
    this.load.image('widening-eye', 'assets/eyes/widening-3.png');
  }

  create() {
    this.cameras.main.fadeIn(100, 234, 234, 234);

    // Backgrounds
    const whiteBg = getFullsizeBg('white-bg', this);

    const paper = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'paper'
    );
    paper.setScale(0.25).setScrollFactor(0);

    // Text
    const screenCenter = getScreenCenter(this);
    this.add
      .text(
        screenCenter[0],
        screenCenter[1] - 210,
        'Good morning, little eye!',
        {
          fontFamily: 'RoadRage',
          color: colours.black,
          fontSize: '74px',
        }
      )
      .setOrigin(0.5, 0.5);

    this.add
      .text(
        screenCenter[0],
        screenCenter[1] - 140,
        'Is this a good time for some distraction?',
        {
          fontFamily: 'RoadRage',
          color: colours.black,
          fontSize: '74px',
        }
      )
      .setOrigin(0.5, 0.5);

    // Choices
    const rolledEye = this.add
      .image(screenCenter[0] - 250, screenCenter[1] + 50, 'rolled-eye')
      .setOrigin(0.5, 0.5)
      .setScale(0.14)
      .setRotation(0.05);
    rolledEye.setInteractive().on('pointerdown', () => {
      console.log('clicked eye');
    });

    const noText = this.add
      .text(
        screenCenter[0] - 250,
        screenCenter[1] + 180,
        ['No thanks, I was supposed to', 'focus on something else'],
        {
          fontFamily: 'Hanzipen',
          color: colours.blue,
          fontSize: '32px',
          align: 'center',
        }
      )
      .setOrigin(0.5, 0.5);
    noText.setInteractive().on('pointerdown', () => {
      console.log('clicked text');
    });
  }
}
