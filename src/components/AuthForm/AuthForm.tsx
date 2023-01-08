import { useEffect, useState } from "react";
import type { FC, ChangeEvent, Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "../../assets/hooks/useAppDispatch";
import classes from "./AuthForm.module.scss";
import { fetchAuth } from "../../store/thunk/authThunk";
import { List } from "../List/List";

export interface AuthFormProps {
	login?: string;
	password?: string;
	setSuccess: Dispatch<SetStateAction<boolean>>;
}

export interface AuthFormComponent extends FC<AuthFormProps> {}

export const AuthForm: AuthFormComponent = ({
	login,
	password,
	setSuccess,
}) => {
	const [name, setName] = useState("");
	const [pass, setPass] = useState("");

	const dispatch = useAppDispatch();

	const onChangeLogin = (event: ChangeEvent<HTMLInputElement>) => {
		setName(event.target.value);
	};

	const onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
		setPass(event.target.value);
	};

	useEffect(() => {
		return () => {
			dispatch(fetchAuth());
		};
	}, [dispatch]);

	const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (name === login && pass === password) {
			setSuccess(true);
		}
	};

	return (
		<div className={classes.wrapper}>
			<div>
				<h2 className={classes.title}>Авторизация</h2>
				<form onSubmit={handleSubmit} className={classes.form}>
					<div className={classes.login}>
						<label htmlFor="">Логин: </label>
						<input
							value={name}
							onChange={onChangeLogin}
							type="text"
							required
							name="login"
							placeholder="Введите логин..."
						/>
					</div>
					<div className={classes.password}>
						<label htmlFor="">Пароль: </label>
						<input
							value={pass}
							onChange={onChangePassword}
							type="password"
							required
							name="password"
							placeholder="Введите пароль..."
						/>
					</div>
					<button className={classes.button}>Войти</button>
				</form>
			</div>
		</div>
	);
};
