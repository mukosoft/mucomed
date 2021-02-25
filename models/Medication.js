import pillIcon from '@assets//icons/meds.png';
import inhaleIcon from '@assets//icons/inhalator.png';
import injectionIcon from '@assets//icons/injection.png';
import otherIcon from '@assets/icons/medicine.png';

export const MEDICATION_STATUS = {
    ACTIVE: "active",
    INACTIVE: "inactive"
}

export const MEDICATION_FORM = [
    {
        form: "pill",
        icon: pillIcon
    },
    {
        form: "inhale",
        icon: inhaleIcon
    },
    {
        form: "injection",
        icon: injectionIcon
    },
    {
        form: "other",
        icon: otherIcon
    },
];

export default class Medication {
    id = Medication;
    status = MEDICATION_STATUS.ACTIVE;
    name = "";
    dosage = "";
    description = "";
    times = [];
    form: String = MEDICATION_FORM.OTHER;
}