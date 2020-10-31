import {action, observable} from "mobx";
import MedicationDocument from "../documents/MedicationDocument";
import Medication from "../models/Medication";
import MedicationSchedule from "../models/MedicationSchedule";
import { getDateStorage } from "./DateStorage";

let instance;

export class MedicationService {
    @observable medicationSchedule = MedicationSchedule;

    @action
    init() {
        // TODO: Load medications for initial date
    }

    /**
     * get the current medicationSchedule
     */
    @action getMedicationSchedule() {
        this.medicationSchedule = MedicationDocument.getInstance().get();
    }

    /**
     * Add an MedicationObject to the schedule.
     * 
     * @param {Medication} medication 
     * @param {Date} dateObj 
     */
    @action addMedicationToSchedule(medication:Medication, dateObj:[dateObj]) {
        dateObj.map(day => {
            const dayId = getDateStorage().getDateId(day);

            this.medicationSchedule.schedule[dayId].medicationList.push(medication);
        })

        MedicationDocument.getInstance().update({}, this.medicationSchedule);
    }
}

export function getMedicationService() { return instance || (instance = new MedicationService()) }