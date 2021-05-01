import { action, observable } from "mobx";
import MedicationDocument from "../documents/MedicationDocument";
import Dosage from "../models/Dosage";
import Medication from "../models/Medication";
import MedicationRequest from "../models/MedicationRequest";
import Timing from "../models/Timing";
import { getDateService } from "./DateService";

let instance;

export class MedicationService {
    @observable medicationSchedule = [];

    @action
    init() {
        return new Promise((resolve) => {
            this.updateMedicationSchedule();
            resolve(true);
        })
    }

    /**
     * Add an MedicationObject to the schedule.
     * 
     * @param {Medication} medication 
     * @param {Date} dateObj 
     */
    @action addMedicationToSchedule(medication: Medication, dateObj: [dateObj]) {
        dateObj.map(day => {
            const dayId = getDateService().getDateId(day);

            this.medicationSchedule.schedule[dayId].medicationList.push(medication);
        })

        MedicationDocument.getInstance().update({}, this.medicationSchedule);
    }

    @action
    addMedicationRequest(medicationRequest) {
        MedicationDocument.getInstance().add(medicationRequest).then(() => this.updateMedicationSchedule());
    }

    @action
    deleteMedicationRequest(medicationRequest) {
        MedicationDocument.getInstance().delete(medicationRequest).then(() => this.updateMedicationSchedule());
    }

    updateMedicationSchedule() {
        MedicationDocument.getInstance().get().then((medicationSchedule) => {
            this.medicationSchedule = medicationSchedule
        });
    }
}

export function getMedicationService() { return instance || (instance = new MedicationService()) }