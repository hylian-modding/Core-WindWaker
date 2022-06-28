
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
    private eventMngrAddr = 0x803C9ED4;
    private dSv_info_c_addr = 0x803C4C08; //803C522C
    private dSv_memory_c_save_addr = this.dSv_info_c_addr + 0x380;
    private dSv_event_c_save_addr = this.dSv_info_c_addr + 0x624;
    private dSv_memory_c_addr = this.dSv_info_c_addr + 0x778;
    private dSv_danBit_c_addr = this.dSv_info_c_addr + 0x79C;
    private dSv_zone_c_addr = this.dSv_info_c_addr + 0x7A8;
    private dSv_event_c_addr = this.dSv_info_c_addr + 0x1158;

    inventory: Inventory;
    questStatus: QuestStatus;
    swords: SwordsEquipment;
    shields: ShieldsEquipment;

    jsonFields: string[] = [
        "inventory",
        "questStatus",
        "swords",
        "shields",
        "dSv_event_c_save",
        "dSv_event_c",
        "dSv_memory_c_save",
        "dSv_memory_c",
        "dSv_zone_c_actor",
        "dSv_zone_c_zoneBit"
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
    // Event flags in real time?
    get dSv_event_c_save(): Buffer {
        return this.emulator.rdramReadBuffer(this.dSv_event_c_save_addr, 0x100);
    }
    
    set dSv_event_c_save(flag: Buffer) {
        this.emulator.rdramWriteBuffer(this.dSv_event_c_save_addr, flag);
    }
    // Event flags in save game?
    get dSv_event_c(): Buffer {
        return this.emulator.rdramReadBuffer(this.dSv_event_c_addr, 0x100);
    }

    set dSv_event_c(flag: Buffer) {
        this.emulator.rdramWriteBuffer(this.dSv_event_c_addr, flag);
    }

    // Scene flags in savegame?
    get dSv_memory_c_save(): Buffer {
        return this.emulator.rdramReadBuffer(this.dSv_memory_c_save_addr, 0x240);
    }
    set dSv_memory_c_save(flag: Buffer) {
        this.emulator.rdramWriteBuffer(this.dSv_memory_c_save_addr, flag);
    }

    // Current scene flags?
    get dSv_memory_c(): Buffer {
        return this.emulator.rdramReadBuffer(this.dSv_memory_c_addr, 0x24);
    }
    set dSv_memory_c(flag: Buffer) {
        this.emulator.rdramWriteBuffer(this.dSv_memory_c_addr, flag);
    }

    // More scene flags?
    get dSv_zone_c_actor(): Buffer {
        return this.emulator.rdramReadBuffer(this.dSv_zone_c_addr + 0xC, 0x40);
    }
    set dSv_zone_c_actor(flag: Buffer) {
        this.emulator.rdramWriteBuffer(this.dSv_zone_c_addr + 0xC, flag);
    }

    get dSv_zone_c_zoneBit(): Buffer {
        return this.emulator.rdramReadBuffer(this.dSv_zone_c_addr + 0x2, 0x8);
    }
    set dSv_zone_c_zoneBit(flag: Buffer) {
        this.emulator.rdramWriteBuffer(this.dSv_zone_c_addr + 0x2, flag);
    }

/*     get eventMngrFlags(): Buffer {
        return this.emulator.rdramReadBuffer(this.eventMngrAddr + 0x3C, 0x500);
    }
    set eventMngrFlags(flag: Buffer) {
        this.emulator.rdramWriteBuffer(this.eventMngrAddr + 0x3C, flag);
    } */

}