import React, {useEffect} from 'react';
import profile_info from './ProfileInfo.module.scss';
import app from '../../../App.module.scss';
import {useFormik} from 'formik';
import {CreateInputField} from '../../../utils/object-helpers';
import {saveProfileTC} from '../../../redux/posts-reducer';
import {useAppDispatch} from '../../../redux/redux_store';
import profile_img from '../../../images/profile.jpg';
import cn from 'classnames';
import {ProfileResponseType} from '../ProfileContainer';

type ProfileDataFormType = {
    setEditMode: (value: boolean) => void;
    profile: ProfileResponseType
}

export const ProfileDataForm: React.FC<ProfileDataFormType> = ({setEditMode, profile}) => {
    const dispatch = useAppDispatch();

    console.log('profile', profile)

    const formik = useFormik({
        initialValues: {
            fullName: '',
            lookingForAJob: false,
            lookingForAJobDescription: '',
            aboutMe: '',
            userId: 1,
            contacts: {
                github: '',
                vk: '',
                facebook: '',
                instagram: '',
                twitter: '',
                website: '',
                youtube: '',
                mainLink: '',
            },
            photos: {
                small: profile_img,
                large: profile_img,
            }
        },
        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            dispatch(saveProfileTC(values))
            setEditMode(false)
            formik.resetForm()
        },
    })

    useEffect(() => {
        formik.setFieldValue('lookingForAJob', profile.lookingForAJob)
        formik.setFieldValue('lookingForAJobDescription', profile.lookingForAJobDescription)
        formik.setFieldValue('aboutMe', profile.aboutMe)
        formik.setFieldValue('fullName', profile.fullName)
    }, [profile])


    return (<form onSubmit={formik.handleSubmit}>
        <div className={profile_info.name_edit}>
            <div className={profile_info.subtitle}>Full name:</div>
            <div className={profile_info.about}>
                <input
                    placeholder={'Full name'}
                    name={'fullName'}
                    onChange={formik.handleChange}
                    value={formik.values.fullName}
                />
            </div>

        </div>

        <div className={profile_info.aboutinfo_edit}>
            <div className={profile_info.subtitle}>Looking for a job:</div>
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

        <div className={profile_info.aboutinfo}>Contacts:
            <span className={profile_info.about}>{Object.keys(formik.values.contacts).map(key => {
                return <div key={key} className={cn(profile_info.name_edit)}>
                    <span className={profile_info.name_edit_box}>{key}:</span>
                    {CreateInputField(key, 'contacts.' + key, formik.handleChange, 'text')}
                </div>
            })}
            </span>
        </div>

        <div className={profile_info.aboutinfo_edit_btn}>
            <button className={app.message_btn} type={'submit'}>save</button>
        </div>

    </form>)
}

