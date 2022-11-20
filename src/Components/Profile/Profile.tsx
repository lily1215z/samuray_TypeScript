import profileStyle from './Profile.module.css'
import profile_img from '../../images/profile.jpg';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPost} from "./MyPost/MyPost";
import {Post} from './MyPost/Post/Post';

type profileTypeProps = {
    addPost: (post: string) => void
    profile: {}
}

export const Profile: React.FC<profileTypeProps> = ({addPost, profile}) => {
    return (
        <div className={profileStyle.inner}>
            <img
                className={profileStyle.img}
                src={profile_img}
                height='300'
                width='100%'
                alt="profile" />
            <ProfileInfo profile={profile} />
            <MyPost addPost={addPost} title={'My posts'}/>
            <ul>
                <Post />
            </ul>
        </div>
    )
}