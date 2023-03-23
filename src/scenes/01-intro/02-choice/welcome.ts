import Phaser from 'phaser';
import { colours } from '../../../consts';
import { getScreenCenter } from '../../../utils';

export const loadWelcome = (scene: Phaser.Scene) => {
  scene.load.image('book', 'assets/icons/book.png');
  scene.load.image('earth', 'assets/icons/earth.png');
  scene.load.image('fire', 'assets/icons/fire.png');
  scene.load.image('hourglass', 'assets/icons/hourglass.png');
};

export const createWelcome = (scene: Phaser.Scene) => {
  const screenCenter = getScreenCenter(scene);

  // Paragraph 1
  scene.add
    .text(
      screenCenter.x + 60,
      screenCenter.y - 140,
      'Welcome to our           interactive zine! We are thrilled to have you here! ',
      {
        fontFamily: 'Hanzipen',
        color: colours.black,
        fontSize: '36px',
        align: 'center',
      }
    )
    .setOrigin(0.5, 0.5);

  scene.add
    .image(screenCenter.x - 150, screenCenter.y - 150, 'book')
    .setScale(0.8);

  // Paragraph 2
  scene.add
    .text(
      screenCenter.x + 45,
      screenCenter.y - 15,
      [
        'Created by a small team of passionate individuals, this is a publication',
        'that aims to reflect on our misplaced attention when faced with',
        'complex            climate change issues. ',
      ],
      {
        fontFamily: 'Hanzipen',
        color: colours.black,
        fontSize: '36px',
        align: 'left',
      }
    )
    .setOrigin(0.5, 0.5);

  scene.add.image(screenCenter.x - 250, screenCenter.y + 30, 'earth');
  const fire = scene.add
    .image(screenCenter.x - 200, screenCenter.y + 50, 'fire')
    .setRotation(0.2);
  const fireShake = scene.plugins.get('rex-shake').add(fire, {
    duration: 1500,
    magnitude: 3,
    mode: 'behaviour',
  });
  fire.setInteractive().on('pointerover', () => fireShake.shake());

  scene.add
    .text(
      screenCenter.x + 20,
      screenCenter.y + 195,
      [
        `You'll find that it takes around         25 minutes to go through`,
        'the entire thing, but feel free to take as much time as you need or',
        'opt out at any point.',
      ],
      {
        fontFamily: 'Hanzipen',
        color: colours.black,
        fontSize: '36px',
        align: 'left',
      }
    )
    .setOrigin(0.5, 0.5);
  const hourglass = scene.add.image(
    screenCenter.x + 40,
    screenCenter.y + 135,
    'hourglass'
  );
  const hourglassShake = scene.plugins.get('rex-shake').add(hourglass, {
    duration: 1500,
    magnitude: 3,
    mode: 'behaviour',
  });
  hourglass.setInteractive().on('pointerover', () => hourglassShake.shake());
};
