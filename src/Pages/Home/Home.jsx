import React from 'react';
import Banner from '../../Component/HomeSection/Banner';
import FeaturedLessons from '../../Component/FeaturedLessons';
import LifeMetters from '../../Component/LifeMetters';
import TopContributors from '../../Component/TopContributors';
import MostSavedLesson from '../../Component/MostSavedLesson';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedLessons></FeaturedLessons>
            <LifeMetters></LifeMetters>
            <TopContributors></TopContributors>
            <MostSavedLesson></MostSavedLesson>
        </div>
    );
};

export default Home;