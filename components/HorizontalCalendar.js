import React, {Component} from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from "react-native";
import {Card, Text} from "react-native-paper";
import {colors} from "@configs/colors";
import {getDateStorage} from "../stores/DateStorage";
import {DateTimeConverterService} from "../service/DateTimeConverterService";
import DateStorageService from "../service/DateStorageService";
import {observer} from "mobx-react";

/**
 * Create a Horizontal ScrollView with Cards inside. Each card represents a date.
 * If a card is clicked, DateStorage gets updated.
 *
 * TODO: OnPress should change card style
 *
 * @author Dominique Börner
 */
@observer
export default class HorizontalCalendar extends Component {
    render() {
        return(
            <SafeAreaView>
                <ScrollView horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            ref={ref => this.scrollView = ref}
                            onContentSizeChange={() => {
                                this.scrollView.scrollToEnd({animated: true});
                            }}
                            style={styles.calendarContainer}>
                    {this.showLastDays(7)}
                </ScrollView>
            </SafeAreaView>
        );
    }

    showLastDays(amount:BigInteger) {
        let selectedStyle = {};
        let selectedStyleText: {};

        let lastDays = [...Array(amount)].map((_, i) => {
            const d = new Date()
            d.setDate(d.getDate() - i)
            return d
        }).reverse();




        return lastDays.map((date) => {

            if (DateTimeConverterService.formatDate(date) === getDateStorage().selectedDate) {
                selectedStyle = styles.selectedStyle;
                selectedStyleText = styles.selectedStyleText;
            } else {
                selectedStyle = {}
                selectedStyleText = {}
            }

            return <Card style={[styles.calendarDate, selectedStyle]} key={date} onPress={() => {
                getDateStorage().selectedDate = DateTimeConverterService.formatDate(date);
                console.log(`DEBUG: selected date: ${getDateStorage().selectedDate}`);
                DateStorageService.getInstance().createNewStorageIfNotExists();
            }}>
                <Card.Title title={DateTimeConverterService.getDateName(date)} titleStyle={[styles.calendarDateHeadline, selectedStyleText]}/>
                <Card.Content>
                    <Text style={[styles.calendarDateText, selectedStyleText]}>{DateTimeConverterService.formatDate(date, false)}</Text>
                </Card.Content>
            </Card>
        })
    }
}

const styles = StyleSheet.create({
    calendarContainer: {
        backgroundColor: 'transparent'
    },
    calendarDate: {
        backgroundColor: colors.white,
        margin: 5, padding: 0,
        justifyContent: 'center',
        height: 100, width: 100,
        shadowColor: colors.grey_dark,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    calendarDateHeadline: {
        fontSize: 14,
        color: colors.turquoise_dark,
        fontWeight: '100'
    },
    calendarDateText: {
        fontWeight: '900',
        fontSize: 26,
        color: colors.turquoise_dark,
    },
    selectedStyle: {
        backgroundColor: colors.turquoise_light,
        elevation: 0,
    },
    selectedStyleText: {
        color: colors.white
    }
})