import React, { Component } from 'react';
import Axios from 'axios';

class Image extends Component {

    state = {
        submitted:false
    }

    async componentDidMount() {
        let res = await Axios.get(`https://serene-dawn-41350.herokuapp.com/getImage?imageId=${this.props.match.params.id}`)
        console.log(res)
        this.setState(res.data)

    }



    selectColor = (e) => {
        console.log(e.target.value)
        this.setState({
            color: e.target.value
        })
    }

    showColors = (e) => {
        return this.state.colors.map(eachColor => {
            return <div style={{backgroundColor:eachColor}}>{eachColor}</div>
        })
    }

    submitColor = (e) => {
        Axios.post(`https://serene-dawn-41350.herokuapp.com/addColor?imageId=${this.props.match.params.id}`, this.state)
            .then(res => {
                console.log(res)
                let obj = res.data
                obj.submitted = true
                this.setState(obj)
                //this.submitted
                //this.props.history.push('/')
            })
            .catch(err => console.error(err))
    }

    render() {
        let mixedColor = '#000'
        if(this.state.colors){
            this.state.colors.forEach(color => {
                if(color){
                    mixedColor = mix(mixedColor, color, .5)
                    console.log(mixedColor, color)
                }
            })
        }
        return (
            <div>
                <h2>Image</h2>
                <h4>{this.state.name}</h4>
                <p>{this.state.description}</p>
                <img src={this.state.imageUrl} />

                <input type="color" onChange={this.selectColor} />
                <button onClick={this.submitColor} >Submit Color</button>

                {this.state.colors && this.state.submitted? 
                
                <div>
                    <div className="mix" style={{backgroundColor:mixedColor}}>mixed {mixedColor}</div>
                    {this.showColors()}
                </div>
                : ''}
                <button onClick={()=>this.setState({submitted:!this.state.submitted})}>Show</button>


            </div>
        );
    }
}

export default Image;