import React, { Component } from 'react';
import { observer } from "mobx-react";
import { ScrollView } from "react-native";
import { Navigation } from 'react-native-navigation';

import BottomNavigation from '@navigation/BottomNavigation';
import HorizontalCalendar from "@components/medication/HorizontalCalendar";
import MedicationList from '@components/medication/MedicationList';
import AppContainer from '@components/common/AppContainer';
import { getMedicationService } from '@service/MedicationService';
import { defaultStyles } from '../../configs/styles';


/**
 * Renders the screen, containing the medications.
 *
 * @author Dominique Börner
 */
@observer
export class MedicationScreen extends Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    render() {
        return (
            <AppContainer>
                <HorizontalCalendar />
                <ScrollView style={defaultStyles.defaultContentContainer}>
                    <MedicationList medications={getMedicationService().medicationSchedule} />
                </ScrollView>
                <BottomNavigation />
            </AppContainer>
        )
    }
}

