import React from 'react';
import {Button, Grid,} from '@material-ui/core';
import {
    API_KEY,
    LANG_EN,
    URL_GENRE,
} from '../const';

import axios from 'axios';

export default class Genre extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            genres: [],

        }
    }

    componentDidMount() {
        this.getGenre(); //this.props.match.params.id
    }

    getGenre = () => {
        axios
            .get(URL_GENRE + API_KEY + LANG_EN)
            .then((root) => {
                console.log(root);
                this.setState({
                    genres: root.data.genres
                })
            });
    };


    render() {
        const {genres} = this.state;

        console.log(genres);

        this.Genre = genres && genres.map((genre) =>
            <Grid key={genre.id} item xs={6} sm={4} md={4} lg={2}>
                <Button>{genre.name}</Button>
            </Grid>
        );

        return (

            <Grid container className="d-flex">
                {this.Genre}
            </Grid>
        )

    }
}