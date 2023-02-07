import React, {useEffect} from 'react';
import app from '../../App.module.scss';
import {useAppDispatch, useAppSelector} from '../../redux/redux_store';
import {isErrorsAC} from '../../redux/app-reducer';

type CatchErrorsType = {}

export const CatchErrors: React.FC<CatchErrorsType> = () => {
    const errorMessage = useAppSelector(state => state.app.error)
    const dispatch = useAppDispatch();

    setTimeout(() => {
        dispatch(isErrorsAC(null))
    }, 2500);

    useEffect(() => {
        const id = setTimeout(() => {
            dispatch(isErrorsAC(null))
        }, 2500)
        return clearTimeout(id)
    }, [])

    return (<>
            <div className={app.all_error}>
                {errorMessage}
            </div>
        </>
    );
};