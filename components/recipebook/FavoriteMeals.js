import { getUiService } from '@service/UiService';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import { alignItems, alignSelf, borderRadius, flex, fontSize, height, justifyContent, margin, padding, shadow, textAlign, width } from '../../configs/styles';
import { getMealService } from '../../service/MealService';
import Text from "@components/common/Text";

/**
 * Renders a List with favorite meals inside. 
 * Favorite meals are coming from MealService.
 * 
 * @see MealService
 * @author Dominique Börner (dominique@mukosoft.de)
 */
@observer
export default class FavoriteMeals extends Component {

    render() {
        if (getMealService().favMeals.length > 0) {
            return (
                <View style={favListContainer}>

                    { getMealService().favMeals.length > 0 && <Text heading>{getUiService().getTranslation("recipe_favorites")}</Text>}
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {getMealService().favMeals.map((meal) => {
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
            <View style={favMealContainer}>
                <View style={mealCard}>
                    {(meal.img) ? <Image style={mealImage} source={{ uri: getUiService().convertRefToSrc(meal.img.asset._ref) }} /> : null}
                    <Text heading style={mealName}>{getUiService().shortenString(meal.name, 20)}</Text>
                </View>
                <IconButton style={removeButton} size={fontSize.lg.fontSize} icon={"close"} onPress={() => getMealService().removeFavMeal(meal)} />
            </View>
        </TouchableOpacity>
    }
}

// style defintions

const favListContainer = StyleSheet.flatten([
    padding.padding_3,
    justifyContent.justifyBetween,
    alignItems.itemsCenter
])

const favMealContainer = StyleSheet.flatten([
    flex.flexCol,
    justifyContent.justifyAround,
    borderRadius.roundedSM,
    shadow.shadowSM,
    height.height_125,
    width.width_100,
    margin.margin_3,
    padding.padding_x_3,
    padding.padding_y_1,
])

const mealCard = StyleSheet.flatten([
    flex.flexCol,
    alignItems.itemsCenter,
    height.height_75
])

const mealImage = StyleSheet.flatten([
    borderRadius.roundedFull,
    alignSelf.selfCenter,
    width.width_50,
    height.height_50,
])

const mealName = StyleSheet.flatten([
    textAlign.textCenter,
    fontSize.sm
])

const removeButton = StyleSheet.flatten([
    height.height_25,
    flex.flex_1,
    alignSelf.selfCenter,
])