import { action, observable } from "mobx";

import MedicationDocument from "../documents/MedicationDocument";

let instance;

/**
 * Service for medications
 * 
 * This services hold the medicationSchedule data. 
 * @author Börner, Dominique (dominique@mukosoft.de)
 */
export class MedicationService {
    @observable medicationSchedule = [];

    @action
    init() {
        console.log('Initializing MedicationService', 'init()');
        return new Promise((resolve) => {
            this.updateMedicationSchedule();
            resolve(true);
        })
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