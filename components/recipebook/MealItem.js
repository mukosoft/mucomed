import { defaultStyles } from '@configs/styles';
import { getUiService } from '@service/UiService';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import Icon from "react-native-vector-icons/FontAwesome5";
import { getMealService } from '../../service/MealService';

/**
 * Renders an element for displaying a meal. 
 * Pressing on this element opens the RecipeInstructionScreen.
 * 
 * @author Dominique Börner
 */
@observer
export default class MealItem extends Component {
    render() {
        const filteredMeal = getMealService().getFavMeals().filter(favMeals => {
            return favMeals._id === this.props.meal._id;
        });
        
        return (
            <TouchableOpacity onPress={() => getUiService().showModal('RecipeInstructionScreen', this.props.meal)}>
                <View style={styles.cardStyle}>
                    {(this.props.meal.img) ? <Image style={styles.mealImage} source={{ uri: getUiService().convertRefToSrc(this.props.meal.img.asset._ref) }} /> : null}
                    <Text style={styles.mealName}>{this.props.meal.name}</Text>
                    <Text style={styles.mealAmount}>{this.props.meal.meal_amount}</Text>
                    {
                                

                        (filteredMeal.length > 0) ?
                            <IconButton icon={"heart"} color={getUiService().theme.primary}
                                size={22} onPress={() => getMealService().addMealToFav(this.props.meal)} key={this.props.meal._id} />
                            :
                            <IconButton icon={"heart-outline"} color={getUiService().theme.primary}
                                size={22} onPress={() => getMealService().addMealToFav(this.props.meal)} key={this.props.meal._id} />
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        margin: 5, padding: 15
    },
    mealName: {
        fontSize: 20,
        fontStyle: 'italic',
        color: getUiService().theme.primary
    },
    mealAmount: {
        fontSize: 16,
        color: getUiService().theme.primary
    },
    mealImage: {
        display: 'flex',
        height: 140,
        aspectRatio: 1,
        borderRadius: 1000,
        marginBottom: 10
    }
})