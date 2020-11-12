import { ICore } from 'modloader64_api/IModLoaderAPI';
import { IPacketHeader } from 'modloader64_api/NetworkHandler';


export interface IInventory extends IInventoryFields, IInventoryCounts {

}

export interface IInventoryCounts {
    arrowCount: number;
    bombCount: number;
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

export interface ISaveContext {

}

export interface ILink {

}

export interface IWWCore extends ICore {
    link: ILink;
    save: ISaveContext;
}

