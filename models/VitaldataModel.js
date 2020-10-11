export const vitaldataModel = {
    date:String,
    body: {
      weight:Number,
      size:Number
    },
    lung: {
        fev1:Number
    }
}

/**
 * TODO: Temperatur
 *
 */
export const VITALDATA = [
    {
        id: "weight",
        title: "Gewicht",
        icon: "weight-kilogram",
        unit: "Kg",
    },
    {
        id: "size",
        title: "Größe",
        icon: "account",
        unit: "cm",
    },
    {
        id: "fev1",
        title: "FEV1",
        icon: "account",
        unit: "%",
    },
];