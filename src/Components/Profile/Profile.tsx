import profileStyle from './Profile.module.css'
import profile_img from '../../images/profile.jpg';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPost} from "./MyPost/MyPost";
import {Post} from './MyPost/Post/Post';
import {ProfileResponseType} from './ProfileContainer';

type profileTypeProps = {
    addPost: (post: string) => void
    profile: ProfileResponseType
    status: string
    updateStatus: (status: string) => void
}

export const Profile: React.FC<profileTypeProps> = ({addPost, profile, status, updateStatus}) => {
    return (
        <div className={profileStyle.inner}>
            <img
                className={profileStyle.img}
                src={profile_img}
                height='300'
                width='100%'
                alt="profile" />

            <ProfileInfo profile={profile} status={status} updateStatus={updateStatus}/>

            <MyPost addPost={addPost} title={'My posts'}/>

            <ul>
                <Post />
            </ul>
        </div>
    )
}