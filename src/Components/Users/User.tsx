import React from 'react';
import photoUser from '../../images/icon-user.png';
import {NavLink} from 'react-router-dom';
import {UsersContainerPropsType} from './UsersContainer';
import {UserType} from '../../redux/users-reducer';
import style from './Users.module.scss'

type UserPropsType = UsersContainerPropsType & {
    user: UserType
}

export const User: React.FC<UserPropsType> = ({user, ...props}) => {
    return (
        <div className={style.cart}>
            <div>
                <NavLink to={'/profile/' + user.id} className={style.img}>
                    {/*<img src={user.photos.small !== null ? user.photos.small : photoUser}*/}
                    <img src={user.photos.small || photoUser}
                         width={'150'}
                         alt={'photoUser'}/>
                </NavLink>

                <div className={style.info_box}>
                    <div className={style.name}>{user.name}</div>
                    <div>My status: {user.status}</div>
                    <div>My city: {'Barcelona'}</div>
                    <div>My country: {'Spain'}</div>
                </div>

                <div className={style.btn_box}>
                    {user.followed ?                           //props.follow() это берем UsersContainer
                        <button
                            className={style.btn_follow}
                            disabled={props.followingInProgress.some(id => id === user.id)}
                            onClick={() => {
                                props.unFollowTC(user.id)
                            }}>Unfollow</button>

                        : <button disabled={props.followingInProgress.some(id => id === user.id)}
                                  onClick={() => {
                                      props.followTC(user.id)
                                  }}>Follow</button>}
                </div>
            </div>
        </div>
    )
};
