import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { observer } from "mobx-react";
import { Navigation } from 'react-native-navigation';
import { Button } from "react-native-paper";

import BottomNavigation from '@navigation/BottomNavigation';
import MealItem from '@components/recipebook/MealItem';
import { getUiService } from "@service/UiService";
import { defaultStyles } from "@configs/styles";
import { API_BASE_URL } from '@configs/config';
import { COOKBOOK_CATEGORIES } from "@models/FilterData";
import AppContainer from '@components/common/AppContainer';
import { getMealService } from '../../service/MealService';
import FavoriteMeals from './FavoriteMeals';
import Title from '../common/Title';

/**
 * Renders the screen, containing the recipes.
 *
 * @author Dominique Börner
 */
@observer
export class RecipeBookScreen extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
        this.getCookbookData();
    }

    state = {
        category: 'breakfast',
        meals: []
    }

    getCookbookData() {
        fetch(`${API_BASE_URL}query=*[_type%20=="meals"]`)
            .then(response => response.json())
            .then(data => this.setState({ meals: data }))
    }

    render() {
        return (
            <AppContainer>
                <Title>Deine Favoriten</Title>
                <FavoriteMeals key={'favmeals'} />
                <View style={styles.categoryContainer}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {
                            COOKBOOK_CATEGORIES.map((food) => {
                                return <Button onPress={() => this.setCategory(food.category)} key={food.category}
                                    color={this.setSelectedColor(food.category)}>{getUiService().getTranslation(food.category)}</Button>
                            })
                        }
                    </ScrollView>
                </View>
                <ScrollView style={defaultStyles.defaultContentContainer}>
                    <View style={styles.foodList}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {this.renderMeals()}
                        </ScrollView>
                    </View>
                </ScrollView>
                <BottomNavigation />
            </AppContainer>
        );
    }

    setCategory(category) {
        this.setState({ category: category })
    }

    setSelectedColor(category) {
        if (this.state.category === category) {
            return getUiService().theme.active
        } else {
            return getUiService().theme.primary
        }
    }

    renderMeals() {
        if (this.state.meals.result) {
            let meals = this.state.meals.result.filter(meal => {
                return meal.category === this.state.category;
            });

            return meals.map(meal => {
                return <MealItem meal={meal} key={meal.name} />
            })

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
    categoryContainer: {
        display: 'flex',
        height: 40,
    },
    foodList: {
        display: 'flex',
        flexDirection: 'row',
        height: 560
    },
})