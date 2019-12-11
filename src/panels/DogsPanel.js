import React from "react"
import { View, Panel, Group, PanelHeader, List, Cell, HeaderButton, Avatar, Button, ScreenSpinner} from '@vkontakte/vkui';
import Icon24Add from '@vkontakte/icons/dist/24/add';
import Icon24Chevron from '@vkontakte/icons/dist/24/chevron';

import DogPanel from './DogPanel.js';
import AddDogPanel from './AddDogPanel.js';
import AddWalkPanel from './AddWalkPanel.js';
class Dog extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            onClick: props.onClick,
            onWalkClick: props.onWalkClick,
        }
    }

    render() {
        return (
            <Cell 
                expandable 
                onClick={this.props.onClick}
                before={<Avatar size={72} />}
                size="l"
                description=""
                asideContent={<Icon24Chevron/>}
                bottomContent={
                  <div style={{ display: 'flex' }}>
                    <Button size="l" stretched style ={{borderRadius:20, marginRight:30}}>Выгуляйте меня</Button>
                  </div>
                }
            >
                {this.props.name}
            </Cell>            
        )
    }
}
class DogsContainer extends React.Component {
    renderDogs() {
        return (
            this.props.dogs &&
            <List>
                {this.props.dogs.map((dog, i) => {
                    return (<Dog name={dog.name} key={i} onClick={(e) => this.props.onClick(e, dog.id)}/>)
                })}
                {/* <Dog name={this.props.dogs[0].name} onClick={(e) => this.props.onClick(e, this.props.dogs[0].id)}/>
                <Dog name={this.props.dogs[1].name} onClick={(e) => this.props.onClick(e, this.props.dogs[1].id)}/> */}
            </List>
        )
    }
    render() {
        return this.renderDogs();
    }
}
class DogsPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            fetchedUser: this.props.fetchedUser,
            activePanel: this.props.activePanel,
            //dogs: Array(2).fill(null),
            dogs: null,
            activeDog: null,
            popout:false,
        }
        this.handleClick = this.handleClick.bind(this);
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
        //fetch("http://127.0.0.1:8000/api/dogs?id=" + this.state.fetchedUser.id)
        fetch("https://www.walkie-doggie.ru/api/dogs?id=" + this.state.fetchedUser.id)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        dogs: result
                    });
                    this.handleDataLoad();
                }
            )
    }
    handleClick(e, id) {
        //e.preventDefault();
        console.log(e.target.innerHTML);
        this.setState({
            activeDog: id,
            activePanel: e.target.innerHTML === '<div class="Button__content">Выгуляйте меня</div>' || e.target.innerHTML === "Выгуляйте меня" ? "walkDog" : 'dog', //Если нажата кнопка с Walk то тогда куда то уйдем
        })
    }
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
        const allDogs = this.state.dogs;
        return (
            <View popout={this.state.popout} id={this.state.id} activePanel={this.state.activePanel}>
                <Panel id="dogs">
                    <PanelHeader left={<HeaderButton onClick={(e) => this.handleAddDogClick(e)}><Icon24Add/></HeaderButton>}>
                        Добавить собаку
                    </PanelHeader>
                    <Group title="Ваши питомцы">
                        <DogsContainer dogs={allDogs} onClick={(e, id) => this.handleClick(e, id)} />
                    </Group>
                </Panel>
                <DogPanel id="dog" userId = {this.state.fetchedUser && this.state.fetchedUser.id} dogId={this.state.activeDog} onClickBack={()=>this.handleClickBack()} onDataLoad={()=>this.handleDataLoad()}/>
                <AddDogPanel id="addDog" userId = {this.state.fetchedUser && this.state.fetchedUser.id} onClickBack={()=>this.handleClickBack()} onDataLoad={()=>this.handleDataLoad()} onRefresh={()=>this.handleRefresh()}/>
                <AddWalkPanel id="walkDog" dogId = {this.state.activeDog} userId = {this.state.fetchedUser && this.state.fetchedUser.id} onClickBack={()=>this.handleClickBack()} onDataLoad={()=>this.handleDataLoad()}/>
            </View>
        )
    }
}
export default DogsPanel;