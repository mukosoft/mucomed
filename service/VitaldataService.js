import { action, observable } from "mobx";

import VitaldataDocument from "../documents/VitaldataDocument";
import { DateService, getDateService } from "./DateService";
import { DateTimeConverterService } from "./DateTimeConverterService";

let instance;


export class VitaldataService {

    @observable vitaldata = [];
    @observable chartSelectedValue: String;
    @observable chartSelectedDate: Date;
    @observable chartSelectedId: String;
    @observable chartSelectedUnit: String;


    @action
    init() {
        console.debug(`Initializing VitaldataService`);
        return new Promise((resolve) => {
            this.getVitaldata();
            resolve(true);
        })
    }

    @action
    setVitaldata(vitaldata) {
        this.vitaldata = vitaldata;
    }

    @action
    addVitaldata(vitaldata) {
        VitaldataDocument.getInstance().add(vitaldata).then(() => this.getVitaldata());
    }

    @action
    getVitaldata() {
        VitaldataDocument.getInstance().get()
            .then((vitaldata) => {
                this.setVitaldata(vitaldata);
            })
    }

    @action
    deleteVitaldata(object) {
        VitaldataDocument.getInstance().delete(object)
            .then(() => this.getVitaldata()).then(() => console.debug(this.vitaldata))
    }

    getBMIData() {
        const bmiData = [];

        for (let i = 0; i < this._buildBMIObject().length; i++) {
            let bmi = parseFloat(this._buildBMIObject()[i].bmi);
            bmiData.push(bmi)
        };

        return bmiData;
    }

    getBMIDate() {
        const dateData = [];

        for (let i = 0; i < this._buildBMIObject().length; i++) {
            let date = this._buildBMIObject()[i].date;
            dateData.push(date)
        };

        return dateData;
    }

    getVitaldataByKey(key) {
        let val = this.vitaldata.filter((vitaldata) => {
            return (vitaldata.id === key)
        });

        val.sort((a, b) => a.date - b.date);

        return val;
    }

    _buildBMIObject() {
        const weightSizeArray = this.vitaldata.filter((vitaldata) => {
            return (vitaldata.id === "weight" || vitaldata.id === "size")
        });

        let bmiArray = this._groupBy(weightSizeArray, arr => DateTimeConverterService.formatDate(arr.date));
        let filteredBmiArray = [];

        for (let i of bmiArray.keys()) {
            if (bmiArray.get(i).length === 2) filteredBmiArray.push(bmiArray.get(i));
        }

        
        let newBmiArray = [];
        filteredBmiArray.map(entry => {
            let weight;
            let size;
            let date;
            
            entry.map(singleValue => {
                if (singleValue.id === "weight") weight = singleValue.value;
                if (singleValue.id === "size") size = singleValue.value;
                date = singleValue.date;
            });
            
            const bmiObject = {
                bmi: this._calculateBMI(weight, size),
                date: date
            };
            
            newBmiArray.push(bmiObject);
        });
        
        newBmiArray.sort((a, b) => a.date - b.date);

        return newBmiArray;
    }

    _calculateBMI(weightKg, sizeMeter) {
        return (weightKg / (sizeMeter * sizeMeter)).toFixed(1);
    }

    _groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
             const key = keyGetter(item);
             const collection = map.get(key);
             if (!collection) {
                 map.set(key, [item]);
             } else {
                 collection.push(item);
             }
        });
        return map;
    }

}

export function getVitaldataService() { return instance || (instance = new VitaldataService()) }