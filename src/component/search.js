import React from 'react';
import {Button, Grid, Icon, IconButton, InputBase, TextField,} from '@material-ui/core';
import {
    API_KEY,
    LANG_EN,
    URL_SEARCH,
    QUERY,
} from '../const';

import axios from 'axios';
import ListItem from "@material-ui/core/ListItem/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import List from "@material-ui/core/List/List";

export default class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            search: [],
            name: '',

        }
    }

    componentDidMount() {
        this.getSearch();
    }

    getSearch = () => {
        let {name} = this.state;
        if (name.length > 2) {
            axios
                .get(URL_SEARCH + API_KEY + LANG_EN + QUERY + name)
                .then((root) => {
                    console.log(root);
                    this.setState({
                        search: root.data.results
                    })
                })
                .catch((err) => {
                    console.log("Something in search is wrong");
                });
        }

    };


    handleChange = name => event => {
        this.setState({[name]: event.target.value}, () => this.getSearch(name));
    };

    render() {
        const {search, name,} = this.state;

        console.log(search, name);

        this.Search = search && search.map((s) =>
            <List key={s.id} component="nav">
                <ListItem button>
                    <ListItemText>
                        {s.title}
                    </ListItemText>
                </ListItem>
            </List>
        );

        return (

            <div>

                <InputBase
                    placeholder="Search…"
                    label="Name"
                    value={name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                />

                {this.Search}

            </div>
        )

    }
}