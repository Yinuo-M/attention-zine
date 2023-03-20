import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  parent: 'game',
  transparent: true,
  scale: {
    width: 1600,
    height: 1200,
    mode: Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};
