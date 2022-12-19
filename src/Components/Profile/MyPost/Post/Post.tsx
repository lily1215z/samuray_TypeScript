import post from './Post.module.scss'
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../../../redux/redux_store';
import {PostsType} from '../../../../redux/posts-reducer';

type  postTypeProps = {}

export const Post:React.FC<postTypeProps> = () => {
    const posts = useSelector<AppRootStateType, Array<PostsType>>(state => state.profilePage.posts)

    let resultPost = posts.map(i => {
        return (
            <li className={post.item} key={i.id}>
                <div>
                    <img
                        className={post.img}
                        src={i.img}
                        width='90'
                        height='90'
                        alt="avatar"/>
                </div>

                <p className={post.item_text}>{i.post}</p>
                <span className={post.like}> {i.like}</span>
            </li>
        )
    })
    return (
        <>{resultPost}</>
    )
}
