import { action, observable } from "mobx";

/**
 * Store for date and times.
 *
 * @author Dominique Börner (dominique@mukosoft.de)
 */
export class DateService {
    @observable calendarSelection = new Date();
    @observable calendarSelectionDateId;
    @observable medicationTime;

    @action
    getMedicationTime() {
        return this.medicationTime;
    }

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
        console.debug(`Initializing DateService`)
        const date = new Date();
        this.setCalendarSelection(date);
        this.setCalendarSelectionDateId(date);
    }

    @action
    setCalendarSelectionDateId(dateObj: Date): String {
        const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const selectedDate = days[dateObj.getDay()];
        this.calendarSelectionDateId = selectedDate;
    }

    convertDateToTimeString(date: Date) {
        return `${date.getUTCHours()} : ${date.getUTCMinutes()}`;
    }

    sortTimeArray(timeArray: Array) {


        let newTimeArray = [];
        let newTimeStringArray = [];

        timeArray.map((time) => {
            let medicationTimeNumber = `${time.split(':')[0]}${time.split(':')[1]}${time.split(':')[2]}`;
            newTimeArray.push(medicationTimeNumber);
        });

        
        newTimeArray.sort((a, b) => a - b)

        
        newTimeArray.map((time) => {   
            
            let hour = time.toString().slice(0, 2);
            let minutes = time.toString().slice(2, 4);
            let seconds = time.toString().slice(4, 6);

            newTimeStringArray.push(`${hour}:${minutes}:${seconds}`);
        })

        return newTimeStringArray;

    }

    removeSecondsFromTime(timeString) {
        const hours = timeString?.split(':')[0];
        const minutes = timeString?.split(':')[1];

        return `${hours}:${minutes}`;
    }

    renderTime(time: Date) {
        let hours = time.getHours();
        let minutes = time.getMinutes();

        if ((hours) < 10) { hours = `0${hours}`} 
        if ((minutes) < 10) { minutes = `0${minutes}`} 

        return `${hours}:${minutes}:00`
    }

}

let instance: DateService;
export function getDateService() { return instance || (instance = new DateService()) }