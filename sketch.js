let ground, cart, cannon, cannonball, projectile;
let plank, concrete, target, normalTarget, goldTarget;
let shade, newShade;
var counter = 0;
var score = 0;
var lastShot = 0;
var fly = false;
var paused = false;

function setup() {
    new Canvas(2000, 1000);
    world.gravity.y = 9.80665;
    p5play.renderStats = true;

    cart = new Sprite();
    cart.w = 500;
    cart.h = 250;
    cart.x = 150;
    cart.y = 825;
    cart.collider = "static";
    cart.img = "imgs/cart.png";
    cart.scale = 0.4;
    cart.debug = true;

    projectile = new Group();
    projectile.d = 40;
    projectile.friction = 1;
    projectile.mass = 3;
    projectile.addAni("fireball", "imgs/fireball/fireball1.png", 4);
    projectile.addAni("ball", "imgs/ball.png");
    projectile.debug = true;

    cannon = new Sprite();
    cannon.d = 600;
    cannon.x = 150;
    cannon.y = 750;
    cannon.collider = "none";
    cannon.rotation = -10;
    cannon.debug = true;
    cannon.img = "imgs/cannon.png";
    cannon.scale = 0.3;

    target = new Group();
    target.d = 50;
    target.name = "target";

    normalTarget = new target.Group();
    normalTarget.color = "red";
    normalTarget.text = "1 point";
    normalTarget.textColor = "white";

    goldTarget = new target.Group();
    goldTarget.color = "yellow";
    goldTarget.text = "5 points";
    goldTarget.textColor = "black";

    plank = new Group();
    plank.mass = 10;
    plank.name = "plank";
    plank.color = "#7F461B";

    concrete = new Group();
    concrete.mass = 30;
    concrete.color = "#606060";

    ground = new Sprite();
    ground.collider = "static";
    ground.w = 2000;
    ground.h = 50;
    ground.y = 900;
    ground.color = "darkgreen";

    //pause screen
    shade = new Group();
    shade.w = 2000;
    shade.h = 1000;
    shade.collider = "none";
    shade.img = "imgs/pause.png";
    shade.opacity = 0.7;

    //build scene
    new concrete.Sprite(800, 825, 20, 100);
    new concrete.Sprite(900, 825, 20, 100);
    new plank.Sprite(850, 765, 120, 20);
    new plank.Sprite(800, 705, 20, 100);
    new plank.Sprite(900, 705, 20, 100);

    new concrete.Sprite(1100, 825, 20, 100);
    new concrete.Sprite(1200, 825, 20, 100);
    new concrete.Sprite(1150, 765, 120, 20);
    new plank.Sprite(1100, 705, 20, 100);
    new plank.Sprite(1200, 705, 20, 100);

    new plank.Sprite(1000, 645, 420, 20);

    new normalTarget.Sprite(850, 875);
    new goldTarget.Sprite(1150, 875);
    new normalTarget.Sprite(850, 730);
    new normalTarget.Sprite(1150, 730);
    new goldTarget.Sprite(1000, 610);

}

function draw() {
    //clear();
    background(207, 235, 253, 120);

    cart.text = String(counter) + " " + String(score);

    cannon.text = fly ? "unable to shoot" : "able to shoot";

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
    if (kb.pressed(" ") && lastShot < 1 && counter < 10 && !fly) {
        fly = true;
        lastShot = 30;
        counter++;
        cannonball = new projectile.Sprite(150, 750);
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
        if (round(dist(cannonball.x, cannonball.y, 150, 750)) >= 80) {
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
    if (obj.name == "target") {
        if (obj.color == "rgba(255,0,0,1)") {
            score++;
        } else {
            score += 5;
        }
        obj.remove();
    } else if (obj.name == "plank") {
        obj.remove();
    }
}
