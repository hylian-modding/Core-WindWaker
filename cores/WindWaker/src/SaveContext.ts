
import { JSONTemplate } from "modloader64_api/JSONTemplate";
import * as API from '../API/Imports';
import * as CORE from '../src/Imports';
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
        this.inventory = new CORE.Inventory(emu);
        this.questStatus = new CORE.QuestStatus(emu);
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