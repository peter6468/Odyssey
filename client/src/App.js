import React, { Component } from 'react'; 
import { Route, Redirect, Switch } from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
import Stocks from './components/stocks';
import StockForm from './components/stockForm';
import Customers from './components/customers'
import Rentals from './components/rentals'
import NotFound from './components/notFound';
import NavBar from './components/navBar';
import LoginForm from './components/loginForm'
import RegisterForm from './components/registerForm'
import 'react-toastify/dist/ReactToastify.css';
//import http from './services/httpService'; 
import './App.css';


class App extends Component {
  render() {
    return (
    <React.Fragment> 
      <ToastContainer />  
      <NavBar />
      <main className="container">
      <Switch>
        <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={LoginForm} />
        <Route path="/stocks/:id" component={StockForm} />
        <Route path="/stocks" component={Stocks} />
        <Route path="/customers" component={Customers}></Route>
        <Route path= "/rentals" component={Rentals}></Route>
        <Route path="/not-found" component={NotFound}></Route>
        <Redirect from="/" exact to="/stocks" />
        <Redirect to="/not-found" />
      </Switch>
      </main>
    </React.Fragment>
    );
  }
}

export default App;
