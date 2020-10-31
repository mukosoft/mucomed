import Medication from "./Medication"

// TODO: REMOVE
let exampleMedication = new Medication();

exampleMedication.name = "Ursofalk";
exampleMedication.dosage = "250mg";
exampleMedication.times = ["07:00", "21:00"];
exampleMedication.status = "active";



let exampleMedication2 = new Medication();

exampleMedication2.name = "ACC";
exampleMedication2.dosage = "600mg";
exampleMedication2.times = ["21:00"];
exampleMedication2.status = "active";


/**
 * medications are stored here
 *
 * - day:Object
 * - time:array
 * - medication<Medication>
 *
 * @author Dominique Börner
 */
export default {
    id: "medication_schedule",
    schedule: [
        {
            id: "monday",
            medicationList: [
                {
                    id: "single_medication",
                    time: "07:00",
                    medications: [exampleMedication]
                }
            ]
        },
        {
            id: "tuesday",
            medicationList: [
                {
                    id: "single_medication",
                    time: "07:00",
                    medications: [exampleMedication]
                }
            ]
        },
        {
            id: "wednesday",
            medicationList: [
                {
                    id: "single_medication",
                    time: "07:00",
                    medications: [exampleMedication]
                }
            ]
        },
        {
            id: "thursday",
            medicationList: [
                {
                    id: "single_medication",
                    time: "07:00",
                    medications: [exampleMedication, exampleMedication2]
                },
                {
                    id: "single_medication",
                    time: "12:00",
                    medications: [exampleMedication]
                }
            ]
        },
        {
            id: "friday",
            medicationList: []
        },
        {
            id: "saturday",
            medicationList: [
                {
                    id: "single_medication",
                    time: "09:00",
                    medications: [exampleMedication]
                },
                {
                    id: "single_medication",
                    time: "12:00",
                    medications: [exampleMedication, exampleMedication2]
                },
                {
                    id: "single_medication",
                    time: "15:00",
                    medications: [exampleMedication2]
                },
                {
                    id: "single_medication",
                    time: "20:00",
                    medications: [exampleMedication, exampleMedication, exampleMedication2]
                }
            ]
        },
        {
            id: "sunday",
            medicationList: [
                {
                    id: "single_medication",
                    time: "07:00",
                    medications: [exampleMedication]
                }
            ]
        },
    ],
}