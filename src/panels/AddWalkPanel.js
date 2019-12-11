import React from "react"
import { Panel, PanelHeader, HeaderButton, platform, ANDROID, Group, FormLayout, Input, Button } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';

class AddWlakPanel extends React.Component {
    constructor(props) {
        super(props);
        const walk = {dogId: "", adress: "", date: "", time: "", duration: "", price: "",};        //сделать запрос к бд
        this.state = {
            id: this.props.id,
            userId: this.props.userId,
            dogId: this.props.dogId,
            adress: walk.adress,
            date: walk.date,
            time: walk.time,
            duration: walk.duration,
            price: walk.price,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({
          [name]: value
        });
    }
    handleSubmit(event) {
        this.props.onDataLoad();
        //alert(this.state.dogId + " " + this.state.adress + " " + this.state.date + " " + this.state.time + " " + this.state.duration+ " " + this.state.price+ " " + this.state.userId);
        //fetch("http://127.0.0.1:8000/api/walkData/", {
        fetch("https://www.walkie-doggie.ru/api/walkData", {
            method: 'POST',
            headers: {
                //'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                //'Accept': 'application/json',                  
            },
            body: JSON.stringify({
                dog_id: this.state.dogId,
                adress: this.state.adress,
                date: this.state.date,
                time: this.state.time,
                duration: this.state.duration,
                price: this.state.price,
            })
        })
            .then(response => response.json())
            .then(
                (result) => {
                    //console.log(result);

                    this.props.onDataLoad();
                    this.props.onClickBack();
                },
                (error) => {
                    this.setState({
                    });
                })
    }
    render() {
        const osname = platform();
        //console.log(this);
        return (
            <Panel id={this.state.id}>
                <PanelHeader
                    left={
                        <HeaderButton onClick={() => this.props.onClickBack()}>
                            {osname === ANDROID ? <Icon24Back /> : <Icon28ChevronBack />}
                        </HeaderButton>
                    }
                >
                    Добавление выгула
                </PanelHeader>
                <Group title="Заполните информацию о выгуле">
                    <FormLayout>
                        <Input                  top="Адресс"     name="adress"     placeholder =""  value={this.state.adress} onChange={this.handleInputChange}/>
                        <Input type = "date"    top="Дата"       name="date"       placeholder ="" value={this.state.date} onChange={this.handleInputChange}/>
                        <Input type = "time"    top="Время"       name="time"       placeholder ="" value={this.state.time} onChange={this.handleInputChange}/>
                        <Input                  top="Продолжительность"   name="duration"   placeholder ="" value={this.state.duration} onChange={this.handleInputChange}/>
                        <Input                  top="Цена"      name="price"      placeholder ="300" value={this.state.price} onChange={this.handleInputChange}/>
                        <Button size="xl" level="primary" onClick={this.handleSubmit}>Добавить</Button>
                    </FormLayout>
                </Group>
            </Panel>
        )
    }
}
export default AddWlakPanel