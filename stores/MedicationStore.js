import {action, observable} from "mobx";
import Medications from "../models/Medications";
import Days from "../models/Days";
import {UiStore} from "./UiStore";
import MedicationService from "../service/MedicationService";

let instance;

export class MedicationStore {

    constructor() {
        // MedicationService.getInstance().deleteAllMedications();
    }

    @observable medicationObj = Medications;

    @action
    addMedication(days:Array<Days>, times:Array) {
        days.map((day) => {
            times.map((time) => {
                this.medicationObj[day].push(time);
            })
        })
    }
}

export function getMedicationStore() { return instance || (instance = new MedicationStore()) }