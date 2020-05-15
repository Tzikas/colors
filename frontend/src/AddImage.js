import React, { Component } from 'react'
import Axios from 'axios'

class AddImage extends Component {

    state = {
        name: '',
        description: '',
        imageUrl: ''
    }

    onHandleChange = (e) => {
       this.setState({
        [e.target.name]: e.target.value
       })
    }

    sendToServer = async (e) => {
        e.preventDefault()
        let img = await Axios.post(`https://serene-dawn-41350.herokuapp.com/add-image`, this.state)
        console.log(img)
        this.props.history.push('/')
    }

    // this method handles just the file upload
    handleFileUpload = e => {
        console.log("The file to be uploaded is: ", e.target.files[0]);
 
        const uploadData = new FormData();
        // imageUrl => this name has to be the same as in the model since we pass
        // req.body to .create() method when creating a new thing in '/api/things/create' POST route
        uploadData.append("imageUrl", e.target.files[0]);
        
        
        //service.handleUpload(uploadData) to go to cloudinary and come back with image url
        Axios.post(`https://serene-dawn-41350.herokuapp.com/upload`, uploadData)
        .then(response => {
            console.log('response is: ', response);
            // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
            this.setState({ imageUrl: response.data.secure_url });
          })
          .catch(err => {
            console.log("Error while uploading the file: ", err);
          });
    }



    render(){
        return(
            <>
            <h1>Add Form</h1>
            <form onSubmit={this.sendToServer} encType="multipart/form-data" >
                <input type="text" name="name" onChange={this.onHandleChange} />
                <input type="text" name="description"  onChange={this.onHandleChange} />
                <input type="file"  onChange={this.handleFileUpload} />

                <input type="submit" />
            </form>
            </>
        )
    }

}

export default AddImage