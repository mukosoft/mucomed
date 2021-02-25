import { defaultStyles } from '@configs/styles';
import { getUiService } from '@service/UiService';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Button, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton } from 'react-native-paper';
import MealService, { getMealService } from '../../service/MealService';

/**
 * Renders a List with favorite meals inside.
 * 
 * @author Dominique Börner
 */
@observer
export default class FavoriteMeals extends Component {
    render() {
        return (
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>                
                {(getMealService().favMeals.length > 0) ? getMealService().favMeals.map((meal) => {
                    return this.renderFavMealCard(meal)
                }) : <Text style={styles.noFav}>Noch keine Favoriten. Speichere jetzt Favoriten, um schnell auf interesannte Rezepte zugreifen zu können!</Text>}
            </ScrollView>
        )
    }

    renderFavMealCard(meal) {
        return <TouchableOpacity onPress={() => getUiService().showModal('RecipeInstructionScreen', meal)} key={meal._id}>
                <View style={[styles.mealCard, defaultStyles.defaultShadow]}>
                    {(meal.img) ? <Image style={styles.mealImage} source={{ uri: getUiService().convertRefToSrc(meal.img.asset._ref) }} /> : null}
                    <Text style={styles.mealName}>{meal.name}</Text>
                    <IconButton style={styles.removeButton} size={12} icon={"close"} onPress={() => getMealService().removeFavMeal(meal)} />
                </View>
            </TouchableOpacity>
    }
}

const styles = StyleSheet.create({
    scrollContainer: {
        // height: 200,
    },
    mealCard: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: getUiService().theme.background,
        margin: 10,
        marginTop: 20, marginBottom: 40,
        padding: 10,
        justifyContent: 'space-around',
        alignContent: 'space-between',
        height: 120, width: 100
    },
    mealImage: {
        borderRadius: 999,
        alignSelf: 'center',
        width: 50, height: 50,
        margin: 5
    },
    mealName: {
        textAlign: 'center',
        marginTop: 10,
        padding: 5,
        fontSize: 11
    },
    removeButton: {
        alignSelf: 'center',
        marginTop: 15
    },
    noFav: {
        width: 300,
        textAlign: 'left',
        justifyContent: 'center',
        alignSelf: 'center',
        padding: 10,
        fontSize: 14,
        fontWeight: 'bold',
        color: getUiService().theme.text
    }
})