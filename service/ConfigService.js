import { action, observable } from "mobx";

/**
 * FIXME:
 *
 * @author Dominique Börner
 */
export class ConfigService {
    @observable calendarDateAmount = 7;
}

let instance;
export function getConfigService() { return instance || (instance = new ConfigService()) }