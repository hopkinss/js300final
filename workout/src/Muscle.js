import React from 'react';

import Select from 'react-select';
import {InputGroup} from "react-bootstrap";
import Exercises from './Exercises';

class Muscle extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            selectedOption:[]
        }
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
        this.props.onChangeMuscles(selectedOption);
    }

    render() {


        const {selectedOption} = this.state;
        return (

                <div>
                <InputGroup className="mb-3" >
                    <InputGroup.Prepend>
                    <InputGroup.Text  style={{width:'130px'}}>Muscles</InputGroup.Text>
                    </InputGroup.Prepend>
                        <div style={{width:"80%"}}>
                            <Select
                                id={this.props.id}
                                isMulti={true}
                                hasValue={true}
                                value={selectedOption}
                                onChange={this.handleChange}
                                name="muscle"
                                options={this.props.options}
                                className="left"
                                classNamePrefix="select"
                            />
                        </div>
                    </InputGroup>
                    <div>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={{width:'130px'}} >Exercises</InputGroup.Text>
                            </InputGroup.Prepend>
                            <div style={{width:"80%"}}>
                                <Exercises filter={this.props.filter} onChangeExercises={this.props.onChangeExercises}/>
                            </div>
                        </InputGroup>
                    </div>
                </div>
        );
    }
}

export  default  Muscle;
