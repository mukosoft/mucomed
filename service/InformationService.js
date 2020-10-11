import {Navigation} from "react-native-navigation";
import {modalAnimations} from "../configs/animations";

export default class InformationService {
    static openInformation(information) {
        Navigation.showModal({
            stack: {
                children: [
                    {
                        component: {
                            name: 'InformationPostScreen',
                            passProps: {
                                information: information
                            },
                            options: {
                                topBar: {
                                    title: {
                                        text: 'Information',
                                    },
                                },
                                animations: modalAnimations
                            },
                        },
                    },
                ],
            },
        })
    }
}