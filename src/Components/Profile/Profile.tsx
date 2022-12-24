import profileStyle from './Profile.module.scss'
import app from '../../App.module.scss';
import profile_img from '../../images/profile.jpg';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {Post} from './MyPost/Post/Post';
import {ProfileResponseType} from './ProfileContainer';
import {useFormik} from 'formik';
import dialogs from '../Dialogs/Dialogs.module.scss';
import React from 'react';
import {addPostsReducerAC} from '../../redux/posts-reducer';
import {useAppDispatch} from '../../redux/redux_store';

type profileTypeProps = {
    profile: ProfileResponseType
    status: string
    updateStatus: (status: string) => void
    isOwner: boolean
}

export const Profile: React.FC<profileTypeProps> = ({ profile, status, updateStatus, isOwner}) => {
    console.log('profile', profile)

    const dispatch = useAppDispatch();
    const addPost = (post: string) => {
        dispatch(addPostsReducerAC(post))
    }

    return (
        <div className={profileStyle.inner}>
            <img
                className={profileStyle.img}
                src={profile_img}
                height="300"
                width="100%"
                alt="profile"/>

            <ProfileInfo
                // savePhoto={savePhoto}
                isOwner={isOwner} profile={profile} status={status} updateStatus={updateStatus}/>

            <div className={profileStyle.post}>
                <h3>My posts</h3>
                <AddNewPostForm addPost={addPost}/>
            </div>
            <ul>
                <Post/>
            </ul>
        </div>
    )
}


type addPostFormType = {
    addPost: (post: string) => void
}
type FormikPostErrorType = {
    newPostText?: string
}
const AddNewPostForm = (props: addPostFormType) => {

    const formik = useFormik({
        validate: (values) => {
            const errors: FormikPostErrorType = {}

            if (!values.newPostText) {
                errors.newPostText = 'Please, write your post'
            }
            return errors
        },

        initialValues: {
            newPostText: '',
        },
        onSubmit: values => {
            props.addPost(values.newPostText)
            formik.resetForm()
        },
    })
    return (
        <form onSubmit={formik.handleSubmit}
            onKeyPress={(e) => {
                if (e.key === 'Enter') {
                    formik.handleSubmit();
                }}}>

                <textarea
                    className={app.message_textarea}
                    name="newPostText"
                    placeholder="your news"
                    onChange={formik.handleChange}
                    value={formik.values.newPostText}
                    // onKeyPress={(e) => e.key === 'Enter' && addMessInPost()}
                ></textarea>
            <div>{formik.errors.newPostText ?
                <div className={dialogs.errors}>{formik.errors.newPostText}</div> : null}</div>
            <div className={profileStyle.btn_box}>
                <button className={app.message_btn}>Add Post</button>
            </div>
        </form>
    )
}
