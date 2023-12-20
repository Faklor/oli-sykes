import './scss/dashboard.scss'
//======================components=====================
import DashNav from './components/dashNav'
//=====================navigate========================
import { Outlet } from 'react-router-dom'

const Dashboard = ()=>{

    return(
        <>
            <DashNav/>
            <div className='dashboard'>
                <Outlet/>
            </div>
            
        </>
        
        
    )
}


export default Dashboard