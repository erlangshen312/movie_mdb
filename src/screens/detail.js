import React from 'react';
import {Grid, Typography,} from '@material-ui/core';
import {
    URL_DETAIL,
    API_KEY,
    LANG_EN,
    URL_IMG,
    IMG_SIZE_LARGE
} from '../const';

import axios from 'axios';

export default class Detail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: {},

        }
    }

    componentDidMount() {
        this.getDetail(this.props.match.params.id);
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
            <div key={pr.id}>
                <img src={URL_IMG + IMG_SIZE_LARGE + pr.logo_path} className="detail-img"/>
                <Typography>{pr.name}</Typography>
                <Typography>{pr.origin_country}</Typography>
            </div>
        );
        return (
            <Grid>
                <div className="detail">
                    <img src={URL_IMG + IMG_SIZE_LARGE + movie.backdrop_path} className="detail-img"/>
                    <Typography variant={"h6"} style={{fontWeight: 600}}>{movie.title}</Typography>
                    <Typography variant={"overline"} className="detail-overview">
                        {movie.overview}
                    </Typography>
                    <Typography variant={"overline"}>{"Budget: " + movie.budget + "$"}</Typography>
                    <Typography variant={"overline"}>{"Popularity: " + movie.popularity}</Typography>
                    <Typography variant={"overline"}>{"Release date: " + movie.release_date}</Typography>
                    <Typography variant={"overline"}>{"Vote average: " + movie.vote_average}</Typography>
                    <Typography variant={"overline"}>{"Vote count: " + movie.vote_count}</Typography>
                    <Typography variant={"overline"}>{"Runtime: " + movie.runtime + "min"}</Typography>
                    {
                        movie.homepage &&
                        <Typography variant={"overline"}>{"Official homepage:"}
                        <a href={movie.homepage}>{movie.homepage}</a></Typography>
                    }
                    <div className="detail-row">
                        {this.Pro}
                    </div>
                </div>
            </Grid>
        )

    }
}