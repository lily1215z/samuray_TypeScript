
import mypost from './MyPost.module.css'
import {useState} from "react";
import {BtnUniversal} from "../../BtnUniversal";

type  myPostTypeProps = {
    addPost: (post: string) => void
    title: string
}
export const MyPost: React.FC<myPostTypeProps> = ({addPost, title}) => {
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

    return (
        <div>
            <div className={mypost.post}>
                <h3 className={mypost.title}>{title}</h3>
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
            {/*<ul>*/}
            {/*    <Post />*/}
            {/*</ul>*/}
        </div>
    )
}