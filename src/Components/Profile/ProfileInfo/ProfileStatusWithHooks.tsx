import React, {ChangeEvent, useEffect, useState} from 'react';
import profile_info from './ProfileInfo.module.scss'
import {useAppDispatch} from '../../../redux/redux_store';
import {updateStatusUserTC} from '../../../redux/posts-reducer';

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}
//84 lesson 10 min
export const ProfileStatusWithHooks: React.FC<ProfileStatusPropsType> = (props: ProfileStatusPropsType) => {
    const dispatch = useAppDispatch();

    const [editMode, setEditMode] = useState(false)  //такой же стейт (название) есть локально в ProfileDataForm
                                                              //но мой работает только здесь. если прокинуть тот то они будут взаимосвязаны
   const [status, setStatus] = useState(props.status);

    useEffect(() => {                   //need for render status from state in input when first render
        setStatus(props.status)
    }, [props.status])

    const activeEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        // props.updateStatus(status)
        dispatch(updateStatusUserTC(status)).then()
    }

    const onStatusChange = (e:ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className={profile_info.aboutinfo_status}><span className={profile_info.status_title}>Status:</span>
            {!editMode &&
                <span
                    className={profile_info.about}
                    onDoubleClick={activeEditMode}
                >{props.status || ' --/---/--'}</span>
            }
            {editMode &&
                <div>
                    <input
                        // onChange={(e)=> setStatus(e.currentTarget.value)}
                        onChange={onStatusChange}
                        autoFocus
                        onBlur={deactivateEditMode}
                        value={status}   //показываем status не из пропсов а из state
                        className={profile_info.status_edit}
                    />
                </div>
            }

        </div>
    );
}


