import profile_info from './ProfileInfo.module.css'
import avatar from '../../../images/avatar.png'
import {Preloader} from '../../common/Preloader/Preloader';
import {ProfileStatus} from './ProfileStatus';
import {ProfileResponseType} from '../ProfileContainer';

type ProfileInfoProps = {
    profile: ProfileResponseType
    status: string
    updateStatus: (status: string) => void
}

export const ProfileInfo: React.FC<ProfileInfoProps> = ({profile, status, updateStatus}) => {

    if(!profile) {
        return <Preloader />
    }

    return (
        <div className={profile_info.info}>
            <img
                // src={avatar}
                src={profile.photos.small}
                width='180'
                height='180'
                alt="avatar" />

            <ProfileStatus status={status} updateStatus={updateStatus}/>

            <div className={profile_info.box}>
                <h3 className={profile_info.name}>{profile.fullName}</h3>
                <div className={profile_info.aboutinfo}>Looking for a job: <span className={profile_info.about}>{profile.lookingForAJob ? 'yes' : 'no'}</span></div>
                <div className={profile_info.aboutinfo}>Job: <span className={profile_info.about}>{profile.lookingForAJobDescription}</span></div>
                <div className={profile_info.aboutinfo}>Web resource: <span className={profile_info.about}>{profile.contacts.github}</span></div>
                <div className={profile_info.aboutinfo}>My Id: <span className={profile_info.about}>{profile.userId}</span></div>
            </div>
        </div>
    )
}