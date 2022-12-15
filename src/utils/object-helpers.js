//state.users = items
//action.userId = itemId
//i.id = objPropName   //i[objPropName] - обратиться к св-ву через квадратные скобки
//followed: true = ...newObjProps  - в нем может быть одно св-во напрмиер true а может быть много св-в. поэтому ...

import React from "react";

export const updateObjectInArray = (items, itemId, objPropName, newObjProps) => {
    return items.map((i) => i[objPropName] === itemId ? {...i, ...newObjProps} : i)
}

//======  common function for input in Login
//formik.handleChange = onChange
//formik.values.email = value
export const CreateInputField = (placeholder, name, onChange, type, props = {}, text = '') => {
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