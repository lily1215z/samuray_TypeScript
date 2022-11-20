import profile_info from './ProfileInfo.module.css'
import avatar from '../../../images/avatar.png'
import {Preloader} from '../../common/Preloader/Preloader';

type ProfileInfoProps = {
    profile: any        //hacer type para profile
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

            <div className={profile_info.box}>
                <h3 className={profile_info.name}>{props.profile.contacts.fullname}</h3>
                <div className={profile_info.aboutinfo}>Looking for a job: <span className={profile_info.about}>{props.profile.lookingForAJob ? 'yes' : 'no'}</span></div>
                <div className={profile_info.aboutinfo}>Job: <span className={profile_info.about}>{props.profile.lookingForAJobDescription}</span></div>
                <div className={profile_info.aboutinfo}>Web resource: <span className={profile_info.about}>{props.profile.contacts.github}</span></div>
                <div className={profile_info.aboutinfo}>About me: <span className={profile_info.about}>{props.profile.aboutMe}</span></div>
            </div>
        </div>
    )
}