import React, {Component} from 'react';
import './App.css';
import firebase from 'firebase';
import Select from 'react-select';
import { InputGroup,FormControl,Form} from 'react-bootstrap';
import Muscles from './Muscles';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const db = firebase.firestore();

class CreateWorkout extends Component {

    initialState = {
        type: null,
        phase: null,
        muscles: [],
        exercises: []
    };

    constructor(props) {
        super(props);

        this.state =  this.initialState
    }

    changeType = (type) => {
        this.setState({ type: type.value});
    }

    changePhase = (phase) => {
        this.setState({ phase: phase.value});
    }


    // validate workout (change to use state)
    getWorkoutDetails = (e) =>{
        e.preventDefault();

        const workout={
            type: this.state.type,
            phase: this.state.phase,
            muscles: this.state.muscles,
            exercises: this.state.exercises,
        };


        if (workout){
            this.addWorkout(workout,e)
            e.target.reset();
            this.createNotification('success','test');
        }
    }




    // Return a list of exercises for the selected muscle groups
    setMuscles = (muscles) => {

        this.setState({
                muscles: muscles
            }
        );
    }

    // Return a list of exercises for the selected muscle groups
    setExercises = (exercises) => {

        this.setState({
                exercises: exercises
            }
        );
    }

    addWorkout = (workout) => {
        db
            .collection('Workouts')
            .add({
                workout
            });
        this.createNotification('success','Record added to the database');
    }

    createNotification = (type,msg) => {
        return () => {
            NotificationManager.success(msg);
        };
    };



    render() {

        const phases=[
            {value: 'Hypertrophy',label:'Hypertrophy'},
            {value: 'Recovery',label:'Recovery'},
            {value: 'Strength',label:'Strength'}];


        const types=[
            {value: 'Full',label:'Full'},
            {value: 'Lower',label:'Lower'},
            {value: 'Upper',label:'Upper'}];


        return  (
            <div style={{margin:"2%"}}>

                <form onSubmit={this.getWorkoutDetails.bind(this)}>
                <div className="container-fluid App">
                    <h3 className="text-primary" style={{fontVariant: 'small-caps',textAlign:'left'}}>Design a workout</h3>
                    <div className="row">
                        <div className="col-md-6">
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text  style={{width:'130px'}}>Workout Type</InputGroup.Text>
                                </InputGroup.Prepend>
                                <div style={{width:"250px"}}>
                                    <Select id="workoutType"
                                            options={types}
                                            onChange={this.changeType} />
                                </div>
                            </InputGroup>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text  style={{width:'130px'}}>Regimen Phase</InputGroup.Text>
                                </InputGroup.Prepend>
                                <div style={{width:"250px"}}>
                                    <Select id="workoutPhase"
                                            options={phases}
                                            onChange={this.changePhase} />
                                </div>
                            </InputGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8">
                            <Muscles onChangeMuscles={this.setMuscles} onChangeExercises={this.setExercises} filter={this.state.muscles}/>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-1">
                            <button className="btn btn-outline-primary my-2 my-sm-0"
                                    onClick={this.createNotification('success','Workout added to the database')}
                                    type="submit">Create</button>
                        </div>

                    </div>

                </div>

                </form>

            </div>
        )

    }
}

export default CreateWorkout;

