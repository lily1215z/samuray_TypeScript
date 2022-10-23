import profile_info from './ProfileInfo.module.css'
import avatar from '../../../images/avatar.png'

type ProfileInfoProps = {
    name: string,
    date: string,
    city: string,
    educ: string,
    web: string
}
export function ProfileInfo(props: ProfileInfoProps) {
    return (
        <div className={profile_info.info}>
            <img
                src={avatar}
                width='150'
                height='180'
                alt="avatar" />
            <div className={profile_info.box}>
                <h3 className={profile_info.name}>{props.name}</h3>
                <div className={profile_info.aboutinfo}>Date of birth: <span className={profile_info.about}>{props.date}</span></div>
                <div className={profile_info.aboutinfo}>City: <span className={profile_info.about}>{props.city}</span></div>
                <div className={profile_info.aboutinfo}>Education: <span className={profile_info.about}>{props.educ}</span></div>
                <div className={profile_info.aboutinfo}>Web site: <span className={profile_info.about}>{props.web}</span></div>
            </div>
        </div>
    )
}