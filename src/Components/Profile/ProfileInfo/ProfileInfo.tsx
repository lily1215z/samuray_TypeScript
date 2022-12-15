import profile_info from './ProfileInfo.module.css'
import {Preloader} from '../../common/Preloader/Preloader';
import {ProfileStatus} from './ProfileStatus';
import {ProfileResponseType} from '../ProfileContainer';
import photoUser from '../../../images/icon-user.png';
import React, {ChangeEvent, useState} from 'react';
import {ProfileDataForm} from './ProfileDataForm';

type ProfileInfoProps = {
    profile: ProfileResponseType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
    // savePhoto: (file: ChangeEvent<HTMLInputElement>) => void
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({profile, status, updateStatus, isOwner}) => {
    const [editMode, setEditMode] = useState(false)

    if (!profile) {
        return <Preloader/>
    }

    const onMainPhotoSelector = (e: ChangeEvent<HTMLInputElement>) => {
        // if (e.currentTarget.files.length) {
        //     savePhoto(e.currentTarget.files[0])
        // }
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

                <ProfileStatus status={status} updateStatus={updateStatus}/>
                {editMode ? <ProfileDataForm />
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
        {isOwner && <div>
            <button onClick={goToEditMode}>edit</button>
        </div>}
        <h3 className={profile_info.name}>Full name: {profile.fullName}</h3>

        <div className={profile_info.aboutinfo}>Looking for a job:
            <span className={profile_info.about}>{profile.lookingForAJob ? 'yes' : 'no'}</span>
        </div>
        <div className={profile_info.aboutinfo}>My professionak skills:
            <span className={profile_info.about}>{profile.lookingForAJobDescription}</span>
        </div>
        <div className={profile_info.aboutinfo}>Web resource:
            <span className={profile_info.about}>{profile.contacts.github}</span>
        </div>
        <div className={profile_info.aboutinfo}>My Id:
            <span className={profile_info.about}>{profile.userId}</span>
        </div>
        <div className={profile_info.aboutinfo}>Contacts:
            <span className={profile_info.about}>{Object.keys(profile.contacts).map(key => {
                // @ts-ignore
                return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
            })}</span>
        </div>
    </>
}

type ContactPropsType = {
    contactTitle: string
    contactValue: string
}
export const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return <div className={profile_info.aboutinfo}>{contactTitle}
        <span className={profile_info.about}>{contactValue}</span>
    </div>
}