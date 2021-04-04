import React, { Component } from 'react';
import { observer } from "mobx-react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Navigation } from 'react-native-navigation';
import MedicationItem from '@components/medication/MedicationItem';
import AppContainer from '@components/common/AppContainer';
import { getMedicationService } from '@service/MedicationService';
import { flex, justifyContent, margin, padding, textAlign } from '../../configs/styles';
import Text from '@components/common/Text';
import Button from '@components/common/Button';
import { getUiService } from '../../service/UiService';


/**
 * Renders the screen, containing all medications. Here, the user
 * can change the amount of medication in his stock.
 * 
 * @todo make functional
 *
 * @author Dominique Börner (dominique@mukosoft.de)
 */
@observer
export class MedicationStockScreen extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    render() {
        return (
            <AppContainer>
                <ScrollView style={medicationListContainer}>
                    <Text title style={titleStyle}>Dein Medikamentenvorrat</Text>
                    { getMedicationService().medicationSchedule.map((medication) => {
                        return <View style={itemWrapper}>
                            <MedicationItem stockEditable medicationRequest={medication} />
                        </View>
                    })}
                </ScrollView>
            </AppContainer>
        )
    }
}

// style definitions

const titleStyle = StyleSheet.flatten([
    textAlign.textCenter
])

const medicationListContainer = StyleSheet.flatten([
    padding.padding_3,
])

const itemWrapper = StyleSheet.flatten([
    padding.padding_3
])