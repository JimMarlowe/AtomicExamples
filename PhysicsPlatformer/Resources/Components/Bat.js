// FIXME
keepAlive = typeof(keepAlive) == "undefined" ? [] : keepAlive;
keepAlive.push(self);

var glmatrix = require("gl-matrix");
var vec2 = glmatrix.vec2;

var node = self.node;

var animationSet = cache.getResource("AnimationSet2D", "Sprites/Bat/Bat.scml");
var sprite = node.createComponent("AnimatedSprite2D");
sprite.setAnimation(animationSet, "Fly");
sprite.setLayer(100);
node.scale2D = [.5, .5];

var cwaypoint = -1;

function update(timestep) {

    var waypoints = TheLevel.batWaypoints;
    var pos = node.position2D;
    
    if (cwaypoint == -1 || vec2.distance(pos, waypoints[cwaypoint]) < .5) {
        cwaypoint = Math.round(Math.random() * (waypoints.length - 1));
        return;
    }


    var dir = vec2.create();
    var goal = waypoints[cwaypoint];

    vec2.subtract(dir, goal, pos);
    vec2.normalize(dir, dir);
    vec2.scale(dir, dir, timestep * 2);

    if (dir[0] < 0)
        sprite.flipX = true;
    else
        sprite.flipX = false;

    vec2.add(pos, pos, dir);
    node.position2D = pos;


}