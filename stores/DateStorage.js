import {observable} from "mobx";
import DateStorageModel from "../models/DateStorageModel";
import medication from "../models/Medication";
import {DateTimeConverterService} from "../service/DateTimeConverterService";

/**
 * Store for date specific data.
 *
 * @author Dominique Börner
 */
export class DateStorage {

    // DEBUG purpose
    constructor() {
        // DateStorageService.getInstance().deleteAllDateData();
        // DateStorageService.getInstance().getDateData().then((result) => {
        //     console.log(JSON.stringify(result));
        // })
    }

    @observable selectedDate = DateTimeConverterService.formatDate(new Date());
    @observable selectedDateData = DateStorageModel;
    @observable medicationData = medication;
}

let instance: DateStorage;
export function getDateStorage() { return instance || (instance = new DateStorage()) }