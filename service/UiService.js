import i13n from "@configs/i13n";
import { LightTheme } from '@res/colors';
import { action, observable } from "mobx";
import { Navigation } from "react-native-navigation";
import { getSettingsService } from "./SettingsService";

/**
 * Stores basic UI configurations, handles translation and theme
 *
 * TODO: make global toast notification visible
 *
 * @author Dominique Börner (dominique@mukosoft.de)
 */
export class UiService {
    @observable theme = new LightTheme();
    @observable language_text = i13n;
    @observable medicationCreationVisible = false;
    @observable navigationActivePage;

    @action
    getTranslation(key) {
        return this.language_text[getSettingsService().getCurrentLanguage()][key.toLowerCase()] || "";
    }

    @action 
    openMedicationCreation() {
        this.medicationCreationVisible = true;
    }

    @action 
    hideMedicationCreation() {
        this.medicationCreationVisible = false;
    }
    @action
    init() {
        console.debug(`Initializing UiService`);
        return new Promise((resolve) => resolve(true));
    }

    convertRefToSrc(ref) {
        const baseURL = 'https://cdn.sanity.io/images//2ueyhz9s/production/';
        const imageID = ref.split('-')[1];
        const imageSize = ref.split('-')[2];
        const imageType = ref.split('-')[3];

        const src = `${baseURL}${imageID}-${imageSize}.${imageType}`;

        return src;
    }

    shortenString(string: String, chars: Number) {
        if (string.length > chars) {
            return `${string.substr(0, chars)}...`;
        }

        return string;
    }

    navigateToComponent(componentId) {
        if (componentId !== this.navigationActivePage) {
            this.navigationActivePage = componentId;

            Navigation.setStackRoot("MainStack", {
                component: {
                    name: componentId,
                    options: {
                        topBar: {
                            visible: false
                        },
                        animations: {
                            push: {
                                content: {
                                    alpha: {
                                        from: 0,
                                        to: 1,
                                        duration: 250
                                    }
                                }
                            }
                        }
                    }
                }
            });
        }
    }

    showModal(componentId, props = null, topBarText = "") {
        Navigation.showModal({
            stack: {
                children: [{
                    component: {
                        name: componentId,
                        passProps: {
                            componentProps: props
                        },
                        options: {
                            topBar: {
                              visible: false
                            }
                        }
                    },
                }]

            }
        });
    }
}

let instance;
export function getUiService() { return instance || (instance = new UiService()) }