import React from 'react';
import NewsSlider from '../widgets/NewsSlider/slider';
import NewsList from '../widgets/NewsList/newsList';
import VideoList from '../widgets/VideosList/videosList';


const Home = () =>{
    return(
        <div>
            <NewsSlider type="featured" 
            start={3} 
            amount={6}
            settings={{
                dots:false
            }}
            />

            <NewsList 
            type="card" 
            loadmore={true} 
            start={3}
            amount={3}/>

            <VideoList
            type="card"
            title={true}
            loadmore={true}//redirect to Page
            start={0}
            amount={3}
            />
      
            
        </div>
    )
}


export default Home;