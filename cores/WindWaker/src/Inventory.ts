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

    jsonFields: string[] = [
        "FIELD_TELESCOPE",
        "FIELD_SAIL",
        "FIELD_WIND_WAKER",
        "FIELD_GRAPPLING_HOOK",
        "FIELD_SPOILS_BAG",
        "FIELD_BOOMERANG",
        "FIELD_DEKU_LEAF",
        "FIELD_TINGLE_TUNER",
        "FIELD_PICTO_BOX",
        "FIELD_IRON_BOOTS",
        "FIELD_MAGIC_ARMOR",
        "FIELD_BAIT_BAG",
        "FIELD_BOW",
        "FIELD_BOMBS",
        "FIELD_BOTTLE1",
        "FIELD_BOTTLE2",
        "FIELD_BOTTLE3",
        "FIELD_BOTTLE4",
        "FIELD_DELIVERY_BAG",
        "FIELD_HOOKSHOT",
        "FIELD_SKULL_HAMMER",
        "spoils_slots",
        "bait_slots",
        "delivery_slots",
        "owned_delivery",
        "owned_spoils",
        "owned_bait",
        "count_spoils",
        "count_delivery",
        "count_bait",
        "rupeeCap",
        "bombCap",
        "arrowCap",
        "owned_items",
        "rupeeCount",
    ];

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
        let val = this.getItemInSlot(API.InventorySlots.SAIL)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_SAIL(bool: boolean) {
        let value = bool ? API.InventoryItem.SAIL : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.SAIL)
    }

    get FIELD_WIND_WAKER(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.WIND_WAKER)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_WIND_WAKER(bool: boolean) {
        let value = bool ? API.InventoryItem.WIND_WAKER : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.WIND_WAKER)
    }

    get FIELD_GRAPPLING_HOOK(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.GRAPPLING_HOOK)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_GRAPPLING_HOOK(bool: boolean) {
        let value = bool ? API.InventoryItem.GRAPPLING_HOOK : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.GRAPPLING_HOOK)
    }

    get FIELD_SPOILS_BAG(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.SPOILS_BAG)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_SPOILS_BAG(bool: boolean) {
        let value = bool ? API.InventoryItem.SPOILS_BAG : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.SPOILS_BAG)
    }

    get FIELD_BOOMERANG(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.BOOMERANG)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_BOOMERANG(bool: boolean) {
        let value = bool ? API.InventoryItem.BOOMERANG : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.BOOMERANG)
    }

    get FIELD_DEKU_LEAF(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.DEKU_LEAF)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_DEKU_LEAF(bool: boolean) {
        let value = bool ? API.InventoryItem.DEKU_LEAF : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.DEKU_LEAF)
    }

    get FIELD_TINGLE_TUNER(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.TINGLE_TUNER)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_TINGLE_TUNER(bool: boolean) {
        let value = bool ? API.InventoryItem.TINGLE_TUNER : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.TINGLE_TUNER)
    }

    get FIELD_PICTO_BOX(): API.InventoryItem {
        return this.getItemInSlot(API.InventorySlots.PICTO_BOX);
    }
    set FIELD_PICTO_BOX(item: API.InventoryItem) {
        if (item === API.InventoryItem.PICTO_BOX ||
            item === API.InventoryItem.DELUXE_PICTO_BOX) {
            this.setItemInSlot(item, API.InventorySlots.PICTO_BOX);
        }
    }

    get FIELD_IRON_BOOTS(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.IRON_BOOTS)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_IRON_BOOTS(bool: boolean) {
        let value = bool ? API.InventoryItem.IRON_BOOTS : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.IRON_BOOTS)
    }

    get FIELD_MAGIC_ARMOR(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.MAGIC_ARMOR)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_MAGIC_ARMOR(bool: boolean) {
        let value = bool ? API.InventoryItem.MAGIC_ARMOR : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.MAGIC_ARMOR)
    }

    get FIELD_BAIT_BAG(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.BAIT_BAG)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_BAIT_BAG(bool: boolean) {
        let value = bool ? API.InventoryItem.BAIT_BAG : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.BAIT_BAG)
    }

    get FIELD_BOW(): API.InventoryItem {
        return this.getItemInSlot(API.InventorySlots.BOW);
    }
    set FIELD_BOW(item: API.InventoryItem) {
        if (item === API.InventoryItem.BOW ||
            item === API.InventoryItem.FI_BOW ||
            item === API.InventoryItem.LIGHT_BOW) {
            this.setItemInSlot(item, API.InventorySlots.BOW);
        }
    }

    get FIELD_BOMBS(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.BOMBS)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_BOMBS(bool: boolean) {
        let value = bool ? API.InventoryItem.BOMBS : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.BOMBS)
    }

    get FIELD_BOTTLE1(): InventoryItem {
        return this.getItemInSlot(API.InventorySlots.BOTTLE1);
    }
    set FIELD_BOTTLE1(content: API.InventoryItem) {
        if (
            content < API.InventoryItem.BOTTLE_EMPTY ||
            content > API.InventoryItem.BOTTLE_FOREST_WATER
        ) {
            return;
        }
        this.setItemInSlot(content, API.InventorySlots.BOTTLE1);
    }

    get FIELD_BOTTLE2(): API.InventoryItem {
        return this.getItemInSlot(API.InventorySlots.BOTTLE2);
    }
    set FIELD_BOTTLE2(content: API.InventoryItem) {
        if (
            content < API.InventoryItem.BOTTLE_EMPTY ||
            content > API.InventoryItem.BOTTLE_FOREST_WATER
        ) {
            return;
        }
        this.setItemInSlot(content, API.InventorySlots.BOTTLE2);
    }

    get FIELD_BOTTLE3(): API.InventoryItem {
        return this.getItemInSlot(API.InventorySlots.BOTTLE3);
    }
    set FIELD_BOTTLE3(content: API.InventoryItem) {
        if (
            content < API.InventoryItem.BOTTLE_EMPTY ||
            content > API.InventoryItem.BOTTLE_FOREST_WATER
        ) {
            return;
        }
        this.setItemInSlot(content, API.InventorySlots.BOTTLE3);
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
        let val = this.getItemInSlot(API.InventorySlots.DELIVERY_BAG)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_DELIVERY_BAG(bool: boolean) {
        let value = bool ? API.InventoryItem.DELIVERY_BAG : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.DELIVERY_BAG)
    }

    get FIELD_HOOKSHOT(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.HOOKSHOT)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_HOOKSHOT(bool: boolean) {
        let value = bool ? API.InventoryItem.HOOKSHOT : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.HOOKSHOT)
    }

    get FIELD_SKULL_HAMMER(): boolean {
        let val = this.getItemInSlot(API.InventorySlots.SKULL_HAMMER)
        return !(val === API.InventoryItem.NONE);
    }
    set FIELD_SKULL_HAMMER(bool: boolean) {
        let value = bool ? API.InventoryItem.SKULL_HAMMER : API.InventoryItem.NONE;
        this.setItemInSlot(value, API.InventorySlots.SKULL_HAMMER)
    }

    // Counts
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
        this.emulator.rdramWrite16(0x803CA7CE, flag);
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

    // Bag Content Slots
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

    get owned_delivery(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C4C98, 0x4);
    }
    set owned_delivery(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C4C98, flag);
    }

    get owned_spoils(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C4C9C, 0x1);
    }
    set owned_spoils(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C4C9C, flag);
    }

    get owned_bait(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C4C9D, 0x1)
    }
    set owned_bait(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C4C9D, flag);
    }

    get count_spoils(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C4CA4, 0x7);
    }
    set count_spoils(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C4CA4, flag);
    }

    get count_delivery(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C4CAC, 0x8);
    }
    set count_delivery(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C4CAC, flag);
    }

    get count_bait(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C4CB4, 0x7);
    }
    set count_bait(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C4CB4, flag);
    }

    //803C4C59-803C4C6D - List of bitfields of which items you own.
    get owned_items(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C4C59, 0x14);
    }
    set owned_items(flag: Buffer) {
        this.emulator.rdramWriteBuffer(0x803C4C59, flag);
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