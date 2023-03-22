import Phaser from 'phaser';
import config from './config';
import IntroTitle from './scenes/01-intro/01-title';

new Phaser.Game(
  Object.assign(config, {
    scene: [IntroTitle],
  })
);
