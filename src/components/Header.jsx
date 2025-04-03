import React from 'react'
import { useAuth } from '../utils/AuthContext'
import { Link } from 'react-router-dom'
import { LogOut, LogIn } from 'react-feather'
import Logo from '../Logo'

const Header = () => {
    const {user, handleLogout} = useAuth()
return (
    <div className='header--wrapper flex flex-col items-center justify-center '>
      
        <div id="header--wrapper" className="flex items-center gap-4">
            {user ? (
                <>
                    <span className="text-lg">Welcome to the Ayuverse <span style={{  color: 'green', fontWeight: 'bold'  }}>&nbsp;{user.name}</span> </span>
                   <LogOut className="header--link cursor-pointer h-2" onClick={handleLogout} /> 
                </>
            ) : (
                <>
                    <Link to="/">
                        <LogIn className="header--link cursor-pointer" />
                    </Link>
                </>
            )}
        </div>
    </div>
)
}

export default Header
