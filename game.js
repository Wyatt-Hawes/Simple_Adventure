class Demo1 extends AdventureScene {
    constructor() {
        super("demo1", "First Room");
    }

    onEnter() {

        let clip = this.add.text(this.w * 0.3, this.w * 0.3, "📎 paperclip")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => this.showMessage("Metal, bent."))
            .on('pointerdown', () => {
                this.showMessage("No touching!");
                this.tweens.add({
                    targets: clip,
                    x: '+=' + this.s,
                    repeat: 2,
                    yoyo: true,
                    ease: 'Sine.inOut',
                    duration: 100
                });
            });

        let key = this.add.text(this.w * 0.5, this.w * 0.1, "🔑 key")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("It's a nice key.")
            })
            .on('pointerdown', () => {
                this.showMessage("You pick up the key.");
                this.gainItem('key');
                this.tweens.add({
                    targets: key,
                    y: `-=${2 * this.s}`,
                    alpha: { from: 1, to: 0 },
                    duration: 500,
                    onComplete: () => key.destroy()
                });
            })

        let door = this.add.text(this.w * 0.1, this.w * 0.15, "🚪 locked door")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                if (this.hasItem("key")) {
                    this.showMessage("You've got the key for this door.");
                } else {
                    this.showMessage("It's locked. Can you find a key?");
                }
            })
            .on('pointerdown', () => {
                if (this.hasItem("key")) {
                    this.loseItem("key");
                    this.showMessage("*squeak*");
                    door.setText("🚪 unlocked door");
                    this.gotoScene('demo2');
                }
            })

    }
}

class Demo2 extends AdventureScene {
    constructor() {
        super("demo2", "The second room has a long name (it truly does).");
    }
    onEnter() {
        this.add.text(this.w * 0.3, this.w * 0.4, "just go back")
            .setFontSize(this.s * 2)
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage("You've got no other choice, really.");
            })
            .on('pointerdown', () => {
                this.gotoScene('demo1');
            });

        let finish = this.add.text(this.w * 0.6, this.w * 0.2, '(finish the game)')
            .setInteractive()
            .on('pointerover', () => {
                this.showMessage('*giggles*');
                this.tweens.add({
                    targets: finish,
                    x: this.s + (this.h - 2 * this.s) * Math.random(),
                    y: this.s + (this.h - 2 * this.s) * Math.random(),
                    ease: 'Sine.inOut',
                    duration: 500
                });
            })
            .on('pointerdown', () => this.gotoScene('outro'));
    }
}

class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        //this.add.text(50,50, "Adventure awaits!").setFontSize(50);
        this.add.text(200,400, "Click anywhere to begin.").setFontSize(100);
        this.input.on('pointerdown', () => {
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('keybreak'));
        });
    }
}
class keyBreak extends AdventureScene{
    constructor(){
        super('keybreak')
    }
    
    preload(){
        this.load.path = './assets/';
        this.load.image('key_head', 'key_head.png');
        this.load.image('key_body', 'key_body.png');
        this.load.image('key_blade', 'key_blade.png');
    }
    create(){
        this.cameras.main.fadeIn(3000, 255,255,255);
        this.cameras.main.setBackgroundColor('#EAEAEA');
        //this.add.sprite(400,300, 'key_head');
        this.key = this.add.container(800,-280);


        let head = this.add.sprite(40-100,50-15, 'key_head');
        let body = this.add.sprite(232-100,50-15, 'key_body');
        let blade = this.add.sprite(283-100,15-15, 'key_blade');

        this.key.add(head);
        this.key.add(body);
        this.key.add(blade);


        let brk = this.tweens.add({
            targets: this.key,
            repeat: 0,
            duratiom: 1000,
            delay: 1000,
            paused: false,
            ease: 'circ.easeOut',
            x: 800,
            y: 400,
            onComplete: function(){
                s.paused = false;
            }

        });
        let s = this.tweens.add({
            targets: this.key,
            repeat: 0,
            scale:2,
            duration: 3000,
            paused: true,
            onComplete: function(){
                shk.paused = false;
            }
        });
        let shk = this.tweens.add({
            targets: this.key,
            repeat: 15,
            angle: {from: -5, to: 5},
            yoyo: true,
            duration: 50,
            paused: true,
            onComplete: function(){
                brk1.paused = false;
                brk2.paused = false;
                brk3.paused = false;
            }
        })
        let brk1 = this.tweens.add({
            targets: head,
            x:  -1000 * (Math.random() + 0.3) ,
            y:  1000 * (Math.random() + 0.3),
            paused: true 
        });
        let brk2 = this.tweens.add({
            targets: body,
            x:  1000 * (Math.random() + 0.3) ,
            y:  -1000 * (Math.random() + 0.3),
            paused: true 
        });
        let brk3 = this.tweens.add({
            targets: blade,
            x:  1000 * (Math.random() + 0.3) ,
            y:  1000 * (Math.random() + 0.3),
            paused: true 
        });
    }
    

    update(){
    }
}

class Outro extends Phaser.Scene {
    constructor() {
        super('outro');
    }
    create() {
        this.add.text(50, 50, "That's all!").setFontSize(50);
        this.add.text(50, 100, "Click anywhere to restart.").setFontSize(20);
        this.input.on('pointerdown', () => this.scene.start('intro'));
    }
}


const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [keyBreak, Intro, Demo2, Outro],
    title: "Adventure Game",
});

