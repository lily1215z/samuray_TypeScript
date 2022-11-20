import {NavLink} from 'react-router-dom'
import dialogs from './Dialogs.module.css'
import avatar from '../../images/avatar-dialog.css.png'
import dialogs_bg from '../../images/dialogs.jpg'
import {MyPost} from '../Profile/MyPost/MyPost';
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/redux_store';
import {DialogsType, MessagesType} from '../../redux/dialogs-reducer';

type DialogsTypeProps = {
    dialogs: Array<DialogsType>
    // messages: Array<MessagesType>
    addMessage: (message: string) => void
}

export function Dialogs(props: DialogsTypeProps) {
    const messages = useSelector<AppRootStateType, Array<MessagesType>>(state => state.dialogsPage.messages)

    // const addMessageValue = (message: string) => {
    //     props.addMessage(id, message)
    // }

    let dialogsData = props.dialogs.map(i => {
        return (
            <li className={dialogs.dialog}>
                <NavLink to={i.id} className={({ isActive }) =>(isActive ? "active_dialog" : "link")}>{i.name}</NavLink>
            </li>
        )
    })

    let messagesData = messages.map(i => {
        return (
            <li className={dialogs.message}>
                <img className={dialogs.avatar} src={avatar} alt={'avatar'}/>
                <div className={dialogs.text}>{i.message}</div>
            </li>
        )
    })

    return (
        <div className={dialogs.dialogs_inner}>
            <div><img src={dialogs_bg} alt={'background'}/></div>
            <div className={dialogs.title}>Dialogs</div>
            <div className={dialogs.block_dialog}>
                <ul className={dialogs.dialogs_items}>
                    {dialogsData}
                </ul>
                <ul className={dialogs.messages}>
                    {messagesData}
                </ul>
            </div>
            <MyPost addPost={props.addMessage} title={'My message'}/>
        </div>
    )
}