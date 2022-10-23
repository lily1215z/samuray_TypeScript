import post from './Post.module.css'
import {PostsType} from '../../../../redux/store'

type  postTypeProps = {
    posts: Array<PostsType>
}

export const Post:React.FC<postTypeProps> = ({posts}) => {
    let resultPost = posts.map(i => {
        return (
            <li className={post.item} key={i.id}>
                <img
                    className={post.img}
                    src={i.img}
                    width='90'
                    height='90'
                    alt="avatar"/>
                <p>{i.post}</p>
                <span className={post.like}>like: {i.like}</span>
            </li>
        )
    })
    return (
        <>{resultPost}</>

    )
}