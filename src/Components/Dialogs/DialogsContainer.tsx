import React from 'react';
import {AppRootStateType} from '../../redux/redux_store';
import {connect} from 'react-redux';
import {Dialogs} from './Dialogs';
import {DialogsType, sendDialogsReducerAC} from '../../redux/dialogs-reducer';
import {compose, Dispatch} from 'redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';

class DialogContainer extends React.Component<DialogsContainerPropsType> {
    componentDidMount() {
    }

    render() {
        return <Dialogs sendMessage={this.props.sendMessage} dialogsPage={this.props.dialogsPage}/>
    }
}

// type
export type DialogsContainerPropsType = MapStateToPropsType & MapDispatchToPropsType

type MapDispatchToPropsType = {
    sendMessage: (message: string) => void
    getStatusUserTC: () => void
    updateStatusUserTC: (status: string) => void
}

type MapStateToPropsType = {
    dialogsPage: DialogsType[],
}

const mapDispatchToPropsType = (dispatch: Dispatch) => {
    return {
        sendMessage: (message: string) => {
            dispatch(sendDialogsReducerAC(message))
        }
    }
}

const mapStateToProps = (state: AppRootStateType): MapStateToPropsType => ({
    dialogsPage: state.dialogsPage.dialogs,
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, mapDispatchToPropsType),
    withAuthRedirect
)(DialogContainer)