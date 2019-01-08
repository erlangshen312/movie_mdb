import React from 'react'
import {
    Typography, Grid, Card, CardActionArea, CardMedia,
} from "@material-ui/core";
import AppStorage from "../services/AppStorage";
import {
    URL_LIST,
    API_KEY,
    URL_IMG,
    IMG_SIZE_LARGE,
    LANG_EN
} from '../const';
import axios from 'axios';


export default class Popular extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popularList: [],
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
                    popularList: data.results
                });
            })
            .catch((err) => {
                console.log("ERROR IN DASHBOARD WHERE AXIOS GET ALL MOVIE");
            })
    };

    render() {

        const {popularList} = this.state;
        console.log(popularList);

        this.MovieLists = popularList && popularList.map((popular) =>
            <Grid key={popular.id} item xs={6} sm={4} md={4} lg={2}>
                <Card className="card">
                    <CardActionArea>
                        <CardMedia>
                            <img src={URL_IMG + IMG_SIZE_LARGE + popular.poster_path} className="poster"/>
                            <div className="shower">
                                <Typography variant="h6" className="text">{popular.title}</Typography>
                                <Typography component="p" className="text">{popular.vote_average}</Typography>
                            </div>
                        </CardMedia>
                    </CardActionArea>
                </Card>
            </Grid>
        );

        return (
            <Grid container spacing={16} className="dashboard">

                {this.MovieLists}
            </Grid>
        );
    }
}
