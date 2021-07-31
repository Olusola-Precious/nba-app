import React, { Component } from 'react';
import style from './videolist.module.css';
// import axios from 'axios';
// import { URL } from '../../../config';
import { firebaseTeams, firebaseVideos, firebaseLooper } from '../../../firebase';
import Button from '../Buttons/buttons';
import VideoListTemplate from './videoListTemplate';

class VideosList extends Component {
    state={
        teams:[],
        videos:[],
        start:this.props.start,
        end:this.props.start + this.props.amount,
        amount:this.props.amount,

    }


    componentDidMount(){
        this.request(this.state.start, this.state.end)
    }


    request = (start,end) =>{
        if(this.state.teams.length < 1){
            firebaseTeams.once('value').then((snapshot) => {
                const teams = firebaseLooper(snapshot);
                this.setState({
                    teams
                })
            })
            // axios.get(`${URL}/teams`).then(response=>{
            //     this.setState({
            //         teams:response.data
            //     })
            // })
        }

        firebaseVideos.orderByChild('id').startAt(start).endAt(end).once('value').then((snapshot) => {
            const videos = firebaseLooper(snapshot);
            this.setState({
                videos: [...this.state.videos, ...videos],
                start,
                end
            })
        }).catch((err) => {
            console.log(err);
        })
        // axios.get(`${URL}/videos?_start=${start}&_end=${end}`)
        // .then(response=>{
        //     this.setState({
        //         videos:[...this.state.videos,...response.data],
        //         start,
        //         end
        //     })
        // })

    }

    renderVideos = () =>{
        let template = null;

        switch(this.props.type){
            case("card"):
                template = <VideoListTemplate data={this.state.videos} teams={this.state.teams}/>
                break;
            default:
                template = null;
        }
        return template;
    }

    loadMore = () =>{
        let end = this.state.end + this.state.amount
        this.request(this.state.end + 1,end)
    }

    renderTitle(){
        return this.props.title ? <h3><strong>NBA</strong> Videos</h3>:null
    }

    renderButton(){
        return this.props.loadmore ? <Button type="loadmore" cta="Load More Videos" loadMore={this.loadMore} />:<Button type="linkTo" cta="More Videos" linkTo="/videos/"/>;
    }

    render() {
        //console.log(this.state.videos);
        return (
            <div className={style.videoList_wrapper}>
                {this.renderTitle()}
                {this.renderVideos()}
                {this.renderButton()}
            </div>
        );
    }
}

export default VideosList;