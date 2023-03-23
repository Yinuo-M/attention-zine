import Phaser from 'phaser';
import dayjs from 'dayjs';

// Resize the backgroud to just about cover the screen
export const getFullsizeBg = (
  name: string,
  scene: Phaser.Scene,
  type?: 'image' | 'sprite'
): Phaser.GameObjects.Image | Phaser.GameObjects.Sprite => {
  let image;
  if (type === 'sprite') {
    image = scene.add.sprite(
      scene.cameras.main.width / 2,
      scene.cameras.main.height / 2,
      name
    );
  } else {
    image = scene.add.image(
      scene.cameras.main.width / 2,
      scene.cameras.main.height / 2,
      name
    );
  }

  const scaleX = scene.cameras.main.width / image.width;
  const scaleY = scene.cameras.main.height / image.height;
  const scale = Math.max(scaleX, scaleY);
  image.setScale(scale).setScrollFactor(0);

  return image;
};

// Get the x, y coordinate of the screen center
export const getScreenCenter = (scene: Phaser.Scene) => {
  const screenCenterX =
    scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
  const screenCenterY =
    scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
  return { x: screenCenterX, y: screenCenterY };
};

export const getTimeOfDay = () => {
  const hour = dayjs().hour();
  if (hour >= 5 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  return 'evening';
};