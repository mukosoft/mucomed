import { action, observable } from "mobx";

import VitaldataDocument from "../documents/VitaldataDocument";
import { DateTimeConverterService } from "./DateTimeConverterService";
import Logger from './../util/Logger';

let instance;

/**
 * Service for vitaldata
 * 
 * @author Börner, Dominique(dominique@mukosoft.de)
 */
export class VitaldataService {

    @observable vitaldata = [];
    @observable chartSelectedValue: String;
    @observable chartSelectedDate: Date;
    @observable chartSelectedId: String;
    @observable chartSelectedUnit: String;


    @action
    init() {
        Logger.log('Initializing VitaldataService', 'init()');
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
            .then(() => this.getVitaldata()).then(() => Logger.success(`Successfully deleted vitaldata ${JSON.stringify(object)}`))
    }

    getBMIData() {
        const sizeData = this.getVitaldataByKey('size');
        const weightData = this.getVitaldataByKey('weight');

        const bmiArray = [];

        sizeData.forEach((size) => weightData.map((weight) => {
            if (size.date.getTime() === weight.date.getTime()) {
                const bmiObject = {};
                bmiObject.bmi = this.calculateBMI(weight.value, size.value);
                bmiObject.date = size.date;
                bmiArray.push(bmiObject);
            }
        }))

        return bmiArray;
    }

    getVitaldataByKey(key) {
        let val = this.vitaldata.filter((vitaldata) => {
            return (vitaldata.id === key)
        });

        val.sort((a, b) => a.date - b.date);

        return val;
    }


    calculateBMI(weightKg, sizeCm) {
        size = sizeCm / 100;
        return (weightKg / (size * size)).toFixed(1);
    }
}

export function getVitaldataService() { return instance || (instance = new VitaldataService()) }