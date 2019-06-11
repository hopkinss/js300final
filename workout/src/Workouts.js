import React from 'react';
import './App.css';

import PropTypes from 'prop-types';
import {CardColumns,ButtonGroup} from "react-bootstrap";
import Workout from './Workout'
import FormCheck from "react-bootstrap/es/FormCheck";
import {stringify} from 'flatted/esm';

const FA = require('react-fontawesome');


class NavButton extends React.Component {
    constructor(props) {
        super(props);
        this.nav = React.createRef();
    }

    componentDidMount() {
        this.nav.current.addEventListener('nav', this.onNav);
    }

    onNav = (e) => {

        if (this.props.workouts.length === 0){
            alert("You must like the workouts you want to add to your regimen");
            return;
        }

        // write the selected workouts to local storage
        try {
            let muscles=this.props.workouts.map( x=>{
                return x.data().workout.muscles;
            });

            muscles  = muscles[0].map( (x)=> {
                return x.label;
            });

            const workouts = this.props.workouts.map( x =>{
                return {id: x.id,
                        label: `${x.data().workout.type} body ${x.data().workout.phase}: [${muscles.join(', ')}]`,
                        type: x.data().workout.type,
                        phase: x.data().workout.phase,
                        exercises : x.data().workout.exercises,
                        muscles : x.data().workout.muscles,
                        }
            });

            const dayOff = {id: '0',
                            label: "Off Day",
                            type: 'Off Day',
                            phase: 'Off Day',
                            exercises : [],
                            muscles : [],
                        }

            workouts.splice(0,0,dayOff);

            localStorage.setItem('workouts', JSON.stringify(workouts));

        }
        catch (e) {
            console.error(e);
        }

        window.location.href = "/routine";
    }


    render() {
        return (
            <div style={{float:'left',paddingTop:'20px',paddingLeft:'20px'}}>
                <button  id="first" onClick={this.onNav} title="First Page" className="btn btn-outline-primary my-2 my-sm-0 navbutton" ref={this.nav}>
                    Create a routine
                </button>
            </div>
        )
    }
}


class Workouts extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            workouts: [],
            selected:[],
            page: 1
        }
    }

    addWorkout = (id) => {
        const selectedWorkout = this.props.workouts.find( o=> {
            return o.id===id
        });


        if (this.state.selected.findIndex(x => x.id === selectedWorkout.id) < 0) {

            this.setState(prevState => {
                return {
                    selected: [...prevState.selected, selectedWorkout]
                };
            });
        }
        else {
            this.setState(prevState => {
                return {
                    selected: [...prevState.selected]
                };
            });
        }
    }

    removeWorkout= (id) => {

        const idx = this.state.selected.findIndex( o=> {
            return o.id===id
        });

        this.setState(prevState => {
            const selectedWorkouts =[...prevState.selected];
            selectedWorkouts.splice(idx,1);

        });
    }


    fetchNextResultSet = (e) => {


        let results;
        if (e.currentTarget.id === 'next') {
            if (this.state.page <= Math.floor(this.props.workouts.length / 5)) {
                this.setState({
                    page:this.state.page += 1
                });
            }
        } else if (e.currentTarget.id === 'prev') {
            if (this.state.page > 1 ) {
                this.setState({
                    page:this.state.page -= 1
                });
            }
        } else if (e.currentTarget.id === 'last') {
                this.setState({
                    page:Math.ceil(this.props.workouts.length /5)
                });
        } else if (e.currentTarget.id === 'first') {
            this.setState({
                page:Math.floor(this.props.workouts.length /5)
            });
        }
    }



    render() {



        let workouts;

        if (this.props.isLoading){
            workouts=<p>Loading...</p>;
        }
        else {

            // only load 5 workouts at a time
            const page = this.state.page;
            let displayWorkouts = this.props.workouts.slice((5*page)-5,5*page);


            workouts = displayWorkouts.map(workout => {
                return (
                        <Workout  workout={workout}
                                  onLike={this.addWorkout}
                                  onRemove={this.removeWorkout}
                        />
                );
            });
        }


        return (

            <div>
                <NavButton workouts={this.state.selected}/>
                <div  style={{padding: '20px',textAlign:'center'}}>
                    <ButtonGroup>
                        <button  id="first" onClick={this.fetchNextResultSet} title="First Page" className="btn btn-outline-primary my-2 my-sm-0 navbutton">
                            <FA name="arrow-left"/><FA name="arrow-left"/>
                        </button>
                        <button  id="prev" onClick={this.fetchNextResultSet} title="Previous Page" className="btn btn-outline-primary my-2 my-sm-0 navbutton">
                            <FA name="arrow-left"/>
                        </button>
                        <span className="btn btn-outline-primary my-2 my-sm-0 navbutton" style={{enabled:'false'}}>
                            Page {this.state.page} of {Math.ceil(this.props.workouts.length / 5)}
                        </span>

                        <button  id="next" onClick={this.fetchNextResultSet} title="Next Page" className="btn btn-outline-primary my-2 my-sm-0 navbutton">
                            <FA name="arrow-right"/>
                        </button>
                        <button  id="last" onClick={this.fetchNextResultSet} title="Last Page" className="btn btn-outline-primary my-2 my-sm-0 navbutton">
                            <FA name="arrow-right"/><FA name="arrow-right"/>
                        </button>
                    </ButtonGroup>
                </div>
                <CardColumns>
                    {workouts}
                </CardColumns>
            </div>

        )
    }
}


export default Workouts;
