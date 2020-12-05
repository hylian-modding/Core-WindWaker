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

    //TODO: Make setters

    //Inventory Slots
    get FIELD_TELESCOPE(): number {
        return this.emulator.rdramRead8(this.instance + 0x0);
    }
    get FIELD_SAIL(): number {
        return this.emulator.rdramRead8(this.instance + 0x1);
    }
    get FIELD_WIND_WAKER(): number {
        return this.emulator.rdramRead8(this.instance + 0x2);
    }
    get FIELD_GRAPPLING_HOOK(): number {
        return this.emulator.rdramRead8(this.instance + 0x3);
    }
    get FIELD_SPOILS_BAG(): number {
        return this.emulator.rdramRead8(this.instance + 0x4);
    }
    get FIELD_BOOMERANG(): number {
        return this.emulator.rdramRead8(this.instance + 0x5);
    }
    get FIELD_DEKU_LEAF(): number {
        return this.emulator.rdramRead8(this.instance + 0x6);
    }
    get FIELD_TINGLE_TUNER(): number {
        return this.emulator.rdramRead8(this.instance + 0x7);
    }
    get FIELD_PICTO_BOX(): number {
        return this.emulator.rdramRead8(this.instance + 0x8);
    }
    get FIELD_IRON_BOOTS(): number {
        return this.emulator.rdramRead8(this.instance + 0x9);
    }
    get FIELD_MAGIC_ARMOR(): number {
        return this.emulator.rdramRead8(this.instance + 0xA);
    }
    get FIELD_BAIT_BAG(): number {
        return this.emulator.rdramRead8(this.instance + 0xB);
    }
    get FIELD_BOW(): number {
        return this.emulator.rdramRead8(this.instance + 0xC);
    }
    get FIELD_BOMBS(): number {
        return this.emulator.rdramRead8(this.instance + 0xD);
    }
    get FIELD_BOTTLE1(): number {
        return this.emulator.rdramRead8(this.instance + 0xE);
    }
    get FIELD_BOTTLE2(): number {
        return this.emulator.rdramRead8(this.instance + 0xF);
    }
    get FIELD_BOTTLE3(): number {
        return this.emulator.rdramRead8(this.instance + 0x10);
    }
    get FIELD_BOTTLE4(): number {
        return this.emulator.rdramRead8(this.instance + 0x11);
    }
    get FIELD_DELIVERY_BAG(): number {
        return this.emulator.rdramRead8(this.instance + 0x12);
    }
    get FIELD_HOOKSHOT(): number {
        return this.emulator.rdramRead8(this.instance + 0x13);
    }
    get FIELD_SKULL_HAMMER(): number {
        return this.emulator.rdramRead8(this.instance + 0x14);
    }
    get arrowCount(): number { 
        return this.emulator.rdramRead8(0x803C4C71);
    }
    get bombCount(): number {
        return this.emulator.rdramRead8(0x803C4C72);
    }

    //Capacity
    get arrowCap(): number {
        return this.emulator.rdramRead8(0x803C4C77);
    }
    get bombCap(): number {
        return this.emulator.rdramRead8(0x803C4C78);
    }

    //Bag Content Slots
    get spoils_slots(): Buffer {
        return this.emulator.rdramReadBuffer(this.spoilsBag + 0x0, 0x8);
    }

    get bait_slots(): Buffer {
        return this.emulator.rdramReadBuffer(this.baitBag + 0x0, 0x8);
    }

    get delivery_slots(): Buffer {
        return this.emulator.rdramReadBuffer(this.deliveryBag + 0x0, 0x8);
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


