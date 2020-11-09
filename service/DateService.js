import {action, observable} from "mobx";

/**
 * Store for date and times.
 *
 * @author Dominique Börner
 */
export class DateService {
    @observable calendarSelection = new Date();
    @observable calendarSelectionDateId;
    @observable time;

    @action
    setCalendarSelection(date) {
        this.calendarSelection = date;
        this.setCalendarSelectionDateId(date);
    }

    @action setTime(time) {
        this.time = time;
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

}

let instance: DateService;
export function getDateService() { return instance || (instance = new DateService()) }