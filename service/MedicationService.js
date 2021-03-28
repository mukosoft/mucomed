import {action, observable} from "mobx";
import MedicationDocument from "../documents/MedicationDocument";
import Medication from "../models/Medication";
import { getDateService } from "./DateService";

let instance;

export class MedicationService {
    @observable medicationSchedule = [];

    @action
    init() {
        // TODO: change later to MedicationDocument
        // MedicationDocument.getInstance().delete()
        this.updateMedicationSchedule();
    }

    /**
     * get the current medicationSchedule
     */
    // @action getMedicationSchedule() {
    //     this.medicationSchedule = MedicationDocument.getInstance().get();
    // }

    // @action getMedication(time: Array, medicationName) {
    //     let currentMedicationList = this.medicationSchedule.schedule.filter(day => { 
    //         return (day.id === getDateService().calendarSelectionDateId)
    //     })[0];
    //     let currentDayMedicationIndex = this.medicationSchedule.schedule.indexOf(currentMedicationList);


    //     let currentMedications = currentMedicationList.medicationList.filter(singleMedication => {
    //         return time.includes(singleMedication.time);
    //     })[0];
    //     let currentMedicationIndex = this.medicationSchedule.schedule[currentDayMedicationIndex].medicationList.indexOf(currentMedications);

    //     let medicationToChange = currentMedications.medications.filter(singleMedication => {
    //         return singleMedication.name === medicationName;
    //     })[0];
    //     let medicationToChangeIndex = this.medicationSchedule.schedule[currentDayMedicationIndex].medicationList[currentMedicationIndex].medications.indexOf(medicationToChange);

    //     return this.medicationSchedule.schedule[currentDayMedicationIndex].medicationList[currentMedicationIndex].medications[medicationToChangeIndex]

    // }

    /**
     * Add an MedicationObject to the schedule.
     * 
     * @param {Medication} medication 
     * @param {Date} dateObj 
     */
    @action addMedicationToSchedule(medication:Medication, dateObj:[dateObj]) {
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