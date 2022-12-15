
import React from 'react';
import profile_info from './ProfileInfo.module.css';
import {useFormik} from 'formik';
import {CreateInputField} from '../../../utils/object-helpers';
import {saveProfileTC} from '../../../redux/posts-reducer';

type ProfileDataFormType = {}

export const ProfileDataForm: React.FC<ProfileDataFormType> = (props) => {
    const formik = useFormik({
        initialValues: {
            fullName: '',
            lookingForAJob: false,
            lookingForAJobDescription: '',
            aboutMe: ''
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
            saveProfileTC(values.fullName, values.aboutMe, values.lookingForAJob, values.lookingForAJobDescription)
            formik.resetForm()
        },
    })
    return (<form onSubmit={formik.handleSubmit}>
        <button>save</button>
        <h3 className={profile_info.name}>
            Full name: {CreateInputField('Full name', 'fullName', formik.handleChange, 'text', formik.values.fullName)}</h3>

        <div className={profile_info.aboutinfo}>Looking for a job:
            <span className={profile_info.about}>{CreateInputField('', 'lookingForAJob', formik.handleChange, 'checkbox', formik.values.lookingForAJob)}</span>
        </div>

        <div className={profile_info.aboutinfo}>My professional skills:
            <div className={profile_info.about}><textarea
                placeholder={'My skills'}
                name={'lookingForAJobDescription'}
                onChange={formik.handleChange}
                value={formik.values.lookingForAJobDescription}
            ></textarea></div>
        </div>

        <div className={profile_info.aboutinfo}>About me:
            <div className={profile_info.about}><textarea
                placeholder={'About me'}
                name={'aboutMe'}
                onChange={formik.handleChange}
                value={formik.values.aboutMe}
            ></textarea></div>
        </div>

    </form>)
}

