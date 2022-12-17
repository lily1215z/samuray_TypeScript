import React from 'react';
import {connect} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../../redux/redux_store';
import {Navigate} from 'react-router-dom';
import {useFormik} from 'formik';
import {loginTC} from '../../redux/auth-reducer';
import loginForm from './Login.module.scss';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export type loginFormType = {
    // loginTC: (dataForm: LoginParamsType) => void
}

export const LoginForm: React.FC<loginFormType> = () => {
    const dispatch = useAppDispatch();

    // const isLogginIn = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)
    // if (!isLogginIn) return <Navigate to={'/login'}/>

    const formik = useFormik({
        validate: (values) => {
            const errors: FormikErrorType = {}

            if (!values.email) {
                errors.email = 'required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
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
            // alert(JSON.stringify(values, null, 2));
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })

// при рефакторинге инпутов не работает очистка формы.
    return (
        <form className={loginForm.form} onSubmit={formik.handleSubmit}>

            <div className={loginForm.form_box}>
                <div className={loginForm.form_subtitle}>Email:</div>
                {/*{CreateInputField('Email', 'email', formik.handleChange, 'text', formik.values.email)}*/}
                <input placeholder={'free@samuraijs.com'}
                       {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ?
                    <div className={loginForm.form_error}>{formik.errors.email}</div> : null}
            </div>

            <div className={loginForm.form_box}>
                <div className={loginForm.form_subtitle}>Password:</div>
                {/*{CreateInputField('Password', 'password', formik.handleChange, 'password', formik.values.password)}*/}
                <input placeholder={'free'}
                       type={'password'}

                       {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ?
                    <div className={loginForm.form_error}>{formik.errors.password}</div> : null}
            </div>

            <div className={loginForm.form_checkbox}>
                {/*{CreateInputField(null, 'rememberMe', formik.handleChange, 'checkbox', formik.values.rememberMe, 'remember me')}*/}
                <input type='checkbox'
                       id="rememberMe"
                       name={'rememberMe'}
                       onChange={formik.handleChange}
                       checked={formik.values.rememberMe}
                />
                <label className={loginForm.form_checkbox_label} htmlFor="rememberMe"></label>
            </div>
            <div>
                <button type={'submit'} className={loginForm.form_btn}>LogIn</button>
            </div>
        </form>


    );
};

const Login = (props: any) => {
    if (props.isAuth) return <Navigate to={'/profile'}/>

    return (
        <div className={loginForm.form_wrapper}>
            <div className={loginForm.form_inner}>
                <div className={loginForm.form_info}>
                    Please enter this email and password:
                    <div className={loginForm.form_info_box}>
                        <div className={loginForm.form_info_data}>
                            <div className={loginForm.form_info_span}>Email:</div>
                            <span>free@samuraijs.com</span>
                        </div>
                        <div className={loginForm.form_info_data}>
                            <div className={loginForm.form_info_span}>Password:</div>
                            <span>free</span>
                        </div>
                    </div>
                </div>

                <h2 className={loginForm.form_title}>Enter in my social network:</h2>
                {/*<LoginForm loginTC={loginTC}/>*/}
                <LoginForm />
            </div>

        </div>
    )
}


type mapStateToPropsType = {
    isAuth: boolean
}
const mapStateToProps = (state: AppRootStateType): mapStateToPropsType => {
    return (
        {
            isAuth: state.auth.isAuth
        }
    )
}

export default connect(mapStateToProps, {})(Login)
// export default connect(mapStateToProps, {loginTC})(Login)