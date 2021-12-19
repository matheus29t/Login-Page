import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './App.css'
import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

import Logo from '../components/template/Logo'
import Nav from '../components/template/Nav'
import Routes from './Routes'
import Footer from '../components/template/Footer'

const userId = 1; 

const baseUrl = 'http://localhost:8000/users';

var allNotifications = [];
var lastId = 0;

function getNotifications() {
    
}


const App = () => {

    useEffect(() => {
        setInterval(() => {
            const method = 'get'
            const url = baseUrl
            axios[method](url)
                .then(function (response) {
                    const arrayLength = response.data.length;
                    for (var i = 0; i < arrayLength; i++)
                        if(userId === response.data[i].id){
                            allNotifications = response.data[i].notifications;
                            if(lastId !==0 && lastId !== allNotifications[allNotifications.length-1].id){
                                lastId = allNotifications[allNotifications.length-1].id;
                                if (lastId !=0) alert('Novo pedido! Checar notificações');
                            }
                            else if(lastId==0 && allNotifications[allNotifications.length-1].id !== 0){
                                lastId = allNotifications[allNotifications.length-1].id;
                            }
                            console.log(lastId)
                            return
                        }
                });
        }, 5000);
      }, []);

    return (
    <BrowserRouter>
        <div className="app">
            <Logo />
            <Nav />
            <Routes />
            <Footer />
        </div>
    </BrowserRouter>
    );
};

export default App;