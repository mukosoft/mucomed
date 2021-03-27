import { getUiService } from '@service/UiService';
import { observer } from 'mobx-react';
import React, { Component } from 'react';
import { ScrollView } from "react-native";
import { LineChart as RNLineChart } from "react-native-chart-kit";
import { DateTimeConverterService } from '../../service/DateTimeConverterService';
import { getVitaldataService } from '../../service/VitaldataService';

/**
 * Renders a LineChart, based on given data. The data must be in a 1:1 relationship 
 * to each other (e.g. one date - one data). This uses the react-native chart kit.
 * 
 * @todo chartType should be an enum object!
 * 
 * @property {string} chartType - 'direct' | 'history'
 * @property {Array} data - data, which should be shown. Also data text is on the y-axes
 * @property {Array} labels - labels, shown on the x-axes
 * @property {boolean} isDeletable - if an data point can be deleted 
 * 
 * @see https://github.com/indiespirit/react-native-chart-kit
 * @author Dominique Börner (dominique@mukosoft.de)
 */
@observer
export default class LineChart extends Component {

    render() {

        if (this.props.chartType === 'direct') {
        } else if (this.props.chartType === 'history' || !this.props.chartType) {
            return(
                <ScrollView horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                    <RNLineChart
                        data={{
                            labels: this.props.labels.map((label) => DateTimeConverterService.formatDate(label)),
                            datasets: [
                                {
                                    data: this.props.data
                                },
                            ]
                        }}
                        width={this.props.data.length * 200}
                        height={200}
                        yAxisSuffix={this.props.yAxisSuffix}
                        fromZero={true}
                        chartConfig={{
                            backgroundGradientFrom: getUiService().theme.primary,
                            backgroundGradientTo:  getUiService().theme.primary,
                            decimalPlaces: 1, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            propsForDots: {
                                r: "4",
                                strokeWidth: "1",
                                stroke: getUiService().theme.primary
                            }
                        }}
                        bezier
                        segments={5}
                        onDataPointClick={(data) => this.selectPoint(data)}
                    />
                </ScrollView>
            )
        }
    }

    selectPoint(data) {
        console.debug(data);
        if (this.props.isDeletable) {
            getVitaldataService().chartSelectedId = this.props.id;
            getVitaldataService().chartSelectedValue = data.value;
            getVitaldataService().chartSelectedUnit = this.props.unit;
            getVitaldataService().chartSelectedDate = this.props.labels[data.index];
        }
    }
}