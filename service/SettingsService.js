import { action, observable } from "mobx";
import { CALENDAR_DEFAULT_DATE_AMOUNT } from "../configs/config";
import SettingsDocument from "../documents/SettingsDocument";
import { LANGUAGES } from "../models/Languages";

/**
 * Service for managing user settings.
 *
 * @author Dominique Börner (dominique@mukosoft.de)
 */
export class SettingsService {
    @observable calendarDateAmount = CALENDAR_DEFAULT_DATE_AMOUNT;

    init() {
        let data = [];

        SettingsDocument.getInstance().get().then(data => {
            console.debug(`Load SettingsData: ${JSON.stringify(data)}`);
            data = data});

        if (data.length < 1) {
            console.debug("Populate SettingsDocument with initial settings.");
            this._addInitialSettings();
        }

    }

    _addInitialSettings() {
        SettingsDocument.getInstance().add({ id: "calendarDateAmount", value: CALENDAR_DEFAULT_DATE_AMOUNT});
        SettingsDocument.getInstance().add({ id: "language", value: LANGUAGES.english});
    }

    /**
     * Check, if an value exists in SettingsDocument. 
     * If not, adds this setting to SettingsDocument.
     * 
     * @param {String} id 
     * @param {String} value 
     */
    _addAdditionalSetting(id, value) {
        const filter = this.data.filter(setting => {
            setting.id === id
        });

        if (filter.length > 1) {
            SettingsDocument.getInstance().add({ id: key, value: value});
        }
    }
}

let instance;
export function getSettingsService() { return instance || (instance = new SettingsService()) }