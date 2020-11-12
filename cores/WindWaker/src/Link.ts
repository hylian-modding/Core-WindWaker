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


    private sword_addr: number = 0x803C4C16; //0x1
    private shield_addr: number = 0x803C4C17; //0x1
    private strength_addr: number = 0x803C4C18; //0x1

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
}