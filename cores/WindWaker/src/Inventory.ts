import IMemory from 'modloader64_api/IMemory';
import * as API from '../API/Imports';
import { FlagManager } from 'modloader64_api/FlagManager';
import { JSONTemplate } from 'modloader64_api/JSONTemplate';
import { ILogger } from 'modloader64_api/IModLoaderAPI';
import { NONAME } from 'dns';

export class Inventory extends JSONTemplate implements API.IInventory {
    private emulator: IMemory;
    private instance: number = 0x803C4C44;
    private inventory_bitfield_addr: number = 0x803C4C59;
    private spoilsBag: number = 0x803C4C7E;
    private baitBag: number = 0x803C4C86;
    private deliveryBag: number = 0x803C4C8E;

    constructor(emu: IMemory) {
        super();
        this.emulator = emu;
    }

    //Inventory Slots
    get FIELD_TELESCOPE(): number {
        return this.emulator.rdramRead8(this.instance + 0x0);
    }
    set FIELD_TELESCOPE(flag: number) {
        this.emulator.rdramWrite8(this.instance + 0x0, flag);
    }

    get FIELD_SAIL(): number {
        return this.emulator.rdramRead8(this.instance + 0x1);
    }
    set FIELD_SAIL(flag: number) {
        this.emulator.rdramWrite8(this.instance + 0x1, flag);
    }

    get FIELD_WIND_WAKER(): number {
        return this.emulator.rdramRead8(this.instance + 0x2);
    }
    set FIELD_WIND_WAKER(flag: number) {
        this.emulator.rdramWrite8(this.instance + 0x2, flag);
    }

    get FIELD_GRAPPLING_HOOK(): number {
        return this.emulator.rdramRead8(this.instance + 0x3);
    }
    set FIELD_GRAPPLING_HOOK(flag: number) {
        this.emulator.rdramWrite8(this.instance + 0x3, flag);
    }

    get FIELD_SPOILS_BAG(): number {
        return this.emulator.rdramRead8(this.instance + 0x4);
    }
    set FIELD_SPOILS_BAG(flag: number) {
        this.emulator.rdramWrite8(this.instance + 0x4, flag);
    }

    get FIELD_BOOMERANG(): number {
        return this.emulator.rdramRead8(this.instance + 0x5);
    }
    set FIELD_BOOMERANG(flag: number) {
        this.emulator.rdramWrite8(this.instance + 0x5, flag);
    }

    get FIELD_DEKU_LEAF(): number {
        return this.emulator.rdramRead8(this.instance + 0x6);
    }
    set FIELD_DEKU_LEAF(flag: number) {
        this.emulator.rdramWrite8(this.instance + 0x6, flag);
    }

    get FIELD_TINGLE_TUNER(): number {
        return this.emulator.rdramRead8(this.instance + 0x7);
    }
    set FIELD_TINGLE_TUNER(flag: number) {
        this.emulator.rdramWrite8(this.instance + 0x7, flag);
    }

    get FIELD_PICTO_BOX(): number {
        return this.emulator.rdramRead8(this.instance + 0x8);
    }
    set FIELD_PICTO_BOX(flag: number) {
        this.emulator.rdramWrite8(this.instance + 0x8, flag);
    }

    get FIELD_IRON_BOOTS(): number {
        return this.emulator.rdramRead8(this.instance + 0x9);
    }
    set FIELD_IRON_BOOTS(flag: number) {
        this.emulator.rdramWrite8(this.instance + 0x9, flag);
    }

    get FIELD_MAGIC_ARMOR(): number {
        return this.emulator.rdramRead8(this.instance + 0xA);
    }
    set FIELD_MAGIC_ARMOR(flag: number) {
        this.emulator.rdramWrite8(this.instance + 0xA, flag);
    }

    get FIELD_BAIT_BAG(): number {
        return this.emulator.rdramRead8(this.instance + 0xB);
    }
    set FIELD_BAIT_BAG(flag: number) {
        this.emulator.rdramWrite8(this.instance + 0xB, flag);
    }

    get FIELD_BOW(): number {
        return this.emulator.rdramRead8(this.instance + 0xC);
    }
    set FIELD_BOW(flag: number) {
        this.emulator.rdramWrite8(this.instance + 0xC, flag);
    }

    get FIELD_BOMBS(): number {
        return this.emulator.rdramRead8(this.instance + 0xD);
    }
    set FIELD_BOMBS(flag: number) {
        this.emulator.rdramWrite8(this.instance + 0xD, flag);
    }

    get FIELD_BOTTLE1(): number {
        return this.emulator.rdramRead8(this.instance + 0xE);
    }
    set FIELD_BOTTLE1(flag: number) {
        this.emulator.rdramWrite8(this.instance + 0xE, flag);
    }

