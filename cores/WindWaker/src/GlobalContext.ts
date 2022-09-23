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

    get current_stage_id(): number {
        return this.emulator.rdramRead8(0x803C53A4);
    }

    get current_scene_frame(): number {
        return this.emulator.rdramRead32(0x803CA620);
    }

    get current_scene_name(): string {
        let rawName = this.emulator.rdramReadBuffer(0x803C9D3C, 0x8).toString();
        let realName = "NULL";
        for (let i = 0; i < this.sceneNames.length; i++) {
            if (rawName.startsWith(this.sceneNames[i], 0)) realName = this.sceneNames[i];
        }
        return realName;
    }

    get current_room_number(): number {
        return this.emulator.rdramRead8(0x803F6A78);
    }
    get prev_room_number(): number {
        return this.emulator.rdramRead8(0x803F6A79);
    }

    get next_scene_name(): string {
        let rawName = this.emulator.rdramReadBuffer(0x803C9D48, 0x8).toString();
        let realName = "NULL";
        for (let i = 0; i < this.sceneNames.length; i++) {
            if (rawName.startsWith(this.sceneNames[i], 0)) realName = this.sceneNames[i];
        }
        return realName;
    }

    get next_room_number(): number {
        return this.emulator.rdramRead8(0x803CA90D); //TODO: See if this is valid
    }
    get linkPointer(): number {
        return this.emulator.rdramRead32(0x803CA410);
    }

    sceneNames = [
        "ADMumi",
        "A_R00",
        "A_mori",
        "A_nami",
        "A_umikz",
        "Abesso",
        "Abship",
        "Adanmae",
        "Amos_T",
        "Asoko",
        "Atorizk",
        "Cave01",
        "Cave02",
        "Cave03",
        "Cave04",
        "Cave05",
        "Cave06",
        "Cave07",
        "Cave08",
        "Cave09",
        "Cave10",
        "Cave11",
        "Comori",
        "E3ROOP",
        "ENDumi",
        "Ebesso",
        "Edaichi",
        "Ekaze",
        "Fairy01",
        "Fairy02",
        "Fairy03",
        "Fairy04",
        "Fairy05",
        "Fairy06",
        "GTower",
        "GanonA",
        "GanonB",
        "GanonC",
        "GanonD",
        "GanonE",
        "GanonJ",
        "GanonK",
        "GanonL",
        "GanonM",
        "GanonN",
        "Hyroom",
        "Hyrule",
        "ITest61",
        "ITest62",
        "ITest63",
        "I_SubAN",
        "I_TestM",
        "I_TestR",
        "KATA_HB",
        "KATA_RM",
        "K_Test2",
        "K_Test3",
        "K_Test4",
        "K_Test5",
        "K_Test6",
        "K_Test8",
        "K_Test9",
        "K_Testa",
        "K_Testb",
        "K_Testc",
        "K_Testd",
        "K_Teste",
        "Kaisen",
        "LinkRM",
        "LinkUG",
        "M2ganon",
        "M2tower",
        "M_Dai",
        "M_DaiB",
        "M_DaiMB",
        "M_Dra09",
        "M_DragB",
        "M_NewD2",
        "MajyuE",
        "MiniHyo",
        "MiniKaz",
        "Mjtower",
        "Msmoke",
        "Mukao",
        "Nitiyou",
        "Obombh",
        "Obshop",
        "Ocean",
        "Ocmera",
        "Ocrogh",
        "Ojhous2",
        "Ojhous",
        "Omasao",
        "Omori",
        "Onobuta",
        "Opub",
        "Orichh",
        "Otkura",
        "PShip2",
        "PShip3",
        "PShip",
        "Pdrgsh",
        "Pfigure",
        "Pjavdou",
        "Pnezumi",
        "ShipD",
        "Siren",
        "SirenB",
        "SirenMB",
        "SubD42",
        "SubD43",
        "SubD44",
        "SubD45",
        "SubD51",
        "SubD71",
        "TEST",
        "TF_01",
        "TF_02",
        "TF_03",
        "TF_04",
        "TF_05",
        "TF_06",
        "TF_07",
        "TyuTyu",
        "VrTest",
        "WarpD",
        "Xboss0",
        "Xboss1",
        "Xboss2",
        "Xboss3",
        "figureA",
        "figureB",
        "figureC",
        "figureD",
        "figureE",
        "figureF",
        "figureG",
        "kazan",
        "kaze",
        "kazeB",
        "kazeMB",
        "kenroom",
        "kinBOSS",
        "kinMB",
        "kindan",
        "ma2room",
        "ma3room",
        "majroom",
        "sea",
        "sea_E",
        "sea_T",
        "tincle",
    ]
}