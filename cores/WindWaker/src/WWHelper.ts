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
        let r1 = this.emu.rdramRead16(0x803C9EB8);
        let r2 = this.emu.rdramRead8(0x803CA783);
        return (r1) === 0xFFFF && (r2) > 0x0 && !this.isSceneChange();
    }

    isTitleScreen(): boolean {
        //let r = this.emu.rdramRead32(0x803F6B44);
        if(!this.isSceneNameValid()) return false;

        let value1 = this.emu.rdramRead32(0x803C9D3C);
        let value2 = this.emu.rdramRead32(0x803C9D3C + 0x4);
        //7365615f 54000000 = sea_T 
        //4e616d65 = Name 
        return (value1 === 0x7365615F && value2 === 0x54000000) || (value1 === 0x4E616D65 && value2 === 0)
    }

    isSceneChange(): boolean {
        let r1 = this.global.current_scene_frame;
        return (r1 === 0)
    }

    isLoadingZone(): boolean {
        let r1 = this.emu.rdramRead16(0x803C9DE0);

        return (r1 === 0x1 || r1 === 0x3);
    }

    isLinkExists(): boolean {
        return (this.global.linkPointer !== 0x0);
    }

    isSceneNameValid(): boolean {
        return Buffer.from(this.global.current_scene_name).toString('hex') !== "0000000000000000";
    }

    isPaused(): boolean {
        return this.emu.rdramRead8(0x803F7097) !== 0x0;
    }
}