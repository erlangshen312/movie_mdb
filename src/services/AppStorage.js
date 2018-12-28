import React from "react";

export default class AppStorage extends React.Component {
    static get(key) {
        return localStorage.getItem(key)
    }

    static getObj(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    static set(key, value) {
        return localStorage.setItem(key, value);
    }

    static setObj(key, value) {
        return localStorage.setItem(key, JSON.stringify(value));
    }

    static remove(key) {
        let arr = [];
        if (key.constructor === Array) {
            key.map((val) => arr.push(val));
        } else {
            arr.push(key)
        }
        arr.map((val) => localStorage.removeItem(val));
    }

    static clear() {
        return localStorage.clear();
    }
}


