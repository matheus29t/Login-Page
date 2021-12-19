import React, { Component } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Main from '../template/Main'
import axios from 'axios'

const headerProps = {
    icon: 'user',
    title: 'Notificações',
    subtitle: 'Suas notificações'
}

const userId = 1; 

const baseUrl = 'http://localhost:8000/users';

var allNotifications = [];

export default class Notifications extends Component {

    intervalID;

    getNotifications() {
        const method = 'get'
        const url = baseUrl
        axios[method](url)
            .then(function (response) {
                const arrayLength = response.data.length;
                for (var i = 0; i < arrayLength; i++)
                    if(userId === response.data[i].id){
                        allNotifications = response.data[i].notifications
                        console.log(allNotifications)
                        return
                    }
            });
    }

    renderForm() {
        this.intervalID = setInterval(this.getNotifications.bind(this), 100);
        allNotifications.reverse();
        return (
            <div className="form">
                <div className="col-12 col-md-6">
                    <List>
                        {allNotifications.map((data) => (
                            <ListItem key={data.id}>
                            <p>{data.title} - </p>
                            <p>{data.content}</p>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </div>
        )
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
            </Main>
        )
    }
}

