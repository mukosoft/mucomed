import Dosage from "./Dosage";
import Medication from "./Medication";

// aviable medication status.
export const MedicationRequestStatus = {
    ACTIVE: "active",
    INACTIVE: "inactive"
}

/**
 * FHIR MedicationRequest.
 * The MedicationRequest resource is used to request or order medication for a subject
 * 
 * @see https://www.hl7.org/fhir/medicationrequest.html
 * @author Dominique Börner (dominique@mukosoft.de)
 */
export default class MedicationRequest {
    status: MedicationRequestStatus = MedicationRequestStatus.ACTIVE;
    medication: Medication;
    dosageInstruction: Dosage;
}