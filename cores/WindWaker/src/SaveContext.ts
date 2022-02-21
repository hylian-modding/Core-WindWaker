
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
        "shields"
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
    

}