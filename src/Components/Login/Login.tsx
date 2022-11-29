import React from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/redux_store';
import {Navigate} from 'react-router-dom';
import {useFormik} from 'formik';
import {loginTC} from '../../redux/auth-reducer';

type FormikErrorType = {
    login?: string
    password?: string
    rememberMe?: boolean
}

export type loginFormType = {
    loginTC: (email: string, password: string, rememberMe: boolean) => void
}
export const LoginForm = (props: loginFormType) => {
    // const dispatch = useDispatch()
    const isLogginIn = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)

    if(!isLogginIn) return <Navigate to={"/login"} />

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const formik = useFormik({
        validate: (values) => {
            const errors: FormikErrorType = {}

            if (!values.email) {
                errors.login = 'required'
            } else if (values.email.length < 4) {
                errors.login = 'must be more 4 characters'
            }
            if (!values.password) {
                errors.password = 'required'
            } else if (values.password.length < 3) {
                errors.password = 'must be more 3 characters'
            }
            return errors
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            alert(JSON.stringify(values));

            // dispatch(loginTC(values.email, values.password, values.rememberMe))
            props.loginTC(values.email, values.password, values.rememberMe)
            formik.resetForm()
        },
    })

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <input placeholder={'email'}
                       name={'email'}
                       onChange={formik.handleChange}
                       value={formik.values.email}
                />
                {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
            </div>
            <div>
                <input placeholder={'Password'}
                       type={'password'}
                       name={'password'}
                       onChange={formik.handleChange}
                       value={formik.values.password}
                />
                {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
            </div>
            <div>
                <input type={'checkbox'}
                       name={'rememberMe'}
                       onChange={formik.handleChange}
                       checked={formik.values.rememberMe}
                />remember me
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>


    );
};

type loginType = {
    isAuth: boolean
}
export const Login = (props: any) => {
    if (props.isAuth) return <Navigate to={'/login'}/>

    //не отрисовывает компоненту ниже
    return <div>
        <h2>Login++</h2>
        <LoginForm loginTC={loginTC} />

    </div>
}


type mapStateToPropsType = {
    isAuth: boolean
}
const mapStateToProps = (state: AppRootStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {loginTC})(Login)