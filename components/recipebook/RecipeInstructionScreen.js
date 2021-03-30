import AppContainer from '@components/common/AppContainer';
import { defaultStyles } from '@configs/styles';
import { getUiService } from '@service/UiService';
import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { alignItems, aspectRatio_1_1, border, borderRadius, flex, fontSize, height, justifyContent, margin, padding, textAlign, width } from "../../configs/styles";
import Text from "@components/common/Text";
import { Infobox } from '../common/Infobox';

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
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={mealHeader}>
                            <Text title style={mealName}>{this.meal.name}</Text>
                            <Text heading style={mealAmount}>{(this.meal.meal_amount) ? this.meal.meal_amount : ""}</Text>
                            <View style={mealInformationContainer}>
                                <View style={mealInformations}>
                                    <View style={information}>
                                        <Text heading>{this.meal.fat} g</Text>
                                        <Text style={styles.fatStyle}>Fett</Text>
                                    </View>
                                    <View style={information}>
                                        <Text heading>{this.meal.kcal}</Text>
                                        <Text style={styles.kcalStyle}>Kcal</Text>
                                    </View>
                                    <View style={information}>
                                        <Text heading>{this.meal.protein}g</Text>
                                        <Text style={styles.proteinStyle}>Eiweiß</Text>
                                    </View>
                                    <View style={information}>
                                        <Text heading>{this.meal.carbohydrates} g</Text>
                                        <Text style={styles.carbohydratesStyle}>Kohlenhydrate</Text>
                                    </View>
                                </View>
                                {(this.meal.img) ? <Image style={mealImage} source={{ uri: getUiService().convertRefToSrc(this.meal.img.asset._ref) }} /> : null}
                            </View>
                            {this.renderMealInfo()}
                        </View>
                        <View style={[padding.padding_3, margin.margin_y_1]}>
                            {this.renderIngredients()}
                            {this.renderInstruction()}
                        </View>
                    </ScrollView>
            </AppContainer>
        )
    }

    renderMealInfo() {
        // todo: from settingsService
        const creonIntake = 3000 * this.meal.fat;

        return (
            <View style={[flex.flexCol, justifyContent.justifyCenter, alignItems.itemsStart]}>
                <View>
                    <Infobox>
                        <Text style={margin.margin_x_3}>Für die Mahlzeit benötigst du {creonIntake} Einheiten Kreon.
                        Dies entspricht {this.getCreonPills(creonIntake)} x 25.000er Kapseln.</Text>
                    </Infobox>
                    <Text heading style={textAlign.textCenter}>Weitere informationen</Text>
                </View>
                <View style={styles.mealInfo}>
                    {this.meal.high_fat && <View style={[mealInfoContainer, (this.meal.high_fat && { backgroundColor: getUiService().theme.primary })]}>
                        <Icon name={"hamburger"} color={getUiService().theme.secondary} size={20} />
                        <Text heading style={(this.meal.high_fat ? styles.mealActiveInfoText : styles.mealInactiveInfoText)}>Hochkalorisch</Text>
                    </View>}
                    {this.meal.tx_suitable && <View style={[mealInfoContainer, (this.meal.tx_suitable && { backgroundColor: getUiService().theme.primary })]}>
                        <Icon name={"lungs"} color={getUiService().theme.secondary} size={20} />
                        <Text heading style={(this.meal.tx_suitable ? styles.mealActiveInfoText : styles.mealInactiveInfoText)}>TX-geeignet</Text>
                    </View>}
                    {this.meal.vegan && <View style={[mealInfoContainer, (this.meal.vegan && { backgroundColor: getUiService().theme.primary })]}>
                        <Icon name={"carrot"} color={getUiService().theme.secondary} size={20} />
                        <Text heading style={(this.meal.vegan ? styles.mealActiveInfoText : styles.mealInactiveInfoText)}>Vegan</Text>
                    </View>}
                </View>
            </View>
        )
    }

    renderInstruction() {
        const instructions = this.meal.instructions.map((instruction) => {
            this.countInstruction++;
            return <Text>{this.countInstruction}. {instruction}</Text>
        })

        return <><Text heading style={textAlign.textCenter}>Anleitung 📋</Text>{instructions}</>
    }

    renderIngredients() {
        let row = 0;

        const ingredientList = this.meal.ingredients.map((ingredient) => {
            let background = [ingredientRow];
            if (row % 2 !== 0) {
                background.push(ingredientRow, { backgroundColor: getUiService().theme.secondary });
            }
            row++;

            return <Text heading style={background}>{ingredient}</Text>
        })

        return <><Text heading style={textAlign.textCenter}>Zutaten 🍴</Text>{ingredientList}</>
    }

    getCreonPills(creonIntake) {
        let creonBalance = creonIntake;
        let amount25000 = 0;

        while (creonBalance > 25000) {
            amount25000++;
            creonBalance = creonBalance % 25000;

        }

        return amount25000 + 1;
    }
}

const mealHeader = StyleSheet.flatten([
    // { backgroundColor: getUiService().theme.secondary },
    alignItems.itemsCenter
])

const mealName = StyleSheet.flatten([
    margin.margin_3
])

const mealAmount = StyleSheet.flatten([
    margin.margin_3
])

const mealInformationContainer = StyleSheet.flatten([
    flex.flex_1,
    flex.flexRow,
    margin.margin_3
])

const mealInformations = StyleSheet.flatten([
    flex.flex_1,
    flex.flexRow,
    flex.flexWrap
])

const information = StyleSheet.flatten([
    width.width_75,
    height.height_75,
    border.borderXL,
    alignItems.itemsCenter,
    justifyContent.justifyCenter,
    padding.padding_1,
    margin.margin_1,
    borderRadius.roundedMD,
    { borderColor: getUiService().theme.secondary }
])

const mealImage = StyleSheet.flatten([
    flex.flex_1,
    height.height_150,
    borderRadius.roundedMD,
    aspectRatio_1_1
])

const mealInfoContainer = StyleSheet.flatten([
    padding.padding_3,
    margin.margin_3,
    flex.flexCol,
    justifyContent.justifyCenter,
    alignItems.itemsCenter,
    width.width_75,
    height.height_75,
    borderRadius.roundedMD
])

const ingredientRow = StyleSheet.flatten([
    padding.padding_3,
    borderRadius.roundedMD,
])


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 10, paddingRight: 10,
        backgroundColor: getUiService().theme.background,
        paddingBottom: 10
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
        color: getUiService().theme.secondary,
    },
    backgroundUnevenRow: {
        color: getUiService().theme.text,
    },
    instructionText: {
        color: getUiService().theme.text,
    }
})