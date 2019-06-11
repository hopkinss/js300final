import React, {Component} from 'react';
import './App.css';
import firebase from 'firebase';
import Select from 'react-select';
import { InputGroup,FormControl,Form} from 'react-bootstrap';
import Muscles from './Muscles';
import Exercises from "./Exercises";

const db = firebase.firestore();


class CreateWorkout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            type: null,
            phase: null,
            muscles: [],
            exercises: []
        }
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
            this.addWorkout(workout)
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
    }

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
                <form onSubmit={this.getWorkoutDetails} >

                <div className="container-fluid App">
                    <h1 style={{textAlign:'left'}}>Design a workout</h1>
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

                </div>
                 <button type="submit">Add</button>
                </form>

            </div>
        )

    }
}

export default CreateWorkout;

