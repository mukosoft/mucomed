import {Navigation} from "react-native-navigation";
import {getUiStore} from "../stores/UiStore";

export default class VitaldataService {

    static openVitaldataWindow() {
        Navigation.showModal({
            stack: {
                children: [
                    {
                        component: {
                            name: 'VitaldataScreen',
                            options: {
                                topBar: {
                                    title: {
                                        text: 'Vitaldaten erfassen',
                                    },
                                },
                            },
                        },
                    },
                ],
            },
        })
    }
}

