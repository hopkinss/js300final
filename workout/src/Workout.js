import React, { Component } from 'react';
import {Card,ListGroup, Carousel} from 'react-bootstrap';



const FA = require('react-fontawesome');



class Workout extends Component{
    constructor(props) {
        super(props);

        this.state={
            isSelected: false,
        };
    }

    selectWorkout = (isSelect) => {
        this.setState(prevState =>{
            return {
                isSelected: isSelect
            };
        });
    }

    render() {

        const c = this.props.workout.data().workout;

        const muscles = c.muscles.map(x=> {
            return (
                <li key={x.id}>{x.label}</li>
            );
        })

        const exercises = c.exercises.map(x=> {
            return (
                <li key={x.id}>{x.label}</li>
            );
        })


        const likeButton = this.state.isSelected ?

            <i  onClick={() => {this.props.onRemove(this.props.workout.id);this.selectWorkout(false)}}  className="fa fa-heart likeButton selected" />
            :
            <i onClick={() => {this.props.onLike(this.props.workout.id);this.selectWorkout(true)}} className="fa fa-heart likeButton unselected" />;


        return (
            <div>
                <Card style={{backgroundColor:"aliceblue",height:'32em'}} >
                    <Card.Header>
                        <div>
                            <Card.Title>
                                {likeButton}{c.type}&nbsp;body<span className="tiny" style={{float:'right'}}>{c.phase}</span>
                            </Card.Title>
                        </div>
                    </Card.Header>
                    <Card.Text style={{backgroundColor:"white"}}>
                        <Card.Subtitle>
                            Muscles trained
                        </Card.Subtitle>
                        <ol>
                            {muscles}
                        </ol>
                        <Card.Subtitle>
                            Exercises
                        </Card.Subtitle>
                        <ol>
                            {exercises}
                        </ol>
                    </Card.Text>
                </Card>
            </div>

        )
    }
}

// Character.propTypes = {
//     character: PropTypes.object.isRequired
// };

export default Workout;
