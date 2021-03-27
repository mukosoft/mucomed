import { getUiService } from '@service/UiService';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import { alignContent, alignSelf, borderRadius, flex, fontSize, height, justifyContent, margin, padding, shadow, textAlign, width } from '../../configs/styles';
import { getMealService } from '../../service/MealService';

/**
 * Renders a List with favorite meals inside.
 * 
 * @author Dominique Börner (dominique@mukosoft.de)
 */
@observer
export default class FavoriteMeals extends Component {

    render() {
        if (getMealService().favMeals.length > 0) {
            return (
                <View style={favMealContainer}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>                
                        { getMealService().favMeals.map((meal) => {
                            return this.renderFavMealCard(meal)
                        })}
                    </ScrollView>
                </View>
            )
        }

        return <></>
        
    }

    renderFavMealCard(meal) {
        return <TouchableOpacity onPress={() => getUiService().showModal('RecipeInstructionScreen', meal)} key={meal._id}>
                <View style={mealCard}>
                    {(meal.img) ? <Image style={mealImage} source={{ uri: getUiService().convertRefToSrc(meal.img.asset._ref) }} /> : null}
                    <Text style={mealName}>{meal.name}</Text>
                    <IconButton style={removeButton} size={fontSize.lg.fontSize} icon={"close"} onPress={() => getMealService().removeFavMeal(meal)} />
                </View>
            </TouchableOpacity>
    }
}

const favMealContainer = StyleSheet.flatten([
    height.height_150,
    padding.padding_3
])

const mealCard = StyleSheet.flatten([
    flex.flexCol,
    margin.margin_3,
    padding.padding_3,
    borderRadius.roundedSM,
    shadow.shadowMD,
    height.height_125,
    width.width_100,
    justifyContent.justifyAround,
    alignContent.contentBetween,
])

const mealImage = StyleSheet.flatten([
    borderRadius.roundedFull,
    alignSelf.selfCenter,
    width.width_50,
    height.height_50,
])

const mealName = StyleSheet.flatten([
    textAlign.textCenter,
    margin.margin_y_2,
    padding.padding_1,
    fontSize.sm
])

const removeButton = StyleSheet.flatten([
    flex.flex_1,
    alignSelf.selfCenter,
])