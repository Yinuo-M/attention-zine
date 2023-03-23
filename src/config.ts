import Phaser from 'phaser';
import RexShake from 'phaser3-rex-plugins/plugins/shakeposition-plugin';

export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#0a0909',
  scale: {
    width: 1600,
    height: 1200,
    mode: Phaser.Scale.ENVELOP,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  plugins: {
    global: [
      { key: 'rex-shake', plugin: RexShake, start: false, mapping: 'shake' },
    ],
  },
};
