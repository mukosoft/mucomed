import { observer } from "mobx-react";
import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, TouchableWithoutFeedback, TouchableNativeFeedbackBase } from "react-native";
import { Navigation } from 'react-native-navigation';
import Text from "@components/common/Text";
import Button from "@components/common/Button";
import { API_BASE_URL } from '@configs/config';
import AppContainer from '../common/AppContainer';
import { getSettingsService } from '../../service/SettingsService';
import BottomNavigation from '@components/navigation/BottomNavigation';
import { alignContent, alignItems, aspectRatio_1_1, borderRadius, flex, fontSize, height, justifyContent, margin, opacity, padding, shadow, width } from '../../configs/styles';
import { getUiService } from "../../service/UiService";

/**
 * This screen shows various information about different 
 * cf-related topics.
 *
 * @author Dominique Börner (dominique@mukosoft.de)
 */
@observer
export class InformationScreen extends Component {

    state = {
        infos: [],
        categories: [],
    }

    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this);
        this.getCookbookData();
    }

    render() {
        return (
            <AppContainer>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={articleContainer}>
                        <Text title>Informationen</Text>
                        <View style={[flex.flexRow, margin.margin_x_4]}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

                                {this.state.categories.map((category) => {

                                    return <Button onPress={() => this.setState({ selectedCategorie: category })}
                                        text style={this.buttonIsSelected(category) && { backgroundColor: getUiService().theme.secondary }}> {getUiService().getTranslation(`info_${category}`)}</Button>
                                })}
                            </ScrollView>
                        </View>


                        { /** This button is used later, its now just for testing the my-doc api */}
                        {/* <Button primary onPress={() => getUiService().showModal('selfhelpScreen')}>Selbsthilfegruppen</Button> */}
                        {this.state.infos.filter(information => information.category === this.state.selectedCategorie)
                            .map(information => this.renderInformationCard(information))}
                    </View>
                </ScrollView>
                <BottomNavigation />
            </AppContainer>
        )
    }

    renderInformationCard(information) {
        return <TouchableWithoutFeedback onPress={() => getUiService().showModal("InformationArticleScreen", information)}>
            <View style={articleCard}>
                <Text heading>{information[`name_${getSettingsService().getCurrentLanguage()}`]}</Text>
                <Text heading style={fontSize.sm}>von {information[`author_de`]}</Text>
                <Text style={padding.padding_y_4}>{information[`excerpt_${getSettingsService().getCurrentLanguage()}`]}</Text>
            </View>
        </TouchableWithoutFeedback>

    }

    getCookbookData() {
        fetch(`${API_BASE_URL}query=*[_type%20=="infos"]`)
            .then(response => response.json())
            .then(data => this.setState({ infos: data.result }))
            .then(() => this.getCategories())
    }

    getCategories() {
        let categories = [];

        this.state.infos.map((info) => {
            if (categories.indexOf(info.category) < 0) {
                categories.push(info.category)
            }
        });

        this.setState({ categories: categories })
        this.setState({ selectedCategorie: categories[0] })
    }

    buttonIsSelected(category) {
        return (this.state.selectedCategorie === category);
    }
}

// style definitions

const articleCard = StyleSheet.flatten([
    margin.margin_4,
    { width: "90%" },
    padding.padding_3,
    justifyContent.justifyCenter,
    flex.flexCol,
    shadow.shadowSM,
    borderRadius.roundedMD
])

const articleContainer = StyleSheet.flatten([
    flex.flexRow,
    flex.flexWrap,
    justifyContent.justifyCenter,
    alignItems.itemsCenter
])