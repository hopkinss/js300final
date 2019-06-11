import React, {Component} from 'react';
import './App.css';
import CreateRoutine from './CreateRoutine';

import firebase from 'firebase';
const db = firebase.firestore();




class CreateRoutines extends Component {

    constructor(props) {
        super(props);

        this.state = {
            workouts:[],
            routine:[]
        };
    }


    addRoutine = (day)=> {

        const workoutDay = JSON.parse(day);
        try {
            let idx = this.state.routine.findIndex(x => x.dayOfWeek === workoutDay.dayOfWeek);


            if (!~idx) {
                this.setState(prevState => {
                    return {
                        routine: [...prevState.routine, workoutDay]
                    };
                });
            } else {

                let newRoutine = [...this.state.routine];
                newRoutine[idx] = workoutDay;
                this.setState(prevState => {
                    return {
                        routine: newRoutine
                    }
                });
            }

            // display the exercises
            let display = document.getElementById(`${workoutDay.dayOfWeek}_display`);

            let displayText = workoutDay.data.exercises.map(x=>{
                return(
                    x.label
                );
            });
            display.innerHTML = displayText.join('<br />');


        }
        catch (e) {
            console.log(e);

        }
    }



    saveRoutine = ()=>{

        const name = document.getElementById('routineName').value;
        const routine = {routineName: name,
                         routine:this.state.routine};

        db
            .collection('Routines')
            .add({
                routine
            });
    }

    render (){


        let workouts;
        try{
            const stringWorkouts = localStorage.getItem('workouts');
            if (stringWorkouts != null) {
                workouts=JSON.parse(stringWorkouts);
            }
            else{
                workouts=this.props.workouts;
            }
        }
        catch (e) {
            console.error(e);
        }


        let days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map(day => {
            return (
                <CreateRoutine day={day}
                               workouts={workouts}
                               onChange={this.addRoutine}/>
            );
        },this);



        return (
            <div>
                <div className="form-inline col-md-8" style={{marginTop:'15px'}}>
                    <input className="form-control mr-sm-2 col-md-6" type="input" placeholder="Routine Name" id="routineName" />
                    <button className="btn btn-outline-primary my-2 my-sm-0" onClick={this.saveRoutine}>Save</button>
                </div>
                <div>
                    {days}
                </div>
            </div>

        )
    }
}

export default CreateRoutines;
