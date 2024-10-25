import AssetManager from '../../../managers/AssetManager.js';
import BuffAddType from '../../enums/BuffAddType.js';
import Spell from '../Spell.js';
import SpellObject from '../SpellObject.js';
import Slow from '../buffs/Slow.js';
import VectorUtils from '../../../utils/vector.utils.js';
import TrailSystem from '../helpers/TrailSystem.js';
import { Circle, Rectangle } from '../../../../libs/quadtree.js';
import { PredefinedFilters } from '../../managers/ObjectManager.js';

export default class Ashe_W extends Spell {
  image = AssetManager.getAsset('spell_ashe_w');
  name = 'Tán Xạ Tiễn (Ashe_W)';
  description =
    'Bắn ra <span>10 mũi tên</span> theo hình nón. Mỗi mũi tên gây <span class="damage">5 sát thương</span> và <span class="buff">Làm Chậm 75%</span> kẻ địch trúng chiêu trong <span class="time">1.5 giây</span>';
  coolDown = 5000;

  onSpellCast() {
    let mouse = this.game.worldMouse.copy();
    let direction = mouse.sub(this.owner.position).normalize();

    let arrowCount = 15;
    let arrowLength = 500;
    let angle = direction.heading();
    let angleStep = Math.PI / (arrowCount * 2);

    for (let i = 0; i < arrowCount; i++) {
      let _angle = angle - (angleStep * arrowCount) / 2 + angleStep * i;
      let { from, to } = VectorUtils.getVectorWithAngleAndRange(
        this.owner.position,
        _angle,
        arrowLength
      );

      let obj = new Ashe_W_Object(this.owner);
      obj.position = from;
      obj.destination = to;
      obj.direction = p5.Vector.fromAngle(_angle);

      this.game.objectManager.addObject(obj);
    }
  }
}

export class Ashe_W_Object extends SpellObject {
  isMissile = true;
  position = createVector();
  destination = createVector();
  direction = createVector();
  speed = 7;
  size = 10;

  trailSystem = new TrailSystem({
    maxLength: 10,
    trailSize: this.size,
    trailColor: [100, 100, 200, 50],
  });

  onAdded() {
    this.game.objectManager.addObject(this.trailSystem);
  }

  update() {
    VectorUtils.moveVectorToVector(this.position, this.destination, this.speed);
    this.trailSystem.addTrail(this.position);

    if (this.position.dist(this.destination) < this.speed) {
      this.toRemove = true;
      this.trailSystem.toRemove = true;
    }

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
      let slowBuff = new Slow(1500, this.owner, enemy);
      slowBuff.percent = 0.75;
      slowBuff.buffAddType = BuffAddType.RENEW_EXISTING;
      slowBuff.image = AssetManager.getAsset('spell_ashe_w');
      enemy.addBuff(slowBuff);
      enemy.takeDamage(5, this.owner);
      this.toRemove = true;
    }
  }

  draw() {
    let alpha = Math.min(this.position.dist(this.destination), 200) + 50;

    push();
    translate(this.position.x, this.position.y);
    rotate(this.direction.heading());

    noStroke();
    fill(39, 98, 180, alpha);
    rect(-10, -this.size / 2, 25, this.size);

    // draw triangle at head of arrow
    stroke(200, alpha);
    triangle(15, -this.size / 2, 30, 0, 15, this.size / 2);

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
