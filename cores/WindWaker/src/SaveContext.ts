
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
import { StageInfo } from "./StageInfo";

export class SaveContext extends JSONTemplate implements API.ISaveContext {
    private emulator: IMemory;
    private core: IWWCore;
    inventory: Inventory;
    questStatus: QuestStatus;
    swords: SwordsEquipment;
    shields: ShieldsEquipment;

    stage_Live: StageInfo;
    stage0_Sea: StageInfo;
    stage1_SeaAlt: StageInfo;
    stage2_ForsakenFortress: StageInfo;
    stage3_DRC: StageInfo;
    stage4_FW: StageInfo;
    stage5_TOTG: StageInfo;
    stage6_ET: StageInfo;
    stage7_WT: StageInfo;
    stage8_GT: StageInfo;
    stage9_Hyrule: StageInfo;
    stageA_ShipInt: StageInfo;
    stageB_HouseMisc: StageInfo;
    stageC_CaveInt: StageInfo;
    stageD_CaveShip: StageInfo;
    stageE_BlueChu: StageInfo;
    stageF_TestMaps: StageInfo;

    jsonFields: string[] = [
        "inventory",
        "questStatus",
        "swords",
        "shields",
        "eventFlags",
        "stage_Live",
        "stage0_Sea",
        "stage1_SeaAlt",
        "stage2_ForsakenFortress",
        "stage3_DRC",
        "stage4_FW",
        "stage5_TOTG",
        "stage6_ET",
        "stage7_WT",
        "stage8_GT",
        "stage9_Hyrule",
        "stageA_ShipInt",
        "stageB_HouseMisc",
        "stageC_CaveInt",
        "stageD_CaveShip",
        "stageE_BlueChu",
        "stageF_TestMaps",
    ];

    constructor(emu: IMemory, core: IWWCore) {
        super();
        this.emulator = emu;
        this.core = core;
        this.inventory = new CORE.Inventory(emu);
        this.questStatus = new CORE.QuestStatus(emu, core);
        this.swords = new SwordsEquipment(emu, core);
        this.shields = new ShieldsEquipment(emu, core);

        this.stage_Live = new StageInfo(emu, 0x0, 0x803C5380);
        this.stage0_Sea = new StageInfo(emu, 0x0);
        this.stage1_SeaAlt = new StageInfo(emu, 0x1);
        this.stage2_ForsakenFortress = new StageInfo(emu, 0x2);
        this.stage3_DRC = new StageInfo(emu, 0x3);
        this.stage4_FW = new StageInfo(emu, 0x4);
        this.stage5_TOTG = new StageInfo(emu, 0x5);
        this.stage6_ET = new StageInfo(emu, 0x6);
        this.stage7_WT = new StageInfo(emu, 0x7);
        this.stage8_GT = new StageInfo(emu, 0x8);
        this.stage9_Hyrule = new StageInfo(emu, 0x9);
        this.stageA_ShipInt = new StageInfo(emu, 0xA);
        this.stageB_HouseMisc = new StageInfo(emu, 0xB);
        this.stageC_CaveInt = new StageInfo(emu, 0xC);
        this.stageD_CaveShip = new StageInfo(emu, 0xD);
        this.stageE_BlueChu = new StageInfo(emu, 0xE);
        this.stageF_TestMaps = new StageInfo(emu, 0xF);
    }

    get eventFlags(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C522C, 0x100);
    }

    set eventFlags(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C522C, flag);
    }
}