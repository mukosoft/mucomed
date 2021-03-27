import Dosage from "./Dosage";
import Medication from "./Medication";

export const MedicationRequestStatus = {
    ACTIVE: "active",
    INACTIVE: "inactive"
}

/**
 * The MedicationRequest resource is used to request or order medication for a subject
 * 
 * @author Dominique Börner (dominique@mukosoft.de)
 * @see https://www.hl7.org/fhir/medicationrequest.html
 */
export default class MedicationRequest {
    status: MedicationRequestStatus = MedicationRequestStatus.ACTIVE;
    medication: Medication;
    dosageInstruction: Dosage;
}