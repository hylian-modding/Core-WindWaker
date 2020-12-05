
import { JSONTemplate } from "modloader64_api/JSONTemplate";
import * as API from '../API/Imports';
import { Inventory } from './Inventory';
import IMemory from "modloader64_api/IMemory";
import { QuestStatus } from "./QuestStatus";
import { IModLoaderAPI, ILogger } from "modloader64_api/IModLoaderAPI";

export class SaveContext extends JSONTemplate implements API.ISaveContext {
    private emulator: IMemory;
    inventory: Inventory;
    questStatus: API.IQuestStatus;

    constructor(emu: IMemory) {
        super();
        this.emulator = emu;
        this.inventory = new Inventory(emu);
        this.questStatus = new QuestStatus(emu);
    }

    get sword(): number {
        return this.emulator.rdramRead8(0x803C4C16);
    }

    get shield(): number {
        return this.emulator.rdramRead8(0x803C4C17);
    }

    get strength(): number {
        return this.emulator.rdramRead8(0x803C4C18);
    }

    get wallet(): number {
        return this.emulator.rdramRead8(0x803C4C1A);
    }

    get max_hp(): number {
        return this.emulator.rdramRead16(0x803C4C08);
    }

    get current_hp(): number {
        return this.emulator.rdramRead16(0x803C4C0A);
    }

    get max_mp(): number {
        return this.emulator.rdramRead8(0x803C4C1B);
    }

    get current_mp(): number {
        return this.emulator.rdramRead8(0x803C4C1C);
    }
}