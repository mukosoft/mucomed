import {observable} from "mobx";
import DateStorageModel from "../models/DateStorageModel";
import medication from "../models/Medication";
import {DateTimeConverterService} from "../service/DateTimeConverterService";
import DateStorageService from "../service/DateStorageService";

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

    // selection from calendar
    @observable selectedDate = DateTimeConverterService.formatDate(new Date());
    @observable selectedDateData = DateStorageModel;
    @observable medicationData = medication;
}

let instance: DateStorage;
export function getDateStorage() { return instance || (instance = new DateStorage()) }