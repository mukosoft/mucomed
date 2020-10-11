import React, {Component} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from "react-native";
import {colors} from "@configs/colors";
import {observer} from "mobx-react";
import {getDateStorage} from "../../stores/DateStorage";
import {Card, Text} from "react-native-paper";

/**
 *
 * @author Dominique Börner
 */
@observer
export default class MealList extends Component {
    render() {
        return(
            <SafeAreaView>
                <ScrollView horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            ref={ref => this.scrollView = ref}
                            style={styles.mealList}>
                    { /* TODO: Filter element for times */}
                    { this.showMeals() }
                </ScrollView>
            </SafeAreaView>
        );
    }

    showMeals() {
        console.log(this.props.meals)
        if (this.props.meals.length > 0) {
            let todayMeals = this.props.meals.filter((meal) => {
                return meal.date === getDateStorage().selectedDate;
            })

            return todayMeals.map((meal) => {
               return <Card style={styles.mealCard} key={Math.random()}>
                   <Card.Title title={meal.name} titleStyle={styles.name}/>
                   <Card.Content>
                       <Text style={styles.amount}>{meal.amount}</Text>
                   </Card.Content>
               </Card>
            });
        }
    }
}

const styles = StyleSheet.create({
    mealList: {},
    mealCard: {
        minWidth: 100,
        aspectRatio: 1,
        margin: 5,
        padding: 0,
        backgroundColor: colors.turquoise_light,
    },
    name: {
        color: colors.white
    },
    amount: {
        color: colors.white
    },
});