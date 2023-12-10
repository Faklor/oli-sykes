import { ReactSVG } from 'react-svg'
import './header.scss'
import logo  from '../res/logo.svg'
import Nav from './navMneu'

const Header = props=>{
    return(
        <header>
            <div className='logo'>
                <ReactSVG src={logo}/>
                <h1 className='textLogo'>Oli Sykes</h1>
                <Nav/>
            </div>
            <div className='social'>

            </div>
        </header>
    )
}

export default Header