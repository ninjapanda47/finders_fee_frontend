import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import NavBar from './components/NavBar'
import Login from './components/Login'
import SignUp from './components/SignUp'
import SearchItems from './components/SearchItems'
import NewItem from './components/NewItem'
import UserView from './components/UserView'
import { Route, Switch, Redirect } from "react-router-dom";
import 'bootswatch/dist/solar/bootstrap.min.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloggedin: false,
    };

  }

  componentDidMount() {
    console.log(this.state);
  }

  checkUserLogin = ({ isloggedin }) => {
    isloggedin ? this.setState({ isloggedin: true }) : this.setState({ isloggedin: false })
  }

  logOut = () => {
    this.setState({ isloggedin: false })
  }

  render() {

    const PrivateRoute = ({ children, ...rest }) => {
      return (
        <Route
          {...rest}
          render={({ location }) =>
            this.state.isloggedin ? (
              children
            ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: location }
                  }}
                />
              )
          }
        />
      );
    }
    return (
      <div className="App">
        <Route
          path="/"
          render={props => <NavBar {...props} isloggedin={this.state.isloggedin} logOut={this.logOut} />}
        />
        <Switch>
          <Route
            path="/login"
            render={props => <Login {...props} isloggedin={this.checkUserLogin} />}
          />
          <Route path='/signUp' component={SignUp} />
          <Route path='/searchItems' component={SearchItems} />
          <PrivateRoute path="/newItem">
            < NewItem />
          </PrivateRoute>
          <PrivateRoute path="/userView">
            < UserView />
          </PrivateRoute>
        </Switch>
      </div >
    );
  }

}

const mapStateToProps = state => ({
  user: state.user.item,
})

export default connect(mapStateToProps)(App)