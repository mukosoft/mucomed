export const MEDICATION_STATUS = {
    ACTIVE: "active",
    INACTIVE: "inactive"
}

export default class Medication {
    id = Medication;
    status = MEDICATION_STATUS.ACTIVE;
    name = "";
    dosage = "";
    times = [];
}