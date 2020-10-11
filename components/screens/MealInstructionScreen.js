import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, View} from "react-native";
import {Headline, Provider as PaperProvider, Text} from "react-native-paper";
import {lightTheme} from "../../configs/PaperTheme";
import {colors} from "../../configs/colors";
import Icon from "react-native-vector-icons/FontAwesome5";


/**
 * Meal instruction screen
 *
 * @author Dominique Börner
 */
export class MealInstructionScreen extends Component {

    countInstruction = 0;

    render() {
        return (
            <PaperProvider theme={lightTheme}>
                <View style={styles.container}>
                    <ScrollView>

                        <Headline>{this.props.meal.name}</Headline>
                        <View style={styles.mealHeader}>
                            <Image source={{ uri: this.props.meal.img_url }} style={styles.imgStyle} />
                            <View style={styles.margin}>
                                <Text>{this.props.meal.nutrition_information}:</Text>
                                <Text style={styles.fontSizeMd}>{this.props.meal.fat}g</Text>
                                <Text style={styles.fatStyle}>Fett</Text>
                                <Text style={styles.fontSizeMd}>{this.props.meal.kcal}</Text>
                                <Text style={styles.kcalStyle}>Kcal</Text>
                                <Text style={styles.fontSizeMd}>{this.props.meal.protein}g</Text>
                                <Text style={styles.proteinStyle}>Eiweiß</Text>
                                <Text style={styles.fontSizeMd}>{this.props.meal.carbohydrates}g</Text>
                                <Text style={styles.carbohydratesStyle}>Kohlenhydrate</Text>
                            </View>
                        </View>
                        <View style={styles.mealInfo}>
                            { this.renderMealInfos() }
                        </View>
                        <View style={styles.mealBody}>
                            <Headline style={styles.headlineMargin}>Zutaten</Headline>
                            <Text>{ (this.props.meal.meal_amount) ? this.props.meal.meal_amount : ""}</Text>
                            { this.renderIngredients() }
                            <Headline style={styles.headlineMargin}>Anleitung</Headline>
                            { this.renderInstruction() }
                        </View>
                    </ScrollView>
                </View>
            </PaperProvider>
        )
    }

    renderInstruction() {
        return this.props.meal.instructions.map((instruction) => {
            this.countInstruction++;
            return <Text style={[styles.fontSizeMd, styles.textPadding]}>{this.countInstruction}. {instruction}</Text>
        })
    }

    renderIngredients() {
        let row = 0;

        return this.props.meal.ingredients.map((ingredient) => {
            let style = [styles.fontSizeMd, styles.textPadding];
            if (row % 2 !== 0) {
                style.push( styles.backgroundEvenRow);
            }
            row++;

            return <Text style={style}>{ingredient}</Text>
        })
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
    container: {
        flex: 1,
        flexDirection: 'column',
        margin: 10
    },
    mealHeader: {
        flex: 1,
        flexDirection: 'row'
    },
    imgStyle: {
        width: 180, height: 180,
        borderRadius: 8,
    },
    mealBody: {
        flex: 1
    },
    margin: {
        marginLeft: 10
    },
    textPadding: {
        padding: 10
    },
    headlineMargin: {
        marginTop: 10, marginBottom: 10
    },
    fatStyle: {
        color: colors.silver,
    },
    kcalStyle: {
        color: colors.green,
    },
    proteinStyle: {
        color: colors.yellow
    },
    carbohydratesStyle: {
        color: colors.red
    },
    fontSizeMd: {
        fontSize: 16
    },
    mealInfoIcon: {
        fontSize: 20,
        margin: 5
    },
    backgroundEvenRow: {
        backgroundColor: colors.turquoise_light,
        color: colors.white
    }
})