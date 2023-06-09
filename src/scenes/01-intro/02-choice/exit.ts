import Phaser from 'phaser';
import { getScreenCenter } from '../../../utils';
import { colours } from '../../../consts';

export const loadExit = (scene: Phaser.Scene) => {
  scene.load.image('running-man', 'assets/icons/running-man.png');
  scene.load.image('wind', 'assets/icons/wind.png');
};

export const createExit = (scene: Phaser.Scene) => {
  const screenCenter = getScreenCenter(scene);

  // Text
  scene.add
    .text(
      screenCenter.x,
      screenCenter.y + 45,
      ['Good for you, now go attend to your life.', 'Distraction can wait :)'],
      {
        fontFamily: 'Hanzipen',
        color: colours.black,
        fontSize: '40px',
        align: 'center',
      }
    )
    .setOrigin(0.5, 0.5);

  // Icons
  scene.add.image(screenCenter.x - 50, screenCenter.y - 60, 'running-man');
  scene.add.image(screenCenter.x + 50, screenCenter.y - 60, 'wind');
};
