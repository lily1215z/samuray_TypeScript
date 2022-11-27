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

export function ProfileInfo(props: ProfileInfoProps) {

    if(!props.profile) {
        return <Preloader />
    }

    return (
        <div className={profile_info.info}>
            <img
                // src={avatar}
                src={props.profile.photos.small}
                width='180'
                height='180'
                alt="avatar" />

            <ProfileStatus status={props.status} updateStatus={props.updateStatus}/>

            <div className={profile_info.box}>
                <h3 className={profile_info.name}>{props.profile.fullName}</h3>
                <div className={profile_info.aboutinfo}>Looking for a job: <span className={profile_info.about}>{props.profile.lookingForAJob ? 'yes' : 'no'}</span></div>
                <div className={profile_info.aboutinfo}>Job: <span className={profile_info.about}>{props.profile.lookingForAJobDescription}</span></div>
                <div className={profile_info.aboutinfo}>Web resource: <span className={profile_info.about}>{props.profile.contacts.github}</span></div>
                <div className={profile_info.aboutinfo}>My Id: <span className={profile_info.about}>{props.profile.userId}</span></div>
            </div>
        </div>
    )
}