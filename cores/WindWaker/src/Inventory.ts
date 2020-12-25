import IMemory from 'modloader64_api/IMemory';
import * as API from '../API/Imports';
import { FlagManager } from 'modloader64_api/FlagManager';
import { JSONTemplate } from 'modloader64_api/JSONTemplate';
import { ILogger } from 'modloader64_api/IModLoaderAPI';
import { NONAME } from 'dns';
import { IInventoryFields, InventoryItem } from '../API/Imports';

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
    get FIELD_TELESCOPE(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.TELESCOPE)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_TELESCOPE(bool: boolean) {
        let value = bool ? API.InventoryItem.TELESCOPE : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.TELESCOPE)
    }

    get FIELD_SAIL(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.TELESCOPE)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_SAIL(bool: boolean) {
        let value = bool ? API.InventoryItem.TELESCOPE : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.TELESCOPE)
    }

    get FIELD_WIND_WAKER(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.TELESCOPE)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_WIND_WAKER(bool: boolean) {
        let value = bool ? API.InventoryItem.TELESCOPE : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.TELESCOPE)
    }

    get FIELD_GRAPPLING_HOOK(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.TELESCOPE)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_GRAPPLING_HOOK(bool: boolean) {
        let value = bool ? API.InventoryItem.TELESCOPE : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.TELESCOPE)
    }

    get FIELD_SPOILS_BAG(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.TELESCOPE)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_SPOILS_BAG(bool: boolean) {
        let value = bool ? API.InventoryItem.TELESCOPE : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.TELESCOPE)
    }

    get FIELD_BOOMERANG(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.TELESCOPE)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_BOOMERANG(bool: boolean) {
        let value = bool ? API.InventoryItem.TELESCOPE : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.TELESCOPE)
    }

    get FIELD_DEKU_LEAF(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.TELESCOPE)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_DEKU_LEAF(bool: boolean) {
        let value = bool ? API.InventoryItem.TELESCOPE : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.TELESCOPE)
    }

    get FIELD_TINGLE_TUNER(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.TELESCOPE)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_TINGLE_TUNER(bool: boolean) {
        let value = bool ? API.InventoryItem.TELESCOPE : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.TELESCOPE)
    }

    get FIELD_PICTO_BOX(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.TELESCOPE)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_PICTO_BOX(bool: boolean) {
        let value = bool ? API.InventoryItem.TELESCOPE : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.TELESCOPE)
    }

    get FIELD_IRON_BOOTS(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.TELESCOPE)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_IRON_BOOTS(bool: boolean) {
        let value = bool ? API.InventoryItem.TELESCOPE : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.TELESCOPE)
    }

    get FIELD_MAGIC_ARMOR(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.TELESCOPE)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MAGIC_ARMOR(bool: boolean) {
        let value = bool ? API.InventoryItem.TELESCOPE : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.TELESCOPE)
    }

    get FIELD_BAIT_BAG(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.TELESCOPE)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_BAIT_BAG(bool: boolean) {
        let value = bool ? API.InventoryItem.TELESCOPE : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.TELESCOPE)
    }

    get FIELD_BOW(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.TELESCOPE)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_BOW(bool: boolean) {
        let value = bool ? API.InventoryItem.TELESCOPE : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.TELESCOPE)
    }

    get FIELD_BOMBS(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.TELESCOPE)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_BOMBS(bool: boolean) {
        let value = bool ? API.InventoryItem.TELESCOPE : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.TELESCOPE)
    }

    get FIELD_BOTTLE1(): InventoryItem {
        return this.getItemInSlot(API.InventorySlots.BOTTLE4);
    }
    set FIELD_BOTTLE1(content: API.InventoryItem) {
        if (
            content < API.InventoryItem.BOTTLE_EMPTY ||
            content > API.InventoryItem.BOTTLE_FOREST_WATER
        ) {
            return;
        }
        this.setItemInSlot(content, API.InventorySlots.BOTTLE4);
    }

    get FIELD_BOTTLE2(): API.InventoryItem {
        return this.getItemInSlot(API.InventorySlots.BOTTLE4);
    }
    set FIELD_BOTTLE2(content: API.InventoryItem) {
        if (
            content < API.InventoryItem.BOTTLE_EMPTY ||
            content > API.InventoryItem.BOTTLE_FOREST_WATER
        ) {
            return;
        }
        this.setItemInSlot(content, API.InventorySlots.BOTTLE4);
    }

    get FIELD_BOTTLE3(): API.InventoryItem {
        return this.getItemInSlot(API.InventorySlots.BOTTLE4);
    }
    set FIELD_BOTTLE3(content: API.InventoryItem) {
        if (
            content < API.InventoryItem.BOTTLE_EMPTY ||
            content > API.InventoryItem.BOTTLE_FOREST_WATER
        ) {
            return;
        }
        this.setItemInSlot(content, API.InventorySlots.BOTTLE4);
    }

    get FIELD_BOTTLE4(): API.InventoryItem {
        return this.getItemInSlot(API.InventorySlots.BOTTLE4);
    }
    set FIELD_BOTTLE4(content: API.InventoryItem) {
        if (
            content < API.InventoryItem.BOTTLE_EMPTY ||
            content > API.InventoryItem.BOTTLE_FOREST_WATER
        ) {
            return;
        }
        this.setItemInSlot(content, API.InventorySlots.BOTTLE4);
    }

    get FIELD_DELIVERY_BAG(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.TELESCOPE)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_DELIVERY_BAG(bool: boolean) {
        let value = bool ? API.InventoryItem.TELESCOPE : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.TELESCOPE)
    }

    get FIELD_HOOKSHOT(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.TELESCOPE)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_HOOKSHOT(bool: boolean) {
        let value = bool ? API.InventoryItem.TELESCOPE : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.TELESCOPE)
    }

    get FIELD_SKULL_HAMMER(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.TELESCOPE)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_SKULL_HAMMER(bool: boolean) {
        let value = bool ? API.InventoryItem.TELESCOPE : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.TELESCOPE)
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

    getItemInSlot(slotId: number): API.InventoryItem {
        if (slotId < 0 || slotId > API.InventorySlots.SKULL_HAMMER) {
            return API.InventoryItem.NONE;
        }

        let itemId: number = this.emulator.rdramRead8(this.instance + slotId);
        return itemId as API.InventoryItem;
    }
    getSlotForItem(item: API.InventoryItem): number {
        for (let i = 0; i <= API.InventorySlots.SKULL_HAMMER; i++) {
            if (this.getItemInSlot(i) == item) {
                return i;
            }
        }
        return -1;
    }
    setItemInSlot(item: API.InventoryItem, slot: number): void {
        if (slot < 0 || slot > API.InventorySlots.SKULL_HAMMER) {
            return;
        }
        this.emulator.rdramWrite8(this.instance + slot, item.valueOf());
    }
}