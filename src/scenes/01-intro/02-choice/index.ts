import Phaser from 'phaser';
import { getFullsizeBg } from '../../../utils';
import { createChoice, loadChoice } from './choice';
import { createExit, loadExit } from './exit';

// TODO
// - button underline's skipped because it's not supported by Phaser. Need to add plugin
// - eye animation skipped - waiting for simplification
// - hanzipen font problem. The one I found online doesn't load properly
// - Can't automatically close tab

export default class IntroChoice extends Phaser.Scene {
  constructor() {
    super('intro-choice');
  }

  preload() {
    // Backgrounds
    this.load.image('white-bg', 'assets/backgrounds/lined-paper/off-white.png');
    this.load.image('paper', 'assets/backgrounds/lined-paper/paper.png');
    loadChoice(this);
    loadExit(this);
  }

  create() {
    this.cameras.main.fadeIn(200, 10, 9, 9);

    // Backgrounds
    getFullsizeBg('white-bg', this);
    const paper = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'paper'
    );
    paper.setScale(0.25).setScrollFactor(0);

    // createChoice(this);
    createExit(this);
  }
}
