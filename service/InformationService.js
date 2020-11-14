import { modalAnimations } from "@res/animations";
import { Navigation } from "react-native-navigation";

export default class InformationService {
    static openInformation(information) {
        Navigation.showModal({
            stack: {
                children: [
                    {
                        component: {
                            name: 'InformationArticleScreen',
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