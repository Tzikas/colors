import React, { Component } from 'react';
import Axios from 'axios'
import {Link} from 'react-router-dom'
class Home extends Component {

    state = {
        images:[]
    }


    async componentDidMount(){
        let response = await Axios.get(`https://serene-dawn-41350.herokuapp.com`)
        this.setState({
            images:response.data.images
        })
    }


    showImages = () => {
        return this.state.images.map(eachImage => {
            return (
            <li key={eachImage._id}>
                <h3>{eachImage.name}</h3>
                <p>{eachImage.description}</p>
                <Link to={`/details/${eachImage._id}`}>
                    <img src={eachImage.imageUrl} />
                </Link>
            </li>
            )
        })
    }

    render() {
        return (
            <div>
                Home!!!
                {this.showImages()}
            </div>
        );
    }
}

export default Home;