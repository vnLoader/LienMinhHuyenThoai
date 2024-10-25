// TODO https://leagueoflegends.fandom.com/wiki/Charm

import Buff from '../Buff.js';
import StatusFlags from '../../enums/StatusFlags.js';
import { PredefinedParticleSystems } from '../helpers/ParticleSystem.js';
import AssetManager from '../../../managers/AssetManager.js';
import BuffAddType from '../../enums/BuffAddType.js';
import VectorUtils from '../../../utils/vector.utils.js';

export default class Charm extends Buff {
  image = AssetManager.getAsset('buff_charm');
  name = 'Mê Hoặc';
  buffAddType = BuffAddType.REPLACE_EXISTING;
  statusFlagsToDisable = StatusFlags.CanCast | StatusFlags.CanMove;
  statusFlagsToEnable = StatusFlags.Charmed;

  speed = 1;
  particleSystem = PredefinedParticleSystems.randomMovingParticlesDecreaseSize('#f5429588', 0.1);

  onCreate() {
    this.game.objectManager.addObject(this.particleSystem);
  }

  onUpdate() {
    if (this.sourceUnit?.position && !this.targetUnit.isDead) {
      VectorUtils.moveVectorToVector(
        this.targetUnit.position,
        this.sourceUnit.position,
        this.speed
      );
    }

    // update particle system
    if (random() < 0.2) {
      let range = this.targetUnit.stats.size.value / 2;
      this.particleSystem.addParticle({
        x: this.targetUnit.position.x + random(-range, range),
        y: this.targetUnit.position.y + random(-range, range),
        r: random(5, 15),
      });
    }
    this.particleSystem.update();
  }
}
