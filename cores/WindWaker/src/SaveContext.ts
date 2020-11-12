
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

}