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
        super('menu', "Find the key fragments!");
    }
    preload(){
        this.load.path = './assets/';
        this.load.image('puz1', '1.jpg');
        this.load.image('puz2', '2.jpg');
        this.load.image('puz3', '4.jpg');
        
        this.load.image('key_head', 'key_head.png');
        this.load.image('key_body', 'key_body.png');
        this.load.image('key_blade', 'key_blade.png');
        
    }

    

    onEnter(){
        this.cameras.main.setBackgroundColor('#EAEAEA');
        console.log(this.hasItem("Key Head"));
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
        if (puzzle1Solved == 1 && puzzle2Solved == 1 && puzzle3Solved == 1)
        {

            let head = this.add.sprite(300,300, 'key_head');
            let body = this.add.sprite(300, 600, 'key_body');
            let blade = this.add.sprite(600, 600, 'key_blade');


            this.make_draggable(head);
            this.make_draggable(body);
            this.make_draggable(blade);



        }else{

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
            this.scene.start('firstpuzzle');
        });

        b2.on('pointerdown', (pointer, dragX, dragY) => {
            console.log("clicked 2!");
            this.scene.start('secondpuzzle');
        });
        b3.on('pointerdown', (pointer, dragX, dragY) => {
            console.log("clicked 3!");
            this.scene.start('thirdpuzzle');
        });

        this.enlarge_on_mouse(b1);
        this.enlarge_on_mouse(b2);
        this.enlarge_on_mouse(b3);
        }
        if(anim == 0){
            anim++;
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

        }else{
            b1.startFollow({
                duration: 10000,
                yoyo: false,
                loop: -1,
                onStart: function () {
                path1.getPoint(0, b1.pathVector);
                }
            });

            b2.startFollow({
                duration: 10000,
                yoyo: false,
                loop: -1,
                onStart: function () {
                path2.getPoint(0, b2.pathVector);
                }
            });

            b3.startFollow({
                duration: 10000,
                yoyo: false,
                loop: -1,
                onStart: function () {
                path3.getPoint(0, b3.pathVector);
                }
            });
        }
        }

    }



}
let puzzle1Solved = 0;
class FirstPuzzle extends AdventureScene{
    constructor() {
        
            super('firstpuzzle');
        
    }
    preload(){
        this.load.path = './assets/';
        this.load.image("puzzle", "1.jpg");
        this.load.image("head", "key_head.png");
        this.load.image("arrow", "backArrow.png");
    }
    onEnter(){
        this.cameras.main.setBackgroundColor('#EAEAEA');
        if(puzzle2Solved == 1){
            this.gainItem("Key Body");
        }
        if(puzzle1Solved == 1){
            this.gainItem("Key Head");
        }
        if(puzzle3Solved == 1){
            this.gainItem("Key Blade");
        }
        let p = this.add.sprite(50,10, "puzzle");
        p.setScale();
        p.setOrigin(0,0);
        let myself = this;
        let arrow = this.add.sprite(25,25, "arrow");
        arrow.setScale(.1);
        arrow.setInteractive();
        arrow.on('pointerover', () => {
            this.tweens.add({
                targets: arrow,
                scale: {from: .1, to: .11},
                angle: {from: 0, to: -90},
                duration: 100,
            });
        });
        arrow.on('pointerout', () =>{
            this.tweens.add({
                targets: arrow,
                scale: {from: .11, to: .1},
                angle: {from: -90, to: 0},
                duration: 100,
            });
        });
        arrow.on("pointerdown",() => {
            myself.gotoScene("menu");
        });
        //setTimeout(() => {this.gainItem("Key Head"); this.updateInventory()}, 2000);

        // let clip = this.add.text(100, 100, "📎 paperclip")
        //     .setFontSize(this.s * 2)
        //     .setInteractive()
        //     .on('pointerover', () => this.showMessage("Metal, bent."))
        //     .on('pointerdown', () => {
        //         this.showMessage("No touching!");
        //         this.tweens.add({
        //             targets: clip,
        //             x: '+=' + this.s,
        //             repeat: 2,
        //             yoyo: true,
        //             ease: 'Sine.inOut',
        //             duration: 100
        //         });
        //     });
        if(puzzle1Solved == 0){
        let textBox = this.add.container(40,950);
        let iSpy = this.add.text(0,0, "I spy: ", {color: 0xFFF, fontSize: '75px', bold: true});
        textBox.add(iSpy);

        let Glasses = this.add.text(270,10, "Glasses without a face,", {fontSize: '30px',color: 0xFFF});
        let Hat = this.add.text(700,10, "an upside down top hat,", {fontSize: '30px',color: 0xFFF});
        let TRICICLE = this.add.text(1120,10, "a bicycle,", {fontSize: '30px',color: 0xFFF});
        let Horn = this.add.text(273,50, "a horn,", {fontSize: '30px',color: 0xFFF});
        let Bone = this.add.text(393,50, " a dogs bone,", {fontSize: '30px',color: 0xFFF});
        let Bride = this.add.text(630,50, "a bride and groom,", {fontSize: '30px',color: 0xFFF});
        let Dove = this.add.text(960,50, "a dove,", {fontSize: '30px',color: 0xFFF});
        textBox.add(Glasses);
        textBox.add(Hat);
        textBox.add(TRICICLE);
        textBox.add(Horn);
        textBox.add(Bone);
        textBox.add(Bride);
        textBox.add(Dove);
        {
        let glasses = this.add.circle(330,840, 20, 0xff0000);
        this.setupObject(glasses, Glasses, "glasses");

        let hat = this.add.circle(1111,331,20,0xff0000);
        this.setupObject(hat, Hat, "hat");

        let bone = this.add.circle(956, 814,20,0xff0000);
        this.setupObject(bone, Bone, "bone");

        let dove = this.add.circle(712,543,20,0xff0000);
        this.setupObject(dove, Dove, "dove");

        let horn = this.add.circle(281,504,40,0xff0000);
        this.setupObject(horn,Horn,"horn");

        let bicycle = this.add.circle(461, 362, 50, 0xff0000);
        this.setupObject(bicycle, TRICICLE, "bicycle");

        let bride = this.add.circle(333, 556, 50, 0xff0000);
        this.setupObject(bride, Bride, "bride");
        }

        this.input.on('pointerdown', (mouse) => console.log(Math.floor(mouse.x) + "," + Math.floor(mouse.y)));
        }
    }
    update(){
        if(letNumFound1 == 7){
            let me = this;
            puzzle1Solved++;
            letNumFound1 = -1;
            let head = this.add.sprite(-200,-200,"head");
            this.tweens.add({
                targets: head,
                x: 600,
                y: 600,
                scale: 2,
                //alpha: 0,
                duration: 4000,
                onComplete: function(){
                    me.gainItem("Key Head");
                    me.showMessage("You found the head of the key!");
                    fade.paused = false;
                }

            });
            let fade = this.tweens.add({
                targets: head,
                alpha: 0,
                duration: 2000,
                paused: true,
            })
        }
    }
    
