//state.users = items
//action.userId = itemId
//i.id = objPropName   //i[objPropName] - обратиться к св-ву через квадратные скобки
//followed: true = ...newObjProps  - в нем может быть одно св-во напрмиер true а может быть много св-в. поэтому ...

import React, {ChangeEvent} from 'react';
import {UserType} from '../redux/users-reducer';
import {isErrorsAC, isPreloaderAC} from '../redux/app-reducer';
import {Dispatch} from 'redux';

export const updateObjectInArray = (items: Array<UserType>, itemId: number, objPropName: string, newObjProps: {}) => {
    // @ts-ignore
    return items.map((i: UserType) => i[objPropName] === itemId ? {...i, ...newObjProps} : i)
}

//======  common function for input in Login
//formik.handleChange = onChange
//formik.values.email = value
export const CreateInputField = (placeholder: string, name: string, onChange: (e: string | ChangeEvent<any>)=>void, type: string, props = {}, text = '') => {
    return (
        <div>
            <input placeholder={placeholder}
                   name={name}
                   onChange={onChange}
                   type={type}
                   {...props}
            />{text}
        </div>
    )
}

// generic function
export const handleServerAppError = (data: any, dispatch: Dispatch ) => {
    if(data.messages.length) {
        dispatch(isErrorsAC(data.messages[0]))
    } else {
        dispatch(isErrorsAC('Oops, something went wrong...'))
    }
    dispatch(isPreloaderAC(false))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch) => {
    dispatch(isErrorsAC(error.message))
    dispatch(isPreloaderAC(false))
}