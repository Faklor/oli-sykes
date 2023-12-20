import './scss/parallaxContent.scss'
import homeOne from '../res/homeOne.jpg'
import { Link } from 'react-router-dom'

export default function ParallaxContent(){
    return(
        <div className='parallax'>
            <img src={homeOne} alt='homeOne'/>
            <div className='buttons'>
                <h1>You can go:</h1>
                <Link to={`../Music`}>To Music</Link>
                <Link to={`../Blog`}>To Blog</Link>
                <Link to={`../User/Signup`}>To Register</Link>
            </div>
            <div className='footer'>
                <h1>Oly Sykes</h1>
                <h2>copyright©</h2>
            </div>
            <div className='text'>
                <h1><hr/>Personal life<hr/></h1>
                <h2>{`Since the age of 12, Sykes has suffered from a form of night terrors known as sleep paralysis, which is the inability to move or speak while falling asleep, or upon waking.

Sykes became a vegetarian in 2003 at age 16 after watching a documentary about animal cruelty online, "When I saw how animals are tortured on factory farms, I couldn't justify being a part of that cruelty." He went on to become one of the faces for PETA, eventually designing charity T-shirts with the slogan "Meat Sucks" via his Drop Dead Clothing line. He turned vegetarian at age 16 before turning vegan 15 years later. His passion for veganism can be seen in his venture 'Church', an arcade bar with a fully vegan menu, opened in 2018 and based in Sheffield's Kelham Island.

Sykes is an outspoken atheist, stating "I don't believe in God. I was asked to believe in him when I was in a shitty place. I couldn't understand why I needed a god or, in my opinion, something that doesn't exist." In an interview with Radio.com in 2013, he also stated "In my opinion, I don't think believing in God is a victimless crime. It's not that I'm right and everyone else is wrong. `}</h2>
            </div>
        </div>
    )
}