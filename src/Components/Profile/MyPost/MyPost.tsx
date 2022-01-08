import './MyPost.css'
import {Post} from "./Post/Post";
import {dataTypeProps} from "../../../App";

type  myPostTypeProps = {
    data:Array<dataTypeProps>
}
export function MyPost(props: myPostTypeProps) {

    return (
        <div>
            <div className='post'>
                <h3 className="post__title">My posts</h3>
                <textarea
                    className='message-textarea'
                    name="text"
                    placeholder='your news'
                ></textarea>
                <div className='post__btn-box'>
                    <button
                        className='message-btn'
                        type='submit'>Send</button>
                </div>
            </div>
            <ul>
                <Post data={props.data}/>
            </ul>
        </div>
    )
}