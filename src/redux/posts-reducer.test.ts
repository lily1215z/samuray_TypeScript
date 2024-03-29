import {addPostsReducerAC, deletePostAC, ProfileReducer} from './posts-reducer';

const state = {
    posts: [
        {id: 1, post: 'hello, my dear friend', img: 'https://hostenko.com/wpcafe/wp-content/uploads/rndavatar.png', like: 5},
        {id: 2, post: 'hello, my dear', img: 'https://hostenko.com/wpcafe/wp-content/uploads/rndavatar.png', like: 5},
        {id: 3, post: 'hello, my friend', img: 'https://hostenko.com/wpcafe/wp-content/uploads/rndavatar.png', like: 5},
        {id: 4, post: 'hello, dear friend', img: 'https://hostenko.com/wpcafe/wp-content/uploads/rndavatar.png', like: 5},
    ],
    profile: {
        userId: 1,
        lookingForAJob: false,
        lookingForAJobDescription: '',
        aboutMe: '',
        fullName: '',
        contacts: {
            github: '',
            vk: '',
            facebook: '',
            instagram: '',
            twitter: '',
            website: '',
            youtube: '',
            mainLink: '',
        },
        photos: {
            small: '',
            large: ''
        }
    },
    status: ''
}

test('length of posts should be incremented', () => {
    //1. test data
    let action = addPostsReducerAC('it-camasutra.com')

    //2. action
    let newState = ProfileReducer(state, action)

    //3. expectation
    expect (newState.posts.length).toBe(5)
})

test('message of new posts should be correct', () => {
    //1. test data
    let action = addPostsReducerAC('it-camasutra.com')

    //2. action
    let newState = ProfileReducer(state, action)

    //3. expectation
    expect(newState.posts[4].post).toBe("it-kamasutra.com")
})

test('after deleting length of message should be decrement', () => {
    //1. test data
    let action = deletePostAC(1)

    //2. action
    let newState = ProfileReducer(state, action)

    //3. expectation
    expect(newState.posts.length).toBe(3)
})