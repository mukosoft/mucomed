import InformationCard from "@components/information/InformationCard";
import { getUiService } from '@service/UiService';
import { observer } from "mobx-react";
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from "react-native";
import { Navigation } from 'react-native-navigation';
import { ActivityIndicator, Button } from "react-native-paper";

import { defaultStyles } from "../../configs/styles";
import { INFORMATION_CATEGORIES } from "../../models/FilterData";
import BottomNavigation from './../navigation/BottomNavigation';

/**
 * This screen shows various information about different 
 * cf-related topics.
 *
 * @author Dominique Börner (dominique@mukosoft.de)
 */
@observer
export class InformationScreen extends Component {

    state = {
        category: 'food',
        informations: null
    }

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
    }

    render() {
        if (!this.state.informations) {
            this.getInformationData();
            return (<ActivityIndicator animating={true} color={getUiService().theme.primary} size="large" />)
        } else {
            return (
                <View style={defaultStyles.themeContainer}>
                    <View style={defaultStyles.defaultContentContainer}>
                        <View style={styles.filter}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                {
                                    INFORMATION_CATEGORIES.map((information) => {
                                        return <Button onPress={() => this.setState({ category: category })}
                                            color={this.setSelectedColor(information.category)}>{getUiService().getTranslation(information.category)}</Button>
                                    })
                                }
                            </ScrollView>
                        </View>
                        <View style={styles.informationList}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                {this.renderInformations()}
                            </ScrollView>
                        </View>
                    </View>
                    <BottomNavigation />
                </View>
            )
        }
    }

    getInformationData() {
        fetch("https://api.mukosoft.de/informations.json", {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache'

            }
        })
            .then((response) => response.json())
            .then((json) => {
                this.setState({ informations: json })
            })
    }

    setSelectedColor(category) {
        if (this.state.category === category) {
            return getUiService().theme.active
        }
    }

    renderInformations() {
        if (this.state.informations[this.state.category]) {
            return this.state.informations[this.state.category].map((information) => {
                return <InformationCard information={information} key={information.name} />
            })
        }
    }
}

const styles = StyleSheet.create({
    filter: {
        height: 30
    },
    informationList: {
        flex: 1,
        flexDirection: 'column',
        margin: 10
    },
})