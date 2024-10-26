import AssetManager from '../../../managers/AssetManager.js';
import Spell from '../Spell.js';
import SpellObject from '../SpellObject.js';
import RootBuff from '../buffs/Root.js';
import VectorUtils from '../../../utils/vector.utils.js';
import { Circle, Rectangle } from '../../../../libs/quadtree.js';
import { PredefinedFilters } from '../../managers/ObjectManager.js';

export default class Leblanc_E extends Spell {
  image = AssetManager.getAsset('spell_leblanc_e');
  name = 'Sợi Xích Siêu Phàm (Leblanc_E)';
  description =
    'Phóng 1 sợi xích theo hướng chỉ định, gây <span class="damage">15 sát thương</span> khi trúng địch. Nếu giữ được trong tầm sau <span class="time">1.5 giây</span>, <span class="buff">Trói Chân</span> địch trong <span class="time">1.5 giây</span> và gây thêm <span class="damage">15 sát thương</span>';
  coolDown = 5000;

  spellObject = null;

  checkCastCondition() {
    return !this.spellObject;
  }

  onSpellCast() {
    const range = 400,
      stunTime = 1500,
      hitDamage = 15,
      stunDamage = 15,
      stunAfter = 1500,
      speed = 10,
      size = 25;

    let { from, to: destination } = VectorUtils.getVectorWithRange(
      this.owner.position,
      this.game.worldMouse,
      range
    );

    let obj = new Leblanc_E_Object(this.owner);
    obj.destination = destination;
    obj.stunTime = stunTime;
    obj.hitDamage = hitDamage;
    obj.stunDamage = stunDamage;
    obj.stunAfter = stunAfter;
    obj.speed = speed;
    obj.range = range;
    obj.size = size;
    this.spellObject = obj;

    this.game.objectManager.addObject(obj);
  }

  onUpdate() {
    if (this.spellObject && this.spellObject.toRemove) {
      this.spellObject = null;
    }
  }
}

export class Leblanc_E_Object extends SpellObject {
  isMissile = true;
  position = this.owner.position.copy();
  destination = this.owner.position.copy();
  speed = 10;
  size = 25;

  range = 500;
  hitDamage = 15;
  stunDamage = 15;
  stunTime = 1500;
  stunAfter = 2500;
  enemyHit = null;
  timeSinceHit = 0;

  movingCirclePercent = 0;

  static PHASES = {
    MOVING: 0,
    WAITING_FOR_STUN: 1,
  };
  phase = Leblanc_E_Object.PHASES.MOVING;

  update() {
    // moving phase
    if (this.phase == Leblanc_E_Object.PHASES.MOVING) {
      VectorUtils.moveVectorToVector(this.position, this.destination, this.speed);

      // remove if reach destination but not hit enemy
      if (this.destination.dist(this.position) <= this.speed) {
        this.toRemove = true;
      }

      // check collide enemy
      let enemies = this.game.objectManager.queryObjects({
        area: new Circle({
          x: this.position.x,
          y: this.position.y,
          r: this.size / 2,
        }),
        filters: [PredefinedFilters.canTakeDamageFromTeam(this.owner.teamId)],
      });
      let enemy = enemies?.[0];
      if (enemy) {
        this.enemyHit = enemy;
        this.enemyHit.takeDamage(this.hitDamage, this.owner);
        this.isMissile = false; // cant be blocked after hit enemy
        this.phase = Leblanc_E_Object.PHASES.WAITING_FOR_STUN;
      }
    }

    // wait for stun phase
    else if (this.phase == Leblanc_E_Object.PHASES.WAITING_FOR_STUN) {
      this.timeSinceHit += deltaTime;
      this.position = this.enemyHit.position.copy().add(random(-5, 5), random(-5, 5));

      this.movingCirclePercent += this.timeSinceHit / 150;
      if (this.movingCirclePercent > 100) {
        this.movingCirclePercent = 0;
      }

      // remove if enemy dead
      if (this.enemyHit.isDead) {
        this.toRemove = true;
      }

      // stun enemy after stunAfter
      else if (this.timeSinceHit >= this.stunAfter) {
        if (this.enemyHit) {
          let rootBuff = new RootBuff(this.stunTime, this.owner, this.enemyHit);
          rootBuff.image = AssetManager.getAsset('spell_leblanc_e');
          rootBuff.effectColor = [255, 255, 0];
          this.enemyHit.addBuff(rootBuff);
          this.enemyHit.takeDamage(this.stunDamage, this.owner);
        }

        this.toRemove = true;
      }

      // remove if enemy out of range
      else {
        let distance = this.position.dist(this.owner.position);
        if (distance > this.range) {
          this.toRemove = true;
        }
      }
    }
  }

  draw() {
    push();

    let alpha = this.enemyHit
      ? 255
      : Math.max(map(this.owner.position.dist(this.position), 0, this.range, 255, 50), 50);

    stroke(200, 200, 40, alpha);
    strokeWeight(4 + this.timeSinceHit / 200);
    line(this.owner.position.x, this.owner.position.y, this.position.x, this.position.y);

    // phase moving
    if (this.phase == Leblanc_E_Object.PHASES.MOVING) {
      noStroke();
      fill(200, 200, 40);
      circle(this.position.x, this.position.y, this.size);
    }

    // phase wait for stun
    else if (this.enemyHit) {
      let a = map(this.timeSinceHit, 0, this.stunAfter, 50, 255);
      stroke(200, 200, 40, a);
      noFill();
      circle(
        this.enemyHit.position.x,
        this.enemyHit.position.y,
        this.enemyHit.stats.size.value + random(10)
      );

      // draw circle that on the line from owner to enemy, and at position based on movingCirclePercent
      let distance = this.owner.position.dist(this.enemyHit.position);
      let direction = this.enemyHit.position.copy().sub(this.owner.position).normalize();
      let position = this.owner.position
        .copy()
        .add(direction.mult((distance * this.movingCirclePercent) / 100));

      noStroke();
      fill(200, 200, 40);
      translate(position.x, position.y);
      rotate(direction.heading());
      ellipse(0, 0, this.size + 15, this.size);
    }
    pop();
  }

  getDisplayBoundingBox() {
    // get boundary including owner position
    return new Rectangle({
      x: Math.min(this.position.x, this.owner.position.x) - this.size / 2,
      y: Math.min(this.position.y, this.owner.position.y) - this.size / 2,
      w: Math.abs(this.position.x - this.owner.position.x) + this.size,
      h: Math.abs(this.position.y - this.owner.position.y) + this.size,
      data: this,
    });
  }
}
