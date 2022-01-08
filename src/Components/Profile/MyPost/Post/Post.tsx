import './Post.css'
import avatar from '../../../../images/avatar.jpeg'
import {dataTypeProps} from "../../../../App";

type  postTypeProps = {
    data: Array<dataTypeProps>
}

export function Post(props: postTypeProps) {
    let resultPost = props.data.map(i => {
        return (
            <li className='post_item'>
                <img
                    className='post_img'
                    src={i.img}
                    width='150'
                    height='90'
                    alt="avatar"/>
                <p>{i.post}</p>
                <span className='post_like'>like: {i.like}</span>
            </li>
        )
    })
    return (
        <>{resultPost}</>

    )
}