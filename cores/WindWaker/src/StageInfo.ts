
import { JSONTemplate } from "modloader64_api/JSONTemplate";
import * as API from '../API/Imports';
import * as CORE from './Imports';
import IMemory from "modloader64_api/IMemory";
import { IModLoaderAPI, ILogger } from "modloader64_api/IModLoaderAPI";
import { IStageInfo, IWWCore } from "../API/Imports";

export class StageInfo extends JSONTemplate implements IStageInfo {
    private emulator: IMemory;
    private core: IWWCore;
    private stageInfoAddr: number = 0x803C4F88;
    private stageID: number;

    jsonFields: string[] = [
        "chests",
        "switches",
        "items",
        "rooms",
        "keys",
        "map",
        "compass",
        "bigKey",
        "bossKilled",
        "heartTaken",
        "bossIntroWatched",
    ];

    constructor(emu: IMemory, core: IWWCore, stageID: number, instance?: number) {
        super();
        this.emulator = emu;
        this.core = core;
        this.stageID = stageID;
        if (instance !== undefined) {
            this.stageInfoAddr = instance;
        }
    }

    get chests(): Buffer {
        return this.emulator.rdramReadBuffer(this.stageInfoAddr + (0x24 * this.stageID), 0x4);
    }
    set chests(flag: Buffer) {
        this.emulator.rdramWriteBuffer(this.stageInfoAddr + (0x24 * this.stageID), flag);
    }

    get switches(): Buffer {
        return this.emulator.rdramReadBuffer(this.stageInfoAddr + (0x24 * this.stageID) + 0x4, 0x10);
    }
    set switches(flag: Buffer) {
        this.emulator.rdramWriteBuffer(this.stageInfoAddr + (0x24 * this.stageID) + 0x4, flag);
    }

    get items(): Buffer {
        return this.emulator.rdramReadBuffer(this.stageInfoAddr + (0x24 * this.stageID) + 0x14, 0x4);
    }
    set items(flag: Buffer) {
        this.emulator.rdramWriteBuffer(this.stageInfoAddr + (0x24 * this.stageID) + 0x14, flag);
    }

    get rooms(): Buffer {
        return this.emulator.rdramReadBuffer(this.stageInfoAddr + (0x24 * this.stageID) + 0x18, 0x8);
    }
    set rooms(flag: Buffer) {
        this.emulator.rdramWriteBuffer(this.stageInfoAddr + (0x24 * this.stageID) + 0x18, flag);
    }

    get keys(): number {
        return this.emulator.rdramRead8(this.stageInfoAddr + (0x24 * this.stageID) + 0x20);
    }
    set keys(flag: number) {
        console.log((this.stageInfoAddr + (0x24 * this.stageID) + 0x20).toString(16));
        this.emulator.rdramWrite8(this.stageInfoAddr + (0x24 * this.stageID) + 0x20, flag);
    }

    get map(): boolean {
        let bit = this.emulator.rdramReadBit8(this.stageInfoAddr + (0x24 * this.stageID) + 0x21, 7);
        return bit;
    }
    set map(flag: boolean) {
        console.log((this.stageInfoAddr + (0x24 * this.stageID) + 0x21).toString(16))
        this.emulator.rdramWriteBit8(this.stageInfoAddr + (0x24 * this.stageID) + 0x21, 7, flag);
    }

    get compass(): boolean {
        let bit = this.emulator.rdramReadBit8(this.stageInfoAddr + (0x24 * this.stageID) + 0x21, 6);
        return bit;
    }
    set compass(flag: boolean) {
        console.log((this.stageInfoAddr + (0x24 * this.stageID) + 0x21).toString(16));
        this.emulator.rdramWriteBit8(this.stageInfoAddr + (0x24 * this.stageID) + 0x21, 6, flag);
    }

    get bigKey(): boolean {
        let bit = this.emulator.rdramReadBit8(this.stageInfoAddr + (0x24 * this.stageID) + 0x21, 5);
        return bit;
    }
    set bigKey(flag: boolean) {
        this.emulator.rdramWriteBit8(this.stageInfoAddr + (0x24 * this.stageID) + 0x21, 5, flag);
    }

    get bossKilled(): boolean {
        let bit = this.emulator.rdramReadBit8(this.stageInfoAddr + (0x24 * this.stageID) + 0x21, 4);
        return bit;
    }
    set bossKilled(flag: boolean) {
        this.emulator.rdramWriteBit8(this.stageInfoAddr + (0x24 * this.stageID) + 0x21, 4, flag);
    }

    get heartTaken(): boolean {
        let bit = this.emulator.rdramReadBit8(this.stageInfoAddr + (0x24 * this.stageID) + 0x21, 3);
        return bit;
    }
    set heartTaken(flag: boolean) {
        this.emulator.rdramWriteBit8(this.stageInfoAddr + (0x24 * this.stageID) + 0x21, 3, flag);
    }

    get bossIntroWatched(): boolean {
        let bit = this.emulator.rdramReadBit8(this.stageInfoAddr + (0x24 * this.stageID) + 0x21, 2);
        return bit;
    }
    set bossIntroWatched(flag: boolean) {
        this.emulator.rdramWriteBit8(this.stageInfoAddr + (0x24 * this.stageID) + 0x21, 2, flag);
    }
}