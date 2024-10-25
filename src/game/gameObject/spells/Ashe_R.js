import { Circle, Rectangle } from '../../../../libs/quadtree.js';
import AssetManager from '../../../managers/AssetManager.js';
import BuffAddType from '../../enums/BuffAddType.js';
import { PredefinedFilters } from '../../managers/ObjectManager.js';
import Spell from '../Spell.js';
import SpellObject from '../SpellObject.js';
import Stun from '../buffs/Stun.js';
import TrailSystem from '../helpers/TrailSystem.js';

export default class Ashe_R extends Spell {
  image = AssetManager.getAsset('spell_ashe_r');
  name = 'Đại Băng Tiễn (Ashe_R)';
  description =
    'Bắn mũi tên băng bay xuyên bản đồ, <span class="buff">Làm Choáng</span> diện rộng những kẻ địch trúng chiêu trong <span class="time">2.5 giây</span> và gây <span class="damage">30 sát thương</span>';
  coolDown = 10000;

  onSpellCast() {
    let direction = p5.Vector.sub(this.game.worldMouse, this.owner.position).normalize();

    let obj = new Ashe_R_Object(this.owner);
    obj.position = this.owner.position.copy();
    obj.direction = direction;
    obj.speed = 10;

    this.game.objectManager.addObject(obj);
  }
}

export class Ashe_R_Object extends SpellObject {
  isMissile = true;
  position = createVector();
  direction = createVector();
  speed = 10;
  size = 35;
  lifeTime = 10000;
  age = 0;

  explodeSize = 250;
  exploding = false;
  explodeLifeTime = 1000;

  trailSystem = new TrailSystem({
    trailSize: this.size / 1.5,
    trailColor: [100, 100, 200, 50],
  });

  onAdded() {
    this.game.objectManager.addObject(this.trailSystem);
  }

  update() {
    this.age += deltaTime;
    if (this.age > this.lifeTime) {
      this.toRemove = true;
    }

    // moving phase
    if (!this.exploding) {
      this.position.add(this.direction.copy().mult(this.speed));
      this.trailSystem.addTrail(this.position);

      // check collide enemy
      let enemies = this.game.objectManager.queryObjects({
        area: new Circle({
          x: this.position.x,
          y: this.position.y,
          r: this.size / 4,
        }),
        filters: [PredefinedFilters.canTakeDamageFromTeam(this.owner.teamId)],
      });

      if (enemies?.length > 0) {
        this.exploding = true;
        this.isMissile = false;
        this.age = this.lifeTime - this.explodeLifeTime; // reset age to display explode animation

        // add buff to enemies
        let enemiesInRange = this.game.objectManager.queryObjects({
          area: new Circle({
            x: this.position.x,
            y: this.position.y,
            r: this.explodeSize / 2,
          }),
          filters: [PredefinedFilters.canTakeDamageFromTeam(this.owner.teamId)],
        });
        enemiesInRange.forEach(p => {
          let stunBuff = new Stun(2500, this.owner, p);
          stunBuff.buffAddType = BuffAddType.RENEW_EXISTING;
          stunBuff.image = AssetManager.getAsset('spell_ashe_r');
          p.addBuff(stunBuff);
          p.takeDamage(30, this.owner);
        });

        this.visionRadius = this.explodeSize;
      }
    }

    // explode phase
    else {
      this.size = lerp(this.size, this.explodeSize, 0.2);
    }
  }

  draw() {
    push();

    // expore
    if (this.exploding) {
      let alpha = Math.min(this.lifeTime - this.age, 150);

      stroke(200, alpha);
      fill(100, 100, 200, alpha);
      circle(this.position.x, this.position.y, this.size);

      fill(200, alpha);
      for (let i = 0; i < 5; i++) {
        let randPos = p5.Vector.random2D().mult(random(this.size / 2));
        circle(this.position.x + randPos.x, this.position.y + randPos.y, random(10, 20));
      }
    }

    // moving
    else {
      translate(this.position.x, this.position.y);
      rotate(this.direction.heading());

      stroke(random(100, 255));
      fill(50, 50, 200);
      rect(-60, -10, 30, 20);
      triangle(
        this._randSize(),
        0,
        -this._randSize(),
        -this._randSize() / 2,
        -this._randSize(),
        this._randSize() / 2
      );
    }
    pop();
  }

  _randSize() {
    return random(this.size / 1.5, this.size * 1.5);
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
