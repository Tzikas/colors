import React, { Component } from 'react';
import {Route, Switch, Link} from 'react-router-dom'
import Home from './Home'
import AddImage from './AddImage'
import Image from './Image'

class App extends Component {
  render() {
    return (
      <div>
        <nav>
          <Link to="/">Home |</Link>
          <Link to="/add-image">Add Image</Link>
        </nav>
        <h1>Our super cool project</h1>

        <Switch>
          <Route exact path={`/`} render ={ (props => <Home {...props} />) } />
          <Route exact path={`/add-image`} render ={ (props => <AddImage {...props} />) } />
          <Route exact path={`/details/:id`} render ={ (props => <Image {...props} />) } />

        </Switch>
      </div>
    );
  }
}

export default App;