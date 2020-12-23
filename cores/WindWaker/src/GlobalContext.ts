import IMemory from 'modloader64_api/IMemory';
import * as API from '../API/Imports'
import { JSONTemplate } from 'modloader64_api/JSONTemplate';
import { IModLoaderAPI } from 'modloader64_api/IModLoaderAPI';

export class GlobalContext extends JSONTemplate implements API.IGlobalContext {
    private emulator: IMemory;

    constructor(emu: IMemory) {
        super();
        this.emulator = emu;
    }

    get current_scene_name(): Buffer {
        return this.emulator.rdramReadBuffer(0x803C9D3C, 0x8);
    }

}