import React, { Component } from 'react';
import classes from './Auth.module.css';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';

export default class Auth extends Component {
    state = {
        style: 'auth',
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                erroeMessage: 'Введите коррект',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true,
                },
            },
            pasword: {
                value: '',
                type: 'password',
                label: 'Password',
                erroeMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6,
                },
            },
        },
    };
    onSubmitHandler(event) {
        event.preventDefault();
    }

    noop() {}

    renderInputs() {
        return Object.keys(this.state.formControls).map(
            (controlName, index) => {
                const control = this.state.formControls[controlName];

                return (
                    <Input
                        key={controlName + index}
                        style={this.state.style}
                        type={control.type}
                        label={control.label}
                        onInputClick={this.noop}
                        onChange={this.noop}
                        onSubmit={this.onSubmitHandler}
                    />
                );
            }
        );
    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.onSubmitHandler}>
                        {this.renderInputs()}
                        <Button type="success" onClick={this.loginHandler}>
                            Войти
                        </Button>
                        <Button type="primary" onClick={this.registerkHandler}>
                            Регистрация
                        </Button>
                    </form>
                </div>
            </div>
        );
    }
}
