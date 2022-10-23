import {Post} from "./Post/Post";
import mypost from './MyPost.module.css'
import {PostsType} from "../../../redux/store";
import {useState} from "react";
import {BtnUniversal} from "../../BtnUniversal";

type  myPostTypeProps = {
    posts:Array<PostsType>
    addPost: (post: string) => void
}
export const MyPost: React.FC<myPostTypeProps> = ({posts, addPost}) => {
    const [messInPost, setMessInPost] = useState<string>('')
    const [error, setError] = useState('')

    const addMessInPost = () => {
        if(messInPost.trim().length > 1) {
            addPost(messInPost)
            setMessInPost('')
            setError('')
        } else {
            setError('It is mistake')
        }
    }

// const addMessInPost = () => {
//     PostsReducer(posts, {type: 'ADD-MESSAGES', post: messInPost })
// }

    return (
        <div>
            <div className={mypost.post}>
                <h3 className={mypost.title}>My posts</h3>
                <textarea
                    className='message-textarea'
                    name="text"
                    placeholder='your news'
                    onChange={(e) => setMessInPost(e.currentTarget.value)}
                    value={messInPost}
                    onKeyPress={(e) => e.key === 'Enter' && addMessInPost()}
                ></textarea>
                <div>{error}</div>
                <div className={mypost.btn_box}>
                    <BtnUniversal className={'message-btn'} onClick={addMessInPost} title={'send'} />
                </div>
            </div>
            <ul>
                <Post posts={posts}/>
            </ul>
        </div>
    )
}