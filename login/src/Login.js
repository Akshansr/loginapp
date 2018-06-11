import React, { Component } from 'react';
var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBl9VCctjlDEgq2aP7W232t_GhAbQiZw-8",
    authDomain: "loginapp-55c89.firebaseapp.com",
    databaseURL: "https://loginapp-55c89.firebaseio.com",
    projectId: "loginapp-55c89",
    storageBucket: "",
    messagingSenderId: "888317181732"
  };
  firebase.initializeApp(config);

class Login extends Component {

    login(event){
        var email = this.refs.email.value
        var password = this.refs.password.value

        const promise = firebase.auth().signInWithEmailAndPassword(email, password)
        promise.then(user => {

            var lgo = document.getElementById('logout')
            lgo.classList.remove('hide')

            var msg = 'login successful'
            this.setState({msg: msg})
            console.log(msg)

        }).catch(e => {

            var msg = e.message
            this.setState({msg: msg})
            console.log(msg)

        })

    }
    signup(event){
        var email = this.refs.email.value
        var password = this.refs.password.value
        
        const promise =     
        firebase.auth().createUserWithEmailAndPassword(email, password)
        
        
        promise.then((user) => {

            firebase.database().ref('users/' + user.uid).set({
            email: email
            });
            console.log(user)
            var msg = 'welcome to crunchy stone family'

            
            this.setState({msg: msg})
            console.log(msg)

        });
        promise.catch(e => {

            var msg = e.message
            this.setState({msg: msg})
            console.log(msg)

        })


    }
    logout(){
        
        firebase.auth().signOut();
        var lgo = document.getElementById('logout')
            lgo.classList.add('hide')


        var msg = 'logout successful'
            this.setState({msg: msg})

       
    }

    constructor(props) {
        super(props);
        this.state = { msg: '' };
        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.logout = this.logout.bind(this);
    }
    render() {
        return (
            <div>
            <input type='text' ref='email' id='email' placeholder='Enter your emailID'/>
            <input type='text' ref='password' id='password' placeholder='Enter your password'/>
            <p>{this.state.msg}</p>
            <button className='login' onClick={this.login}>Log in</button>
            <button className='signup' onClick={this.signup}>Sign up</button>
            <button  id='logout' className='hide' onClick={this.logout}>Log out</button>

            </div>
            
        );
    }
}

export default Login;