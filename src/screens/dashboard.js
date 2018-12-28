import React from 'react'
import {
    Paper, Button, Typography, Grid, Card, CardActions, CardActionArea, CardContent, CardMedia
} from "@material-ui/core";
import AppStorage from "../services/AppStorage";
import {
    URL_LIST,
    URL_SEARCH,
    URL_DETAIL,
    URL_PERSON,
    URL_CAST,
    URL_VIDEO,
    API_KEY,
    API_KEY_ALT,
    LANG_EN
} from '../const';
import axios from 'axios';


export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movieList: [],
            lang: AppStorage.get('lang') || 'ru',
        };
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

    render() {

        const {movieList} = this.state;
        console.log(movieList);

        this.MovieLists = movieList && movieList.map((movie) =>
            <Grid key={movie.id} item>
                <Card>
                    <CardActionArea>
                        <CardMedia
                            image={movie.poster_path}
                            title={movie.title}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {movie.title}
                            </Typography>
                            <Typography component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species,
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Share
                        </Button>
                        <Button size="small" color="primary">
                            Learn More
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        );

        return (
            <Grid container alignItems={"center"} justify={"center"} spacing={8}>

                {this.MovieLists}
            </Grid>
        );
    }
}

