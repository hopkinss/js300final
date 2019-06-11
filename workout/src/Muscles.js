import React, {Component} from 'react';
import './App.css';
import Muscle from './Muscle';
import Exercises from "./Exercises";

class Muscles extends Component {

    constructor(props) {
        super(props);

        this.state = {

            muscles: [],
            isLoading: true,
            hasError: false
        }
    }

    componentDidMount() {
        fetch('https://wger.de/api/v2/muscle')
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    muscles: data.results,
                    isLoading: false
                })
            })
            .catch(error => {
                this.setState({
                    hasError: true,
                    isLoading: false
                });
            })

    }

    render() {


        const options = this.state.muscles.map( (x) =>{
            return {label: x.name,
                    value:x.id}
        } );


        // Filter exercises by muscle group
        let excerciseFilter=[];

        if (this.props.filter.length === 0){
            excerciseFilter.push(0);
        }
        else {
            excerciseFilter = this.props.filter.map((x) => {
                return x.value
            });
        }


        if (this.state.isLoading){

            return <p>Loading...</p>
        }
        else

            return (

                <div>
                    <Muscle options={options} id="muscles" label="Muscle Groups" onChangeMuscles={this.props.onChangeMuscles}
                            onChangeExercises={this.props.onChangeExercises} filter={excerciseFilter}/>
                </div>
            );
    }

}

export default  Muscles;
