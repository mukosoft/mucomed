import React, { Component } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react';
import CalendarItem from '@components/medication/CalendarItem';
import { height, padding } from '../../configs/styles';
import { getSettingsService } from '../../service/SettingsService';

/**
 * Create a Horizontal ScrollView with CalendarItems inside.
 * 
 * @see CalendarItem
 * @author Dominique Börner (dominique@mukosoft.de)
 */
@observer
export default class HorizontalCalendar extends Component {
    render() {
        return (
            <SafeAreaView>
                <View style={container}>
                    <ScrollView
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        ref={(ref) => (this.scrollView = ref)}
                        onContentSizeChange={() => {
                            this.scrollView.scrollToEnd({ animated: true });
                        }}>
                        {this.renderLastDays()}
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }

    renderLastDays() {
        return this.getLastDays(parseInt(getSettingsService().getCurrentCalendarDateAmount())).map((date) => {
            return (
                <CalendarItem date={date} key={date} />
            );
        });
    }

    getLastDays(daysAmount) {
        let lastDays = [...Array(daysAmount)]
            .map((_, i) => {
                const d = new Date();
                d.setDate(d.getDate() - i);
                return d;
            })
            .reverse();

        return lastDays;
    }
}

// style definitions 

const container = StyleSheet.flatten([
    padding.padding_y_3,
    height.height_100
])