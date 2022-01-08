import './Profile.css'
import profile from '../../images/profile.jpg';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPost} from "./MyPost/MyPost";
import {dataTypeProps} from '../../App'

type profileTypeProps = {
    data: Array<dataTypeProps>
}
export function Profile(props: profileTypeProps) {
    return (
        <div className='profile_inner'>
            <img
                className='profile_img'
                src={profile}
                height='300'
                width='100%'
                alt="profile" />
            <ProfileInfo name='SvetLana' date='12.10.1984' city='Odessa' educ='Camasutra' web='facebook.com' />
            <MyPost data={props.data}/>
        </div>
    )
}