import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, View, Text } from "react-native";
import { Headline, Provider as PaperProvider } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome5";

import { getUiService } from '@service/UiService';
import { defaultStyles } from '@configs/styles';
import { colors } from "@configs/colors";
import { lightTheme } from "@configs/PaperTheme";


/**
 * Renders the screen, showing the instruction for 
 * preparing a meal.
 *
 * @author Dominique Börner
 */
export class RecipeInstructionScreen extends Component {
    meal;

    countInstruction = 0;

    render() {
        this.meal = this.props.componentProps;

        return (
            <PaperProvider theme={lightTheme}>
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.mealHeader}>
                            <Headline style={styles.mealName}>{this.meal.name}</Headline>
                            <Text style={styles.mealAmount}>{(this.meal.meal_amount) ? this.meal.meal_amount : ""}</Text>
                            <View style={styles.mealInformationContainer}>
                                <View style={styles.mealInformations}>
                                    <Text style={styles.fontSizeMd}>{this.meal.fat}g</Text>
                                    <Text style={styles.fatStyle}>Fett</Text>
                                    <Text style={styles.fontSizeMd}>{this.meal.kcal}</Text>
                                    <Text style={styles.kcalStyle}>Kcal</Text>
                                    <Text style={styles.fontSizeMd}>{this.meal.protein}g</Text>
                                    <Text style={styles.proteinStyle}>Eiweiß</Text>
                                    <Text style={styles.fontSizeMd}>{this.meal.carbohydrates}g</Text>
                                    <Text style={styles.carbohydratesStyle}>Kohlenhydrate</Text>
                                </View>
                                {(this.meal.img) ? <Image style={styles.imgStyle} source={{ uri: getUiService().convertRefToSrc(this.meal.img.asset._ref) }} /> : null}
                            </View>
                                {this.renderMealInfo()}
                        </View>

                        <View style={styles.mealBody}>
                            <Headline style={styles.headline}>Zutaten</Headline>

                            {this.renderIngredients()}
                            <Headline style={styles.headline}>Anleitung</Headline>
                            {this.renderInstruction()}
                        </View>
                    </ScrollView>
                </View>
            </PaperProvider>
        )
    }

    renderMealInfo() {
        return (
        <View style={styles.mealInfo}>
            <View style={[styles.mealInfoContainer, defaultStyles.defaultShadow, defaultStyles.defaultBorderRadius]}>
                <Icon name={"hamburger"} color={colors.turquoise_light}
                style={(this.meal.high_fat ? styles.mealActiveInfoIcon : styles.mealInactiveInfoIcon)} />
                <Text style={(this.meal.high_fat ? styles.mealActiveInfoText : styles.mealInactiveInfoText)}>Hochkalorisch</Text>
            </View>
            <View style={[styles.mealInfoContainer, defaultStyles.defaultShadow, defaultStyles.defaultBorderRadius]}>
                <Icon name={"lungs"} color={colors.turquoise_light}
                style={(this.meal.tx_suitable ? styles.mealActiveInfoIcon : styles.mealInactiveInfoIcon)} />
                <Text style={(this.meal.tx_suitable ? styles.mealActiveInfoText : styles.mealInactiveInfoText)}>TX-geeignet</Text>
            </View>
            <View style={[styles.mealInfoContainer, defaultStyles.defaultShadow, defaultStyles.defaultBorderRadius]}>
                <Icon name={"carrot"} color={colors.turquoise_light}
                style={(this.meal.vegan ? styles.mealActiveInfoIcon : styles.mealInactiveInfoIcon)} />
                <Text style={(this.meal.vegan ? styles.mealActiveInfoText : styles.mealInactiveInfoText)}>Vegan</Text>
            </View>
        </View>
        )
    }

    renderInstruction() {
        return this.meal.instructions.map((instruction) => {
            this.countInstruction++;
            return <Text style={[styles.instructionText, styles.fontSizeMd, styles.textPadding]}>{this.countInstruction}. {instruction}</Text>
        })
    }

    renderIngredients() {
        let row = 0;

        return this.meal.ingredients.map((ingredient) => {
            let style = [styles.backgroundUnevenRow, styles.fontSizeMd, styles.textPadding, defaultStyles.defaultBorderRadius];
            if (row % 2 !== 0) {
                style.push(styles.backgroundEvenRow);
            }
            row++;

            return <Text style={style}>{ingredient}</Text>
        })
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10, paddingRight: 10,
        backgroundColor: colors.turquoise_dark,
        paddingBottom: 10
    },
    mealHeader: {
        flex: 1,
        flexDirection: 'column',
        padding: 40,
        paddingBottom: 40, paddingTop: 40,
        backgroundColor: colors.white,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20
    },
    mealInformationContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20
    },
    imgStyle: {
        flex: 1, aspectRatio: 1,
        borderRadius: 999,
    },
    mealName: {
        color: colors.turquoise_light
    },
    mealAmount: {
        color: colors.turquoise_light,
        fontSize: 12
    },
    mealBody: {
        flex: 1,
        marginLeft: 20, marginRight: 20
    },
    mealInformations: {
        flex: 1,
    },
    textPadding: {
        padding: 10
    },
    mealInfo: {
        flexDirection: 'row',
        marginTop: 10,
    },
    mealInfoContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        aspectRatio: 1, 
        margin: 10
    },
    headline: {
        color: colors.white,
        marginLeft: 10, marginRight: 10,
        marginTop: 20, marginBottom: 20
    },
    fatStyle: {
        color: colors.silver,
        fontSize: 12
    },
    kcalStyle: {
        color: colors.green,
        fontSize: 12
    },
    proteinStyle: {
        color: colors.yellow,
        fontSize: 12
    },
    carbohydratesStyle: {
        color: colors.red,
        fontSize: 12
    },
    fontSizeMd: {
        fontSize: 16
    },
    mealActiveInfoIcon: {
        fontSize: 20,
        color: colors.turquoise_light,
        padding: 5,
        margin: 0
    },
    mealInactiveInfoIcon: {
        fontSize: 20,
        color: colors.grey_light,
        padding: 5,
        margin: 0
    },
    mealActiveInfoText: {
        fontSize: 10,
        color: colors.turquoise_light,
        paddingBottom: 5, marginBottom: 5
    },
    mealInactiveInfoText: {
        fontSize: 10,
        color: colors.grey_light,
        paddingBottom: 5, marginBottom: 5
    },
    backgroundEvenRow: {
        backgroundColor: colors.turquoise_light,
        color: colors.white
    },
    backgroundUnevenRow: {
        color: colors.white
    },
    instructionText: {
        color: colors.white
    }
})