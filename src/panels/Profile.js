import React from 'react';
import { Panel, ListItem, Group, Avatar, PanelHeader, FormLayout, Input, Textarea, Button } from '@vkontakte/vkui';

class Profile extends React.Component {
    constructor(props) {
        super(props);

        //const profile = { email: "example@mail.ru", password: "password", name: "name", adress: "adress", comments: "comments" };
        this.state = {
            error: null,
            isLoaded: false,
            id: props.id,
            fetchedUser: props.fetchedUser,
            profileId: "",//profile.email,
            email: "",//profile.email,
            password: "",//profile.password,
            name: "",//profile.name,
            adress: "",//profile.adress,
            comments: "",//profile.comments,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitNewUser = this.handleSubmitNewUser.bind(this);
    }
    componentDidMount() {
        this.props.onDataLoad();
        //console.log(this.state);  
        //const user = this.state.fetchedUser;
        //fetch("http://127.0.0.1:8000/api/users/?vkId=" + this.state.fetchedUser.id)
        fetch("https://www.walkie-doggie.ru/api/users?vkId=" + this.state.fetchedUser.id, {
            //cache: "no-cache", 
            //credentials: 'true',          
            method: 'GET',
            headers: {
                //'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                'Accept': 'application/json',     
            },
            mode: 'cors',
            //cache: 'default',
        })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    if (Object.keys(result).length === 0) {

                        this.setState({
                            isLoaded: false,
                        });
                        this.props.onDataLoad();
                    }
                    else {
                        this.setState({
                            isLoaded: true,
                            profileId: result.id,
                            email: result.email,
                            password: "",
                            name: result.name,
                            adress: result.adress,
                            comments: result.info //
                        });
                        this.props.onDataLoad();
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                }
            )
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
        //fetch("http://127.0.0.1:8000/api/users/" + this.state.profileId, {
        fetch("https://www.walkie-doggie.ru/api/users/" + this.state.profileId, {
            method: 'PUT',
            headers: {
                //'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                //'Accept': 'application/json',                  
            },
            body: JSON.stringify({
                'email': this.state.email,
                'password': this.state.password,
                'name': this.state.name,
                'adress': this.state.adress,
                'info': this.state.comments,
            })
        })
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result);
                    if (result === "wrong password") {
                        alert("неверный пароль");
                    }
                    else {
                        this.setState({
                            isLoaded: true,
                            profileId: result.id,
                            email: result.email,
                            password: "",
                            name: result.name,
                            adress: result.adress,
                            comments: result.info
                        });
                    }
                    this.props.onDataLoad();
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                })
    }
    handleSubmitNewUser(event) {
        this.props.onDataLoad();
        //fetch("http://127.0.0.1:8000/api/users", {
        fetch("https://www.walkie-doggie.ru/api/users", {
            method: 'POST',
            headers: {
                //'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
                //'Accept': 'application/json',                  
            },
            body: JSON.stringify({
                'email': this.state.email,
                'vkId': this.state.fetchedUser.id,
                'password': this.state.password,
            })
        })
            .then(response => response.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        isLoaded: true,
                        profileId: result.id,                        
                        password: "",
                        email: result.email,
                    });
                    this.props.onDataLoad();
                },
                (error) => {
                    this.setState({
                        isLoaded: false,
                        error
                    });
                })

    }
    render() {
        // eslint-disable-next-line
        const { error, isLoaded } = this.state; //it may solve lazy loading problem
        return (
            <Panel id={this.state.id}>
                <PanelHeader>Профиль</PanelHeader>
                {this.state.fetchedUser &&
                    <Group title="Это вы">
                        <ListItem
                            before={<Avatar src={this.state.fetchedUser.photo_200} />}
                            description={this.state.fetchedUser.city.title}
                        >
                            {`${this.state.fetchedUser.first_name} ${this.state.fetchedUser.last_name}`}
                        </ListItem>
                    </Group>}
                {this.state.isLoaded &&
                    <Group title="Редикатирование профиля">
                        <FormLayout>
                            <Input top="Email для доступа на сайт" type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
                            <Input top="Пароль для доступа на сайт" type="password" placeholder="Введите пароль" name="password" value={this.state.password} onChange={this.handleInputChange} />
                            <Input top="Имя и фамилия" name="name" value={this.state.name} onChange={this.handleInputChange} />
                            <Input top="Адрес" placeholder="Тюмень, Республик 25" name="adress" value={this.state.adress} onChange={this.handleInputChange} />
                            <Textarea top="О себе" name="comments" value={this.state.comments} onChange={this.handleInputChange} />
                            <Button size="xl" level="primary" onClick={this.handleSubmit}>Сохранить</Button>
                        </FormLayout>
                    </Group>
                }
                {!this.state.isLoaded &&
                    <Group title="Редикатирование профиля">
                        <FormLayout>
                            <Input top="Email для доступа на сайте" type="email" name="email" value={this.state.email} onChange={this.handleInputChange} />
                            <Input top="Пароль для доступа на сайте" type="password" placeholder="Введите пароль" name="password" value={this.state.password} onChange={this.handleInputChange} />
                            <Button size="xl" level="primary" onClick={this.handleSubmitNewUser}>Сохранить</Button>
                        </FormLayout>
                    </Group>
                }

            </Panel>

        )
    }
}
export default Profile;
