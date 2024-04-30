let ground, cart, cannon, cannonball, projectile;
let plank, concrete, target, normalTarget, goldTarget;
var counter = 0;
var score = 0;
var cannonballInAir = false;

function setup() {
    new Canvas(1600, 900);
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
    projectile.d = 200;
    projectile.color = "black";
    projectile.friction = 5;
    projectile.mass = 1.5;
    projectile.addAni("fireball", "imgs/fireball/fireball-1.png", 4);
    projectile.addAni("ball", "imgs/ball/ball1.png", 2);
    projectile.scale = 0.15;
    projectile.debug = true;


    cannon = new Sprite();
    cannon.d = 600;
    cannon.x = 150;
    cannon.y = 750;
    cannon.collider = "none";
    cannon.rotation = -1;
    cannon.debug = true;
    cannon.img = "imgs/cannon.png";
    cannon.scale = 0.3;

    target = new Group();
    target.d = 50;

    normalTarget = new target.Group();
    normalTarget.color = "red";
    normalTarget.text = "1 point";
    normalTarget.textColor = "white";

    goldTarget = new target.Group();
    goldTarget.color = "yellow";
    goldTarget.text = "5 points";
    goldTarget.textColor = "black";

    plank = new Group();
    plank.friction = 2.5;
    plank.color = "#7F461B";

    concrete = new Group();
    concrete.friction = 2;
    concrete.color = "#606060";

    ground = new Sprite();
    ground.collider = "static";
    ground.w = 2000;
    ground.h = 50;
    ground.y = 900;
    ground.color = "darkgreen";



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

    if (kb.pressing("down")) {
        cannon.rotationSpeed = 3;
    } else if (kb.pressing("up")) {
        cannon.rotationSpeed = -3;
    } else if (kb.released("up") || kb.released("down")) {
        cannon.rotationSpeed = 0;
    } else {
        cannon.rotationLock = true;
    }

    if (cannon.rotation > -1) {
        cannon.rotationSpeed = 0;
        cannon.rotation -= 2;
    } else if (cannon.rotation < -60) {
        cannon.rotationSpeed = 0;
        cannon.rotation += 2;
    }

    // shoot and reload cannonball
    if (cannonballInAir) {
        var cannonballAngle = Math.atan(cannonball.vel.y / cannonball.vel.x) * 180 / Math.PI;
        if (cannonballAngle == cannonballAngle) {
            cannonball.rotation = cannonballAngle;
        }
        if (cannonball.collides(allSprites)) {
            cannonballInAir = false;
        }
        //break plank
        cannonball.collides(plank, breakPlank);
        //hit target
        cannonball.collides(target, addScore);

        if (round(dist(cannonball.x, cannonball.y, 150, 750)) >= 80) {
            cannonball.visible = true;
        }
        cannonball.changeAni("fireball");
        cannonball.d = 30;
        cannonball.scale = 0.15;
    } else if (!cannonballInAir) {
        if (cannonball){
            cannonball.changeAni("ball");
            cannonball.d = 30;
            cannonball.scale = 0.1;
        }
        if (kb.pressed(" ")) {
            counter++;
            cannonball = new projectile.Sprite(150, 750);
            cannonball.visible = false;
            var angle = -cannon.rotation;
            var ratio = 1 / Math.tan(angle * Math.PI / 180);
            var yForce = (25 - (Math.log(angle) / Math.log(1.6))) / (1 + ratio);
            var xForce = 25 - (Math.log(angle) / Math.log(1.6)) - yForce;
            cannonball.vel.y = -yForce;
            cannonball.vel.x = xForce;
            cannonballInAir = true;
        }
    }
}

function breakPlank(cannonball, plank) {
    plank.remove();
    cannonballInAir = false;
}

function addScore(cannonball, target) {
    cannonballInAir = false;
    target.text = target.color;
    if (target.color == "rgba(255,0,0,1)") {
        score++;
    } else {
        score += 5;
    }
    target.remove();
}