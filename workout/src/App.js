import React from 'react';
import { BrowserRouter as Router, Route,Switch,Link} from 'react-router-dom';
import './App.css';
import CreateWorkout from './CreateWorkout';
import {ButtonGroup} from "react-bootstrap";
import firebase from 'firebase';
import Workouts from './Workouts';
import CreateRoutines from './CreateRoutines';
import ViewRoutines from './ViewRoutines';

import logo from './barbell.png';
import {NotificationContainer} from "react-notifications";
const db = firebase.firestore();
const FA = require('react-fontawesome');



class App extends  React.Component{

  constructor(props) {
    super(props);

      this.state = {

          workouts: [],
          routines:[],
          isLoading: true,
          isLoadingRoutine:true,
          hasError: false,

      }
  }

    componentWillMount() {
      this.fetchAllExercises(1,[]);
}

    componentDidMount() {
        this.unsubscribeDb = db
            .collection('Workouts')
            .onSnapshot(snapshot => {
                this.setState({
                    workouts: snapshot.docs,
                    isLoading:false
                });
            });

        this.unsubscribeDb2 = db
            .collection('Routines')
            .onSnapshot(snapshot => {
                this.setState({
                    routines: snapshot.docs,
                    isLoadingRoutine:false
                });
            });

    }

    componentWillUnmount() {
        this.unsubscribeDb();
        this.unsubscribeDb2();

    }

    async fetchAllExercises(page,exercises) {
        await fetch(`https://wger.de/api/v2/exercise?status=2&language=2&muscle&page=${page}`)
            .then(response => {
                return response.json();
            })
            .then(data => {

                if (page<10 ){
                    this.fetchAllExercises(page+1, [...exercises, ...data.results])
                }
                else{

                    try {

                        localStorage.setItem('exercises', JSON.stringify(exercises));
                    }
                    catch (e) {
                        console.error(e);
                    }
                }
            })
            .catch(error => {
                this.setState({
                    hasError: true,
                });
            })
    }



  render() {

      const workouts= this.state.workouts.sort((a, b) => (a.type < b.type) ? 1 : (a.type === b.type) ? ((a.phase < b.phase) ? 1 : -1) : -1 );

    return (
        <div>
          <Router>
            <nav className="navbar" style={{backgroundColor: "#282c34"}}>

                <h3 className="text-primary" style={{fontVariant: 'small-caps'}}><img src={logo} className="App-logo" alt="logo" style={{marginRight:'10px'}}/>Workout Planner</h3>
                <div className="text-success h4">
                    <NotificationContainer />
                </div>
                <ButtonGroup>
                  <Link to="/">
                      <button className="btn btn-outline-primary my-2 my-sm-0" style={{width:'200px'}}>Workout Library</button>
                  </Link>
                    <Link to="/create">
                    <button className="btn btn-outline-primary my-2 my-sm-0" style={{width:'200px'}}>Create a Workout</button>
                </Link>
                    <Link to="/routines">
                        <button className="btn btn-outline-primary my-2 my-sm-0" style={{width:'200px'}}>Routine Library</button>
                    </Link>
                </ButtonGroup>
            </nav>
            <div >
            <Switch>
                <Route exact
                       path="/"
                       render={(props) => <Workouts {...props} workouts={workouts}
                                                    isLoading={this.state.isLoading}
                       />}
                />
                  <Route exact
                         path="/create"
                         render={(props) => <CreateWorkout {...props}/>}
                  />
                <Route exact
                       path="/routine"
                       render={(props) => <CreateRoutines {...props}
                                                          workouts={this.state.workouts}
                                                          isLoading={this.state.isLoading}
                       />}
                />
                <Route exact
                       path="/routines"
                       render={(props) => <ViewRoutines {...props}
                                                          routines={this.state.routines}
                                                          isLoading={this.state.isLoadingRoutine}
                       />}
                />
            </Switch>
            </div>
          </Router>
        </div>
    );
  }
}

export default App;
