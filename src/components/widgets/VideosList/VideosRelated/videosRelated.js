import React from 'react';
import styles from '../videolist.module.css';
import VideoListTemplate from '../videoListTemplate';

const VideosRelated = (props) =>{
    return (
    <div className={styles.relatedWrapper}>
        <VideoListTemplate
            data={props.data}
            teams={props.teams}
        />
    </div>)

}


export default VideosRelated;