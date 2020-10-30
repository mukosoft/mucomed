import {action, observable} from "mobx";
import MedicationSchedule from "../models/MedicationSchedule";

let instance;

export class MedicationStore {

    constructor() {
        // MedicationService.getInstance().deleteAllMedications();
    }

    @observable medicationSchedule = MedicationSchedule;

    @action
    init() {
        // TODO: Load medications for initial date
    }

}

export function getMedicationStore() { return instance || (instance = new MedicationStore()) }