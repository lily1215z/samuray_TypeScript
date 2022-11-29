import {Navigate, NavLink} from 'react-router-dom'
import dialogs from './Dialogs.module.css'
import avatar from '../../images/avatar-dialog.css.png'
import dialogs_bg from '../../images/dialogs.jpg'
import {useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/redux_store';
import {DialogsType, MessagesType} from '../../redux/dialogs-reducer';
import React, {useState} from 'react';
import {ErrorMessage, Field, Form, useFormik} from 'formik';
import profileStyle from '../Profile/Profile.module.css';

type DialogsTypeProps = {
    dialogsPage: Array<DialogsType>
    sendMessage: (message: string) => void
}

export function Dialogs(props: DialogsTypeProps) {
    const messages = useSelector<AppRootStateType, Array<MessagesType>>(state => state.dialogsPage.messages)
    const isLogginIn = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)

    // const addMessageValue = (message: string) => {
    //     props.addMessage(id, message)
    // }

    let dialogsData = props.dialogsPage.map(i => {
        return (
            <li key={i.id} className={dialogs.dialog}>
                <NavLink to={`${i.id}`}
                         className={({isActive}) => (isActive ? 'active_dialog' : 'link')}>{i.name}</NavLink>
            </li>
        )
    })

    let messagesData = messages.map(i => {
        return (
            <li key={i.id} className={dialogs.message}>
                <img className={dialogs.avatar} src={avatar} alt={'avatar'}/>
                <div className={dialogs.text}>{i.message}</div>
            </li>
        )
    })

    if (!isLogginIn) return <Navigate to={'/login'}/>

//Hight Order Component
    //const AuthRedirectComponent = withAuthRedirect(Dialogs)  // не знаю где вызвать НОС в функ компоненте поэтому нок здесь не использую

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
            {/*<AddMessageForm sendMessage={props.sendMessage}/>*/}
            <AddMessageForm sendMessage={props.sendMessage}/>
        </div>
    )
}

type addMessageFormType = {
    sendMessage: (post: string) => void
}
const AddMessageForm = (props: addMessageFormType) => {
    const [messInPost, setMessInPost] = useState<string>('')
    const [error, setError] = useState('')


    const formik = useFormik({
        initialValues: {
            newMessageBody: '',
        },
        onSubmit: values => {
            props.sendMessage(values.newMessageBody)
            formik.resetForm()
        },
    })
    return (
        <form onSubmit={formik.handleSubmit}>
                <textarea
                    className="message-textarea"
                    name="newMessageBody"
                    placeholder="your message"
                    onChange={formik.handleChange}
                    value={formik.values.newMessageBody}
                    // onKeyPress={(e) => e.key === 'Enter' && addMessInPost()}
                ></textarea>
            <div>{error}</div>
            <div className={profileStyle.btn_box}>
                <button className={'message-btn'}>Add Message</button>
            </div>
        </form>
    )
}

