let ground, groundImg, cart, cannon, cannonball, projectile;
let plank, stone, target, target1, target5;
let shade, newShade, cannonIndicator;
var score = 0;
var lastShot = 0;
var fly = false;
var paused = false;

function setup() {
    new Canvas(2000, 1000);
    frameRate(60);
    world.gravity.y = 9.8;

    cart = new Sprite();
    cart.w = 500;
    cart.h = 250;
    cart.collider = "static";
    cart.img = "imgs/cart.png";
    cart.scale = 0.4;
    if (level == 1) {
        cart.x = 300;
        cart.y = 650;
    } else if (level == 2) {
        cart.x = 300;
        cart.y = 750;
    }

    projectile = new Group();
    projectile.d = 40;
    projectile.friction = 1;
    projectile.mass = 3;
    projectile.addAni("fireball", "imgs/fireball/fireball1.png", 4);
    projectile.addAni("ball", "imgs/ball.png");

    cannon = new Sprite();
    cannon.d = 600;
    cannon.x = cart.x;
    cannon.y = cart.y - 75;
    cannon.collider = "none";
    cannon.rotation = -10;
    cannon.img = "imgs/cannon.png";
    cannon.scale = 0.3;

    target = new Group();
    target.d = 100;

    target1 = new target.Group();
    target1.name = "target1";
    target1.addAni("imgs/target1/target1-1.png", 8);

    target5 = new target.Group();
    target5.name = "target5";
    target5.addAni("imgs/target5/target5-1.png", 8);

    plank = new Group();
    plank.mass = 10;
    plank.name = "plank";
    plankS = new plank.Group();
    plankS.w = 20;
    plankS.h = 200;
    plankS.img = "imgs/plankS.png";
    plankL = new plank.Group();
    plankL.w = 20;
    plankL.h = 400;
    plankL.img = "imgs/plankL.png";

    stone = new Group();
    stone.w = 20;
    stone.h = 200;
    stone.mass = 30;
    stone.name = "stone";
    stone.img = "imgs/stone.png";


    groundImg = new Sprite();
    groundImg.collider = "n";
    if (level == 1) {
        ground = new Sprite([[0, 800], [200, 700], [400, 700], [500, 800],
        [700, 900], [900, 900], [1000, 850], [1100, 700],
        [1200, 700], [1200, 650], [1400, 600], [1700, 600], [2000, 700], [2001, 700], [2001, 0]
        ]);
        groundImg.img = "imgs/lvl1.png";
    } else if (level == 2) {
        ground = new Sprite([[0, 700], [200, 800], [400, 800], [500, 850],
        [700, 900], [900, 800], [1100, 600], [1200, 550], [1350, 550],
        [1500, 650], [1600, 750], [1650, 800], [1900, 800],
        [2000, 780], [2001, 780], [2001, 0]
        ]);
        groundImg.img = "imgs/lvl2.png";
    }
    ground.collider = "static";
    ground.color = "darkgreen";

    //cannon indicator
    cannonIndicator = new Sprite();
    cannonIndicator.collider = "none";
    cannonIndicator.d = 0;
    cannonIndicator.x = cart.x;
    cannonIndicator.y = cart.y + 100;
    cannonIndicator.addAni("reloading", "imgs/reloading/reloading1.png", 4);
    cannonIndicator.addAni("ready", "imgs/ready.png");
    cannonIndicator.scale = 0.3;

    //pause screen
    shade = new Group();
    shade.w = 2000;
    shade.h = 1000;
    shade.collider = "none";
    shade.img = "imgs/pause.png";
    shade.opacity = 1;

    //build scene
    if (level == 1) {
        new stone.Sprite(1110, 600);
        new plankL.Sprite(1250, 530).rotation = 107;
        new target5.Sprite(1170, 610);

        new plankS.Sprite(710, 800);
        new plankS.Sprite(890, 800);
        new stone.Sprite(800, 690).rotation = 90;
        new target5.Sprite(800, 850);
        new target1.Sprite(800, 630);

        new stone.Sprite(1490, 500);
        new stone.Sprite(1690, 500);
        new plankS.Sprite(1590, 390).rotation = 90;
        new target1.Sprite(1590, 550);
    } else if (level == 2) {
        new stone.Sprite(1210, 450);
        new stone.Sprite(1340, 450);
        new plankS.Sprite(1275, 340).rotation = 90;
        new target5.Sprite(1275, 500);

        new plankS.Sprite(1190, 230);
        new plankS.Sprite(1360, 230);
        new plankS.Sprite(1275, 120).rotation = 90;
        new target1.Sprite(1275, 280);

        new plankS.Sprite(1710, 700);
        new plankS.Sprite(1840, 700);
        new plankS.Sprite(1775, 590).rotation = 90;
        new target5.Sprite(1775, 750);

        new plankS.Sprite(1690, 480);
        new plankS.Sprite(1860, 480);
        new plankS.Sprite(1775, 370).rotation = 90;
        new target1.Sprite(1775, 530);
    }
}

