import React, { Component } from "react";

class HomePage extends Component {
    render() {
        return (
            <div className="container">
                <h1>Home Page</h1>
                <p>This is a small project that I use Reactjs and redux library. It is normally manage product project. I use Reactjs for UI and Redux to manage state of data. Reactjs doesn't come with a built-in router, so my demo achieve routing with the “react-router-dom” library. Beside of that, I use “mockapi.io” to create a dump restful api and I use axios to interact with it.</p>
            </div>
        );
    }
}

export default HomePage;