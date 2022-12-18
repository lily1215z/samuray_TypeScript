import React from 'react';
import profile_info from './ProfileInfo.module.scss';
import {useFormik} from 'formik';
import {CreateInputField} from '../../../utils/object-helpers';
import {saveProfileTC} from '../../../redux/posts-reducer';
import {AppRootStateType, useAppDispatch} from '../../../redux/redux_store';
import {useSelector} from 'react-redux';
import profile_img from '../../../images/profile.jpg';

type ProfileDataFormType = {
    setEditMode: (value: boolean) => void;
}

export const ProfileDataForm: React.FC<ProfileDataFormType> = ({setEditMode}) => {
    const dispatch = useAppDispatch();
    const fullName = useSelector<AppRootStateType, string>(state => state.profilePage.profile.fullName)

    // useEffect(() => {
    //     if (!isEmpty(data)) {
    //         formik.setValues({
    //             ...data
    //         });
    //     }
    // }, [data]);

    // useEffect(() => {
    //     setStatus(props.status)
    // }, [props.status])

    const formik = useFormik({
        enableReinitialize: true,
        //  initialValues: {
        //      fullName: '',
        //      lookingForAJob: false,
        //      lookingForAJobDescription: '',
        //      aboutMe: ''
        //  },
        initialValues: {
            fullName: fullName || '',
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
    //formik.setValues({fullName:"hey",lookingForAJob: true});
    return (<form onSubmit={formik.handleSubmit}>
        <div className={profile_info.name_edit}>
            <div className={profile_info.subtitle}>Full name:</div>
            <span
                className={profile_info.about}>{CreateInputField('Full name', 'fullName', formik.handleChange, 'text', formik.values.fullName)}</span>
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

        <div className={profile_info.aboutinfo}>Contacts:
            <span className={profile_info.about}>{Object.keys(formik.values.contacts).map(key => {
                return <div key={key}>
                    {key}: {CreateInputField(key, 'contacts.' + key, formik.handleChange, 'text')}
                </div>
            })}
            </span>
        </div>

        <div className={profile_info.aboutinfo_edit_btn}>
            <button className={'message_btn'} type={'submit'}>save</button>
        </div>

    </form>)
}

