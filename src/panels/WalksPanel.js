import React from "react"
import { View, Panel, Group, PanelHeader, List, Cell, Avatar, ScreenSpinner } from '@vkontakte/vkui';
import Icon24Chevron from '@vkontakte/icons/dist/24/chevron';

class Walk extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            onClick: props.onClick,
            onWalkClick: props.onWalkClick,
        }
    }
    /* <div style={{ display: 'flex' }}>
                   <Button size="l" stretched style ={{borderRadius:20, marginRight:30}}>Walk</Button>
                 </div> */
    render() {
        return (
            <Cell
                expandable
                onClick={this.props.onClick}
                before={<Avatar size={72} />}
                size="l"
                description={this.props.desc}
                asideContent={<Icon24Chevron />}
                bottomContent={
                    <div>
                        <span>за</span> {this.props.price}
                    </div>
                }
            >
                {this.props.name}
            </Cell>
        )
    }
}

class WalksContainer extends React.Component {
    renderWalks() {
        return (
            this.props.walks &&
            <List>
                {this.props.walks.map((walk, i) => {
                    return (<Walk name={walk.name} desc={walk.dt_w_start} price={walk.price_start} key={i} />) //onClick={(e) => this.props.onClick(e, walk.id)}
                })}
                {/* <Walk name={this.props.walks[0].name} onClick={(e) => this.props.onClick(e, this.props.walks[0].id)}/>
                <Walk name={this.props.walks[1].name} onClick={(e) => this.props.onClick(e, this.props.walks[1].id)}/> */}
            </List>
        )
    }
    render() {
        return this.renderWalks();
    }
}

class WalkPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            fetchedUser: this.props.fetchedUser,
            activePanel: this.props.activePanel,
            //walks: Array(2).fill(null),
            walks: null,
            myWalks: null,
            activeDog: null,
            popout: false,
        }
        //this.handleClick = this.handleClick.bind(this);
        this.handleClickBack = this.handleClickBack.bind(this);
        this.handleAddDogClick = this.handleAddDogClick.bind(this);
        this.handleDataLoad = this.handleDataLoad.bind(this);
        this.handleRefresh = this.handleRefresh.bind(this);
    }
    componentDidMount() {
        this.handleRefresh();
    }
    handleRefresh() {
        this.handleDataLoad();
        //fetch("http://127.0.0.1:8000/api/GetUsersWalksAsOwner/" + this.state.fetchedUser.id)
        fetch("https://www.walkie-doggie.ru/api/GetUsersWalksAsOwner/" + this.state.fetchedUser.id)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        walks: result
                    });
                }
            )
        //fetch("http://127.0.0.1:8000/api/GetUsersWalksAsWalker/" + this.state.fetchedUser.id)
        fetch("https://www.walkie-doggie.ru/api/GetUsersWalksAsWalker/" + this.state.fetchedUser.id)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        myWalks: result
                    });
                    this.handleDataLoad();
                }
            )
    }
    // handleClick(e, id) {
    //     //e.preventDefault();
    //     console.log(e.target.innerHTML);
    //     this.setState({
    //         activeDog: id,
    //         activePanel: e.target.innerHTML === '<div class="Button__content">Walk</div>' || e.target.innerHTML === "Walk" ? "walkDog" : 'walk', //Если нажата кнопка с Walk то тогда куда то уйдем
    //     })
    // }
    handleClickBack() {
        this.setState({
            activeDog: null,
            activePanel: this.props.activePanel,
        })
    }
    handleAddDogClick(e) {
        this.setState({
            activePanel: "addDog",
        })
    }
    handleDataLoad(e) {
        this.setState({
            popout: this.state.popout === false ? <ScreenSpinner /> : false
        })
    }
    render() {
        const allWalks = this.state.walks;
        const allMyWalks = this.state.myWalks;
        return (
            <View popout={this.state.popout} id={this.state.id} activePanel={this.state.activePanel}>
                <Panel id="walks">
                    <PanelHeader>
                        Статистика
                    </PanelHeader>
                    <Group title="Все Ваши выгулы в качестве волкера">
                        <WalksContainer walks={allMyWalks} onClick={(e, id) => this.handleClick(e, id)} />
                    </Group>
                    <Group title="Все заявки на выгул Вашего питомца">
                        <WalksContainer walks={allWalks} onClick={(e, id) => this.handleClick(e, id)} />
                    </Group>
                </Panel>
            </View>
        )
    }
}
export default WalkPanel;