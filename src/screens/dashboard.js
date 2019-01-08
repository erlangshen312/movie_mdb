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
import Search from "../component/search";
import Button from "@material-ui/core/Button/Button";


export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movieList: [],
            menu: false,
            page: parseInt(this.props.match.params.page) || 1,
        };

    }

    componentDidMount() {
        const page = this.props.match.params.page || 1;
        this.setState({page: parseInt(page)}, () => this.getMovies());
    }

    componentWillReceiveProps(props){
        const page = props.match.params.page || 1;
        this.setState({page: parseInt(page)}, () => this.getMovies());
    }

    getMovies = () => {
        axios
            .get(URL_LIST + '' + API_KEY + LANG_EN + "&page=" + this.state.page)
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

    decrement = () => {
        const {page} = this.state;
        this.props.history.push('/page/' + (page - 1))
    };
    increment = () => {
        const {page} = this.state;
        this.props.history.push('/page/' + (page + 1))
    };

    render() {
        const {movieList, page} = this.state;

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

        // this.PaginationLists = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 15, 16].map((index, pag) => {
        //         <Button key={index}>{pag}</Button>
        // });
        return (
            <Grid container spacing={16} className="dashboard">
                <div className="search">
                    <Search {...this.props}/>
                </div>


                <div className="dashboard-bottom">
                    <Button onClick={() => this.decrement()} disabled={page <= 1}>Previous Page</Button>
                    <Button onClick={() => this.increment()}>Next Page</Button>
                </div>

                {this.MovieLists ? this.MovieLists : "Now is loading"}

                <div className="dashboard-bottom">
                    <Button onClick={() => this.decrement()} disabled={page <= 1}>Previous Page</Button>
                    <Button onClick={() => this.increment()}>Next Page</Button>
                </div>
            </Grid>
        );
    }
}