    // setupObject(circ, Circ, name){
}
let map1 = new Map();
let interactable = 0;
let letNumFound1 = 0;

let puzzle2Solved = 0;
let letNumFound2 = 0;
class SecondPuzzle extends AdventureScene{
    constructor() {
        
            super('secondpuzzle');
        
    }
    preload(){
        this.load.path = './assets/';
        this.load.image("puzzle2", "2.jpg");
        this.load.image("body", "key_body.png");
        this.load.image("arrow", "backArrow.png");
    }
    onEnter(){
        this.cameras.main.setBackgroundColor('#EAEAEA');
        if(puzzle2Solved == 1){
            this.gainItem("Key Body");
        }
        if(puzzle1Solved == 1){
            this.gainItem("Key Head");
        }
        if(puzzle3Solved == 1){
            this.gainItem("Key Blade");
        }
        let p = this.add.sprite(50,10, "puzzle2");
        p.setScale();
        p.setOrigin(0,0);
        let myself = this;
        let arrow = this.add.sprite(25,25, "arrow");
        arrow.setScale(.1);
        arrow.setInteractive();
        arrow.on('pointerover', () => {
            this.tweens.add({
                targets: arrow,
                scale: {from: .1, to: .11},
                angle: {from: 0, to: -90},
                duration: 100,
            });
        });
        arrow.on('pointerout', () =>{
            this.tweens.add({
                targets: arrow,
                scale: {from: .11, to: .1},
                angle: {from: -90, to: 0},
                duration: 100,
            });
        });
        arrow.on("pointerdown",() => {
            myself.gotoScene("menu");
        });
       
        if(puzzle2Solved == 0){
        let textBox = this.add.container(40,950);
        let iSpy = this.add.text(0,0, "I spy: ", {color: 0xFFF, fontSize: '75px', bold: true});
        textBox.add(iSpy);

        let Oop = this.add.text(270,10, "OOP,", {fontSize: '30px',color: 0xFFF});
        let Shotgun = this.add.text(350, 10, "a shotgun,", {fontSize: '30px',color: 0xFFF});
        let Pet = this.add.text(540, 10, "a flattened pet,", {fontSize: '30px',color: 0xFFF});
        let Head = this.add.text(840, 10, "a head with no body,", {fontSize: '30px',color: 0xFFF});
        let Caution = this.add.text(270, 50, "CAUTION,", {fontSize: '30px',color: 0xFFF});
        let Dogcat = this.add.text(420, 50, "a dog chasing a cat,", {fontSize: '30px',color: 0xFFF});
        let Rooster = this.add.text(800, 50, "and a rooster.", {fontSize: '30px',color: 0xFFF});



        textBox.add(Oop);
        textBox.add(Shotgun);
        textBox.add(Pet);
        textBox.add(Head);
        textBox.add(Caution);
        textBox.add(Dogcat);
        textBox.add(Rooster);

        {
        let oop = this.add.circle(1322,465, 20, 0xff0000);
        let shotgun = this.add.circle(358,820, 30, 0xff0000);
        let pet = this.add.circle(1133,745, 20, 0xff0000);
        let head = this.add.circle(590,410, 25, 0xff0000);
        let caution = this.add.circle(1013,317, 30, 0xff0000);
        let dogcat = this.add.circle(1226,399, 40, 0xff0000);
        let rooster = this.add.circle(59,344, 40, 0xff0000);

        this.setupObject(oop, Oop, "oop");
        this.setupObject(shotgun,Shotgun, "shotgun");
        this.setupObject(pet, Pet, "pet");
        this.setupObject(head,Head, "head");
        this.setupObject(caution,Caution, "caution");
        this.setupObject(dogcat,Dogcat, "dogcat");
        this.setupObject(rooster,Rooster,"rooster");




        }

        this.input.on('pointerdown', (mouse) => console.log(Math.floor(mouse.x) + "," + Math.floor(mouse.y)));
        }
    }
    update(){
        if(letNumFound2 == 7){
            let me = this;
            puzzle2Solved++;
            letNumFound2 = -1;
            let body = this.add.sprite(-200,-200,"body");
            this.tweens.add({
                targets: body,
                x: 600,
                y: 600,
                scale: 2,
                //alpha: 0,
                duration: 4000,
                onComplete: function(){
                    me.gainItem("Key Body");
                    me.showMessage("You found the body of the key!");
                    fade.paused = false;
                }

            });
            let fade = this.tweens.add({
                targets: body,
                alpha: 0,
                duration: 2000,
                paused: true,
            })
        }
    }
    
