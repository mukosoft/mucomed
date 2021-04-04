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
 * Renders a screen, containing all medications in an detailed view. Here,
 * medications can also be deleted by the user.
 *
 * @author Dominique Börner (dominique@mukosoft.de)
 */
@observer
export class MedicationPlanScreen extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    render() {
        return (
            <AppContainer>
                <ScrollView style={medicationListContainer}>
                    <Text title style={titleStyle}>Medikationsplan</Text>
                    { getMedicationService().medicationSchedule.map((medication) => {
                        return <View style={itemWrapper}>
                            <MedicationItem canBeDeleted detailed medicationRequest={medication} />
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