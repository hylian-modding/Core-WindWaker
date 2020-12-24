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
    DELUXE_PICTO_BOX = 26,
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
    BOTTLE_WATTER = 0x56,
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
    FIELD_TELESCOPE: number;
    FIELD_SAIL: number;
    FIELD_WIND_WAKER: number;
    FIELD_GRAPPLING_HOOK: number;
    FIELD_SPOILS_BAG: number;
    FIELD_BOOMERANG: number;
    FIELD_DEKU_LEAF: number;
    FIELD_TINGLE_TUNER: number;
    FIELD_PICTO_BOX: number;
    FIELD_IRON_BOOTS: number;
    FIELD_MAGIC_ARMOR: number;
    FIELD_BAIT_BAG: number;
    FIELD_BOW: number;
    FIELD_BOMBS: number;
    FIELD_BOTTLE1: number;
    FIELD_BOTTLE2: number;
    FIELD_BOTTLE3: number;
    FIELD_BOTTLE4: number;
    FIELD_DELIVERY_BAG: number;
    FIELD_HOOKSHOT: number;
    FIELD_SKULL_HAMMER: number;
}

export interface IQuestStatus {

    songs: Buffer;
    triforce: Buffer;
    pearls: Buffer;

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
    current_scene_name: Buffer;
    next_scene_name: Buffer;
    next_room_number: number;
    linkPointer: number;
}

export interface ISaveContext {
    inventory: IInventory;
    questStatus: IQuestStatus;
    current_hp: number;
    max_hp: number;
    current_mp: number;
    max_mp: number;
}

export interface ILink {

}

export interface IWWHelper {
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
    ON_LOADING_ZONE = 'onLoadingZone',
}

export interface IWWCore extends ICore {
    global: IGlobalContext;
    link: ILink;
    save: ISaveContext;
    helper: IWWHelper;
}