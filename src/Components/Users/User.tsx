import React from 'react';
import photoUser from '../../images/icon-user.png';
import {NavLink} from 'react-router-dom';
import {UsersContainerPropsType} from './UsersContainer';
import {UserType} from '../../redux/users-reducer';
import style from './Users.module.css'

type UserPropsType = UsersContainerPropsType & {
    user: UserType
}

export const User: React.FC<UserPropsType> = ({user, ...props}) => {
    return (
        <div className={style.cart}>
            <div >
                <NavLink to={'/profile/' + user.id}>
                    <img src={user.photos.small !== null ? user.photos.small : photoUser} width={'150'} alt={'photoUser'}/>
                </NavLink>
               <div> {user.followed ?                           //props.follow() это берем UsersContainer
                    <button disabled={props.followingInProgress.some(id => id === user.id)}
                            onClick={() => {props.unFollowTC(user.id)
                            }}>Unfollow</button>

                    : <button disabled={props.followingInProgress.some(id => id === user.id)}
                              onClick={() => {props.followTC(user.id)
                              }}>Follow</button>}
               </div>
                <div>{user.name}</div>
                <div>{user.status}</div>
                <div>{'user.location.city'}</div>
                <div>{'user.location.country'}</div>

            </div>
        </div>
    )
};
