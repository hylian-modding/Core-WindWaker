import IMemory from 'modloader64_api/IMemory';
import { JSONTemplate } from 'modloader64_api/JSONTemplate';
import { ISwords, IWWCore, Sword } from '../API/WWAPI';

export const enum SwordBitMap {
  NONE = 7,
  Hero = 7,
  Master = 6,
  MasterHalf = 5,
  MasterFull = 4,
}

export class SwordsEquipment extends JSONTemplate implements ISwords {
  private emulator: IMemory;
  private core: IWWCore;

  jsonFields: string[] = [
    'swordLevel',
  ];
  constructor(emulator: IMemory, core: IWWCore) {
    super();
    this.emulator = emulator;
    this.core = core;
  }

  get swordLevel(): Sword {
    let bits = this.emulator.rdramReadBits8(0x803C4CBC); //Sword bitfield
    if (bits[SwordBitMap.MasterFull] === 1) {
      return Sword.MasterFull;
    } else if (bits[SwordBitMap.MasterHalf] === 1) {
      return Sword.MasterHalf;
    } else if (bits[SwordBitMap.Master] === 1) {
      return Sword.Master;
    } else if (bits[SwordBitMap.Hero] === 1) {
      return Sword.Hero;
    }
    else {
      return Sword.NONE;
    }
  }

  /*   803C4C16,1 - Currently equipped swor
    38 - Hero's Sword
    39 - Master Sword (Powerless)
    3A - Master Sword (Half Power)
    3E - Master Sword (Full Power) */

  set swordLevel(level: Sword) {
    let bits = this.emulator.rdramReadBits8(0x803C4CBC);
    switch (level) {
      case Sword.NONE:
        bits[SwordBitMap.Hero] = 0;
        bits[SwordBitMap.Master] = 0;
        bits[SwordBitMap.MasterHalf] = 0;
        bits[SwordBitMap.MasterFull] = 0;
        this.emulator.rdramWrite8(0x803C4C16, 0xFF);
        break;
      case Sword.Hero:
        bits[SwordBitMap.Hero] = 1;
        bits[SwordBitMap.Master] = 0;
        bits[SwordBitMap.MasterHalf] = 0;
        bits[SwordBitMap.MasterFull] = 0;
        this.emulator.rdramWrite8(0x803C4C16, 0x38);
        break;
      case Sword.Master:
        bits[SwordBitMap.Hero] = 1;
        bits[SwordBitMap.Master] = 1;
        bits[SwordBitMap.MasterHalf] = 0;
        bits[SwordBitMap.MasterFull] = 0;
        this.emulator.rdramWrite8(0x803C4C16, 0x39);
        break;
      case Sword.MasterHalf:
        bits[SwordBitMap.Hero] = 1;
        bits[SwordBitMap.Master] = 1;
        bits[SwordBitMap.MasterHalf] = 1;
        bits[SwordBitMap.MasterFull] = 0;
        this.emulator.rdramWrite8(0x803C4C16, 0x3A);
        break;
      case Sword.MasterFull:
        bits[SwordBitMap.Hero] = 1;
        bits[SwordBitMap.Master] = 1;
        bits[SwordBitMap.MasterHalf] = 1;
        bits[SwordBitMap.MasterFull] = 1;
        this.emulator.rdramWrite8(0x803C4C16, 0x3E);
        break;
    }
    this.emulator.rdramWriteBits8(0x803C4CBC, bits);
  }

}