// Efrain Luengas
// 5/19/2021
// 13 hours to complete
class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('jet', './assets/jet.png');
        this.load.image('aircraft', './assets/aircraft.png');

        this.load.image('sky', './assets/sky.png');
        this.load.image('ui', './assets/ui.png');
        this.load.image('hill1', './assets/hill1.png');
        this.load.image('hill2', './assets/hill2.png');
        this.load.image('hill3', './assets/hill3.png');
        this.load.image('hill4', './assets/hill4.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
      }

    create() {
        // music
        this.sfxMusic = this.sound.add("sfx_music");
        var sfxmusicConfig = {
          mute: false,
          volume: 0.25,
          rate: 1,
          detune: 0,
          seek:0,
          loop: true,
          delay: 0
        }
        this.sfxMusic.play(sfxmusicConfig);

        // place background tile sprites
        this.sky = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0, 0)
        this.hill4 = this.add.tileSprite(0, 0, 640, 480, 'hill4').setOrigin(0, 0)
        this.hill3 = this.add.tileSprite(0, 0, 640, 480, 'hill3').setOrigin(0, 0)
        this.hill2 = this.add.tileSprite(0, 0, 640, 480, 'hill2').setOrigin(0, 0)
        this.hill1 = this.add.tileSprite(0, 0, 640, 480, 'hill1').setOrigin(0, 0)
        this.ui = this.add.tileSprite(0, 0, 640, 480, 'ui').setOrigin(0, 0)

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 1);
        
        // add jets (x3)
        this.ship01 = new Jet(this, game.config.width + borderUISize*6, borderUISize*5 + borderPadding*2, 'jet', 0, 30).setOrigin(0, 0);
        this.ship02 = new Jet(this, game.config.width + borderUISize*3, borderUISize*6 + borderPadding*4, 'jet', 0, 20).setOrigin(0,0);
        this.ship03 = new Jet(this, game.config.width, borderUISize*7 + borderPadding*6, 'jet', 0, 10).setOrigin(0,0);

        // add aircraft

        this.aircraft01 = new Aircraft(this, game.config.width + borderUISize*6, borderUISize*4, 'aircraft', 0, 40 ).setOrigin(0, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
          key: 'explode',
          frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
          frameRate: 30
        });

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
          fontFamily: 'Courier',
          fontSize: '28px',
          backgroundColor: '#F3B141',
          color: '#000000',
          align: 'left',
          padding: {
            top: 5,
            bottom: 5,
        },
          fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*38, this.p1Score, scoreConfig);

        // GAME OVER flag
        this.gameOver = false;
          // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or <- for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

    }
    
    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }
        //this.sound.play('sfx_music')
        this.hill4.tilePositionX -= 0.25;
        this.hill3.tilePositionX -= 0.50;
        this.hill2.tilePositionX -= 0.75;
        this.hill1.tilePositionX -= 1.00;

        if (!this.gameOver) {
          this.p1Rocket.update();         // update rocket sprite
          this.ship01.update();           // update jets (x3)
          this.ship02.update();
          this.ship03.update();
          this.aircraft01.update();

        }
        
        // check collisions
        if(this.checkCollision(this.p1Rocket, this.aircraft01)) {
           this.p1Rocket.reset();
           this.shipExplode(this.aircraft01);
           this.aircraft01.reset();
          
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
           this.p1Rocket.reset();
           this.shipExplode(this.ship03);
           this.ship03.reset();
           
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
            this.ship02.reset();
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
            this.ship01.reset();
        }

      }

    checkCollision(rocket, ship) {
      // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }
    
    shipExplode(ship) {
      // temporarily hide ship
      ship.alpha = 0;
      // create explosion sprite at ship's position
      let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
      boom.anims.play('explode');             // play explode animation
      boom.on('animationcomplete', () => {    // callback after anim completes
        ship.reset();                         // reset ship position
        ship.alpha = 1;                       // make ship visible again
        boom.destroy();                       // remove explosion sprite
      });       
          // score add and repaint
      this.p1Score += ship.points;
      this.scoreLeft.text = this.p1Score;
      this.sound.play('sfx_explosion');
    }
 

  }