function draw() {
    //clear();
    background(207, 235, 253, 120);

    if (kb.pressing("down")) {
        cannon.rotationSpeed = 2;
    } else if (kb.pressing("up")) {
        cannon.rotationSpeed = -2;
    } else {
        cannon.rotationSpeed = 0;
    }

    if (cannon.rotation > -10) {
        cannon.rotationSpeed = 0;
        cannon.rotation -= 2;
    } else if (cannon.rotation < -60) {
        cannon.rotationSpeed = 0;
        cannon.rotation += 2;
    }

    lastShot--;
    if (kb.pressed(" ") && lastShot < 1 && !fly) {
        fly = true;
        lastShot = 30;
        cannonball = new projectile.Sprite(cannon.x, cannon.y);
        cannonball.changeAni("fireball");
        cannonball.visible = false;
        var angle = -cannon.rotation;
        var totalForce = 15;
        var yForce = totalForce * Math.sin(angle * Math.PI / 180);
        var xForce = totalForce * Math.cos(angle * Math.PI / 180);
        cannonball.vel.y = -yForce;
        cannonball.vel.x = xForce;
    }
    if (cannonball) {
        if (round(dist(cannonball.x, cannonball.y, cannon.x, cannon.y)) >= 100) {
            cannonball.visible = true;
        }
        if (cannonball.collides(allSprites, cannonballHit)) {
            fly = false;
        }
        if (cannonball.collides(projectile)) {
            cannonball.changeAni("ball");
        }
        if (fly) {
            var cannonballAngle =
                (Math.atan(cannonball.vel.y / cannonball.vel.x) * 180) / Math.PI;
            if (cannonballAngle == cannonballAngle) {
                cannonball.rotation = cannonballAngle;
            }
        }
    }

    if (fly || lastShot > 0) {
        cannonIndicator.changeAni("reloading");
    } else {
        cannonIndicator.changeAni("ready");
    }

    if (gamePause) {
        if (!paused) {
            newShade = new shade.Sprite(1000, 500);
            paused = true;
        }
        world.timeScale = 0;
    } else if (!gamePause) {
        if (paused) {
            newShade.remove();
            paused = false;
        }
        world.timeScale = 1;
    }
}


function cannonballHit(cannonball, obj) {
    cannonball.changeAni("ball");
    if (obj.name == "target1" || obj.name == "target5") {
        if (obj.name == "target1") {
            score++;
        } else {
            score += 5;
        }
        if (score == 12) {
            document.getElementById("scoreImg").src = "imgs/score/score-3.png";
            showToast();
        } else if (score >= 10 || score == 7) {
            document.getElementById("scoreImg").src = "imgs/score/score-2.png";
        } else if (score >= 5 || score == 2) {
            document.getElementById("scoreImg").src = "imgs/score/score-1.png";
        } else {
            document.getElementById("scoreImg").src = "imgs/score/score-0.png";
        }
        obj.remove();
    } else if (obj.name == "plank") {
        obj.remove();
    }
}
