import {NavLink} from 'react-router-dom'
import dialogs from './Dialogs.module.css'
import avatar from '../../images/avatar-dialog.css.png'
import dialogs_bg from '../../images/dialogs.jpg'
import {DialogsType, MessagesType} from "../../redux/store";

type DialogItemTypeProps = {
    name: string
    id: string
}

type MessageTypeProps = {
    message: string
}

type DialogsTypeProps = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
}

const DialogItem = (props: DialogItemTypeProps) => {
    return (
        <li className={dialogs.dialog}>
            <NavLink to={props.id} className={({ isActive }) =>(isActive ? "active_dialog" : "link")}>{props.name}</NavLink>
        </li>
    )
}

const Message = (props: MessageTypeProps) => {
    return (
        <li className={dialogs.message}>
            <img className={dialogs.avatar} src={avatar} alt={'avatar'}/>
            <div className={dialogs.text}>{props.message}</div>
        </li>
    )
}

export function Dialogs(props: DialogsTypeProps) {
    let dialogsData = props.dialogs.map(i => {
        return (
            <DialogItem name={i.name} id={i.id}/>
        )
    })

    let messagesData = props.messages.map(i => {
        return (
            <Message message={i.message} />
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
        </div>

    )
}