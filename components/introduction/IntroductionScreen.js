import React, { Component } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import AppContainer from "../common/AppContainer";
import Text from '@components/common/Text';
import { alignItems, alignSelf, border, borderRadius, flex, fontSize, height, justifyContent, margin, padding, width } from "../../configs/styles";
import LanguagePicker from "../common/LanguagePicker";
import { getUiService } from "../../service/UiService";
import { getSettingsService } from "../../service/SettingsService";
import { observer } from "mobx-react";
import * as Animatable from 'react-native-animatable';

@observer
export default class IntroductionScreen extends Component {
    handleViewRef = ref => this.animationView = ref;

    state = {
        index: 0,
    }

    render() {
        // important, so that each screen rerenders if settings changes
        getSettingsService().settings;

        return <AppContainer>
            {this.state.index === 0 && this.renderHelloScreen()}
            {this.state.index === 1 && this.renderInfoScreen()}
            {this.state.index === 2 && this.renderDataInfoScreen()}
            {this.state.index === 3 && this.renderFinish()}

            {(this.state.index < 3) ? <View style={navigation}>
                <TouchableWithoutFeedback onPress={() => this.setState({ index: this.state.index + 1 })}>
                    <View>
                        <Text title>{getUiService().getTranslation('next')}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View> : <View style={navigation}>
                <TouchableWithoutFeedback onPress={() => getSettingsService().changeFirstStart(true).then(() => getUiService().navigateToComponent('ProfilScreen'))}>
                    <View>
                        <Text title>{getUiService().getTranslation('finished')}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>}
        </AppContainer>
    }

    renderHelloScreen() {
        return <Animatable.View style={container} animation="fadeIn">
            <Text title style={fontSize.xxl}>{getUiService().getTranslation('hello')} 👋</Text>
            <Text heading>{getUiService().getTranslation('welcome_to_mucomed')}</Text>
            <LanguagePicker key={getSettingsService().getCurrentLanguage()} />
        </Animatable.View>
    }

    renderInfoScreen() {
        return <Animatable.View style={container} animation="fadeIn">
            <Text title style={fontSize.xxl}>{getUiService().getTranslation('introduction_about')} ℹ️</Text>
            <Text heading>{getUiService().getTranslation('introduction_about_text')}</Text>
        </Animatable.View>
    }

    renderDataInfoScreen() {
        return <Animatable.View style={container} animation="fadeIn">
            <Text title style={fontSize.xxl}>{getUiService().getTranslation('introduction_privacy')} 🔒</Text>
            <Text heading>{getUiService().getTranslation('introduction_privacy_text')}</Text>
        </Animatable.View>
    }

    renderFinish() {
        return <Animatable.View style={container} animation="fadeIn">
            <Text title style={fontSize.xxl}>{getUiService().getTranslation('introduction_finish')} ✔️</Text>
            <Text heading>{getUiService().getTranslation('introduction_finish_text')}</Text>
        </Animatable.View>
    }

    async finish() {
        await getSettingsService().changeFirstStart(false);
    }
}

// style definitions

const container = StyleSheet.flatten([
    flex.flexCol,
    justifyContent.justifyCenter,
    alignItems.itemsCenter,
    padding.padding_3,
    { height: 600 }
])

const navigation = StyleSheet.flatten([
    { backgroundColor: getUiService().theme.secondary },
    borderRadius.roundedMD,
    flex.flexRow,
    width.width_150,
    justifyContent.justifyCenter,
    alignSelf.selfCenter,
    padding.padding_y_3,
    margin.margin_4
])