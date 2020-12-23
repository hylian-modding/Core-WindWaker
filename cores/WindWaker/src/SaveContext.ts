
import { JSONTemplate } from "modloader64_api/JSONTemplate";
import * as API from '../API/Imports';
import { Inventory } from './Inventory';
import IMemory from "modloader64_api/IMemory";
import { QuestStatus } from "./QuestStatus";
import { IModLoaderAPI, ILogger } from "modloader64_api/IModLoaderAPI";

export class SaveContext extends JSONTemplate implements API.ISaveContext {
    private emulator: IMemory;
    inventory: Inventory;
    questStatus: QuestStatus;

    constructor(emu: IMemory) {
        super();
        this.emulator = emu;
        this.inventory = new Inventory(emu);
        this.questStatus = new QuestStatus(emu);
    }

    get sword(): number {
        return this.emulator.rdramRead8(0x803C4C16);
    }
    set sword(flag: number) {
        this.emulator.rdramWrite8(0x803C4C16, flag);
    }

    get shield(): number {
        return this.emulator.rdramRead8(0x803C4C17);
    }
    set shield(flag: number) {
        this.emulator.rdramWrite8(0x803C4C17, flag);
    }

    get strength(): number {
        return this.emulator.rdramRead8(0x803C4C18);
    }
    set strength(flag: number) {
        this.emulator.rdramWrite8(0x803C4C18, flag);
    }

    get max_hp(): number {
        return this.emulator.rdramRead16(0x803C4C08);
    }
    set max_hp(flag: number) {
        this.emulator.rdramWrite16(0x803C4C08, flag);
    }

    get current_hp(): number {
        return this.emulator.rdramRead16(0x803C4C0A);
    }
    set current_hp(flag: number) {
        this.emulator.rdramWrite16(0x803C4C0A, flag);
    }

    get max_mp(): number {
        return this.emulator.rdramRead8(0x803C4C1B);
    }
    set max_mp(flag: number) {
        this.emulator.rdramWrite16(0x803C4C1B, flag);
    }

    get current_mp(): number {
        return this.emulator.rdramRead8(0x803C4C1C);
    }
    set current_mp(flag: number) {
        this.emulator.rdramWrite8(0x803C4C1C, flag);
    }
}