import Phaser from 'phaser';

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

export const getScreenCenter = (scene: Phaser.Scene): [number, number] => {
  const screenCenterX =
    scene.cameras.main.worldView.x + scene.cameras.main.width / 2;
  const screenCenterY =
    scene.cameras.main.worldView.y + scene.cameras.main.height / 2;
  return [screenCenterX, screenCenterY];
};
