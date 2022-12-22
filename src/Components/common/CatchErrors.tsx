import React, {useEffect} from 'react';
import app from '../../App.module.scss';
import {AppRootStateType, useAppDispatch} from '../../redux/redux_store';
import {isErrorsAC} from '../../redux/app-reducer';
import {useSelector} from 'react-redux';

type CatchErrorsType = {}

export const CatchErrors: React.FC<CatchErrorsType> = () => {
    const error = useSelector<AppRootStateType, string | null>(state => state.app.error)
    const dispatch = useAppDispatch();

    setTimeout(() => {
        dispatch(isErrorsAC(null))
    }, 4000);

    useEffect(() => {
        const id = setTimeout(() => {
            dispatch(isErrorsAC(null))
        }, 4000)
        return clearTimeout(id)
    }, [])

    return (<>
            <div className={app.all_error}>
                {error}
            </div>

        </>

    );
};