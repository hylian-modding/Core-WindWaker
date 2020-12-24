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

    isLinkControllable(): boolean {
        let r1 = this.emu.rdramRead8(0x803C9EB8);
        let r2 = this.emu.rdramRead8(0x803C9EA2);

        return (r1) !== 0xFF || (r2) !== 0x00;
    }

    isTitleScreen(): boolean {
        let sceneNameNew = this.global.current_scene_name.toString().replace(/\0.*$/g, '');
        return sceneNameNew === "sea_T" || sceneNameNew === "Name";
    }

    isSceneChange(): boolean {
        return (this.emu.rdramRead8(0x803C9D54) === 0x1)
    }

    isLinkExists(): boolean {
        return (this.global.linkPointer !== 0x0);
    }

    isSceneNameValid(): boolean {
        return this.global.current_scene_name.toString().replace(/\0.*$/g, '') !== "";
    }

    isPaused(): boolean {
        return this.emu.rdramRead8(0x803F7097) !== 0x0;
    }
}