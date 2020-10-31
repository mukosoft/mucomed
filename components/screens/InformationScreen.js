import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from "react-native";
import {ActivityIndicator, Button, Provider as PaperProvider} from "react-native-paper";
import {colors} from "@configs/colors";
import {darkTheme, lightTheme} from "../../configs/PaperTheme";
import {observer} from "mobx-react";
import InformationCard from "../InformationCard";
import InformationService from "../../service/InformationService";
import {defaultStyles} from "../../configs/styles";
import {INFORMATION_CATEGORIES} from "../../models/FilterData";
import {getUiService} from "../../service/UiService";
import { Navigation } from 'react-native-navigation';


/**
 * Cooking Book Screen
 *
 * @author Dominique Börner
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
            return ( <ActivityIndicator animating={true} color={colors.turquoise_dark} size="large"/>)
        } else {
            return (
                <PaperProvider theme={lightTheme}>
                    <View style={defaultStyles.themeContainer}>
                        <View style={defaultStyles.defaultContentContainer}>
                            <View style={styles.filter}>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                    {
                                        INFORMATION_CATEGORIES.map((information) => {
                                            return <Button onPress={() => this.setCategory(information.category)}
                                                           color={ this.setSelectedColor(information.category)}>{getUiService().getTranslation(information.category)}</Button>
                                        })
                                    }
                                </ScrollView>
                            </View>
                            <View style={styles.informationList}>
                                <ScrollView showsVerticalScrollIndicator={false}>
                                    { this.renderInformations() }
                                </ScrollView>
                            </View>
                        </View>
                    </View>
                </PaperProvider>
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
                this.setState({informations: json})
            })
    }

    setCategory(category) {
        this.setState({category: category})
    }

    setSelectedColor(category) {
        if (this.state.category === category) {
            return colors.orange
        }
    }

    renderInformations() {
        if (this.state.informations[this.state.category]) {
            return this.state.informations[this.state.category].map((information) => {
                return <InformationCard information={information} onPress={() => { InformationService.openInformation(information) }} key={information.name}/>
            })
        }
    }

    navigationButtonPressed(button) {
        if (button.buttonId === 'openSettings') {
            // TODO: switch to SettingsScreen
            alert("open_settings_screen")
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