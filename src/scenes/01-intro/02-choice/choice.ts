import Phaser from 'phaser';
import dayjs from 'dayjs';

import { colours } from '../../../consts';
import { getFullsizeBg, getScreenCenter, getTimeOfDay } from '../../../utils';

export const loadChoice = (scene: Phaser.Scene) => {
  // Eyes
  scene.load.image('rolled-eye', 'assets/eyes/rolled.png');
  scene.load.image('widening-eye', 'assets/eyes/widening-3.png');
};

export const createChoice = (scene: Phaser.Scene) => {
  // Text
  const screenCenter = getScreenCenter(scene);
  scene.add
    .text(
      screenCenter.x,
      screenCenter.y - 210,
      `Good ${getTimeOfDay()}, little eye!`,
      {
        fontFamily: 'RoadRage',
        color: colours.black,
        fontSize: '68px',
      }
    )
    .setOrigin(0.5, 0.5);

  scene.add
    .text(
      screenCenter.x,
      screenCenter.y - 140,
      'Is scene a good time for some distraction?',
      {
        fontFamily: 'RoadRage',
        color: colours.black,
        fontSize: '68px',
      }
    )
    .setOrigin(0.5, 0.5);

  // Choices
  const rolledEye = scene.add
    .image(screenCenter.x - 220, screenCenter.y + 35, 'rolled-eye')
    .setOrigin(0.5, 0.5)
    .setScale(0.14)
    .setRotation(0.05);
  rolledEye.setInteractive().on('pointerdown', () => {
    console.log('clicked eye');
  });

  const noText = scene.add
    .text(
      screenCenter.x - 220,
      screenCenter.y + 170,
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

  const wideningEye = scene.add
    .image(screenCenter.x + 220, screenCenter.y + 50, 'widening-eye')
    .setOrigin(0.5, 0.5)
    .setScale(0.14)
    .setRotation(-0.02);
  wideningEye.setInteractive().on('pointerdown', () => {
    console.log('clicked eye');
  });

  const yesText = scene.add
    .text(screenCenter.x + 220, screenCenter.y + 155, ['HELL YEAH!!! '], {
      fontFamily: 'Hanzipen',
      color: colours.blue,
      fontSize: '32px',
      align: 'center',
    })
    .setOrigin(0.5, 0.5)
    .setRotation(-0.02);
  yesText.setInteractive().on('pointerdown', () => {
    console.log('clicked text');
  });

  // Display date
  scene.add
    .text(
      screenCenter.x + 290,
      screenCenter.y - 245,
      dayjs().date().toString(),
      {
        fontFamily: 'Hanzipen',
        color: colours.blue,
        fontSize: '32px',
        align: 'center',
      }
    )
    .setOrigin(0.5, 0.5);

  // Display date
  scene.add
    .text(
      screenCenter.x + 365,
      screenCenter.y - 245,
      dayjs().month().toString(),
      {
        fontFamily: 'Hanzipen',
        color: colours.blue,
        fontSize: '32px',
        align: 'center',
      }
    )
    .setOrigin(0.5, 0.5);

  // Display date
  scene.add
    .text(
      screenCenter.x + 445,
      screenCenter.y - 245,
      dayjs().year().toString(),
      {
        fontFamily: 'Hanzipen',
        color: colours.blue,
        fontSize: '32px',
        align: 'center',
      }
    )
    .setOrigin(0.5, 0.5);
};
