
import { JSONTemplate } from "modloader64_api/JSONTemplate";
import * as API from '../API/Imports';
import * as CORE from '../src/Imports';
import { Inventory } from './Inventory';
import IMemory from "modloader64_api/IMemory";
import { QuestStatus } from "./QuestStatus";
import { IModLoaderAPI, ILogger } from "modloader64_api/IModLoaderAPI";
import { IWWCore } from "../API/Imports";
import { SwordsEquipment } from "./SwordsEquipment";
import { ShieldsEquipment } from "./ShieldsEquipment";

export class SaveContext extends JSONTemplate implements API.ISaveContext {
    private emulator: IMemory;
    private core: IWWCore;
    inventory: Inventory;
    questStatus: QuestStatus;
    swords: SwordsEquipment;
    shields: ShieldsEquipment;

    jsonFields: string[] = [
        "inventory",
        "questStatus",
        "swords",
        "shields",
        "eventFlags",
        "regionFlags",
        "liveFlags"
    ];

    constructor(emu: IMemory, core: IWWCore) {
        super();
        this.emulator = emu;
        this.core = core;
        this.inventory = new CORE.Inventory(emu);
        this.questStatus = new CORE.QuestStatus(emu, core);
        this.swords = new SwordsEquipment(emu, core);
        this.shields = new ShieldsEquipment(emu, core);
    }

    get eventFlags(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C522C, 0x100);
    }

    set eventFlags(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C522C, flag);
    }

    get regionFlags(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C4F88, 0x240);
    }

    set regionFlags(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C4F88, flag);
    }

    get liveFlags(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C5380, 0x20);
    }
    set liveFlags(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C5380, flag);
    }
}