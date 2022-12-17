import React from 'react';
import profile_info from './ProfileInfo.module.scss';
import {useFormik} from 'formik';
import {CreateInputField} from '../../../utils/object-helpers';
import {saveProfileTC} from '../../../redux/posts-reducer';
import {useAppDispatch} from '../../../redux/redux_store';

type ProfileDataFormType = {
    setEditMode: (value: boolean) => void;
}

export const ProfileDataForm: React.FC<ProfileDataFormType> = ({setEditMode}) => {
    const dispatch = useAppDispatch();

    const formik = useFormik({
        initialValues: {
            fullName: '',
            lookingForAJob: false,
            lookingForAJobDescription: '',
            aboutMe: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            dispatch(saveProfileTC(values.fullName, values.aboutMe, values.lookingForAJob, values.lookingForAJobDescription))
            setEditMode(false)
            formik.resetForm()
        },
    })
    return (<form onSubmit={formik.handleSubmit}>
        <div className={profile_info.name_edit}>
            <div className={profile_info.subtitle}>Full name:</div>
            <span className={profile_info.about}>{CreateInputField('Full name', 'fullName', formik.handleChange, 'text', formik.values.fullName)}</span>
        </div>

        <div className={profile_info.aboutinfo_edit}>
            <div className={profile_info.subtitle}>Looking for a job:</div>
            {/*<span*/}
            {/*    className={profile_info.about}>{CreateInputField('', 'lookingForAJob', formik.handleChange, 'checkbox', formik.values.lookingForAJob)}*/}
            {/*</span>*/}
            <input
                id="check"
                type={'checkbox'}
                name={'lookingForAJob'}
                onChange={formik.handleChange}
                checked={formik.values.lookingForAJob}
            />
            <label className={profile_info.about_check_label} htmlFor="check"></label>
        </div>

        <div className={profile_info.aboutinfo_edit}>
            <div className={profile_info.subtitle}>My professional skills:</div>
            <div className={profile_info.about}><textarea
                placeholder={'My skills'}
                name={'lookingForAJobDescription'}
                onChange={formik.handleChange}
                value={formik.values.lookingForAJobDescription}
            ></textarea></div>
        </div>

        <div className={profile_info.aboutinfo_edit}>
            <div className={profile_info.subtitle}>About me:</div>
            <div className={profile_info.about}><textarea
                placeholder={'About me'}
                name={'aboutMe'}
                onChange={formik.handleChange}
                value={formik.values.aboutMe}
            ></textarea></div>
        </div>
        <div className={profile_info.aboutinfo_edit_btn}>
            <button className={'message_btn'} type={'submit'}>save</button>
        </div>

    </form>)
}

