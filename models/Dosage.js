import Timing from "./Timing";

/**
 * FHIR Dosage
 * 
 * @see https://www.hl7.org/fhir/dosage.html
 * @author Dominique Börner (dominique@mukosoft.de)
 */
export default class Dosage {
    patientInstruction: String = "";
    timing: Timing;
    doseAndRate: Object = {
        dose: ""
    }
}