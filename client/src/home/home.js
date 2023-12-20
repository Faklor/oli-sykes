import Header from '../components/header'
import './scss/home.scss'
import backHome from '../res/backHome.png'
import stline from '../res/stline.svg'
import { ReactSVG } from 'react-svg'
import { Parallax } from '@react-spring/parallax'
//-----------------------------
import TextWriting  from './textWriting'
import ParallaxContent  from './parallaxContent'

const Home = props => {

  return (
    <>
      <Header/>
      <main className='home'>
        <img  src={backHome} alt='backHome'/>
        <TextWriting text={`Hello!`} speed={100}/>
        <TextWriting text={`My name is
Oliver Scott 
Sykes, 
I formed 
Bring me 
the horizon`} 
        speed={100}/>
        <div>
          <h3>
            It this syte - my Blog,<br/> scroll down and check  this
          </h3>
          <ReactSVG src={stline}/>
        </div>
        
        <Parallax pages={3}>
          {/* <ParallaxLayer offset={0} speed={2.5}> */}
            <ParallaxContent/>
          {/* </ParallaxLayer> */}
        </Parallax>
        
      </main>
    </>
  )
}

export default Home
