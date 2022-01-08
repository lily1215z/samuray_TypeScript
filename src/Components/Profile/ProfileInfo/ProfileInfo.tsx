import './ProfileInfo.css'
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
        <div className='profile-info'>
            <img
                src={avatar}
                width='150'
                alt="avatar" />
            <div className='profile-info__box'>
                <h3 className="profile-info__name">{props.name}</h3>
                <div className="profile-info__date">Date of birth: {props.date}</div>
                <div className="profile-info__city">City: {props.city}</div>
                <div className="profile-info__education">Education: {props.educ}</div>
                <div className="profile-info__site">Web site: {props.web}</div>
            </div>
        </div>
    )
}