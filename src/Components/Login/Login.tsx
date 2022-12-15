import React from 'react';
import {connect, useSelector} from 'react-redux';
import {AppRootStateType} from '../../redux/redux_store';
import {Navigate} from 'react-router-dom';
import {useFormik} from 'formik';
import {loginTC} from '../../redux/auth-reducer';
import {CreateInputField} from '../../utils/object-helpers';
import {LoginParamsType} from '../../api/api';

type FormikErrorType = {
    login?: string
    password?: string
    rememberMe?: boolean
}

export type loginFormType = {
    loginTC: (dataForm: LoginParamsType) => void
}

export const LoginForm: React.FC<loginFormType> = ({loginTC}) => {
    const isLogginIn = useSelector<AppRootStateType, boolean>(state => state.auth.isAuth)

    if (isLogginIn) return <Navigate to={'/login'}/>

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
            alert(JSON.stringify(values, null, 2));
            loginTC(values)
            formik.resetForm()
        },
    })

// при рефакторинге инпутов не работает очистка формы.
    return (
        <form onSubmit={formik.handleSubmit}>

            {/*{CreateInputField('Email', 'email', formik.handleChange, 'text', formik.values.email)}*/}
            <input placeholder={'email'}
                   {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}


            {/*{CreateInputField('Password', 'password', formik.handleChange, 'password', formik.values.password)}*/}
            <input placeholder={'Password'}
                   type={'password'}
                   {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}

            <div>
                {CreateInputField(null, 'rememberMe', formik.handleChange, 'checkbox', formik.values.rememberMe, 'remember me')}
                {/*<input type={'checkbox'}*/}
                {/*       name={'rememberMe'}*/}
                {/*       onChange={formik.handleChange}*/}
                {/*       checked={formik.values.rememberMe}*/}
                {/*/>remember me*/}
            </div>
            <div>
                <button>Login</button>
            </div>
        </form>


    );
};

export const Login = (props: any) => {
    if (props.isAuth) return <Navigate to={'/login'}/>

    //не отрисовывает компоненту ниже
    return <div>
        <h2>Login3</h2>
        <LoginForm loginTC={loginTC}/>
    </div>
}


type mapStateToPropsType = {
    isAuth: boolean
}
const mapStateToProps = (state: AppRootStateType): mapStateToPropsType => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {loginTC})(Login)