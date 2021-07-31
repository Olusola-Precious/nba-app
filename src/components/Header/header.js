import React from 'react';
import style from './header.module.css';
import {Link} from 'react-router-dom';
//import FontAwesome from 'react-fontawesome';
import SideNav from './SideNav/sidenav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Header = (props)=>{

    const Logo = () =>{
        return(
            <Link to="/" className={style.logo}>
                <img alt="NBA LOGO" src="/images/nba_logo.png"/>
            </Link>
            )
    }


    const navBars = () =>(
        <div className={style.bars}
            onClick={props.onOpenNav}
        >
            
            <FontAwesomeIcon icon={faBars}
            style={{
                color:'#dfdfdf',
                padding:'10px',
                cursor:'pointer'
            }}
            />
        </div>
    )
    return(
        <header className={style.header}>
            <SideNav {...props}/>
            <div className={style.headerOpt}>
                {navBars()}
                {Logo()}
            </div>
        </header>
    )
}


export default Header;