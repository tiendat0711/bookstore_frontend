import React from 'react';
import Banner from './Banner';
import Carousel from './Carousel';
import List from '../product/List';

function HomePage() {
    return (
        <div>
            <Banner />
            <Carousel />
            <List />
        </div>
    )
}

export default HomePage;