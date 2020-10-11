import React from "react";
import {getUiStore} from "../stores/UiStore";
import {Navigation} from "react-native-navigation";
import Datastore from "react-native-local-mongodb";
import AsyncStorage from "@react-native-community/async-storage";
import {getDateStorage} from "../stores/DateStorage";
import Medication from "../models/Medication";
import {getMedicationStore} from "../stores/MedicationStore";
import Medications from "../models/Medications";
import Days from "../models/Days";
import {getVitaldataStore} from "../stores/VitaldataStore";

let instance: MedicationService;

export default class MedicationService {

    static getInstance(): MedicationService {
        return instance || (instance = new MedicationService());
    }

    db:Datastore;

    constructor() {
        this.db = new Datastore({
            filename: 'MedicationStorage',
            storage: AsyncStorage,
            autoload: true
        });
    }

    getMedications(query = {}):Promise {
        return this.db.findAsync(query);
    }

    addMedication(medication:Medication) {
        getVitaldataStore().vitaldataObj = medication;
        return this.db.insertAsync(medication);
    }

    deleteMedication(query = {})  {
        return this.db.removeAsync(query, { multi: true });
    }

    deleteMedicationByName(name:String) {
        console.log(`DEBUG: delete medication ${name} from MedicationStore...`);

        let otherMedication;

        // create a new copy of observer object, cause mobx do strange stuff if we assign the object directly
        let medicationStoreCopy = Object.assign({}, getMedicationStore().medicationObj);

        Days.map((day) => {
            otherMedication = medicationStoreCopy[day].medicationList.filter((result) => {
                return result.name !== name
            });

            medicationStoreCopy[day].medicationList = [];
            medicationStoreCopy[day].medicationList = otherMedication;
        });

        this.updateMedication({ _id: medicationStoreCopy._id}, medicationStoreCopy).then((result) => {
            console.log(`DEBUG: updated ${result} documents.`);
        })
    }

    updateMedication(updateQuery , newMedicationObj) {
        getDateStorage().medicationObj = newMedicationObj;
        return this.db.updateAsync(updateQuery, newMedicationObj);
    }

    deleteAllMedications() {
        return this.db.removeAsync({}, { multi: true });
    }

    createNewStorageIfNotExists() {
        this.getMedications().then((result) => {
            if (result.length === 0) {
                let medications = Medications;
                this.addMedication(medications).then((result) => {
                    getMedicationStore().medicationObj = result;
                    console.log(`DEBUG: added document ${JSON.stringify(result)} to MedicationStore`);
                });
            } else {
                getMedicationStore().medicationObj = result[0];
            }
        })
    }

    static openMedicationWindow() {
        Navigation.showModal({
            stack: {
                children: [
                    {
                        component: {
                            name: 'AddMedicationScreen',
                            options: {
                                topBar: {
                                    title: {
                                        text: 'Medikament hinzufügen',
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        })

        getUiStore().medicationWindowVisible = true;
    }
}