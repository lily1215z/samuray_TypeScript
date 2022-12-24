import React, {ChangeEvent} from 'react';
import profile_info from './ProfileInfo.module.scss'

type ProfileStatusPropsType = {
    status: string
    updateStatus: (status: string) => void
}

export class ProfileStatus extends React.Component<ProfileStatusPropsType> {

    state = {       //this is local state
        editMode: false,
        status: this.props.status
    }

    activeEditMode = () => {    //If I don't want use bind I can write arrow function. But when I will be use debugger arrow function show me undefined
        this.setState({   //Will work like hook - local state
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
            <div className={profile_info.aboutinfo_status}> <span className={profile_info.status_title}>Status:</span>
                {!this.state.editMode &&
                    <span
                        className={profile_info.about}
                        onDoubleClick={this.activeEditMode}
                    >{this.props.status || ' --/---/--'}</span>
                }
                {this.state.editMode &&
                    <div>
                        <input
                            onChange={this.onStatusChange}
                            autoFocus
                            onBlur={this.deactivateEditMode}
                            value={this.state.status}   //show status from state, not from props
                            className={profile_info.status_edit}
                        />
                    </div>
                }

            </div>
        );
    }
}

