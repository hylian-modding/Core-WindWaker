
import { JSONTemplate } from "modloader64_api/JSONTemplate";
import * as API from '../API/Imports';
import { Inventory } from './Inventory';
import { SaveContext } from './SaveContext';
import IMemory from "modloader64_api/IMemory";
import { IModLoaderAPI, ILogger } from "modloader64_api/IModLoaderAPI";
import { Flag, FlagManager } from "modloader64_api/FlagManager";

export const enum ShieldBitMap {
    HEROES = 0,
    MIRROR = 1
}
export const enum SwordBitMap {
    HerosSword = 0,
    MasterSword = 1,
    MasterSwordHalf = 2,
    MasterSwordFull = 3,
}

export class QuestStatus extends JSONTemplate implements API.IQuestStatus, API.ISwords, API.IShields {
    private emulator: IMemory;
    private triforceFlags: FlagManager;
    private triforceFlagsAddr: number = 0x803C4CC6;
    private songFlags: FlagManager;
    private songFlagsAddr: number = 0x803C4CC5;
    private pearlFlags: FlagManager;
    private pearlFlagAddr: number = 0x803C4CC7;

    constructor(emu: IMemory) {
        super();
        this.emulator = emu;
        this.triforceFlags = new FlagManager(emu, this.triforceFlagsAddr);
        this.songFlags = new FlagManager(emu, this.songFlagsAddr);
        this.pearlFlags = new FlagManager(emu, this.pearlFlagAddr);
    }

    //Bitfields 
    get swordLevel(): API.Sword {
        let bits = this.emulator.rdramReadBits8(0x803C4CBC);
        if (bits[SwordBitMap.HerosSword] === 1) return API.Sword.Hero;
        else if (bits[SwordBitMap.MasterSword] === 1) return API.Sword.Master;
        else if (bits[SwordBitMap.MasterSwordHalf] === 1) return API.Sword.MasterHalf;
        else if (bits[SwordBitMap.MasterSwordFull] === 1) return API.Sword.MasterFull;
        return 0;
    }

    set swordLevel(level: API.Sword) {
        let bits = this.emulator.rdramReadBits8(0x803C4CBC);
        switch (level) {
            case API.Sword.NONE:
                bits[SwordBitMap.HerosSword] = 0;
                bits[SwordBitMap.MasterSword] = 0;
                bits[SwordBitMap.MasterSwordHalf] = 0;
                bits[SwordBitMap.MasterSwordFull] = 0;
                break;
            case API.Sword.Hero:
                bits[SwordBitMap.HerosSword] = 1;
                bits[SwordBitMap.MasterSword] = 0;
                bits[SwordBitMap.MasterSwordHalf] = 0;
                bits[SwordBitMap.MasterSwordFull] = 0;
                break;
            case API.Sword.Master:
                bits[SwordBitMap.HerosSword] = 0;
                bits[SwordBitMap.MasterSword] = 1;
                bits[SwordBitMap.MasterSwordHalf] = 0;
                bits[SwordBitMap.MasterSwordFull] = 0;
                break;
            case API.Sword.MasterHalf:
                bits[SwordBitMap.HerosSword] = 0;
                bits[SwordBitMap.MasterSword] = 0;
                bits[SwordBitMap.MasterSwordHalf] = 1;
                bits[SwordBitMap.MasterSwordFull] = 0;
                break;
            case API.Sword.MasterFull:
                bits[SwordBitMap.HerosSword] = 0;
                bits[SwordBitMap.MasterSword] = 0;
                bits[SwordBitMap.MasterSwordHalf] = 0;
                bits[SwordBitMap.MasterSwordFull] = 1;
                break;
        }
        this.emulator.rdramWriteBits8(0x803C4CBC, bits);
    }

    get shieldLevel(): API.Shield {
        let bits = this.emulator.rdramReadBits8(0x803C4CBC);
        if (bits[ShieldBitMap.HEROES] === 1) return API.Shield.HERO;
        else if (bits[ShieldBitMap.MIRROR] === 1) return API.Shield.MIRROR;
        return 0;
    }

