import medication from "./Medication";
import meals from "./Meals";
import Medications from "./Medications";

/**
 * TODO'S:
 *
 */

export default {
    date: {},
    data: {
        medication: Medications,
        meals: [],
        drink_ml: 0,
        vital_data: {
            body: {
                weight: null,
                size: null,
            },
            lungs: {
                fev1: "",
            }
        },
    },
}