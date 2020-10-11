import {action, observable} from "mobx";
import DateStorageModel from "../models/DateStorageModel";
import medication from "../models/Medication";
import {DateTimeConverterService} from "../service/DateTimeConverterService";

/**
 * Store for date and times.
 *
 * @author Dominique Börner
 */
export class DateStorage {
    @observable selectedDate = DateTimeConverterService.formatDate(new Date());

    @action
    setSelectedDate(date) {
        this.selectedDate = DateTimeConverterService.formatDate(date);
    }

    @action
    getSelectedDate() {
        return this.selectedDate;
    }

}

let instance: DateStorage;
export function getDateStorage() { return instance || (instance = new DateStorage()) }