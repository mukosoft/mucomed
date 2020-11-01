import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {ActivityIndicator, Button, Card, Provider as PaperProvider} from "react-native-paper";
import {colors} from "@configs/colors";
import {darkTheme, lightTheme} from "../../configs/PaperTheme";
import MealCard from "../MealCard";
import MealService from "../../service/MealService";
import {observer} from "mobx-react";
import {getMealStore} from "../../stores/MealStore";
import {defaultStyles} from "../../configs/styles";
import {COOKBOOK_CATEGORIES} from "../../models/FilterData";
import {getUiService} from "../../service/UiService";
import { Navigation } from 'react-native-navigation';
import BottomNavigation from './../navigation/BottomNavigation';


/**
 * Cooking Book Screen
 *
 * @author Dominique Börner
 */
@observer
export class VirtualCookbook extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    state = {
        category: 'breakfast',
        meals: null
    }

    getCookbookData() {
        fetch("https://api.mukosoft.de/recipes.json", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache'

            }
        })
            .then((response) => response.json())
            .then((json) => {
                // console.log(`DEBUG: meals from api.mukosoft.de: ${JSON.stringify(json)}`);
                this.setState({meals: json})
            })
    }

    render() {
        if (!this.state.meals) {
            this.getCookbookData();
            return ( <ActivityIndicator animating={true} color={colors.turquoise_dark} size="large"/>)
        } else {
            return (
                <PaperProvider theme={lightTheme}>
                    <View style={defaultStyles.themeContainer}>
                        <View style={defaultStyles.defaultContentContainer}>
                            <View style={styles.filter}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    {
                                        COOKBOOK_CATEGORIES.map((food) => {
                                            return <Button onPress={() => this.setCategory(food.category)}
                                                           color={ this.setSelectedColor(food.category)}>{getUiService().getTranslation(food.category)}</Button>
                                        })
                                    }
                                </ScrollView>
                            </View>
                            { this.renderFavMeals() }
                            <View style={styles.foodList}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    { this.renderMeals() }
                                </ScrollView>
                            </View>
                        </View>
                    <BottomNavigation />
                    </View>
                </PaperProvider>
            )
        }
    }

    setCategory(category) {
        this.setState({category: category})
    }

    setSelectedColor(category) {
        if (this.state.category === category) {
            return colors.orange
        }
    }

    renderMeals() {
        if (this.state.meals[this.state.category]) {
            return this.state.meals[this.state.category].map((meal) => {
                return <MealCard meal={meal} onPress={() => { MealService.openMealInstruction(meal) }} key={meal.name}/>
            })
        }
    }

    renderFavMeals() {
        if (getMealStore().favMeals.length > 0) {
            return <View style={styles.favFoodList}>
                <ScrollView horizontal={true}>
                    { getMealStore().favMeals.map((meal) => <Card>
                        <Card.Title title={meal.name} />
                    </Card> )
                    }
                </ScrollView>
            </View>
        }
    }

    navigationButtonPressed(button) {
        if (button.buttonId === 'openSettings') {
            // TODO: switch to SettingsScreen
            alert("open_settings_screen")
        }
    }
}

const styles = StyleSheet.create({
    favFoodList: {
        margin: 10,
    },
    foodList: {
        flex: 1,
        flexDirection: 'column',
        margin: 10
    },
})