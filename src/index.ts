import Phaser from 'phaser';
import config from './config';
import Intro from './scenes/01-intro/main';
new Phaser.Game(
  Object.assign(config, {
    scene: [Intro],
  })
);
