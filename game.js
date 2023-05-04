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
        super('keybreak');
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
        let dura = 50;
        let shk = this.tweens.add({
            targets: this.key,
            repeat: 15,
            angle: {from: -5, to: 5},
            duration: dura,
            yoyo: true,
            paused: true,
            onRepeat: function(){
                dura -=15;
                //console.log(dura);
            },
            onComplete: function(){
                brk1.paused = false;
                brk2.paused = false;
                brk3.paused = false;
            },
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
        let myvar = this;
        console.log(myvar)
        let brk3 = this.tweens.add({
            targets: blade,
            x:  1000 * (Math.random() + 0.3) ,
            y:  1000 * (Math.random() + 0.3),
            paused: true,
            onComplete: function(){
               myvar.gotoScene('menu');
            }
        });
    }
    

    update(){
    }
}
let anim = 0;
class Menu extends AdventureScene{
    constructor() {
        super('menu');
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('puz1', '1.jpg');
        this.load.image('puz2', '2.jpg');
        this.load.image('puz3', '4.jpg');
        if (anim == 0){
            this.load.image('key_head', 'key_head.png');
            this.load.image('key_body', 'key_body.png');
            this.load.image('key_blade', 'key_blade.png');
        }
    }

    create(){
        this.cameras.main.setBackgroundColor('#EAEAEA');

        //based off of https://phaser.discourse.group/t/how-to-create-circular-movement-motion-for-a-gameobject-with-arcade-physics/8324/4
        var graphics = this.add.graphics().lineStyle(1, 0xFF0000, 0.5);
        // A circle curve starts at angle 0, the "3 o'clock" position.
        // Make a circle path of radius 200 starting from (600, 200)
        var path1 = new Phaser.Curves.Path(900, 500).ellipseTo(300,300, 0, 360, false, 0);
        var path2 = new Phaser.Curves.Path(450, 760).ellipseTo(300,300, 0, 360, false, 120);
        var path3 = new Phaser.Curves.Path(450, 240).ellipseTo(300,300, 0, 360, false, 240);

        //path1.draw(graphics, 128);
        //path2.draw(graphics, 128);
        //path3.draw(graphics, 128);

        var b1 = this.add.follower(path1, 900, 500, 'puz1');
        b1.setInteractive({});
        b1.setScale(.25);
        var b2 = this.add.follower(path2, 450, 760, 'puz2');
        b2.setInteractive({});
        b2.setScale(.25);
        var b3 = this.add.follower(path3, 450, 240, 'puz3');
        b3.setInteractive({});
        b3.setScale(.25);
        
            //block.setScale(.25);
            // Physics
            this.physics.add.existing(b1);
            //this.physics.add.existing(b2);
        
        
        let me = this;
        //b1
        {
        b1.on('pointerdown', (pointer, dragX, dragY) => {
            console.log("clicked 1!");
        });


        b1.on('pointerover', () => {
            me.add.tween({
                targets: b1,
                duration: 70,
                scale: .28,
            });
        });
        b1.on('pointerout', () => {
            me.add.tween({
                targets: b1,
                duration: 70,
                scale: .25,
            });
        });
        }   

        //b2
        {
        b2.on('pointerdown', (pointer, dragX, dragY) => {
            console.log("clicked 2!");
        });
        b2.on('pointerover', () => {
            me.add.tween({
                targets: b2,
                duration: 70,
                scale: .28,
            });
        });
        b2.on('pointerout', () => {
            me.add.tween({
                targets: b2,
                duration: 70,
                scale: .25,
            });
        });
        
        }

        //b3
        {
        b3.on('pointerdown', (pointer, dragX, dragY) => {
            console.log("clicked 3!");
        });
        b3.on('pointerover', () => {
            me.add.tween({
                targets: b3,
                duration: 70,
                scale: .28,
            });
        });
        b3.on('pointerout', () => {
            me.add.tween({
                targets: b3,
                duration: 70,
                scale: .25,
            });
        });

        }
        if(anim == 0){
            let head = this.add.sprite(-300,-200, 'key_head');
            let body = this.add.sprite(2000,-50, 'key_body');
            let blade = this.add.sprite(800,-300, 'key_blade');

            this.tweens.add({
                targets: head,
                repeat: 0,
                duratiom: 500,
                delay: 1000,
                paused: false,
                ease: 'circ.easeOut',
                x: b1.x,
                y: b1.y,
                onComplete: function(){
                    //console.log("a");
                    f1.paused = false;
                }
                
            });

            let f1 = this.tweens.add({
                targets: head,
                repeat: 0,
                duration: 2000,
                delay: 250,
                alpha: 0,
                paused: true,
                onComplete: function(){
                    setTimeout(() => {
                        b1.startFollow({
                            duration: 10000,
                            yoyo: false,
                            loop: -1,
                            onStart: function () {
                            path1.getPoint(0, b1.pathVector);
                            }
                        });

                    }, 300);
                }
            });

            this.tweens.add({
                targets: body,
                repeat: 0,
                duratiom: 500,
                delay: 1000,
                paused: false,
                ease: 'circ.easeOut',
                x: b2.x,
                y: b2.y,
                onComplete: function(){
                    //console.log("a");
                    f2.paused = false;
                }
                
            });

            let f2 = this.tweens.add({
                targets: body,
                repeat: 0,
                delay: 250,
                duration: 2000,
                alpha: 0,
                paused: true,
                onComplete: function(){
                    setTimeout(() => {
                        b2.startFollow({
                            duration: 10000,
                            yoyo: false,
                            loop: -1,
                            onStart: function () {
                            path1.getPoint(0, b1.pathVector);
                            }
                        });

                    }, 300);
                }
            });

            this.tweens.add({
                targets: blade,
                repeat: 0,
                delay: 250,
                duration: 1000,
                delay: 1000,
                paused: false,
                ease: 'circ.easeOut',
                x: b3.x,
                y: b3.y,
                onComplete: function(){
                    //console.log("a");
                    f3.paused = false;
                }
                
            });

            let f3 = this.tweens.add({
                targets: blade,
                repeat: 0,
                delay: 250,
                duration: 2000,
                alpha: 0,
                paused: true,
                onComplete: function(){
                    setTimeout(() => {
                        b3.startFollow({
                            duration: 10000,
                            yoyo: false,
                            loop: -1,
                            onStart: function () {
                            path1.getPoint(0, b1.pathVector);
                            }
                        });

                    }, 300);
                }
            });

        }

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
    //type: Phaser.CANVAS,
    physics: {
        default: 'arcade',
        arcade: { debug: true }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080
    },
    scene: [Menu, keyBreak, Intro, Demo2, Outro],
    title: "Adventure Game",
});

