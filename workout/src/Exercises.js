import React, {Component} from 'react';
import './App.css';
import Select from "react-select";


class Exercises extends Component {

    constructor(props) {
        super(props);

        this.state = {

            data: [],
            selectedOption: [],
            isLoading: true,
            hasError: false
        }
    }

    componentDidMount() {

        try{
            const jsonExercises = localStorage.getItem('exercises');
            if (jsonExercises != null) {

                const exercises = JSON.parse(jsonExercises);

                this.setState({
                    data: exercises,
                    isLoading: false
                });
            }
            else{
                this.fetchAllExercises(1,[]);
            }
        }
        catch (e) {
            console.error(e);
        }
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
                    this.setState({
                        data: exercises,
                        isLoading: false
                    })
                }
            })
            .catch(error => {
                this.setState({
                    hasError: true,
                    isLoading: false
                });
            })
    }


    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        this.props.onChangeExercises(selectedOption);

    }

    render() {

        const {selectedOption} = this.state;

        let options;

        if (!this.state.isLoading){

            console.log(this.props.filter);
            let filtered=[];

            for(let i=0;i< this.props.filter.length;i++) {

                let recs= this.state.data.filter((f) => {
                        return f.muscles.indexOf(this.props.filter[i]) > -1
                    });
               filtered =  [...filtered, ...recs];
            }



            options = filtered.map((x) => {
                return {
                    label: x.name,
                    value: x.id
                }
            });

            console.log(options);

        }

        if (this.state.isLoading){

            return <p>Loading...</p>
        }
        else
            return (
                <div>
                        <Select
                            id='select-exercises'
                            isMulti={true}
                            hasValue={true}
                            value={selectedOption}
                            onChange={this.handleChange}
                            name="exercises"
                            options={options}
                            className="left"
                            classNamePrefix="select"
                        />
                </div>
            );
    }

}

export default Exercises;

// componentDidMount() {
//
//     fetch('https://wger.de/api/v2/exercise?status=2&language=2&muscle')
//         .then(response => {
//             return response.json();
//         })
//         .then(data => {
//             this.setState({
//                 data: data.results,
//                 isLoading: false
//             })
//         })
//         .catch(error => {
//             this.setState({
//                 hasError: true,
//                 isLoading: false
//             });
//         })
// }
