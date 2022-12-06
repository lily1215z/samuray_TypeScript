import React from 'react';
import preloader from './Preloader.module.css'
import preloaderImg from '../../../images/loading.gif';

export const Preloader = () => {
    return (
        <div className={preloader.preloader_box}>
            <img src={preloaderImg} alt={'preloader'}/>
        </div>
    );
};

