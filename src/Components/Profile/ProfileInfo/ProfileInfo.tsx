import profile_info from './ProfileInfo.module.scss';
import {Preloader} from '../../common/Preloader/Preloader';
import {ProfileResponseType} from '../ProfileContainer';
import photoUser from '../../../images/icon-user.png';
import React, {ChangeEvent, useState} from 'react';
import {ProfileDataForm} from './ProfileDataForm';
import pen from '../../../images/pen.png';
import {ProfileStatusWithHooks} from './ProfileStatusWithHooks';
import {savePhotoTC} from '../../../redux/posts-reducer';
import {useAppDispatch} from '../../../redux/redux_store';

type ProfileInfoProps = {
    profile: ProfileResponseType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean  //responsible show profile & edit btn if we stay in edit mode
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({profile, status, updateStatus, isOwner}) => {
    const [editMode, setEditMode] = useState(false)
    const dispatch = useAppDispatch();

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelector = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            dispatch(savePhotoTC(e.currentTarget.files[0])).then()
        }
    }

    return (
        <div className={profile_info.info}>
            <div className={profile_info.profile_box_img}>
                <img
                    src={profile.photos.small || photoUser}
                    width="180"
                    height="180"
                    alt="avatar"/>

                {isOwner &&
                    <label className={profile_info.load_img}>
                        <input
                            type={'file'}
                            onChange={onMainPhotoSelector}/>
                    </label>
                }
            </div>


            <div className={profile_info.box}>

                <ProfileStatusWithHooks status={status} updateStatus={updateStatus}/>

                {editMode ? <ProfileDataForm setEditMode={setEditMode} profile={profile}/>
                    :
                    <ProfileData
                        profile={profile}
                        isOwner={isOwner}
                        goToEditMode={() => setEditMode(true)}
                    />}

            </div>
        </div>
    )
}


type ProfileDataPropsType = {
    profile: ProfileResponseType
    isOwner: boolean
    goToEditMode: () => void
}
export const ProfileData: React.FC<ProfileDataPropsType> = ({profile, isOwner, goToEditMode}) => {

    return <>
        <div>
            {isOwner && <div>
                <div onClick={goToEditMode} className={profile_info.info_edit}><img src={pen} alt="edit"/></div>
            </div>}

            <div className={profile_info.name_box}>Full name:<span
                className={profile_info.name}>{profile.fullName}</span></div>

            <div className={profile_info.aboutinfo}>Looking for a job:
                <span className={profile_info.about}>{profile.lookingForAJob ? 'yes' : 'no'}</span>
            </div>
            {
                profile.lookingForAJob && <div className={profile_info.aboutinfo}>My professionak skills:
                    <span className={profile_info.about}>{profile.lookingForAJobDescription}</span>
                </div>
            }
            <div className={profile_info.aboutinfo}>About me:
                <span className={profile_info.about}>{profile.aboutMe}</span>
            </div>


            <div className={profile_info.aboutinfo}>Contacts:
                <span >{Object.keys(profile.contacts).map(key => {
                    // @ts-ignore
                    return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>

                })}</span>
            </div>
        </div>

    </>
}


type ContactPropsType = {
    contactTitle: string
    contactValue: string
}
export const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return (
        <div className={profile_info.aboutinfo_value_box}>
            <div className={profile_info.aboutinfo_value}>{contactTitle}</div>
            <div  className={profile_info.aboutinfo_value_key}>{contactValue}</div>
        </div>
    )
}