import pillIcon from '@assets//icons/meds_primary.png';
import inhaleIcon from '@assets//icons/inhalator_primary.png';
import injectionIcon from '@assets//icons/injection_primary.png';
import otherIcon from '@assets/icons/medicine_primary.png';

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
    identifier: String = "Medication";
    name: String = "";
    form: String = MEDICATION_FORM.OTHER;
}