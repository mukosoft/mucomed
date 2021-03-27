import AppContainer from '@components/common/AppContainer';
import { defaultStyles } from '@configs/styles';
import { getUiService } from '@service/UiService';
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";

/**
 * Renders the screen, showing the instruction for 
 * preparing a meal.
 *
 * @author Dominique Börner (dominique@mukosoft.de)
 */
export class RecipeInstructionScreen extends Component {
    meal;

    countInstruction = 0;

    render() {
        this.meal = this.props.componentProps;

        return (
            <AppContainer>
                <View style={styles.container}>
                    <ScrollView>
                        <View style={styles.mealHeader}>
                            <Text style={styles.mealName}>{this.meal.name}</Text>
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
                            <Text style={styles.headline}>Zutaten</Text>

                            {this.renderIngredients()}
                            <Text style={styles.headline}>Anleitung</Text>
                            {this.renderInstruction()}
                        </View>
                    </ScrollView>
                </View>
            </AppContainer>
        )
    }

    renderMealInfo() {
        return (
            <View style={styles.mealInfo}>
                <View style={[styles.mealInfoContainer, defaultStyles.defaultShadow, defaultStyles.defaultBorderRadius]}>
                    <Icon name={"hamburger"} color={getUiService().theme.primary}
                        style={(this.meal.high_fat ? styles.mealActiveInfoIcon : styles.mealInactiveInfoIcon)} />
                    <Text style={(this.meal.high_fat ? styles.mealActiveInfoText : styles.mealInactiveInfoText)}>Hochkalorisch</Text>
                </View>
                <View style={[styles.mealInfoContainer, defaultStyles.defaultShadow, defaultStyles.defaultBorderRadius]}>
                    <Icon name={"lungs"} color={getUiService().theme.primary}
                        style={(this.meal.tx_suitable ? styles.mealActiveInfoIcon : styles.mealInactiveInfoIcon)} />
                    <Text style={(this.meal.tx_suitable ? styles.mealActiveInfoText : styles.mealInactiveInfoText)}>TX-geeignet</Text>
                </View>
                <View style={[styles.mealInfoContainer, defaultStyles.defaultShadow, defaultStyles.defaultBorderRadius]}>
                    <Icon name={"carrot"} color={getUiService().theme.primary}
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
        backgroundColor: getUiService().theme.background,
        paddingBottom: 10
    },
    mealHeader: {
        flex: 1,
        flexDirection: 'column',
        padding: 40,
        paddingBottom: 40, paddingTop: 40,
        backgroundColor: getUiService().theme.primary,
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
        fontSize: 20,
        color: getUiService().theme.secondary
    },
    mealAmount: {
        color: getUiService().theme.secondary,
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
        color: getUiService().theme.text,
        fontSize: 18,
        marginLeft: 10, marginRight: 10,
        marginTop: 20, marginBottom: 20
    },
    fatStyle: {
        color: '#688596',
        fontSize: 12
    },
    kcalStyle: {
        color: '#8DB248',
        fontSize: 12
    },
    proteinStyle: {
        color: '#B79D42',
        fontSize: 12
    },
    carbohydratesStyle: {
        color: '#A42929',
        fontSize: 12
    },
    fontSizeMd: {
        fontSize: 16
    },
    mealActiveInfoIcon: {
        fontSize: 20,
        color: getUiService().theme.secondary,
        padding: 5,
        margin: 0
    },
    mealInactiveInfoIcon: {
        fontSize: 20,
        color: getUiService().theme.secondary,
        opacity: 0.25,
        padding: 5,
        margin: 0
    },
    mealActiveInfoText: {
        fontSize: 10,
        color: getUiService().theme.secondary,
        paddingBottom: 5, marginBottom: 5
    },
    mealInactiveInfoText: {
        fontSize: 10,
        color: getUiService().theme.secondary,
        opacity: 0.25,
        paddingBottom: 5, marginBottom: 5
    },
    backgroundEvenRow: {
        backgroundColor: getUiService().theme.primary,
        color:  getUiService().theme.secondary,
    },
    backgroundUnevenRow: {
        color: getUiService().theme.text,
    },
    instructionText: {
        color: getUiService().theme.text,
    }
})