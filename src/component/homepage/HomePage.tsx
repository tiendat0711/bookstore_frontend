import React from 'react';
import Banner from './Banner';
import Carousel from './Carousel';
import List from '../product/List';
import { useParams } from 'react-router-dom'

interface HomePageProps {
    keywordSearch: string;
}

const HomePage = ({ keywordSearch }: HomePageProps) => {

    const { categoryId } = useParams();
    let categoryIdNumber = 0;

    try {
        categoryIdNumber = parseInt(categoryId + ''); //NaN
    } catch (error) {
        categoryIdNumber = 0;
        console.log('Error: ', error);
    }
    if (Number.isNaN(categoryId))
        categoryIdNumber = 0;

    return (
        <div>
            <Banner />
            <Carousel />
            <List keywordSearch={keywordSearch} categoryId={categoryIdNumber} />
        </div>
    );
}

export default HomePage;