import React from 'react';
import {UsersContainerPropsType} from './UsersContainer';
import {Paginator} from '../common/Paginator/Paginator';
import {User} from './User';
import {UserType} from '../../redux/users-reducer';
import user from './Users.module.css'

type UsersPropsType = UsersContainerPropsType & {
    onPageChanged: (ageNumber: number) => void
}

export const Users: React.FC<UsersPropsType> = ({
                                                    onPageChanged,
                                                    currentPage,
                                                    pageSize,
                                                    totalUsersCount,
                                                    ...props
                                                }) => {
    return <div className={user.wrapper}>
        <div className={user.paginator}>
            <Paginator onPageChanged={onPageChanged}
                       currentPage={currentPage}
                       pageSize={pageSize}
                       totalUsersCount={totalUsersCount}
                       portionSize={10}
                       {...props}
            /></div>

        <div className={user.inner}>
            {props.users.map((i: UserType) =>
                <User
                    key={i.id}
                    pageSize={0} totalUsersCount={0} currentPage={0}
                    user={i}
                    {...props} />
            )}
        </div>
    </div>
};
