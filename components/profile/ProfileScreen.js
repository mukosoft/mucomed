import LineChart from "@components/common/LineChart";
import { defaultStyles } from "@configs/styles";
import BottomNavigation from '@navigation/BottomNavigation';
import MealService from "@service/MealService";
import { getUiService } from "@service/UiService";
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Navigation } from 'react-native-navigation';
import { ActivityIndicator, Button, Title } from "react-native-paper";

/**
 * Renders the user profile.
 *
 * @author Dominique Börner
 */
export class ProfileScreen extends Component {

    state = {
        fev_chartType: 'history',
        bmi_chartType: 'history',
        meal: null
    };

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    render() {
        if (!this.state.meal) {
            this.getRandomMeal();
            return (<ActivityIndicator animating={true} color={getUiService().theme.primary} size="large" />)
        } else {
            return (
                <View style={defaultStyles.themeContainer}>
                    <View style={defaultStyles.defaultContentContainer}>
                        <ScrollView>
                            {(!this.state.meal ? this.getRandomMeal() : this.renderRandomRecipe())}
                            <Title>Lungenfunktion - FEV1</Title>
                            <LineChart chartType={this.state.fev_chartType} />
                            <Title>{getUiService().getTranslation('medication')}</Title>
                            <View>
                                <Button mode="contained" style={styles.medikamenteBtn}>Medikamentenplan</Button>
                                <Button mode="contained" style={styles.medikamenteBtn}>Medikamentenvorrat</Button>
                            </View>
                            <Title>Berichte</Title>
                            <Button mode="contained">Zu den Berichten</Button>
                        </ScrollView>
                    </View>
                    <BottomNavigation />
                </View>
            )
        }
    }

    getRandomMeal() {
        return fetch("https://api.mukosoft.de/recipes.json", {
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
                let mealCategories = ['breakfast', "main_meal", "snack", "shakes"];
                let randomCategory = mealCategories[Math.floor(Math.random() * mealCategories.length)];

                let mealsFromRandomCategory = json[randomCategory];
                let randomMeal = json[randomCategory][Math.floor(Math.random() * mealsFromRandomCategory.length)];

                this.setState({ meal: randomMeal })
            })
    }

    renderRandomRecipe() {

        return <View>
            <Title>Hast du das schon probiert?</Title>
            <View style={styles.randomRecipeContainer}>
                <View>
                    <Image source={{ uri: this.state.meal.img_url }} style={styles.mealImg} />
                </View>

                <View style={styles.mealTextContainer}>
                    <Title>{this.state.meal.name}</Title>
                    <Text>{this.state.meal.instructions[0].substring(0, 110)} ...</Text>
                    <Button onPress={() => { MealService.openMealInstruction(this.state.meal) }}>Weiter lesen</Button>
                </View>
            </View>
        </View>
    }

    navigationButtonPressed(button) {
        if (button.buttonId === 'openSettings') {
            // TODO: switch to SettingsScreen
            alert("open_settings_screen")
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        margin: 10
    },
    randomRecipeContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 10
    },
    mealImg: {
        flex: 1,
        width: 150, aspectRatio: 1,
        borderRadius: 8
    },
    mealTextContainer: {
        flex: 1,
        marginLeft: 10,
    },
    medikamenteBtn: {
        margin: 5
    },

})