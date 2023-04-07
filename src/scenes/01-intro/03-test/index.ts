import Phaser from 'phaser';
import { getFullsizeBg } from '../../../utils';

export default class IntroTest extends Phaser.Scene {
  avatar: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | null;
  facingDirection: 'front' | 'left' | 'right' = 'front';
  isJumping: boolean;

  constructor() {
    super('intro-test');
    this.avatar = null;
    this.facingDirection = 'front';
    this.isJumping = false;
  }

  preload() {
    // Backgrounds
    this.load.image('white-bg', 'assets/backgrounds/lined-paper/off-white.png');
    this.load.image('paper', 'assets/backgrounds/lined-paper/paper.png');

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
    getFullsizeBg('white-bg', this);
    const paper = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      'paper'
    );
    paper.setScale(0.25).setScrollFactor(0);

    //Temp ground
    const ground = this.physics.add.staticImage(400, 1000, 'ground');

    // Avatar
    this.avatar = this.physics.add
      .sprite(this.cameras.main.width / 2, 0, 'avatar-walk')
      .setFrame(4);
    this.avatar.setBounce(0.1);
    this.avatar.setCollideWorldBounds(true);
    const resetJump = () => (this.isJumping = false);
    this.physics.add.collider(this.avatar, ground, resetJump);

    //Keyboard control
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

    if (this.avatar) {
      if (cursors.left.isDown) {
        this.avatar?.setVelocityX(-180);
        this.avatar?.anims.play('left', true);
        this.facingDirection = 'left';
      } else if (cursors.right.isDown) {
        this.avatar?.setVelocityX(180);
        this.avatar?.anims.play('right', true);
        this.facingDirection = 'right';
      } else {
        this.avatar.setVelocityX(0);
        if (this.facingDirection !== 'front') {
          this.avatar.anims.play('blink', true);
          this.facingDirection = 'front';
        }
      }

      if (spaceBar.isDown && this.avatar?.body.touching.down) {
        this.avatar.setVelocityY(-250);
        if (!this.isJumping) {
          this.avatar.anims.play('jump', true);
          this.isJumping = true;
        }
      }
    }
  }
}
