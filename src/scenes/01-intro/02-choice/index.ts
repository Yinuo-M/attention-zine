import Phaser from 'phaser';
import { getFullsizeBg } from '../../../utils';
import { createChoice, loadChoice } from './choice';
import { loadExit } from './exit';
import { loadWelcome } from './welcome';

// TODO
// MUST
// - Add continue button to welcome page
// - Change fonts

// COULD
// - Make the shake animation gentler
// - Can't have text underline. Might be able to achieve with some difficulty
// - eye animation skipped - waiting for simplification
// - Can't do curved text. Might be able to achieve with some difficulty

// CANT
// - hanzipen font problem. The one I found online doesn't load properly
// - Can't automatically close tab. Definitely can't

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
    loadWelcome(this);
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

    createChoice(this);
  }
}
