import React, { Component } from 'react'
// import axios from 'axios';
import SilderTemplates from './slider_templates';
// import { URL } from '../../../config';
import { firebase,firebaseArticles, firebaseLooper } from '../../../firebase';


class NewsSlider extends Component {

    
    state = {
        news: []
    }
    componentDidMount(){
        firebaseArticles.limitToFirst(3).once('value')
        .then((snapshot)=>{
            const news = firebaseLooper(snapshot);
            // news.forEach((item,i)=>{
            //     firebase.storage().ref('images')
            //     .child(item.image)
            //     .getDownloadURL()
            //     .then(url=>{
            //         news[i].image = url;
            //         this.setState({
            //                     news
            //                 })
            //     })
            // })

            const asyncFunction = (item, i, cb)=>{
                firebase.storage().ref('images')
                    .child(item.image)
                    .getDownloadURL()
                    .then(url=>{
                        news[i].image = url;
                        cb();
                    })
            }
            let requests = news.map((item,i)=>{
                return new Promise((resolve)=>{
                    asyncFunction(item,i,resolve)
                })
            })

            Promise.all(requests).then(()=>{
                this.setState({
                    news
                })
            })
            
        })
        // axios.get(`${URL}/articles?_start=${this.props.start}&_end=${this.props.amount}`)
        //     .then(response => {
        //         //console.log(response);
        //         this.setState({
        //             news:response.data
        //         })
        //     })

    }
    
    render() {
        //console.log(this.state.news)
        // console.log(this.state)
        return (
            <div>
                <SilderTemplates data={this.state.news} type={this.props.type} settings={this.props.settings}/>
            </div>
        )
    }
}


export default NewsSlider;