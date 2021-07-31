import React from 'react';
import NewsSlider from '../../../widgets/NewsSlider/slider';
import NewsList from '../../../widgets/NewsList/newsList';

const NewsMain = () =>{
    return (
        <div>
            <NewsSlider type="featured"
                start={3}
                amount={6}
                settings={{
                    dots: false
                }}
            />


            <NewsList 
            type="cardMain" 
            loadmore={true}
            start={3}
            amount={10}
            />
        </div>)
}

export default NewsMain;