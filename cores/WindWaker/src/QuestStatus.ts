
import { JSONTemplate } from "modloader64_api/JSONTemplate";
import * as API from '../API/Imports';
import { Inventory } from './Inventory';
import { SaveContext } from './SaveContext';
import IMemory from "modloader64_api/IMemory";
import { IModLoaderAPI, ILogger } from "modloader64_api/IModLoaderAPI";
import { Flag, FlagManager } from "modloader64_api/FlagManager";
import { ShieldsEquipment } from "./ShieldsEquipment";
import { SwordsEquipment } from "./SwordsEquipment";
import { IWWCore } from "../API/Imports";

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

export class QuestStatus extends JSONTemplate implements API.IQuestStatus {
    private emulator: IMemory;
    private songFlags: FlagManager;
    private songFlagsAddr: number = 0x803C4CC5;
    constructor(emu: IMemory, core: IWWCore) {
        super();
        this.emulator = emu;
        this.songFlags = new FlagManager(emu, this.songFlagsAddr);
    }

    jsonFields: string[] = [
        "hasTunic",
        "braceletEquip",
        "triforce",
        "pearls",
        "max_hp",
        "max_mp",
        "bracelet",
        "pirate_charm",
        "hero_charm",
        "owned_charts",
        "opened_charts",
        "completed_charts",
        "sectors",
        "deciphered_triforce",
        "songs",
        "tingle_statues",
    ];

    get max_hp(): number {
        return this.emulator.rdramRead16(0x803C4C08);
    }
    set max_hp(flag: number) {
        this.emulator.rdramWrite16(0x803C4C08, flag);
    }
    get max_mp(): number {
        return this.emulator.rdramRead8(0x803C4C1B);
    }
    set max_mp(flag: number) {
        this.emulator.rdramWrite8(0x803C4C1B, flag);
    }


    get current_hp(): number {
        return this.emulator.rdramRead16(0x803C4C0A);
    }
    set current_hp(flag: number) {
        this.emulator.rdramWrite16(0x803C4C0A, flag);
    }

    get current_mp(): number {
        return this.emulator.rdramRead8(0x803C4C1C);
    }
    set current_mp(flag: number) {
        this.emulator.rdramWrite8(0x803C4C1C, flag);
    }

    //Bitfields 

    get songs(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C4CC5, 0x1);
    }
    set songs(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C4CC5, flag);
    }

    get hasTunic(): boolean {
        return this.emulator.rdramReadBit8(0x803C5256, 0);
    }
    set hasTunic(flag: boolean) {
        this.emulator.rdramWriteBit8(0x803C5256, 0, flag);
    }

    get bracelet(): number {
        return this.emulator.rdramRead8(0x803C4CBE)
    }

    set bracelet(flag: number) {
        this.emulator.rdramWrite8(0x803C4CBE, flag);
        this.emulator.rdramWrite8(0x803C4C18, 0x28);
    }

    get currentWallet(): number {
        return this.emulator.rdramRead8(0x803C4C1A);
    }
    set currentWallet(flag: number) {
        this.emulator.rdramWrite8(0x803C4C1A, flag);
    }

    get pirate_charm(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C4CBF, 0x1)
    }

    set pirate_charm(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C4CBF, flag)
    }

    get hero_charm(): boolean {
        return this.emulator.rdramReadBit8(0x803C4CC0, 7);
    }

    set hero_charm(flag: boolean) {
        this.emulator.rdramWriteBit8(0x803C4CC0, 7, flag)
    }

    /*
    0 - Wind's Requiem
    1 - Ballad of Gales
    2 - Command Melody
    3 - Earth God's Lyric
    4 - Wind God's Aria
    5 - Song of Passing
    */

    private windsRequiemFlag = new Flag(0x0, 0)
    get windsRequiem(): boolean {
        return this.songFlags.isFlagSet(this.windsRequiemFlag)
    }
    set windsRequiem(bool: boolean) {
        this.songFlags.setFlag(this.windsRequiemFlag, bool);
    }

    private balladGalesFlag = new Flag(0x0, 1)
    get balladGales(): boolean {
        return this.songFlags.isFlagSet(this.balladGalesFlag)
    }
    set balladGales(bool: boolean) {
        this.songFlags.setFlag(this.balladGalesFlag, bool);
    }

    private commandMelodyFlag = new Flag(0x0, 2)
    get commandMelody(): boolean {
        return this.songFlags.isFlagSet(this.commandMelodyFlag)
    }
    set commandMelody(bool: boolean) {
        this.songFlags.setFlag(this.commandMelodyFlag, bool);
    }

    private earthLyricFlag = new Flag(0x0, 3)
    get earthLyric(): boolean {
        return this.songFlags.isFlagSet(this.earthLyricFlag)
    }
    set earthLyric(bool: boolean) {
        this.songFlags.setFlag(this.earthLyricFlag, bool);
    }

    private windAriaFlag = new Flag(0x0, 4)
    get windAria(): boolean {
        return this.songFlags.isFlagSet(this.windAriaFlag)
    }
    set windAria(bool: boolean) {
        this.songFlags.setFlag(this.windAriaFlag, bool);
    }

    private songPassingFlag = new Flag(0x0, 5)
    get songPassing(): boolean {
        return this.songFlags.isFlagSet(this.songPassingFlag)
    }
    set songPassing(bool: boolean) {
        this.songFlags.setFlag(this.songPassingFlag, bool);
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

    get tingle_statues(): Buffer {
        return this.emulator.rdramReadBuffer(0x803c5296, 0x1);
    }
    set tingle_statues(flag: Buffer){
        this.emulator.rdramWriteBuffer(0x803c5296, flag);
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