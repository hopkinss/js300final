import React, { Component } from 'react';
import {Card,ListGroup, Carousel} from 'react-bootstrap';
import Select from "react-select";


class SelectWorkout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedOption: this.props.workouts[0],
        }
    }


    handleChange = (selectedOption,e) => {
        selectedOption.dayOfWeek=e.name;
        this.setState({ selectedOption });
        this.props.onChange(JSON.stringify(selectedOption));
    }


    render() {

        const {selectedOption} = this.state;

        return (
            <Select
                id={this.props.id}
                isMulti={false}
                hasValue={true}
                value={selectedOption}
                onChange={this.handleChange}
                clearable={true}
                name={this.props.id}
                options={this.props.workouts}
                className="left"
                classNamePrefix="select"
            />
        )
    }
}


class CreateRoutine extends Component {

    constructor(props) {
        super(props);

    }


    render() {



        const options = this.props.workouts.map(workout => {

            return {
                label:  workout.label,
                value: workout.id,
                data: workout,
            }
        });



        return (

            <div>
                <div className="row col-12">
                    <caption>{this.props.day}</caption>
                    <table className="tg">

                        <thead>
                            <tr>
                                <th >Workout</th><th >Exercises</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td >
                                    <SelectWorkout
                                            id={this.props.day}
                                            onChange={this.props.onChange}
                                            workouts={options}
                                    />
                                </td>
                                <td id={`${this.props.day}_display`} style={{width:'25%'}}>

                                </td>
                            </tr>
                        </tbody>
                    </table>
                 </div>
            </div>
        )
    }
}



export default CreateRoutine;


// const days =
// return(
//     <div>
//         <div>
//             <Select
//                 id={}
//                 isMulti={true}
//                 hasValue={true}
//                 value={selectedOption}
//                 onChange={this.handleChange}
//                 name="exercises"
//                 options={options}
//                 className="left"
//                 classNamePrefix="select"
//             />
//         </div>
//     </div>
