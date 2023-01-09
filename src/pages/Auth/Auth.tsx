import { useState } from "react";
import type { FC } from "react";
import { useAppSelector } from "../../assets/hooks/useAppSelector";
import { AuthForm } from "../../components/AuthForm/AuthForm";
import { List } from "../../components/List/List";
import { authSelector } from "../../store/authSlice/selector";
import classes from "./Auth.module.scss";

export const Auth: FC = () => {
	const { login, password } = useAppSelector(authSelector);
	const [success, setSuccess] = useState(false);

	return (
		<div className={classes.wrapper}>
			{/* {!success ? (
				<AuthForm login={login} password={password} setSuccess={setSuccess} />
			) : (
				<List />
			)} */}
			<List />
		</div>
	);
};
