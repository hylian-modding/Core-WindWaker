import IMemory from 'modloader64_api/IMemory';
import * as API from '../API/Imports'
import { JSONTemplate } from 'modloader64_api/JSONTemplate';
import { IModLoaderAPI } from 'modloader64_api/IModLoaderAPI';

export class Link extends JSONTemplate implements API.ILink {
    private emulator: IMemory;


    private state_addr: number = 0x0;

    private pos_addr: number = 0x803E440C; //0x4
    private rotYaw_addr: number = 0x803F6F1A; //0x2
    private rotRoll_addr: number = 0x803F6F1C; //0x2
    private rotPitch_addr: number = 0x803F6F28; //0x2

    //ABC4FC might be anim data 
    private sound_addr: number = 0x0;
    private anim_data_addr = 0x0;
    private anim_raw_data_addr = 0x0;

    /*
    803CA8D0,4 - First bitfield of player statuses (PlayerStatus0).
    00010000 - Player is riding the ship. (Checked at 80120484)
    00100000 - Player is swimming.
    803CA8D4,4 - Second bitfield of player statuses (PlayerStatus1).
    00000400 - In ship while it is sailing.
  */
    constructor(emu: IMemory) {
        super();
        this.emulator = emu;
    }

    get pos(): number {
      return this.emulator.rdramRead32(0x803E440C);
    }
    get rotYaw(): number {
      return this.emulator.rdramRead32(0x803F6F1A);
    }
    get rotRoll(): number {
      return this.emulator.rdramRead32(0x803F6F1C);
    }
    get rotPitch(): number {
      return this.emulator.rdramRead32(0x803F6F28);
    }


}