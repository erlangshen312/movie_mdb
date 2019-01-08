import React from 'react'
import {Typography, Grid, Card, CardActionArea, CardMedia,} from "@material-ui/core";
import {API_KEY, URL_IMG, IMG_SIZE_LARGE,LANG_EN, URL_DETAIL, RECOMENDATION} from '../const';
import axios from 'axios';

export default class Recommendation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendations: [],
            id: this.props.id,
        };
        console.log("This recommendation props", this.state.id)
    }

    componentDidMount() {
        this.getRecommendation(this.state.id);
    }

    componentWillReceiveProps(props){
        this.getRecommendation(props.id)
    }

    getRecommendation = (id) => {
        axios
            .get(URL_DETAIL + id + RECOMENDATION + API_KEY + LANG_EN)
            .then(({data}) => {
                this.setState({
                    recommendations: data.results
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
        const {recommendations} = this.state;
        console.log(recommendations);

        this.RecommendationLists = recommendations && recommendations.map((rec) =>
            <Grid key={rec.id} item xs={4} sm={2} md={2} lg={2}>
                <Card className="card">
                    <CardActionArea onClick={() => this.goToDetail(rec.id)}>
                        <CardMedia className="content">
                            <div className="content-overlay"></div>
                            <img src={URL_IMG + IMG_SIZE_LARGE + rec.poster_path} className="content-image"/>
                            <div className="content-details fadeIn-bottom">
                                <Typography variant="h6" className="content-title">{rec.title}</Typography>
                                <Typography component="p" className="content-text">{rec.vote_average}</Typography>
                            </div>
                        </CardMedia>
                    </CardActionArea>
                </Card>
            </Grid>
        );

        return (
            <Grid container spacing={16} className="dashboard">
                {this.RecommendationLists}
            </Grid>
        );
    }
}
