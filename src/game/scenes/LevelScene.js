import { Input, Scene } from 'phaser'

import Enemy from '../objects/enemy'
import Player from '../objects/player'
import Beam from '../objects/beam'
import Explosion from '../objects/explosion'

export default class LevelScene extends Scene {
    constructor(config) {
        super({ key: config.key });
        this.score = 0;
        this.acts = config.acts;
        this.activeAct = null;
        this.activeEvents = [];
        this.bg = config.background;
        this.index = config.index;
    }

    preload(){
        this.load.image('background', this.bg);
    }

    create() {
        this.setBackground();
        this.setGroups();
        this.setPlayer(new Player(this));
        this.setInputs();
        this.setCollide();
        this.scoreLabel = this.createLabel(10, 10, "SCORE " + this.score);
        this.loadAct(0);
    }

    update(){
        let active = this.getActiveAct();
        let backgroundSpeed = 0;
        if( this.game.getFrame() === active.next ) {
            this.advanceAct();
        }

        if(this.cursorKeys.up.isDown){
            backgroundSpeed = 0.75;
        } else if(this.cursorKeys.down.isDown) {
            backgroundSpeed = 0.25;
        }else {
            backgroundSpeed = 0.5;
        }
        
        this.background.tilePositionY -= backgroundSpeed;
        this.movePlayer();
    }

    setCollide(){
        // this.physics.add.overlap(this.players, this.powerUps, this.pickPowerUp, null, this);
        this.physics.add.overlap(this.players, this.enemies, this.hurtPlayer, null, this);
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
    }

    setInputs(){
        this.cursorKeys = this.input.keyboard.createCursorKeys();    
        this.spacebar = this.input.keyboard.addKey(Input.Keyboard.KeyCodes.SPACE);
    }

    setPlayer(player){
        this.player = player;
        this.players.add(player);
        player.setCollideWorldBounds(true);
    }


    loadAct(act){
        this.activeAct = act;
        this.createFadeLabel(10,30, "ACT " + act);
        this.loadEvents(this.getActiveAct());
    }
    
    loadEvents(act){
        for(let e = 0; e < act.events.length; e++){

            let event = {
                delay: act.events[e].delay,
                loop: act.events[e].loop,
                callbackScope: this
            };

            switch(act.events[e].callback) {
                case 'enemy':
                    event.callback = this.generateEnemy(act.events[e])
                    break;
            }

            this.activeEvents.push(
                this.time.addEvent(event)
            ); 
        }
    }
    // Pew pew
    shootBeam(){
        return this.projectiles.add(new Beam(this));
    }

    // Move Player
    movePlayer(){
        let player1 = this.players.getChildren()[0];
        
        player1.update(this.cursorKeys);
        if(Input.Keyboard.JustDown(this.spacebar)){
            player1.shootBeam();
        }
    }

    // Crash
    hurtPlayer(player){
        this.updateScore(0)
        player.x = this.game.config.width / 2 - 8;
        player.y = this.game.config.height - 64;
    }

    // Blow ship up
    hitEnemy(projectile, enemy){
        projectile.destroy();
        this.updateScore(enemy.speed * 10);
        this.destroyShip(enemy);
    }
    
    // Destroy ship with an animation
    destroyShip(ship){
        ship.destroy();
        return new Explosion(this, ship.x, ship.y);
    }

    // Update Score
    updateScore(value){
        if(value) {
            this.score += value;
        } else {
            this.score = 0;
        }

        this.scoreLabel.text = "SCORE " + this.score;
    }

    generateEnemy(event){
        console.log("generate enemy", event)
        for(let x = 0; x < event.multiplyer; x++){
            this.enemies.add(new Enemy(this, event.type));
        }
    }

    getActiveAct() {
        return this.acts.filter(act => act.index === this.activeAct)[0];
    }

    advanceAct() {
        this.activeAct++;
        if(this.activeAct >= this.acts.length){
            this.advanceLevel();
        } else {
            this.loadAct(this.activeAct);
        }
    }

    advanceLevel(){
        let num = this.index + 1;
        this.scene.start('Level' +  num);
    }

    setBackground(){
        let background = this.add.tileSprite(0, 0, this.game.config.height, this.game.config.width, "background");
        
        background.height = this.game.config.height;
        background.width = this.game.config.width;
        
        this.background = background;
        this.background.setOrigin(0,0);
    }

    setGroups(){
        this.enemies = this.physics.add.group({ runChildUpdate: true });
        this.projectiles = this.add.group({ runChildUpdate: true });
        //this.powerUps = this.physics.add.group({ runChildUpdate: true });
        this.players = this.physics.add.group();
    }

    createLabel(x, y, label){
        return this.add.text(x, y, label, { fontFamily:"VCR" });
    }

    createFadeLabel(x, y, label){
        this.fadeLabel = this.createLabel(x, y, label);
        this.time.addEvent({
            delay: 3000,
            loop: false,
            callbackScope: this,
            callback: () =>{ this.fadeLabel.destroy(); }
        });
    }
}