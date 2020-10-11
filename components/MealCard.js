import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, IconButton} from "react-native-paper";
import {colors} from "../configs/colors";
import Icon from "react-native-vector-icons/FontAwesome5";
import {getMealStore} from "../stores/MealStore";

export default class MealCard extends Component {
    render() {
        return(
            <View>
                <Card style={styles.mealCard} onPress={this.props.onPress} key={this.props.meal.name}>
                    <Card.Cover source={{ uri: (this.props.meal) ? this.props.meal.img_url : "" }} r/>
                    <Card.Title title={(this.props.meal) ? this.props.meal.name : ""} titleStyle={styles.mealCardTitle}
                                subtitle={ this.renderMealInfos() } subtitleStyle={styles.mealInfo}
                                right={(props) => <IconButton
                                    style={ styles.addToFavBtn }
                                    color={"black"} {...props} icon={"heart-outline"} size={24} onPress={() => {
                                        this.addMealToFavorite(this.props.meal)
                                }}/>}/>
                </Card>
            </View>

        );
    }

    addMealToFavorite(meal) {
        let isAlreadyFav = false;

        getMealStore().favMeals.filter((filteredMeal) => {
            (filteredMeal.name === meal.name) ? isAlreadyFav = true : false
        });

        if (!isAlreadyFav) {
            getMealStore().favMeals.push(meal);
            // TODO: push to mongodb
        }
    }

    renderMealInfos() {
        let infos = []

        if (this.props.meal) {
            if (this.props.meal.high_fat) {
               infos.push(<Icon name={"hamburger"} color={colors.turquoise_light} style={ styles.mealInfoIcon }/>);
            }

            if (this.props.meal.tx_suitable) {
                infos.push(<Icon name={"alpha-t"} color={colors.turquoise_light} style={ styles.mealInfoIcon }/>);
            }

            if (this.props.meal.vegan) {
                infos.push(<Icon name={"carrot"} color={colors.turquoise_light} style={ styles.mealInfoIcon }/>);
            }
        }

        return infos.map((element) => {
            return element
        })
    }
}

const styles = StyleSheet.create({
    mealCard: {
        marginBottom: 10
    },
    mealInfo: {
        paddingTop: 5,
        paddingBottom: 5
    },
    mealInfoIcon: {
        fontSize: 20,
    },
    addToFavBtn: {
        marginRight: 10,
        backgroundColor: colors.white
    }
});