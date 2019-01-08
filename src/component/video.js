import React from 'react'
import {Typography, Grid, } from "@material-ui/core";
import {API_KEY,LANG_EN, URL_DETAIL, URL_VIDEO} from '../const';
import axios from 'axios';
import YoutubePlayer from 'react-youtube-player';

export default class Video extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [],
            id: this.props.id,
        };
    }

    componentDidMount() {
        this.getVideos(this.state.id);
    }

    componentWillReceiveProps(props){
        this.getVideos(props.id);
    }

    getVideos = (id) => {
        axios
            .get(URL_DETAIL + id + URL_VIDEO + API_KEY + LANG_EN)
            .then(({data}) => {
                this.setState({
                    videos: data.results
                });
            })
            .catch((err) => {
                console.log("ERROR IN VIDEO WHERE AXIOS GET MOVIE");
            })
    };

    render() {
        const {videos} = this.state;
        console.log(videos);

        this.VideoLists = videos && videos.map((video) =>
            <Grid key={video.id} item xs={4} sm={2} md={2} lg={2}>
                <div className="card">

                            <YoutubePlayer
                                videoId={video.key}
                                playbackState='unstarted'
                                configuration={
                                    {
                                        showinfo: 0,
                                        controls: 0
                                    }
                                }
                            />
                            <div className="content-details fadeIn-bottom">
                                <Typography variant="h6" className="content-title">{video.name}</Typography>
                            </div>

                </div>
            </Grid>
        );

        return (
            <Grid container spacing={16} className="dashboard">
                {this.VideoLists ? this.VideoLists : "Movie has not trailers"}
            </Grid>
        );
    }
}
