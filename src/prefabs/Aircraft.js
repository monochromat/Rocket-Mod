// Efrain Luengas
// 5/19/2021
// 13 hours to complete
// Aircraft prefab
class Aircraft extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = game.settings.aircraftSpeed;
    }

    update() {
        // mv left
        this.x -= this.moveSpeed;
        // wrap
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }

    //pos reset
    reset() {
        this.x = game.config.width;
    }
}