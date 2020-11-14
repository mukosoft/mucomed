import { modalAnimations } from "@res/animations";
import { Navigation } from "react-native-navigation";

export default class MealService {
    static openMealInstruction(meal) {
        Navigation.showModal({
            stack: {
                children: [
                    {
                        component: {
                            name: 'RecipeInstructionScreen',
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