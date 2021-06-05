
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

}