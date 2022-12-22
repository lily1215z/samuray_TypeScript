import axios, {AxiosResponse} from 'axios';
import {ProfileResponseType} from '../Components/Profile/ProfileContainer';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        'API-KEY': '7d5807d9-4ee9-47bf-981f-fcc2c567bea3'
    }
})

export const usersAPI = {
    getUsers(currentPage: number = 1, pageSize: number = 12) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
    },
    unfollowUser(id: number) {
        return instance.delete<ResponseType>(`follow/${id}`)
    },
    followUser(id: number) {
        return instance.post<ResponseType>(`follow/${id}`)
    },
}

export const authAPI = {
    getAuthMe() {
        return instance.get<ResponseType<{ id: number, email: string, login: string }>>(`auth/me`)
    },
    login(dataForm: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{ userId?: number }>>>('auth/login', dataForm)
    },
    logout() {
        return instance.delete<ResponseType>('auth/login')
    }
}

export const profileAPI = {
    getProfileUser(userId: number) {
        return instance.get<ProfileResponseType>(`profile/${userId}`)
    },
    getStatusUser(userId: number) {
        return instance.get<string>(`profile/status/${userId}`)
    },
    updateStatusUser(status: string) {  //orArray<string>
        return instance.put<ResponseType>('profile/status', {status})
    },
    saveProfile(profile: ProfileResponseType) {
        return instance.put<ResponseType>('profile', profile)
    },
    savePhoto(photoFile: File) {                    //запрос д/замены фото в профайле
        const formData = new FormData();
        formData.append('image', photoFile)                       //image написан в доке к АПИ
        return instance.put<ResponseType<{
            photos: {
                small: string,
                large: string
            }
        }>>('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<CaptchaResponseType>('security/get-captcha-url')
    }
}


//type
export type CaptchaResponseType = {
    url: string
    resultCode: number
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}