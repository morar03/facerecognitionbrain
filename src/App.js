import Navigation from './components/Navigation/Navigation.js';
import Logo from './components/Logo/Logo.js';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank.js';
import './App.css';

import Particles from 'react-particles-js';

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
  
  


function App()  {
  return (
    <div className="App">
      <Particles className="particles"
        params={particlesOption} 
        />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
    {/* <FaceRecognition /> */}
    </div>
  );
}

export default App;
