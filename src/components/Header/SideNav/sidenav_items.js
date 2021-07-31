import React from 'react';
import {firebase} from '../../../firebase';
import {Link, withRouter} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../fontawesome';
import style from './sidenav.module.css';

const SideNavItems = (props) => {
    
    const Items = [
        {
            type: style.option,
            icon: ['fa',"home"],
            text:"Home",
            link:'/',
            login: ''
        },
        {
            type: style.option,
            icon: ['fa',"file"],
            text: "News",
            link: '/news',
            login: ''
        },
        {
            type: style.option,
            icon: ['fa', "play"],
            text: "Videos",
            link: '/videos',
            login: ''
        },
        {
            type: style.option,
            icon: ['fa', "sign-in-alt"],
            text: "Dashboard",
            link: '/dashboard',
            login: false
        },
        {
            type: style.option,
            icon: ['fa', "sign-in-alt"],
            text: "Sign In",
            link: '/signin',
            login: true
        },
        {
            type: style.option,
            icon: ['fa', "sign-out-alt"],
            text: "Sign out",
            link: '/signout',
            login: false
        },
    ]


    const elements = (item,i)=>(
        <div key={i} className={item.type}>
            <FontAwesomeIcon icon={item.icon} />
            <Link to={item.link}
                style={{ color: '#bababa', padding: '13px' }}
            >
                {item.text}
            </Link>
        </div>
    )


    const restricted = (item,i)=>{
        let template = null;
        if(props.user === null && item.login){
            template = elements(item,i);
        }


        if (props.user !== null && !item.login) {
            if (item.link === '/signout'){
                template = (
                    <div 
                        key={i} 
                        className={item.type}
                        onClick={()=>{
                            firebase.auth().signOut()
                            .then(()=>{
                                props.history.push('/')
                            })
                        }}
                        >
                        <FontAwesomeIcon icon={item.icon} />
                        <Link to={item.link}
                            style={{ color: '#bababa', padding: '13px' }}
                        >
                            {item.text}
                        </Link>
                    </div>
                )
            }else{
                template = elements(item,i)
            }
        }
        
        return template;
    }

    const showItems = () =>{

        return Items.map((item,i)=>{
            return item.login !== '' ? 
            restricted(item,i)
            :elements(item,i)
        })
    }



    return (
   
        <div>
            {showItems()}
        </div>
        
    );
};

export default withRouter(SideNavItems);