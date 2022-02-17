import { Heap } from 'modloader64_api/heap';
import { ICore } from 'modloader64_api/IModLoaderAPI';
import { IPacketHeader } from 'modloader64_api/NetworkHandler';

export const enum Sword {
    NONE = 0,
    Hero = 0,
    Master = 1,
    MasterHalf = 2,
    MasterFull = 3,
}

export interface ISwords {
    swordLevel: Sword;
}

export const enum Shield {
    NONE = 0,
    HERO = 0,
    MIRROR = 0,
}

export interface IShields {
    shieldLevel: Shield;
}

export const enum Magic {
    NONE,
    NORMAL,
    EXTENDED
}

export const enum MagicQuantities {
    NONE = 0,
    NORMAL = 0x10,
    EXTENDED = 0x20
}

export interface IInventory extends IInventoryFields, IInventoryCounts {
    getItemInSlot(slotId: number): InventoryItem;
    getSlotForItem(item: InventoryItem): number;
    setItemInSlot(item: InventoryItem, slot: number): void;
}


export enum InventoryItem {
    TELESCOPE = 0x20,
    SAIL = 0x78,
    WIND_WAKER = 0x22,
    GRAPPLING_HOOK = 0x25,
    SPOILS_BAG = 0x24,
    BOOMERANG = 0x2D,
    DEKU_LEAF = 0x34,
    TINGLE_TUNER = 0x21,
    PICTO_BOX = 0x23,
    DELUXE_PICTO_BOX = 0x26,
    IRON_BOOTS = 0x29,
    MAGIC_ARMOR = 0x2A,
    BAIT_BAG = 0x2C,
    BOW = 0x27,
    FI_BOW = 0x35,
    LIGHT_BOW = 0x36,
    BOMBS = 0x31,
    BOTTLE_EMPTY = 0x50,
    BOTTLE_POTION_RED = 0x51,
    BOTTLE_POTION_GREEN = 0x52,
    BOTTLE_POTION_BLUE = 0x53,
    BOTTLE_ELIXER_HALF = 0x54,
    BOTTLE_ELIXER_FULL = 0x55,
    BOTTLE_WATER = 0x56,
    BOTTLE_FAIRY = 0x57,
    BOTTLE_FIREFLY = 0x58,
    BOTTLE_FOREST_WATER = 0x59,
    DELIVERY_BAG = 0x30,
    HOOKSHOT = 0x2F,
    SKULL_HAMMER = 0x33,
    NONE = 0xFF,
}

export interface IInventoryCounts {
    arrowCount: number;
    bombCount: number;
    rupeeCount: number;
}

export interface IInventoryFields {
    FIELD_TELESCOPE: boolean;
    FIELD_SAIL: boolean;
    FIELD_WIND_WAKER: boolean;
    FIELD_GRAPPLING_HOOK: boolean;
    FIELD_SPOILS_BAG: boolean;
    FIELD_BOOMERANG: boolean;
    FIELD_DEKU_LEAF: boolean;
    FIELD_TINGLE_TUNER: boolean;
    FIELD_PICTO_BOX: boolean;
    FIELD_IRON_BOOTS: boolean;
    FIELD_MAGIC_ARMOR: boolean;
    FIELD_BAIT_BAG: boolean;
    FIELD_BOW: boolean;
    FIELD_BOMBS: boolean;
    FIELD_BOTTLE1: InventoryItem;
    FIELD_BOTTLE2: InventoryItem;
    FIELD_BOTTLE3: InventoryItem;
    FIELD_BOTTLE4: InventoryItem;
    FIELD_DELIVERY_BAG: boolean;
    FIELD_HOOKSHOT: boolean;
    FIELD_SKULL_HAMMER: boolean;
    spoils_slots: Buffer;
    bait_slots: Buffer;
    delivery_slots: Buffer;
    owned_delivery: Buffer;
    owned_spoils: Buffer;
    owned_bait: Buffer;
    count_spoils: Buffer;
    count_delivery: Buffer;
    count_bait: Buffer;

    rupeeCap: number;
    bombCap: number;
    arrowCap: number;
}

export const enum InventorySlots {
    TELESCOPE,
    SAIL,
    WIND_WAKER,
    GRAPPLING_HOOK,
    SPOILS_BAG,
    BOOMERANG,
    DEKU_LEAF,
    TINGLE_TUNER,
    PICTO_BOX,
    IRON_BOOTS,
    MAGIC_ARMOR,
    BAIT_BAG,
    BOW,
    BOMBS,
    BOTTLE1,
    BOTTLE2,
    BOTTLE3,
    BOTTLE4,
    DELIVERY_BAG,
    HOOKSHOT,
    SKULL_HAMMER
}

export interface IQuestStatus {
    hasTunic: boolean;
    swordLevel: Buffer;
    swordEquip: number;
    shieldLevel: Buffer;
    shieldEquip: number;
    braceletEquip: number;
    songs: Buffer;
    triforce: Buffer;
    pearls: Buffer;

    current_hp: number;
    max_hp: number;
    current_mp: number;
    max_mp: number;
    
    bracelet: Buffer;
    pirate_charm: Buffer;
    hero_charm: Buffer;
    owned_charts: Buffer;
    opened_charts: Buffer;
    completed_charts: Buffer;
    sectors: Buffer;
    deciphered_triforce: Buffer;
}

export interface IGlobalContext {
    current_scene_frame: number;
    current_scene_name: string;
    current_room_number: number;
    prev_room_number: number;
    next_scene_name: string;
    next_room_number: number;
    linkPointer: number;
}

export interface ISaveContext {
    inventory: IInventory;
    questStatus: IQuestStatus;
}

export interface ILink {
    pos: Buffer;
    rot: Buffer;
    matrixData: Buffer;
}

export interface IWWHelper {
    isLoadingZone(): boolean;
    isLinkExists(): boolean;
    isTitleScreen(): boolean;
    isSceneNameValid(): boolean;
    isLinkControllable(): boolean;
    isPaused(): boolean;
    isSceneChange(): boolean;
}

export enum WWEvents {
    ON_SAVE_LOADED = 'onSaveLoaded',
    ON_SCENE_CHANGE = 'onSceneChange',
    ON_ROOM_CHANGE = 'onRoomChange',
    ON_LOADING_ZONE = 'onLoadingZone',
}

export interface IWWCore extends ICore {
    heap?: Heap;
    global: IGlobalContext;
    link: ILink;
    save: ISaveContext;
    helper: IWWHelper;
}