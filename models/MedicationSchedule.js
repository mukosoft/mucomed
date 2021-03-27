import Dosage from "./Dosage";
import Medication, { MEDICATION_FORM } from "./Medication"
import MedicationRequest from "./MedicationRequest";
import Timing from "./Timing";


let exampleMedication = new Medication();
exampleMedication.name = "Ursofalk";
exampleMedication.form = MEDICATION_FORM[0].form;

let exampleTiming = new Timing();
exampleTiming.repeat.dayOfWeek = ["monday", "tuesday"];
exampleTiming.repeat.timeOfDay = ["12:00:00", "18:00:00", "06:00:00"];

let exampleDosage = new Dosage();
exampleDosage.patientInstruction = "Vor der Mahlzeit einnehmen."
exampleDosage.timing = exampleTiming;

let exampleMedicationRequest = new MedicationRequest();
exampleMedicationRequest.medication = exampleMedication;
exampleMedicationRequest.dosageInstruction = exampleDosage;

let exampleMedication2 = new Medication();
exampleMedication2.name = "ACC";
exampleMedication2.form = MEDICATION_FORM[0].form;

let exampleTiming2 = new Timing();
exampleTiming2.repeat.dayOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
exampleTiming2.repeat.timeOfDay = ["12:00:00", "20:00:00"];

let exampleDosage2 = new Dosage();
exampleDosage2.patientInstruction = "In Wasser auflösen."
exampleDosage2.doseAndRate.dose = "600 mg"
exampleDosage2.timing = exampleTiming2;

let exampleMedicationRequest2 = new MedicationRequest();
exampleMedicationRequest2.medication = exampleMedication2;
exampleMedicationRequest2.dosageInstruction = exampleDosage2;


/**
 * medications are stored here
 *
 * - day:Object
 * - time:array
 * - medication<Medication>
 *
 * @author Dominique Börner (dominique@mukosoft.de)
 */

export default [exampleMedicationRequest, exampleMedicationRequest2];