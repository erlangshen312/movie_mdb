import React from 'react'
import {
    Typography, Grid, Card, CardActionArea, CardMedia,
} from "@material-ui/core";

import {
    URL_LIST,
    API_KEY,
    URL_IMG,
    IMG_SIZE_LARGE,
    LANG_EN
} from '../const';
import axios from 'axios';
import Genre from "../component/genre";


export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movieList: [],
        };
        console.log(this.props)
    }

    componentDidMount() {
        this.getMovie();
    }

    getMovie = () => {
        axios
            .get(URL_LIST + '' + API_KEY + LANG_EN)
            .then(({data}) => {
                this.setState({
                    movieList: data.results
                });
            })
            .catch((err) => {
                console.log("ERROR IN DASHBOARD WHERE AXIOS GET ALL MOVIE");
            })
    };

    goToDetail = (id) => {
        console.log(id);
        this.props.history.push("/detail/" + id);
    };

    render() {

        const {movieList, movie,} = this.state;
        console.log(movie);

        this.MovieLists = movieList && movieList.map((movie) =>
            <Grid key={movie.id} item xs={6} sm={4} md={4} lg={2}>
                <Card className="card">
                    <CardActionArea onClick={() => this.goToDetail(movie.id)}>
                        <CardMedia className="content">
                            <div className="content-overlay"></div>
                            <img src={URL_IMG + IMG_SIZE_LARGE + movie.poster_path} className="content-image"/>
                            <div className="content-details fadeIn-bottom">
                                <Typography variant="h6" className="content-title">{movie.title}</Typography>
                                <Typography component="p" className="content-text">{movie.vote_average}</Typography>
                            </div>
                        </CardMedia>
                    </CardActionArea>
                </Card>
            </Grid>
        );

        return (
            <Grid container spacing={16} className="dashboard">

                    <Genre/>

                {this.MovieLists}

            </Grid>

        );
    }
}
