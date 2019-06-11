import React, { Component } from 'react';
import ViewRoutine from './ViewRoutine';
import {GridListTile,GridListTileBar,GridList} from "@material-ui/core";


class ViewRoutines extends React.Component {
    constructor(props) {
        super(props);

    }


    render() {


        let routines;
        if (!this.props.isLoading){

            routines = this.props.routines.map( x=>{
                return (
                    <ViewRoutine routine={x.data().routine}/>
                )
            });

        }
        else{
            routines=<p>Loading...</p>
        }


        return (
            <div>

                    {routines}



            </div>
        )
    }
}


export default ViewRoutines;
