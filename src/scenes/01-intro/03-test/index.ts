import Phaser from 'phaser';
import { getFullsizeBg } from '../../../utils';

export default class IntroTest extends Phaser.Scene {
  avatar: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | null;
  facingDirection: 'front' | 'left' | 'right' = 'front';
  isJumping: boolean;
  backgrounds: Phaser.Physics.Arcade.Group | null;
  paper: Phaser.GameObjects.Image | null;

  constructor() {
    super('intro-test');
    this.avatar = null;
    this.facingDirection = 'front';
    this.isJumping = false;
    this.backgrounds = null;
    this.paper = null;
  }

  preload() {
    // Backgrounds
    this.load.image(
      'black-bg',
      'assets/backgrounds/platform/black-background.jpg'
    );
    this.load.image('paper', 'assets/backgrounds/platform/papers.png');

    // Temp ground
    this.load.image('ground', 'assets/misc/platform.png');

    // Avatar
    this.load.spritesheet('avatar-walk', 'assets/sprites/walk.png', {
      frameWidth: 220,
      frameHeight: 283,
    });
    this.load.spritesheet('avatar-jump', 'assets/sprites/jump.png', {
      frameWidth: 220,
      frameHeight: 283,
    });
  }

  create() {
    // Backgrounds
    this.backgrounds = this.physics.add.group({ allowGravity: false });
    const centerY = this.cameras.main.height / 2;
    const blackBg = this.backgrounds
      .create(0, centerY, 'black-bg')
      .setOrigin(0, 0.5);
    const blackBgScaleY = (window.innerHeight * 1.5) / blackBg.height;
    blackBg.setScale(blackBgScaleY).setScrollFactor(0);
    this.paper = this.backgrounds.create(0, centerY, 'paper').setOrigin(0, 0.5);
    if (this.paper) {
      const paperScaleY = window.innerHeight / this.paper?.height;
      this.paper.setScale(paperScaleY).setScrollFactor(0);
    }

    //Temp ground
    const ground = this.physics.add.staticGroup();
    ground
      .create(
        this.cameras.main.width / 2,
        this.cameras.main.height / 2 + 283,
        'ground'
      )
      .setScale(20, 2)
      .setAlpha(0)
      .refreshBody();

    // Avatar
    this.avatar = this.physics.add.sprite(180, 0, 'avatar-walk').setFrame(4);
    this.avatar.setBounce(0.2);
    this.avatar.setCollideWorldBounds(true);
    const resetJump = () => (this.isJumping = false);
    this.physics.add.collider(this.avatar, ground, resetJump);

    // Keyboard control
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('avatar-walk', {
        start: 0,
        end: 3,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('avatar-walk', {
        start: 9,
        end: 12,
      }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'blink',
      frames: this.anims.generateFrameNumbers('avatar-walk', {
        start: 4,
        end: 8,
      }),
      frameRate: 8,
    });

    this.anims.create({
      key: 'jump',
      frames: this.anims.generateFrameNumbers('avatar-jump', {
        start: 1,
        end: 2,
      }),
      frameRate: 8,
    });

    // Eye blink on load, and every 5 seconds
    this.avatar.play('blink', true);
    setInterval(() => {
      if (this.facingDirection === 'front') {
        this.avatar?.anims.play('blink', true);
      }
    }, 5000);
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    const spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    if (cursors.left.isDown) {
      this.backgrounds?.setVelocityX(500);
      this.avatar?.setVelocityX(-100);
      this.avatar?.anims.play('left', true);
      this.facingDirection = 'left';
    } else if (cursors.right.isDown) {
      this.backgrounds?.setVelocityX(-500);
      this.avatar?.setVelocityX(180);
      this.avatar?.anims.play('right', true);
      this.facingDirection = 'right';
    } else {
      this.backgrounds?.setVelocityX(0);
      this.avatar?.setVelocityX(0);
      if (this.facingDirection !== 'front') {
        this.avatar?.anims.play('blink', true);
        this.facingDirection = 'front';
      }
    }

    if (spaceBar.isDown && this.avatar?.body.touching.down) {
      this.avatar.setVelocityY(-600);
      if (!this.isJumping && this.facingDirection === 'front') {
        this.avatar.anims.play('jump', true);
        this.isJumping = true;
      }
    }
  }
}
