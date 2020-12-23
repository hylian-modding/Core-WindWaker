import { IModLoaderAPI } from "modloader64_api/IModLoaderAPI";
import * as API from '../API/Imports';
import { JSONTemplate } from "modloader64_api/JSONTemplate";
import IMemory from "modloader64_api/IMemory";

export class WWHelper extends JSONTemplate implements API.IWWHelper {

    private save: API.ISaveContext;
    private global: API.IGlobalContext;
    private link: API.ILink;
    private emu: IMemory;
    constructor(
        save: API.ISaveContext,
        global: API.IGlobalContext,
        link: API.ILink,
        memory: IMemory
    ) {
        super();
        this.save = save;
        this.global = global;
        this.link = link;
        this.emu = memory;
    }

    isLinkEnteringLoadingZone(): boolean {
        let r = this.emu.rdramRead8(0x803C9EA2);
        return (r) === 0x02 || (r) === 0x03;
    }

    isTitleScreen(): boolean {
        let r = this.emu.rdramRead8(0x803C4D64);
        return (r) === 0x00;
    }

    isSceneNameValid(): boolean {
        return this.global.current_scene_name[0] !== 0x0;
    }

    isPaused(): boolean {
        //return this.emu.rdramRead32(global.isPaused) !== 0x3;
        return false;
    }

    isInterfaceShown(): boolean {
        //return this.emu.rdramRead8(global.interface_shown) === 0xFF;
        return true;
    }
}