    set shieldLevel(level: API.Shield) {
        let bits = this.emulator.rdramReadBits8(0x803C4CBD);
        switch (level) {
            case API.Shield.NONE:
                bits[ShieldBitMap.HEROES] = 0;
                bits[ShieldBitMap.MIRROR] = 0;
                break;
            case API.Shield.HERO:
                bits[ShieldBitMap.HEROES] = 1;
                bits[ShieldBitMap.MIRROR] = 0;
                break;
            case API.Shield.MIRROR:
                bits[ShieldBitMap.HEROES] = 0;
                bits[ShieldBitMap.MIRROR] = 1;
                break;
        }
        this.emulator.rdramWriteBits8(0x803C4CBD, bits);
    }

    get bracelet(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C4CBE, 0)
    }

    set bracelet(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C4CBE, flag)
    }

    get pirate_charm(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C4CBF, 0)
    }

    set pirate_charm(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C4CBF, flag)
    }

    get hero_charm(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C4CC0, 0)
    }

    set hero_charm(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C4CC0, flag)
    }

    /*
    0 - Wind's Requiem
    1 - Ballad of Gales
    2 - Command Melody
    3 - Earth God's Lyric
    4 - Wind God's Aria
    5 - Song of Passing
    */

    get songs(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C4CC5, 0x1);
    }
    set songs(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C4CC5, flag);
    }

    get triforce(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C4CC6, 0x1);
    }
    set triforce(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C4CC6, flag);
    }

    /*    803C4CC7,1 - Bitfield of which pearls you own ("symbols").
    0 - Nayru's Pearl
    1 - Din's Pearl
    2 - Farore's Pearl*/

    get pearls(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C4CC7, 0x1);
    }
    set pearls(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C4CC7, flag);
    }

    get owned_charts(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C4CDC, 0xF);
    }
    set owned_charts(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C4CDC, flag);
    }

    get opened_charts(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C4CEC, 0xF);
    }
    set opened_charts(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C4CEC, flag);
    }

    get completed_charts(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C4CFC, 0xF);
    }
    set completed_charts(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C4CFC, flag);
    }

    get sectors(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C4D0C, 0x30);
    }
    set sectors(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C4D0C, flag);
    }

    get deciphered_triforce(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C4D4D, 0x1);
    }
    set deciphered_triforce(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C4D4D, flag);
    }
    
    /*
    803C4CBC-803C4CC8 - Bitfield of which items you own.
    803C4CBC,1 - Bitfield of which swords you own.
    0 - Hero's Sword
    1 - Master Sword (Powerless)
    2 - Master Sword (Half power)
    3 - Master Sword (Full power)
    803C4CBD,1 - Bitfield of which shields you own.
    0 - Hero's Shield
    1 - Mirror Shield
    803C4CBE,1 - Whether you own the Power Bracelets or not. 0 or 1.
    803C4CBF,1 - Whether you have the Pirate's Charm or not. Bitfield.
    0 - Pirate's Charm
    1 - Have read the Pirate's Charm description in the pause menu.
    803C4CC0,1 - Whether you have the Hero's Charm or not. Bitfield.
    0 - Hero's Charm
    803C4CC5,1 - Bitfield of which songs you've learned.
    0 - Wind's Requiem
    1 - Ballad of Gales
    2 - Command Melody
    3 - Earth God's Lyric
    4 - Wind God's Aria
    5 - Song of Passing
    803C4CC6,1 - Bitfield of which Triforce shards you own.
    803C4CC7,1 - Bitfield of which pearls you own ("symbols").
    0 - Nayru's Pearl
    1 - Din's Pearl
    2 - Farore's Pearl

    803C4CDC-803C4CEB - Bitfield of charts you own.
    803C4CEC-803C4CFB - Bitfield of charts you've opened up.
    803C4CFC-803C4D0B - Bitfield of charts you've completed (got the treasure they point you to).
    The treasure chart indexes that are used are every number from 00-32, except 22 and 23 (0x31/0d49 charts in total).
    Indexes 0-7 are the Triforce charts.
    You can get all 49 treasure charts by setting 803C4CDC to FFFFFFFF and 803C4CE0 to 0007FFF3.

    803C4D0C-803C4D3C - List of which sectors you've visited/got mapped out.
    Each sector is a byte.
    The byte is a bitfield.
        0 - Whether you've gotten this sector mapped out by a fishman.
        1 - Whether you've visited this sector or not.

    803C4D4D - Bitfield of what Triforce charts you've gotten deciphered.
*/
}