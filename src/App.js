import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';

import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank.js';
import './App.css';

const app = new Clarifai.App({
 apiKey: '6cbb38e1191745e5bddfc44663e3b749'
});

const particlesOption ={
  particles: {
      number:{
        value:60,
        density:{
          enable:true,
          value_area: 800
        },
      }
      }
    }


class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: '',
      box:{},
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol : clarifaiFace.left_col * width,
      topRow : clarifaiFace.top_row * height,
      rightCol : width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row *height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }


  onInputChange = (event) => { 
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
        this.setState({imageURL: this.state.input});
        
        // I used the ID for the Face Detection Model
        app.models.predict( Clarifai.FACE_DETECT_MODEL, 
          this.state.input)
        .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))           
        .catch(err => console.log(err));
    }

  render(){
    return (
      <div className="App">
        <Particles className="particles"
          params={particlesOption} 
          />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm 
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit} 
        />
       <FaceRecognition box={ this.state.box} imageURL={this.state.imageURL} />
      </div>
    );
  }
}

export default App;