    get FIELD_BOTTLE2(): number {
        return this.emulator.rdramRead8(this.instance + 0xF);
    }
    set FIELD_BOTTLE2(flag: number) {
        this.emulator.rdramWrite8(this.instance + 0xF, flag);
    }

    get FIELD_BOTTLE3(): number {
        return this.emulator.rdramRead8(this.instance + 0x10);
    }
    set FIELD_BOTTLE3(flag: number) {
        this.emulator.rdramWrite8(this.instance + 0x10, flag);
    }

    get FIELD_BOTTLE4(): number {
        return this.emulator.rdramRead8(this.instance + 0x11);
    }
    set FIELD_BOTTLE4(flag: number) {
        this.emulator.rdramWrite8(this.instance + 0x11, flag);
    }

    get FIELD_DELIVERY_BAG(): number {
        return this.emulator.rdramRead8(this.instance + 0x12);
    }
    set FIELD_DELIVERY_BAG(flag: number) {
        this.emulator.rdramWrite8(this.instance + 0x12, flag);
    }

    get FIELD_HOOKSHOT(): number {
        return this.emulator.rdramRead8(this.instance + 0x13);
    }
    set FIELD_HOOKSHOT(flag: number) {
        this.emulator.rdramWrite8(this.instance + 0x13, flag);
    }

    get FIELD_SKULL_HAMMER(): number {
        return this.emulator.rdramRead8(this.instance + 0x14);
    }
    set FIELD_SKULL_HAMMER(flag: number) {
        this.emulator.rdramWrite8(this.instance + 0x14, flag);
    }

    //Counts
    get arrowCount(): number {
        return this.emulator.rdramRead8(0x803C4C71);
    }
    set arrowCount(flag: number) {
        this.emulator.rdramWrite8(0x803C4C71, flag);
    }

    get bombCount(): number {
        return this.emulator.rdramRead8(0x803C4C72);
    }
    set bombCount(flag: number) {
        this.emulator.rdramWrite8(0x803C4C72, flag);
    }

    get rupeeCount(): number {
        return this.emulator.rdramRead16(0x803C4C0C);
    }
    set rupeeCount(flag: number) {
        this.emulator.rdramWrite16(0x803C4C0C, flag);
    }

    //Capacity
    get arrowCap(): number {
        return this.emulator.rdramRead8(0x803C4C77);
    }
    set arrowCap(flag: number) {
        this.emulator.rdramWrite8(0x803C4C77, flag);
    }

    get bombCap(): number {
        return this.emulator.rdramRead8(0x803C4C78);
    }
    set bombCap(flag: number) {
        this.emulator.rdramWrite8(0x803C4C78, flag);
    }

    get rupeeCap(): number {
        return this.emulator.rdramRead8(0x803C4C1A);
    }
    set rupeeCap(flag: number) {
        this.emulator.rdramWrite8(0x803C4C1A, flag);
    }

    //Bag Content Slots
    get spoils_slots(): Buffer {
        return this.emulator.rdramReadBuffer(this.spoilsBag, 0x8);
    }
    set spoils_slots(flag: Buffer) {
        this.emulator.rdramWriteBuffer(this.spoilsBag, flag);
    }

    get bait_slots(): Buffer {
        return this.emulator.rdramReadBuffer(this.baitBag, 0x8);
    }
    set bait_slots(flag: Buffer) {
        this.emulator.rdramWriteBuffer(this.baitBag, flag);
    }

    get delivery_slots(): Buffer {
        return this.emulator.rdramReadBuffer(this.deliveryBag, 0x8);
    }
    set delivery_slots(flag: Buffer) {
        this.emulator.rdramWriteBuffer(this.deliveryBag, flag);
    }

    //Bitfield of obtained bag content flags
    //TODO: Extrapolate into a function

    get_owned_delivery(index: number): boolean {
        let byte = Math.floor(index / 8)
        let bit = index % 8
        return this.emulator.rdramReadBit8(0x803C4C98 + byte, bit);
    }

    get_owned_spoils(index: number): boolean {
        return this.emulator.rdramReadBit8(0x803C4C9C, index);
    }

    get_owned_bait(index: number): boolean {
        return this.emulator.rdramReadBit8(0x803C4C9D, index)
    }

    get_count_spoils(index: number): boolean {
        let byte = Math.floor(index / 8)
        let bit = index % 8
        return this.emulator.rdramReadBit8(0x803C4CA4 + byte, bit);
    }

    get_count_delivery(index: number): boolean {
        let byte = Math.floor(index / 8)
        let bit = index % 8
        return this.emulator.rdramReadBit8(0x803C4CAC + byte, bit);
    }

    get_count_bait(index: number): boolean {
        let byte = Math.floor(index / 8)
        let bit = index % 8
        return this.emulator.rdramReadBit8(0x803C4CB4 + byte, bit);
    }
}