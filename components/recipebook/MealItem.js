import React, { Component } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

import { defaultStyles } from '@configs/styles';
import { colors } from '@configs/colors';
import { getUiService } from '@service/UiService';

/**
 * Renders an element for displaying a meal. 
 * Pressing on this element opens the MealInstructionScreen.
 * 
 * @author Dominique Börner
 */
export default class MealItem extends Component {
    render() {
        return (
            <TouchableOpacity onPress={() => getUiService().showModal('MealInstructionScreen', this.props.meal)}>
                <View style={[styles.cardStyle, defaultStyles.defaultBorderRadius, defaultStyles.defaultShadow]}>
                    {(this.props.meal.img) ? <Image style={styles.mealImage} source={{ uri: getUiService().convertRefToSrc(this.props.meal.img.asset._ref) }} /> : null}
                    <Text style={styles.mealName}>{this.props.meal.name}</Text>
                    <Text style={styles.mealAmount}>{this.props.meal.meal_amount}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    cardStyle: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        margin: 5, padding: 15
    },
    mealName: {
        fontSize: 20,
        fontStyle: 'italic',
        color: colors.turquoise_light
    },
    mealAmount: {
        fontSize: 16,
        color: colors.turquoise_dark
    },
    mealImage: {
        display: 'flex',
        height: 140,
        aspectRatio: 1,
        borderRadius: 1000,
        borderWidth: 1,
        borderColor: colors.turquoise_dark,
        marginBottom: 10
    }
})