import blood from "@assets/icons/blood.png"
import bloodPressure from "@assets/icons/blood-pressure.png"
import height from "@assets/icons/height.png"
import lungs from "@assets/icons/lungs.png"
import badBreath from "@assets/icons/bad-breath.png"
import thermometer from "@assets/icons/thermometer.png"
import weight from "@assets/icons/weight.png"

export class Vitaldata {
    id;
    unit;
    value;
    date;
    time;
}

export const VITALDATA_MODEL= [
    {
        id: "weight",
        title: "Gewicht",
        unit: "Kg",
        img: weight
    },
    {
        id: "size",
        title: "Größe",
        unit: "cm",
        img: height
    },
    {
        id: "fev1",
        title: "FEV1",
        unit: "%",
        img: lungs
    },
    {
        id: "bloodPressure",
        title: "Blutdruck",
        unit: "%",
        img: bloodPressure
    },
    {
        id: "bloodSugar",
        title: "Blutzucker",
        unit: "%",
        img: blood
    },
    {
        id: "temperature",
        title: "Temperatur",
        unit: "°C",
        img: thermometer
    },
    {
        id: "oxygenSaturation",
        title: "Sauerstoffsättigung",
        unit: "%",
        img: badBreath
    },
];