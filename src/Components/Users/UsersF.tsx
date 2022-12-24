import React from 'react';
import axios from 'axios';
import photoUser from '../../images/icon-user.png'

//this is example function component. Wrote with her, then started wrote in class component
export const UsersF = (props: any) => {
    const getUsers = () => {
        if (props.users.length === 0) { //если без проверки то будет бага
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then(res => {
                props.setUsers(res.data.items)
            })
        }
    }

//51 lesson 21 min for photoUser
    return (
        <div>
            <button onClick={getUsers}>Get Users</button>
            {props.users.map((i: any) => <div key={i.id}>
                <img src={i.photos.small !== null ? i.photos.small : photoUser} alt={'photoUser'}/>
                {i.followed ?
                    //props.follow() это берем UsersContainer
                    <button onClick={() => {
                        props.unfollow(i.id)
                    }}>Unfollow</button>
                    : <button onClick={() => {
                        props.follow(i.id)
                    }}>Follow</button>}

                <div>{i.fullName}</div>
                <div>{i.status}</div>
                <div>{'i.location.city'}</div>
                <div>{'i.location.country'}</div>

            </div>)}
        </div>
    );
};

