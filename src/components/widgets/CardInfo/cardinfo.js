import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import style from './cardinfo.module.css';
import moment from 'moment';
// import { formatDate } from 'tough-cookie';

const CardInfo = (props) =>{

    const teamName = (teams,team) =>{
        let data = teams.find((item)=>{
            return item.teamId === team
        })

        if (data){
            return data.name;
        }
    }


    const formatDate = (date)=>{
        return moment(date).format('MM-DD-YYYY')
        
    }

    return(
        <div className={style.cardinfo}>
            <span className={style.teamName}>
                {teamName(props.teams, props.team)}
            </span>
            <span className={style.date}>
                <FontAwesomeIcon icon={['fa','clock']}/>
                {/* {props.date} */}
                {formatDate(props.data)}
            </span>
        </div>
        )
}

export default CardInfo;