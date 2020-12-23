import { ICore } from 'modloader64_api/IModLoaderAPI';
import { IPacketHeader } from 'modloader64_api/NetworkHandler';


export interface IInventory extends IInventoryFields, IInventoryCounts {
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
    FIELD_BOTTLE1: InventorySlots;
    FIELD_BOTTLE2: InventorySlots;
    FIELD_BOTTLE3: InventorySlots;
    FIELD_BOTTLE4: InventorySlots;
    FIELD_DELIVERY_BAG: number;
    FIELD_HOOKSHOT: number;
    FIELD_SKULL_HAMMER: number;
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

}

export interface IGlobalContext {
    current_scene_name: Buffer;
}

export interface ISaveContext {
    inventory: IInventory;

    current_hp: number;
    max_hp: number;

    current_mp: number;
    max_mp: number;

    sword: number;
    shield: number;
    strength: number;
}

export interface ILink {

}

export interface IWWHelper {
    isTitleScreen(): boolean;
    isSceneNameValid(): boolean;
    isLinkEnteringLoadingZone(): boolean;
    isPaused(): boolean;
    isInterfaceShown(): boolean;
}

export interface IWWCore extends ICore {
    link: ILink;
    save: ISaveContext;
    helper: IWWHelper;
}

