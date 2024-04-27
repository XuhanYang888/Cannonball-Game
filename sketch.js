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
    // cart.w = 100;
    // cart.h = 50;
    cart.x = 100;
    cart.y = 850;
    // cart.color = "#7F461B";
    cart.collider = "static";
    cart.img = "cart.png";

    cannon = new Sprite();
    cannon.d = 50;
    cannon.x = 100;
    cannon.y = 800;
    cannon.color = "white";
    cannon.rotation = -1;
    cannon.text = "=====[]";

    projectile = new Group();
    projectile.d = 20;
    projectile.color = "black";
    projectile.friction = 5;
    projectile.mass = 1.5;
    projectile.text = "->";
    projectile.textColor = "white";
    cannonball = new projectile.Sprite(135, 800);
    new GlueJoint(cannon, cannonball);

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
    clear();
    background('#cfebfd');

    cart.text = String(counter) + " " + String(score);

    //cannon movement
    cannon.x = cart.x;
    cannon.y = cart.y - 50;
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

    var cannonballAngle = Math.atan(cannonball.vel.y / cannonball.vel.x) * 180 / Math.PI;
    if (cannonballInAir && cannonballAngle == cannonballAngle) {
        cannonball.rotation = cannonballAngle;
    }
    if (cannonball.collides(allSprites)) {
        cannonballInAir = false;
        cannonball = new projectile.Sprite(135, 800);
        var lastRotation = cannon.rotation;
        cannon.rotation = 1;
        new GlueJoint(cannon, cannonball);
        cannon.rotation = lastRotation;
    }
    if (!cannonballInAir) {
        if (kb.pressed(" ")) {
            counter++;
            cannon.joints[0].remove();
            var angle = -cannon.rotation;
            var ratio = 1 / Math.tan(angle * Math.PI / 180);
            var yForce = (25 - (Math.log(angle) / Math.log(1.6))) / (1 + ratio);
            var xForce = 25 - (Math.log(angle) / Math.log(1.6)) - yForce;
            cannonball.vel.y = -yForce;
            cannonball.vel.x = xForce;
            cannonballInAir = true;
        }
    }
    //break plank
    cannonball.collides(plank, breakPlank);
    //hit target
    cannonball.collides(target, addScore);
}

function breakPlank(cannonball, plank) {
    plank.remove();
}

function addScore(cannonball, target) {
    target.text = target.color;
    if (target.color == "rgba(255,0,0,1)") {
        score++;
    } else {
        score += 5;
    }
    target.remove();
}