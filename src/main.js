// Efrain Luengas
// 5/19/2021
// 13 hours to complete
/*
sound assets rocket_shot.wav, explosion38.wav, and blip_select12.wav were downloaded from freesound.org
rocket_shot.wav: https://freesound.org/people/LittleRobotSoundFactory/sounds/270339/
explosion38.wav: https://freesound.org/people/LittleRobotSoundFactory/sounds/270311/
blip_selesct12.wav: https://freesound.org/people/LittleRobotSoundFactory/sounds/270334/

sound asset common_fight.wav was downloaded from https://patrickdearteaga.com/chiptune-8-bit-retro/

Points:
I believe with wht I have implemented I deserve 95 points.
I redesigned the art, UI, and sound (60)
I implemented a new enemy that moves faster, and is worth more points (20)
I implemented paralax scrolling in my game (10)
I added the ability to control the rocket/missile after firing (5)
*/

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
  }
let game = new Phaser.Game(config);
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
//console.log("poop")ddd