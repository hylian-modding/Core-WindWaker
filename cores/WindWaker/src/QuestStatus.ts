
import { JSONTemplate } from "modloader64_api/JSONTemplate";
import * as API from '../API/Imports';
import { Inventory } from './Inventory';
import { SaveContext } from './SaveContext';
import IMemory from "modloader64_api/IMemory";
import { IModLoaderAPI, ILogger } from "modloader64_api/IModLoaderAPI";

export class QuestStatus extends JSONTemplate implements API.IQuestStatus {
    private emulator: IMemory;
    inventory: Inventory;
    saveContext: API.ISaveContext;

    constructor(emu: IMemory) {
        super();
        this.emulator = emu;
        this.inventory = new Inventory(emu);
        this.saveContext = new SaveContext(emu);
    }

    //Bitfields 
    get_sword(index: number): boolean {
        return this.emulator.rdramReadBit8(0x803C4CBC, index)
    }
    
    get_shield(index: number): boolean {
        return this.emulator.rdramReadBit8(0x803C4CBD, index)
    }

    get_bracelet(index: number): boolean {
        return this.emulator.rdramReadBit8(0x803C4CBE, index)
    }

    get_pirate_charm(index: number): boolean {
        return this.emulator.rdramReadBit8(0x803C4CBF, index)
    }

    get_hero_charm(index: number): boolean {
        return this.emulator.rdramReadBit8(0x803C4CC0, index)
    }

    get_songs(index: number): boolean {
        return this.emulator.rdramReadBit8(0x803C4CC5, index)
    }

    get_triforce(index: number): boolean {
        return this.emulator.rdramReadBit8(0x803C4CC6, index)
    }

    get_pearl(index: number): boolean {
        return this.emulator.rdramReadBit8(0x803C4CC7, index)
    }

    get_owned_charts(index: number): boolean {
        let byte = Math.floor(index / 8)
        let bit = index % 8
        return this.emulator.rdramReadBit8(0x803C4CDC + byte, bit);
    }

    get_opened_charts(index: number): boolean {
        let byte = Math.floor(index / 8)
        let bit = index % 8
        return this.emulator.rdramReadBit8(0x803C4CEC + byte, bit);
    }

    get_completed_charts(index: number): boolean {
        let byte = Math.floor(index / 8)
        let bit = index % 8
        return this.emulator.rdramReadBit8(0x803C4CFC + byte, bit);
    }

    get_sectors(index: number): boolean {
        return this.emulator.rdramReadBit8(0x803C4D0C, index)
    }
    
    get_deciphered_triforce(index: number): boolean {
        return this.emulator.rdramReadBit8(0x803C4D4D, index);
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