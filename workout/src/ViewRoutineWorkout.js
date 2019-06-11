import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {GridListTile,GridListTileBar,GridList} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 300,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[200],
    },
}));


const ViewRoutineWorkout =(props) =>{
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    function handleExpandClick() {
        setExpanded(!expanded);
    }
console.log(props.week);

    const setRef = ["Perform 5x5 for all exercises with 3-5 minutes between sets",
                    "Perform 4x12 for all exercises with 2 minutes between sets taking each set to failure",
                    "Perform 2x10 for all exercises with 2 minutes between sets at 50% ORM"];

    const phase = ["Strength","Hypertrophy","Recovery"];

    const exercises = props.week.data.exercises.map(x=>{
        return (
            <li>{x.label}</li>
        )
    })

    return (

        <GridListTile>
            <Card className={classes.card} style={{border:'1px solid lightgray',borderRadius:'5%'}}>
                <CardHeader
                    avatar={
                        <Avatar className={classes.avatar}>
                            {props.week.dayOfWeek.substr(0,2)}
                        </Avatar>
                    }
                    title={props.week.label}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {setRef[phase.indexOf(props.week.data.phase)]}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <p>Exercises</p>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                    >
                        <ExpandMoreIcon  />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        <Typography paragraph>
                            <ol>
                                {exercises}
                            </ol>
                        </Typography>
                    </CardContent>
                </Collapse>
            </Card>
        </GridListTile>
    );
}


export default ViewRoutineWorkout;

