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

    get current_scene_frame(): number {
        return this.emulator.rdramRead32(0x803CA620);
    }
    get current_scene_name(): string {
        return this.emulator.rdramReadBuffer(0x803C9D3C, 0x8).toString();
    }
    get next_scene_name(): string {
        return this.emulator.rdramReadBuffer(0x803C9D48, 0x8).toString();
    }
    get next_room_number(): number {
        return this.emulator.rdramRead8(0x803C9D52);
    }
    get linkPointer(): number {
        return this.emulator.rdramRead32(0x803CA410);
    }
}