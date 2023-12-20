import { ReactSVG } from 'react-svg'
import './header.scss'
import logo  from '../res/logo.svg'
import Nav from './navMneu'

const Header = props=>{
    return(
        <header>
            <div className='logo'>
                <div>
                    <ReactSVG src={logo}/>
                    <h1 className='textLogo'>Oli Sykes</h1>
                </div>
                <Nav/>
            </div>


        </header>
    )
}

export default Header