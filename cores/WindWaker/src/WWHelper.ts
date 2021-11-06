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
        // Old Check
        //let r1 = this.emu.rdramRead16(0x803C9EB8);
        //let r2 = this.emu.rdramRead8(0x803CA783);
        //return (r1) === 0xFFFF && (r2) > 0x0 && !this.isSceneChange();

        let r1 = this.emu.rdramRead8(0x803F6A89);
        return (r1 === 0xFF);
    }

    isTitleScreen(): boolean {
        //if (!this.isSceneNameValid()) return false;
        //let value1 = this.emu.rdramRead32(0x803C9D3C);
        //let value2 = this.emu.rdramRead32(0x803C9D3C + 0x4);
        //7365615f 54000000 = sea_T 
        //4e616d65 = Name 
        //return (value1 === 0x7365615F && value2 === 0x54000000) || (value1 === 0x4E616D65 && value2 === 0)

        return (this.global.current_scene_name === "sea_T");
    }

    isSceneChange(): boolean {
        let r1 = this.global.current_scene_frame;
        return (r1 === 0x00000000);
    }

    isLoadingZone(): boolean {
        let r1 = this.emu.rdramRead8(0x81803000);

        return (r1 === 0x1);
    }

    isLinkExists(): boolean {
        return (this.global.linkPointer !== 0x0);
    }

    isSceneNameValid(): boolean {
        return this.global.current_scene_name !== "NULL" && !this.isTitleScreen();
    }

    isPaused(): boolean {
        return this.emu.rdramRead8(0x803F7097) !== 0x0;
    }

}