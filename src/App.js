import React from 'react';
 import connect from '@vkontakte/vkui-connect';
//import connect from '@vkontakte/vkui-connect-mock';
import { View, Panel, Epic, Tabbar, TabbarItem, PanelHeader, ScreenSpinner } from '@vkontakte/vkui';
import Icon28Notifications from '@vkontakte/icons/dist/28/notifications';
import Icon28More from '@vkontakte/icons/dist/28/more';
import Icon24Home from '@vkontakte/icons/dist/24/home';
import Icon24Globe from '@vkontakte/icons/dist/24/globe';
import '@vkontakte/vkui/dist/vkui.css';
import { ReactComponent as IconDog } from './img/Dog.svg';
// import '../Panels/Persik.css';
//import persik from '/persik.png';

//import Persik from './panels/Persik';
import Profile from './panels/Profile';
import DogsPanel from './panels/DogsPanel.js';
import WalksPanel from './panels/WalksPanel.js';
import MapPanel from './panels/MapPanel.js';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeStory: 'more',
            fetchedUser: null,
            popout: false,
        };

        this.onStoryChange = this.onStoryChange.bind(this);
    }

    componentDidMount() {
        connect.subscribe((e) => {
            switch (e.detail.type) {
                case 'VKWebAppGetUserInfoResult':
                    this.setState({ fetchedUser: e.detail.data });
                    console.log(e.detail.data);
                    break;
                default:
                    console.log(e.detail.type);
            }
        });
        connect.send('VKWebAppGetUserInfo', {});
    }
    handleDataLoad(e) {
        this.setState({
            popout: this.state.popout === false ? <ScreenSpinner /> : false
        })
    }
    onStoryChange(e) {
        this.setState({ activeStory: e.currentTarget.dataset.story })
        console.log(e);
    }

    render() {

        return (
            <Epic activeStory={this.state.activeStory} tabbar={
                <Tabbar>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'profile'}
                        data-story="profile"
                    ><Icon24Home /></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'dogs'}
                        data-story="dogs"
                    ><IconDog /></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'mapP'}
                        data-story="mapP"
                    ><Icon24Globe /></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'walks'}
                        data-story="walks"
                    ><Icon28Notifications /></TabbarItem>
                    <TabbarItem
                        onClick={this.onStoryChange}
                        selected={this.state.activeStory === 'more'}
                        data-story="more"
                    ><Icon28More /></TabbarItem>
                </Tabbar>
            }>
                <View popout={this.state.popout} id="profile" activePanel="profile">
                    <Profile id="profile" fetchedUser={this.state.fetchedUser} onDataLoad={() => this.handleDataLoad()} />
                </View>
                <DogsPanel id="dogs" activePanel="dogs" fetchedUser={this.state.fetchedUser} onDataLoad={() => this.handleDataLoad()} />
                <View id="mapP" activePanel="mapP">
                    <MapPanel id="mapP" fetchedUser={this.state.fetchedUser}></MapPanel>
                </View>
                <WalksPanel id="walks" activePanel="walks" fetchedUser={this.state.fetchedUser} onDataLoad={() => this.handleDataLoad()} />
                <View id="more" activePanel="more">
                    <Panel id="more">
                        <PanelHeader>More</PanelHeader>
                        <img className="Persik" src="4.jpg" alt="Walkie-doggie" style={{width:window.innerWidth, marginTop:window.innerWidth/2}}/>
                    </Panel>
                </View>
            </Epic>
        )
    }
}

export default App;
