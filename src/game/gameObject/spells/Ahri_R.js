import { Circle, Rectangle } from '../../../../libs/quadtree.js';
import AssetManager from '../../../managers/AssetManager.js';
import VectorUtils from '../../../utils/vector.utils.js';
import { PredefinedFilters } from '../../managers/ObjectManager.js';
import Spell from '../Spell.js';
import SpellObject from '../SpellObject.js';
import Dash from '../buffs/Dash.js';
import TrailSystem from '../helpers/TrailSystem.js';

export default class Ahri_R extends Spell {
  image = AssetManager.getAsset('spell_ahri_r');
  name = 'Phi Hồ (Ahri_R)';
  description =
    '<span class="buff">Lướt</span> tới trước theo hướng chỉ định, bắn tối đa 3 quả cầu vào 3 kẻ địch gần nhất trong phạm vi, gây <span class="damage">20 sát thương</span> mỗi quả cầu. Có thể sử dụng tối đa <span>3 lần</span> lướt trong vòng <span class="time">10 giây</span>';
  coolDown = 10000;

  maxDashCount = 3;
  maxDashDistance = 150;
  timeWaitForNextDash = 1000;
  timeoutForAllDashes = 10000;
  rangeToFindEnemies = 150;
  damage = 20;

  dashCount = 0;
  timeSinceFirstDash = 0;
  timeSinceLastDash = 0;

  checkCastCondition() {
    return (
      this.owner.canMove &&
      this.dashCount < this.maxDashCount &&
      (!this.timeSinceLastDash || this.timeSinceLastDash >= this.timeWaitForNextDash)
    );
  }

  onSpellCast() {
    let { from, to } = VectorUtils.getVectorWithMaxRange(
      this.owner.position,
      this.game.worldMouse,
      this.maxDashDistance
    );

    let dashBuff = new Dash(3000, this.owner, this.owner);
    dashBuff.dashDestination = to;
    dashBuff.image = this.image;
    dashBuff.dashSpeed = 10;
    dashBuff.onReachedDestination = () => {
      let enemies = this.game.objectManager.queryObjects({
        area: new Circle({
          x: this.owner.position.x,
          y: this.owner.position.y,
          r: this.rangeToFindEnemies,
        }),
        filters: [PredefinedFilters.canTakeDamageFromTeam(this.owner.teamId)],
      });

      for (let i = 0; i < Math.min(3, enemies.length); i++) {
        let enemy = enemies[i];

        let obj = new Ahri_R_Object(this.owner);
        obj.targetEnemy = enemy;
        obj.damage = this.damage;
        this.game.objectManager.addObject(obj);
      }
    };
    this.owner.addBuff(dashBuff);

    this.dashCount++;
    this.timeSinceLastDash = 0;
    this.currentCooldown = this.timeWaitForNextDash;
  }

  onUpdate() {
    if (this.dashCount > 0) {
      this.timeSinceFirstDash += deltaTime;
      this.timeSinceLastDash += deltaTime;
    }

    if (this.dashCount >= this.maxDashCount || this.timeSinceFirstDash > this.timeoutForAllDashes) {
      this.dashCount = 0;
      this.timeSinceFirstDash = 0;
      this.timeSinceLastDash = 0;
      this.currentCooldown = this.coolDown;
    }
  }
}

export class Ahri_R_Object extends SpellObject {
  isMissile = true;
  position = this.owner.position.copy();
  targetEnemy = null;
  damage = 20;
  speed = 7;
  size = 20;

  trailSystem = new TrailSystem({
    trailColor: [150, 150, 255, 100],
    trailSize: this.size,
  });

  onAdded() {
    this.game.objectManager.addObject(this.trailSystem);
  }

  update() {
    VectorUtils.moveVectorToVector(this.position, this.targetEnemy.position, this.speed);
    this.trailSystem.addTrail(this.position);

    if (p5.Vector.dist(this.position, this.targetEnemy.position) < this.speed) {
      this.targetEnemy.takeDamage(this.damage, this.owner);
      this.toRemove = true;
    }
  }

  draw() {
    push();
    noStroke();
    fill(150, 150, 255);
    circle(this.position.x + random(-3, 3), this.position.y + random(-3, 3), this.size);

    // lightning effect to target, draw random lines to target
    let lightningCount = 10;
    for (let i = 0; i < lightningCount; i++) {}
    pop();
  }

  getDisplayBoundingBox() {
    return new Rectangle({
      x: this.position.x - this.size / 2,
      y: this.position.y - this.size / 2,
      w: this.size,
      h: this.size,
      data: this,
    });
  }
}
