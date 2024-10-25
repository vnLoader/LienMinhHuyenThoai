// TODO https://leagueoflegends.fandom.com/wiki/Stun
// https://leagueoflegends.fandom.com/wiki/Root
import AssetManager from '../../../managers/AssetManager.js';
import BuffAddType from '../../enums/BuffAddType.js';
import StatusFlags from '../../enums/StatusFlags.js';
import Buff from '../Buff.js';

// Làm choáng
export default class Stun extends Buff {
  image = AssetManager.getAsset('buff_stun');
  name = 'Choáng';
  buffAddType = BuffAddType.STACKS_AND_CONTINUE;
  maxStacks = 10;
  statusFlagsToEnable = StatusFlags.Stunned;

  draw() {
    // draw buff on target unit
    let pos = this.targetUnit.position;
    let size = this.targetUnit.animatedValues.displaySize;

    push();
    translate(pos.x, pos.y);
    rotate(-frameCount / 15);
    image(AssetManager.getAsset('buff_stun')?.data, 0, 0, size, size);
    pop();
  }
}
