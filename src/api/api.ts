import axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '7d5807d9-4ee9-47bf-981f-fcc2c567bea3'
    }
})

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    unfollowUser(id: number) {
        return instance.delete(`follow/${id}`)
    },
    followUser(id: number) {
        return instance.post(`follow/${id}`)
    },
}

export const authAPI = {
    getAuthMe() {
        return instance.get(`auth/me`)
    },
    login(email: string, password: string, rememberMe: boolean = false) {
        return instance.post('/auth/login', {email, password, rememberMe})
    },
    logout() {
        return instance.delete('/auth/login')
    }
}

export const profileAPI = {
    getProfileUser(userId: number) {
        return instance.get(`profile/${userId}`)
    },
    getStatusUser(userId: number) {
        return instance.get(`/profile/status/${userId}`)
    },
    updateStatusUser(status: string) {  //orArray<string>
        return instance.put('/profile/status', {status})
    },
    // savePhoto(photoFile: ChangeEvent<HTMLInputElement>) {                    //запрос д/замены фото в профайле
    //     const formData = new FormData();
    //     formData.append('image', photoFile)                       //image написан в доке к АПИ
    //     return instance.put('/profile/photo)', formData, {
    //         headers: {
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     })
    // }
}