import {Navigation} from "react-native-navigation";
import Datastore from "react-native-local-mongodb";
import AsyncStorage from "@react-native-community/async-storage";
import Medication from "../models/Medication";
import {getMedicationStore} from "../stores/MedicationStore";
import Medications from "../models/Medications";
import {getVitaldataStore} from "../stores/VitaldataStore";

let instance: VitaldataService;

export default class VitaldataService {

    static getInstance(): VitaldataService {
        return instance || (instance = new VitaldataService());
    }

    db:Datastore;

    constructor() {
        this.db = new Datastore({
            filename: 'VitaldataStorage',
            storage: AsyncStorage,
            autoload: true
        });
    }

    getVitaldata(query = {}):Promise {
        return this.db.findAsync(query);
    }

    addVitaldata(vitaldata) {
        getVitaldataStore().vitaldataObj = vitaldata;
        return this.db.insertAsync(vitaldata);
    }

    addVitaldataIfNotExists(vitaldata) {
        this.getVitaldata().then((result) => {
            if (result.length === 0) {
                this.addVitaldata(vitaldata).then((result) => {
                    getVitaldataStore().vitaldataObj = result;
                    console.log(`DEBUG: added document ${JSON.stringify(result)} to VitaldataStore`);
                });
            } else {
                getVitaldataStore().vitaldataObj = result[0];
            }
        })
    }

    updateVitaldata() {}



    static openVitaldataWindow() {
        Navigation.showModal({
            stack: {
                children: [
                    {
                        component: {
                            name: 'VitaldataScreen',
                            options: {
                                topBar: {
                                    title: {
                                        text: 'Vitaldaten erfassen',
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        })
    }
}

