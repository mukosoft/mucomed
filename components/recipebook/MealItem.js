import { getUiService } from '@service/UiService';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { getMealService } from '../../service/MealService';
import { alignContent, alignItems, aspectRatio_1_1, borderRadius, flex, fontSize, justifyContent, margin, padding, shadow, width } from '../../configs/styles';
import Text from "@components/common/Text";

/**
 * Renders an element for displaying a meal. Pressing on this 
 * element opens the RecipeInstructionScreen.
 * 
 * @property {Object} meal - meal, coming from back-end
 * @author Dominique Börner (dominique@mukosoft.de)
 */
@observer
export default class MealItem extends Component {
    render() {
        const filteredMeal = getMealService().getFavMeals().filter(favMeals => {
            return favMeals._id === this.props.meal._id;
        });

        return (
            <TouchableOpacity onPress={() => getUiService().showModal('RecipeInstructionScreen', this.props.meal)}>
                <View style={cardStyle}>
                    {(this.props.meal.img) && <Image style={mealImage} source={{ uri: getUiService().convertRefToSrc(this.props.meal.img.asset._ref) }} />}
                    <View style={cardContentContainer}>
                        <Text heading>{this.props.meal.name}</Text>
                        <Text>Für {this.props.meal.meal_amount}</Text>
                        {


                            (filteredMeal.length > 0) ?
                                <IconButton icon={"heart"} color={getUiService().theme.primary}
                                    size={22} onPress={() => getMealService().addMealToFav(this.props.meal)} key={this.props.meal._id} />
                                :
                                <IconButton icon={"heart-outline"} color={getUiService().theme.primary}
                                    size={22} onPress={() => getMealService().addMealToFav(this.props.meal)} key={this.props.meal._id} />
                        }
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

// style defintions

const cardStyle = StyleSheet.flatten([
    margin.margin_4,
    { width: "70%" },
    justifyContent.justifyCenter,
    alignItems.itemsCenter,
    flex.flexCol,
    shadow.shadowSM
])

const mealImage = StyleSheet.flatten([
    { width: "100%" },
    aspectRatio_1_1,
    borderRadius.roundedMD
])

const cardContentContainer = StyleSheet.flatten([
    flex.flexCol,
    margin.margin_y_4,
    justifyContent.justifyCenter,
    alignItems.itemsCenter
])