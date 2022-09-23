import { onTick, Preinit, Init, Postinit } from "modloader64_api/PluginLifecycle";
import { IRomHeader } from 'modloader64_api/IRomHeader';
import { ModLoaderAPIInject } from "modloader64_api/ModLoaderAPIInjector";
import { IModLoaderAPI, ILogger, ICore, ModLoaderEvents } from "modloader64_api/IModLoaderAPI";
import { bus, EventHandler } from "modloader64_api/EventHandler";
import { PayloadType } from "modloader64_api/PayloadType";
import IMemory from "modloader64_api/IMemory";
import fs from 'fs';
import path from 'path';
import * as API from './API/Imports';
import { GlobalContext, Link, SaveContext, WWHelper } from "./src/Imports";
import * as CORE from './src/Imports';
import { BindVar, BindVar_Sizes } from 'modloader64_api/BindVar';

export class WindWaker implements ICore, API.IWWCore {
    heap_size = -1;
    heap_start = -1;
    header = "GZLE";
    @ModLoaderAPIInject()
    ModLoader: IModLoaderAPI = {} as IModLoaderAPI;
    eventTicks: Map<string, Function> = new Map<string, Function>();
    link!: API.ILink;
    save!: API.ISaveContext;
    global!: API.IGlobalContext;
    helper!: API.IWWHelper;
    isSaveLoaded = false;
    touching_loading_zone = false;
    last_known_scene: string = "";
    last_known_room: number = -1;
    isLinkLoadingZone!: number;
    temp: boolean = false;

    preinit() {
        this.eventTicks.set('waitingForSaveload', () => {
            if (!this.isSaveLoaded && this.helper.isSceneNameValid() && !this.helper.isTitleScreen()) {
                this.isSaveLoaded = true;
                bus.emit(API.WWEvents.ON_SAVE_LOADED, {});
            }
        });
    }

    init(): void {
    }

    postinit(): void {
        this.global = new GlobalContext(this.ModLoader.emulator);
        this.link = new Link(this.ModLoader.emulator);
        this.save = new SaveContext(this.ModLoader.emulator, this);
        this.helper = new WWHelper(
            this.save,
            this.global,
            this.link,
            this.ModLoader.emulator
        );
    }

    onTick() {
        if (this.helper.isTitleScreen() || !this.helper.isSceneNameValid()) return;
        if (this.helper.isLoadingZone() && !this.touching_loading_zone) {
            this.ModLoader.emulator.rdramWrite8(0x81803000, 0);
            bus.emit(API.WWEvents.ON_LOADING_ZONE, {});
            this.touching_loading_zone = true;
        }
        if (this.touching_loading_zone && this.helper.isSceneChange() && !this.temp) {
            bus.emit(API.WWEvents.ON_SCENE_CHANGE, this.global.next_scene_name);
            this.touching_loading_zone = false;
            this.temp = true;
        }
        if (this.global.current_scene_frame === 60) this.temp = false;
        this.eventTicks.forEach((value: Function, key: string) => {
            value();
        });
        
        // Room change check
        if(this.last_known_room !== this.global.current_room_number){
            bus.emit(API.WWEvents.ON_ROOM_CHANGE, this.global.current_scene_name, this.global.current_room_number);
            this.last_known_room = this.global.current_room_number;
        }
    }
}