import {Navigation} from "react-native-navigation";
import {modalAnimations} from "../configs/animations";

export default class MealService {
    static openMealInstruction(meal) {
        Navigation.showModal({
            stack: {
                children: [
                    {
                        component: {
                            name: 'MealInstructionScreen',
                            passProps: {
                                meal: meal
                            },
                            options: {
                                topBar: {
                                    title: {
                                        text: 'Rezept',
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