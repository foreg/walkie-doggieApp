import React from "react"
import { Panel, PanelHeader, HeaderButton, platform, ANDROID, Group, FormLayout, Input, Textarea, Button } from '@vkontakte/vkui';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';

class AddDogPanel extends React.Component {
    constructor(props) {
        super(props);
        const dog = {name: "", age: "", sex: "", breed: "", size: "", comments:""};        //сделать запрос к бд
        this.state = {
            id: this.props.id,
            userId: this.props.userId,
            name: dog.name,
            age: dog.age,
            sex: dog.sex,
            breed: dog.breed,
            size: dog.size,
            comments: dog.comments
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
        // alert(this.state.name + " " + this.state.age + " " + this.state.sex + " " + this.state.breed + " " + this.state.size+ " " + this.state.comments+ " " + this.state.userId);
        this.props.onDataLoad();        
        //fetch("http://127.0.0.1:8000/api/dogs/", {
        fetch("https://www.walkie-doggie.ru/api/dogs", {
            method: 'POST',
            headers: {
                //'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                //'Accept': 'application/json',                  
            },
            body: JSON.stringify({
                name:  this.state.name,
                age:  this.state.age,
                sex:  this.state.sex,
                breed:  this.state.breed,
                size:  this.state.size,
                info:  this.state.comments,
                user_id:  this.state.userId,
            })
        })
            .then(response => response.json())
            .then(
                (result) => {
                    this.props.onDataLoad();
                    this.props.onRefresh();
                    this.props.onClickBack();
                },
                (error) => {
                    this.props.onDataLoad();
                    alert("ощибка при добавлении собаки");
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
                    Добавление собаки
                </PanelHeader>
                <Group title="Занесите информацию о питомце">
                    <FormLayout>
                        <Input top="Кличка"           name="name"     placeholder = "бобик" value={this.state.name} onChange={this.handleInputChange}/>
                        <Input top="Возраст"            name="age"      placeholder = "2 года" value={this.state.age} onChange={this.handleInputChange}/>
                        <Input top="Пол собаки"            name="sex"      placeholder = "м" value={this.state.sex} onChange={this.handleInputChange}/>
                        <Input top="Порода"          name="breed"    placeholder = "овчарка" value={this.state.breed} onChange={this.handleInputChange}/>
                        <Input top="Размер"           name="size"     placeholder = "большой" value={this.state.size} onChange={this.handleInputChange}/>
                        <Textarea top="Комментарии"    name="comments" placeholder = "Доп. информация" value={this.state.comments} onChange={this.handleInputChange}/>
                        <Button size="xl" level="primary" onClick={this.handleSubmit}>Добавить</Button>
                    </FormLayout>
                </Group>
            </Panel>
        )
    }
}
export default AddDogPanel