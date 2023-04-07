import Phaser from 'phaser';
import config from './config';
import IntroTitle from './scenes/01-intro/01-title';
import IntroChoice from './scenes/01-intro/02-choice';
import IntroTest from './scenes/01-intro/03-test';

new Phaser.Game(
  Object.assign(config, {
    // scene: [IntroTitle, IntroChoice, IntroTest],
    scene: IntroTest,
  })
);
