import React from 'react';
import {Grid, Typography, Table, TableBody, TableCell, TableHead, TableRow} from '@material-ui/core';
import {URL_DETAIL, API_KEY, LANG_EN, URL_IMG, IMG_SIZE_LARGE} from '../const';
import axios from 'axios';
import Recommendation from "../component/recommendation";
import Video from "../component/video";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Icon from "@material-ui/core/Icon/Icon";

export default class Detail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: {},
            id: this.props.match.params.id
        };
        console.log("THIS PROPS FROM DETAIL", this.props);
    }

    componentDidMount() {
        this.getDetail(this.state.id);
    }

    componentWillReceiveProps(props) {
        this.setState({id: props.match.params.id}, () => this.getDetail(props.match.params.id));
    }

    getDetail = (id) => {
        axios
            .get(URL_DETAIL + id + API_KEY + LANG_EN)
            .then((root) => {
                this.setState({
                    movie: root.data
                })
            });
    };

    render() {
        const {movie} = this.state;
        console.log(movie);

        this.Pro = movie.production_companies && movie.production_companies.map((pr) =>
            <div key={pr.id} className="pro">
                {pr.logo_path && <img src={URL_IMG + IMG_SIZE_LARGE + pr.logo_path} className="pro-img"/>}
                <Typography>{pr.name}</Typography>
                <Typography>{pr.origin_country}</Typography>
            </div>
        );
        this.Genres = movie.genres && movie.genres.map((genre) =>
            <div key={genre.id}>
                <Typography variant={"subtitle1"}>{genre.name + ','}&nbsp;</Typography>
                {/*<Typography>{genre.origin_country}</Typography>*/}
            </div>
        );

        return (

                <Grid>
                    <div className="detail">

                        <Typography variant={"h2"} className="fw-900">{movie.title}</Typography>
                        <div className="detail-genres">
                            <Typography variant={"subtitle1"} className="fw-600"> Genres: </Typography>
                            {this.Genres}
                        </div>

                        <div>
                            <img src={URL_IMG + IMG_SIZE_LARGE + movie.poster_path} className="detail-poster-img"/>
                            <img src={URL_IMG + IMG_SIZE_LARGE + movie.backdrop_path} className="detail-img"/>
                        </div>


                        <Grid container>
                            <Typography variant={"subtitle1"} className="fw-600 detail-video">Videos</Typography>
                            <Video id={this.state.id}/>
                        </Grid>


                        <Typography variant={"subtitle1"} className="detail-overview">
                            <Typography variant={"subtitle1"} className="fw-600 ">Overview</Typography>
                            {movie.overview}
                        </Typography>
                        <div className="detail-big-content">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <Typography variant={"subtitle1"} className="fw-600">Budget</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant={"subtitle1"} className="fw-600">Popularity</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant={"subtitle1"} className="fw-600">Release date</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant={"subtitle1"} className="fw-600">Vote average</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant={"subtitle1"} className="fw-600">Vote count</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant={"subtitle1"} className="fw-600">Runtime</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    <TableRow>
                                        <TableCell>
                                            <Typography variant={"subtitle1"}>{movie.budget + "$"}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant={"subtitle1"}>{movie.popularity}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant={"subtitle1"}>{movie.release_date}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant={"subtitle1"}>{movie.vote_average}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant={"subtitle1"}>{movie.vote_count}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant={"subtitle1"}>{movie.runtime + "min"}</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>
                        <div className="detail-min-content">
                            <Typography variant={"subtitle1"} className="fw-600" >{"Budget: " + movie.budget + "$"}</Typography>
                            <Typography variant={"subtitle1"} className="fw-600" >{"Popularity: " + movie.popularity}</Typography>
                            <Typography variant={"subtitle1"} className="fw-600" >{"Release date: " + movie.release_date}</Typography>
                            <Typography variant={"subtitle1"} className="fw-600" >{"Release date: " + movie.vote_average}</Typography>
                            <Typography variant={"subtitle1"} className="fw-600" >{"Vote count: " + movie.vote_count}</Typography>
                            <Typography variant={"subtitle1"} className="fw-600" >{"Runtime: " + movie.runtime + "min"}</Typography>
                        </div>
                        &nbsp;
                        {
                            movie.homepage &&
                            <Typography variant={"subtitle1"}>{"Official homepage:"}
                                <a href={movie.homepage}>{movie.homepage}</a></Typography>
                        }

                        <div className="detail-row">
                            <Typography variant={"subtitle1"} className="fw-600 company">Company</Typography>
                            {this.Pro}
                        </div>

                        <Grid container className="detail-rec">
                            <Typography variant={"subtitle1"} className="fw-600 ">Recommendation</Typography>
                            <Recommendation id={this.state.id} {...this.props}/>
                        </Grid>
                    </div>
                </Grid>
        )

    }
}