    // setupObject(circ, Circ, name){
}

let puzzle3Solved = 0;
let letNumFound3 = 0;
class ThirdPuzzle extends AdventureScene{
    constructor() {
        
            super('thirdpuzzle');
        
    }
    preload(){
        this.load.path = './assets/';
        this.load.image("puzzle3", "4.jpg");
        this.load.image("blade", "key_blade.png");
        this.load.image("arrow", "backArrow.png");
    }
    onEnter(){
        this.cameras.main.setBackgroundColor('#EAEAEA');
        if(puzzle2Solved == 1){
            this.gainItem("Key Body");
        }
        if(puzzle1Solved == 1){
            this.gainItem("Key Head");
        }
        if(puzzle3Solved == 1){
            this.gainItem("Key Blade");
        }
        let p = this.add.sprite(50,10, "puzzle3");
        p.setScale(.98);
        p.setOrigin(0,0);
        let myself = this;
        let arrow = this.add.sprite(25,25, "arrow");
        arrow.setScale(.1);
        arrow.setInteractive();
        arrow.on('pointerover', () => {
            this.tweens.add({
                targets: arrow,
                scale: {from: .1, to: .11},
                angle: {from: 0, to: -90},
                duration: 100,
            });
        });
        arrow.on('pointerout', () =>{
            this.tweens.add({
                targets: arrow,
                scale: {from: .11, to: .1},
                angle: {from: -90, to: 0},
                duration: 100,
            });
        });
        arrow.on("pointerdown",() => {
            myself.gotoScene("menu");
        });
       
        if(puzzle3Solved == 0){
        let textBox = this.add.container(40,950);
        let iSpy = this.add.text(0,0, "I spy: ", {color: 0xFFF, fontSize: '75px', bold: true});
        textBox.add(iSpy);

        let Squirrel = this.add.text(270,10, "Three squirrels in a line,", {fontSize: '30px',color: 0xFFF});
        let Kittens = this.add.text(750,10, "two kittens hiding,", {fontSize: '30px',color: 0xFFF});
        let Six = this.add.text(1100,10, "The number six,", {fontSize: '30px',color: 0xFFF});
        let Bear = this.add.text(270, 40, "a bear in overalls,",{fontSize: '30px',color: 0xFFF});
        let Bird = this.add.text(620, 40, "a bird perched on a light,",{fontSize: '30px',color: 0xFFF});
        let Goose = this.add.text(1090, 40, "a hat on a goose,",{fontSize: '30px',color: 0xFFF});


        textBox.add(Squirrel);
        textBox.add(Kittens);
        textBox.add(Six);
        textBox.add(Bear);
        textBox.add(Bird);
        textBox.add(Goose);

        {
        let squirrel = this.add.ellipse(261,125, 300, 60, 0x0000FF);
        let kittens = this.add.circle(201,912, 30, 0xFF0000);
        let six = this.add.circle(892,220, 30, 0xFF0000);
        let bear = this.add.circle(1267,194, 40, 0xFF0000);
        let bird = this.add.circle(512,432, 30, 0xFF0000);
        let goose = this.add.circle(1114,598,20, 0x0000FF);

        this.setupObject(squirrel, Squirrel, "squirrel");
        this.setupObject(kittens, Kittens, "kittens");
        this.setupObject(six,Six,"six");
        this.setupObject(bear,Bear,"bear");
        this.setupObject(bird,Bird,"bird");
        this.setupObject(goose,Goose, "goose");




        }
        let myself = this;

        this.input.on('pointerdown', (mouse) => console.log(Math.floor(mouse.x) + "," + Math.floor(mouse.y)));
        this.input.keyboard.on('keydown-' + 'SPACE', function (event){
            console.log("cheater!");
            puzzle1Solved = 1;
            puzzle2Solved = 1;
            puzzle3Solved = 1;
            myself.gainItem("Key Head");
            myself.gainItem("Key Body");
            myself.gainItem("Key Blade");
        });
        }
    }
    update(){
        if(letNumFound3 == 6){
            let me = this;
            puzzle3Solved++;
            letNumFound3 = -1;
            let blade = this.add.sprite(-200,-200,"blade");
            this.tweens.add({
                targets: blade,
                x: 600,
                y: 600,
                scale: 2,
                //alpha: 0,
                duration: 4000,
                onComplete: function(){
                    me.gainItem("Key Blade");
                    me.showMessage("You found the blade of the key!");
                    fade.paused = false;
                }

            });
            let fade = this.tweens.add({
                targets: blade,
                alpha: 0,
                duration: 2000,
                paused: true,
            })
        }
    }
    
    // setupObject(circ, Circ, name){

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
    scene: [ThirdPuzzle, SecondPuzzle, FirstPuzzle,Menu, Intro,  Demo2, Outro, Demo1,keyBreak],
    title: "Adventure Game",
});

