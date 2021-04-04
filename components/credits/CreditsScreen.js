import React, { Component } from 'react';
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { alignContent, alignItems, border, borderRadius, flex, height, justifyContent, margin, padding, textAlign, width } from '../../configs/styles';
import AppContainer from '../common/AppContainer';
import Text from "@components/common/Text";
import { getSettingsService } from '../../service/SettingsService';
import { getUiService } from '../../service/UiService';
import Button from '../common/Button';

export class CreditsScreen extends Component {
    state = {
        supporter: []
    }

    constructor(props) {
        super(props);
        this.getSupporter();
    }

    render() {
        return (
            <AppContainer>
                <ScrollView style={padding.padding_x_4}>
                    <View style={[flex.flexCol, alignItems.itemsCenter]}>
                        <Text title style={textAlign.textCenter}>Unsere Unterstützer</Text>
                        {(this.state.supporter[getSettingsService().getCurrentLanguage()]) && this.state.supporter[getSettingsService().getCurrentLanguage()].map(supporter => this.renderSupporter(supporter))}
                    </View>
                </ScrollView>
            </AppContainer>
        )
    }

    getSupporter() {
        const url = "https://api.mukosoft.de/credits.json"
        fetch(`${url}?${new Date()}`)
            .then(response => response.json())
            .then(data => this.setState({ supporter: data }))
    }

    renderSupporter(supporter) {
        return <View style={supportCard}>
            <Text heading style={textAlign.textCenter}>{supporter.name}</Text>
            {(supporter.urlImage) && <View style={[flex.flexRow, alignItems.itemsCenter]}>
                <Image source={{ uri: supporter.urlImage }} style={imageStyle} />
                <Text>{supporter.url}</Text>
            </View>}
            <View style={padding.padding_3}>
                <Text>{supporter.text}</Text>
            </View>
        </View>
    }
}

// style definitions

const supportCard = StyleSheet.flatten([
    flex.flexCol,
    { backgroundColor: getUiService().theme.secondary },
    margin.margin_3,
    borderRadius.roundedMD,
    { width: "80%" }
])

const imageStyle = StyleSheet.flatten([
    { width: 15 },
    { height: 15 },
    margin.margin_x_3
])