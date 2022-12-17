import React from 'react';
import pageNotFound from './PageNotFound.module.scss';
import pageNotFoundText from '../../../images/404text.png';

export const PageNotFound = () => {
    return (
        <div className={pageNotFound.wrapper}>
            <img src={pageNotFoundText} alt={'pageNotFoundText'} />
        </div>
    );
};

