import {action, observable} from "mobx";

let instance;

export class VitaldataService {

    constructor() {
    }

    @observable vitaldataObj = {};
    @observable healthCondition = "";

    @action setHealthCondition(healthCondition) {
        this.healthCondition = healthCondition;
        // TODO: update in mongoDB
    }

    init() {}

}

export function getVitaldataService() { return instance || (instance = new VitaldataService()) }