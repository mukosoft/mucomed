import { colors } from '@configs/colors';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, Text } from 'react-native-paper';

import { getDateService } from '../../service/DateService';
import { defaultStyles } from './../../configs/styles';
import { DateTimeConverterService } from './../../service/DateTimeConverterService';

@observer
export default class CalendarItem extends Component {

    state = {
        animMargin: new Animated.Value(0)
    }
    
    render() {
        const date = this.props.date;
        let selected = false;

        if (this.props.date.getDay() === getDateService().calendarSelection.getDay()) {
            style = styles.selectedCalendarDate;
            styleText = styles.CalendarDateSelectedText;
            selected = true;
            this.animateMarginTop(10);
        } else {
            style = styles.calendarDate;
            styleText = styles.calendarDateUnselectedText;
            this.animateMarginTop(0);
        }

        return (
            <TouchableOpacity onPress={() => getDateService().setCalendarSelection(date)}>
                <View style={styles.container}>
                    <Animated.View
                    style={[style, defaultStyles.defaultBorderRadius, { marginTop: this.state.animMargin }]}
                    key={this.props.date}>
                        <Text style={[styles.calendarDateText, styleText]}>{DateTimeConverterService.formatDate(date, false)}</Text>
                    </Animated.View>
                    <Text style={[styles.calendarDayText, defaultStyles.fontLight]}>{DateTimeConverterService.getDateName(date)}</Text>
                </View>
            </TouchableOpacity> 
        );
    }

    animateMarginTop(px) {
        Animated.timing(this.state.animMargin, {
            toValue: px,
            duration: 200
        }).start();
    }
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    calendarDate: {
        backgroundColor: colors.secondary,
        margin: 5,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        aspectRatio: 1,
    },
    selectedCalendarDate: {
        backgroundColor: colors.turquoise_light,
        margin: 5,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        aspectRatio: 1
    },
    calendarDayText: {  
        fontSize: 10,
        fontWeight: '100',
        color: colors.text,
        opacity: 0.35,
    },
    calendarDateText: {
        fontWeight: '900',
        fontSize: 14
    },
    calendarDateUnselectedText: {
        color: colors.turquoise_light,
    },
    CalendarDateSelectedText: {
        color: colors.white,
    },
});
