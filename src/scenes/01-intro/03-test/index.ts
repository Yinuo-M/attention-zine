import Phaser from 'phaser';
import { colours } from '../../../consts';
import { getScreenCenter } from '../../../utils';

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

    // Ground
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

    // Others
    this.load.image('doodle', 'assets/misc/doodle.png');
    this.load.image('ad', 'assets/misc/ad.png');
  }

  create() {
    const screenCenter = getScreenCenter(this);

    // Backgrounds
    this.backgrounds = this.physics.add.group({ allowGravity: false });
    const centerY = screenCenter.y;
    const blackBg = this.backgrounds
      .create(0, centerY, 'black-bg')
      .setOrigin(0, 0.5);
    const blackBgScaleY = (window.innerHeight * 1.5) / blackBg.height;
    blackBg.setScale(blackBgScaleY).setScrollFactor(1, 0);
    this.paper = this.backgrounds.create(0, centerY, 'paper').setOrigin(0, 0.5);
    if (this.paper) {
      this.paper.setScale(0.315).setScrollFactor(1, 0);
    }

    // Ground and edges
    const ground = this.physics.add.staticGroup();
    ground
      .create(screenCenter.x, screenCenter.y + 200, 'ground')
      .setScale(20, 2)
      .setAlpha(0)
      .refreshBody();

    ground
      .create(0, screenCenter.y, 'ground')
      .setScale(1, 500)
      .setAlpha(0)
      .refreshBody();

    // Text
    this.add
      .text(
        screenCenter.x - 550,
        screenCenter.y - 280,
        ['Are we really', 'the customer?'],
        {
          fontFamily: 'RoadRage',
          color: colours.blue,
          fontSize: '64px',
        }
      )
      .setRotation(-0.15)
      .setAlpha(0.9)
      .setOrigin(0.5, 0.5);

    this.add
      .text(
        screenCenter.x - 110,
        screenCenter.y - 105,
        [
          'Over the last two decades, internet',
          'and social media have blurred the',
          'lines between personal and mass',
          'communication, making it easy for',
          'anyone to create and share content',
          'with a global audience. ',
        ],
        {
          fontFamily: 'Gaegu',
          color: colours.black,
          fontSize: '35px',
        }
      )
      .setOrigin(0.5, 0.5);

    this.add
      .text(
        screenCenter.x + 750,
        screenCenter.y - 155,
        [
          'And as information reaches over abundance,',
          'the competition for our limited attention intensifies.',
          'Tech companies are constantly devising new features',
          'and tactics to further exploit our weaknesses,',
          'a phenomenon aptly described by tech ethicist Tristan',
          'Harris as "a race to the bottom of the brain stem".',
        ],
        {
          fontFamily: 'Gaegu',
          color: colours.black,
          fontSize: '35px',
        }
      )
      .setRotation(0.05)
      .setOrigin(0.5, 0.6);

    this.add
      .text(
        screenCenter.x + 1600,
        screenCenter.y - 280,
        ['It all began with seemingly ', 'innocuous advertising techniques...'],
        {
          fontFamily: 'Gaegu',
          color: colours.black,
          fontSize: '35px',
        }
      )
      .setOrigin(0.5, 0.6);

    // Doodle
    this.add
      .image(screenCenter.x + 750, screenCenter.y + 80, 'doodle')
      .setScale(0.3);

    // Ad
    const ad = this.physics.add.staticImage(
      screenCenter.x + 2000,
      screenCenter.y + 150,
      'ad'
    );

    // Avatar
    this.avatar = this.physics.add.sprite(300, 500, 'avatar-walk').setFrame(4);
    this.avatar.setBounce(0.3);
    const resetJump = () => (this.isJumping = false);
    this.physics.add.collider(this.avatar, ground, resetJump);
    this.physics.add.collider(this.avatar, ad, resetJump);
    this.cameras.main.startFollow(
      this.avatar,
      false,
      1,
      0,
      -screenCenter.x + 300,
      0
    );

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
      this.avatar?.setVelocityX(-300);
      this.avatar?.anims.play('left', true);
      this.facingDirection = 'left';
    } else if (cursors.right.isDown) {
      this.avatar?.setVelocityX(300);
      this.avatar?.anims.play('right', true);
      this.facingDirection = 'right';
    } else {
      this.avatar?.setVelocityX(0);
      if (this.facingDirection !== 'front') {
        this.avatar?.anims.play('blink', true);
        this.facingDirection = 'front';
      }
    }

    if (spaceBar.isDown && this.avatar?.body.touching.down) {
      this.avatar.setVelocityY(-800);
      if (!this.isJumping && this.facingDirection === 'front') {
        this.avatar.anims.play('jump', true);
        this.isJumping = true;
      }
    }
  }
}
