import profileStyle from './Profile.module.css'
import profile_img from '../../images/profile.jpg';
import {ProfileInfo} from "./ProfileInfo/ProfileInfo";
import {Post} from './MyPost/Post/Post';
import {ProfileResponseType} from './ProfileContainer';
import {useState} from 'react';
import {useFormik} from 'formik';

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
                <div className={profileStyle.post}>
                    <h3>{'My posts'}</h3>
                    <AddNewPostForm addPost={addPost}/>
                </div>
            <ul>
                <Post />
            </ul>
        </div>
    )
}

type addPostFormType = {
    addPost: (post: string) => void
}
const AddNewPostForm = (props: addPostFormType) => {
    const [messInPost, setMessInPost] = useState<string>('')
    const [error, setError] = useState('')

    // const addMessInPost = () => {
    //     if (messInPost.trim().length > 1) {
    //         props.addPost(messInPost)
    //         setMessInPost('')
    //         setError('')
    //     } else {
    //         setError('It is mistake')
    //     }
    // }

    const formik = useFormik({
        initialValues: {
            newPostText: '',
        },
        onSubmit: values => {
            props.addPost(values.newPostText)
            formik.resetForm()
        },
    })
    return (
        <form onSubmit={formik.handleSubmit}>
                <textarea
                    className="message-textarea"
                    name="newPostText"
                    placeholder="your news"
                    onChange={formik.handleChange}
                    value={formik.values.newPostText}
                    // onKeyPress={(e) => e.key === 'Enter' && addMessInPost()}
                ></textarea>
            <div>{error}</div>
            <div className={profileStyle.btn_box}>
                <button className={'message-btn'}>Add Post</button>
            </div>
        </form>
    )
}
