import React,{Component} from 'react';
// import axios from 'axios';
// import {URL} from '../../../../config';

import { firebase,firebaseDb,firebaseTeams,firebaseLooper } from '../../../../firebase';
import styles from '../../articleStyle.module.css';

//import styles from './post.module.css';
import Header from './header';



class NewsArticles extends Component{
    state={
        article:[],
        team:[],
        ImageURL:''
    }

    componentDidMount(){
        //console.log(this.props.match.params.id)
        firebaseDb.ref(`articles/${this.props.match.params.id}`).once('value').then((snapshot)=>{
            let article = snapshot.val();
            //console.log(article);
            firebaseTeams.orderByChild('teamId').equalTo(article.team).once('value').then((snapshot)=>{
                const team = firebaseLooper(snapshot);
                this.setState({
                    article,
                    team,
                })
                this.getImageURL(article.image)

            })
        })
        // axios.get(`${URL}/articles?id=${this.props.match.params.id}`).then(response=>{
        //     //console.log(response.data);
        //     let article = response.data[0];
        //     axios.get(`${URL}/teams?id=${article.team}`).then(response=>{
        //         this.setState({
        //             article,
        //             team:response.data
        //         })
        //     })
        // })
    }

    getImageURL=(filename)=>{
        firebase.storage().ref("images").child(filename)
        .getDownloadURL().then(url=>{
            this.setState({
                ImageURL:url
            })
        })
    }
    render(){
        const article = this.state.article;
        const team = this.state.team;

        return(
            <div className={styles.articleWrapper}>
                <Header 
                teamData={team[0]}
                date={article.date}
                author={article.author}
                />
                

                <div className={styles.articleBody}>
                    <h1>
                        {article.title}
                    </h1>

                    <div className={styles.articleImage} style={{background:`url(${this.state.ImageURL}`}}>
                    </div>


                    <div 
                    className={styles.articleText} dangerouslySetInnerHTML={{
                            __html: article.body
                    }}>
                    </div>
                </div>

                

            </div>
        )
    }
}


export default NewsArticles;