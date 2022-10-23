import profile from './Profile.module.css'
import profile_img from '../../images/profile.jpg';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {MyPost} from "./MyPost/MyPost";
import {PostsType} from '../../redux/store'

type profileTypeProps = {
    posts: Array<PostsType>
    addPost: (post: string) => void
}

export const Profile: React.FC<profileTypeProps> = ({posts, addPost}) => {
    return (
        <div className={profile.inner}>
            <img
                className={profile.img}
                src={profile_img}
                height='300'
                width='100%'
                alt="profile" />
            <ProfileInfo name='SvetLana' date='12.10.1984' city='Odessa' educ='Camasutra' web='facebook.com' />
            <MyPost posts={posts} addPost={addPost}/>
        </div>
    )
}