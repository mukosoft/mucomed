import { action, observable } from "mobx";

/**
 * Store for date and times.
 *
 * @author Dominique Börner
 */
export class DateService {
    @observable calendarSelection = new Date();
    @observable calendarSelectionDateId;
    @observable medicationTime;

    @action
    setCalendarSelection(date) {
        this.calendarSelection = date;
        this.setCalendarSelectionDateId(date);
    }

    @action setMedicationTime(medicationTime) {
        this.medicationTime = medicationTime;
    }

    @action
    isDate(date) {
        return date.getDay() === this.calendarSelection.getDay();
    }

    @action
    init() {
        const date = new Date();
        this.setCalendarSelection(date);
        this.setCalendarSelectionDateId(date);
    }

    @action
    setCalendarSelectionDateId(dateObj:Date):String {
        const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const selectedDate = days[dateObj.getDay()];
        this.calendarSelectionDateId = selectedDate;
    }

    convertDateToTimeString(date:Date) {
        return `${date.getUTCHours()} : ${date.getUTCMinutes()}`;
    }

}

let instance: DateService;
export function getDateService() { return instance || (instance = new DateService()) }