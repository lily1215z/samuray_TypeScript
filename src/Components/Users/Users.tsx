import React from 'react';
import usersStyle from './Users.module.css';
import photoUser from '../../images/icon-user.png';
import {UsersContainerPropsType} from './UsersContainer';
import {NavLink} from 'react-router-dom';
import {followTC, unFollowTC} from '../../redux/users-reducer';

type UsersPropsType = UsersContainerPropsType & {
    onPageChanged: (ageNumber: number) => void
}

export const Users = (props: UsersPropsType) => {
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return <div>
        <div>
            {pages.map(p => {
                return <span className={props.currentPage === p ? usersStyle.selectedPage : ''}
                             onClick={() => {
                                 props.onPageChanged(p)
                             }}>{p}</span>
            })}
        </div>

        { props.users.map((i: any) => <div key={i.id}>
            <NavLink to={'/profile/' + i.id}>
                <img src={i.photos.small !== null ? i.photos.small : photoUser} width={'150'} alt={'photoUser'}/>
            </NavLink>
            {i.followed ?                           //props.follow() это берем UsersContainer
                <button disabled={props.followingInProgress.some(id=>id===i.id)}
                        onClick={() => {props.unFollowTC(i.id)
                }}>Unfollow</button>

                : <button disabled={props.followingInProgress.some(id=>id===i.id)}
                          onClick={() => {props.followTC(i.id)
                }}>Follow</button>}

            <div>{i.name}</div>
            <div>{i.status}</div>
            <div>{'i.location.city'}</div>
            <div>{'i.location.country'}</div>

        </div>)}
    </div>
};
