import IMemory from 'modloader64_api/IMemory';
import { JSONTemplate } from 'modloader64_api/JSONTemplate';
import { IShields, IWWCore, Shield } from '../API/WWAPI';

export const enum ShieldBitMap {
  NONE = 7,
  HERO = 7,
  MIRROR = 6,
}

export class ShieldsEquipment extends JSONTemplate implements IShields {
  private emulator: IMemory;
  private core: IWWCore;
  jsonFields: string[] = ['shieldLevel'];
  constructor(emulator: IMemory, core: IWWCore) {
    super();
    this.emulator = emulator;
    this.core = core;
  }

  get shieldLevel(): Shield {
    let bits = this.emulator.rdramReadBits8(0x803C4CBD); //Shield bitfield
    if (bits[ShieldBitMap.MIRROR] === 1) {
      return Shield.MIRROR;
    } else if (bits[ShieldBitMap.HERO] === 1) {
      return Shield.HERO;
    } else {
      return Shield.NONE;
    }
  }

  /*
    803C4C17,1 - Currently equipped shield ID.
      3B - Hero's Shield
      3C - Mirror Shield
    */

  set shieldLevel(level: Shield) {
    let bits = this.emulator.rdramReadBits8(0x803C4CBD);
    switch (level) {
      case Shield.NONE:
        bits[ShieldBitMap.HERO] = 0;
        bits[ShieldBitMap.MIRROR] = 0;
        this.emulator.rdramWrite8(0x803C4C17, 0xFF);
        break;
      case Shield.HERO:
        bits[ShieldBitMap.HERO] = 1;
        bits[ShieldBitMap.MIRROR] = 0;
        this.emulator.rdramWrite8(0x803C4C17, 0x3B);
        break;
      case Shield.MIRROR:
        bits[ShieldBitMap.HERO] = 0;
        bits[ShieldBitMap.MIRROR] = 1;
        this.emulator.rdramWrite8(0x803C4C17, 0x3C);
        break;
    }
    this.emulator.rdramWriteBits8(0x803C4CBD, bits);
  }

}