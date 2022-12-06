import React, {ChangeEvent} from 'react';
import profile_info from '../ProfileInfo/ProfileInfo.module.css'

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {

    state = {       //это локальный стейт
        editMode: false,
        status: this.props.status
    }

    activeEditMode = () => {    //чтоб не байдить то можно писать стрелочную ф-ю Но при дебаге стрелочная будет показывать undefinеd но это не так
        this.setState({   //сработает как локальный стейт - хук
            editMode: true
        })
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        })
        this.props.updateStatus(this.state.status)
    }

    onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }

    componentDidUpdate(prevProps: Readonly<ProfileStatusPropsType>, prevState: Readonly<{}>) {
        if (prevProps.status !== this.props.status) {
            this.setState({
                status: this.props.status
            })
        }
    }

    render() {
        return (
            <div className={profile_info.aboutinfo}>Status:
                {!this.state.editMode &&
                    <span
                        className={profile_info.about}
                        onDoubleClick={this.activeEditMode}
                    >{this.props.status || ' -----'}</span>
                }
                {this.state.editMode &&
                    <div>
                        <input
                            onChange={this.onStatusChange}
                            autoFocus
                            onBlur={this.deactivateEditMode}
                            value={this.state.status}   //показываем status не из пропсов а из state
                        />
                    </div>
                }

            </div>
        );
    }
}

