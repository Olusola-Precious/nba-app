import React from 'react';
import TeamInfo from '../../Elements/teaminfo';
import PostData from '../../Elements/postData';




const Header = (props) =>{
    const teamInfo = (arg)=>{
        return arg ? (
            <TeamInfo team={arg}/>
        ):null
    }

    const postData = (date,author)=>{
        return <PostData data={{date,author}}/>

    }

    return(

        <header>
            {teamInfo(props.teamData)}
            {postData(props.date,props.author)}
        </header>

    )
}


export default Header;