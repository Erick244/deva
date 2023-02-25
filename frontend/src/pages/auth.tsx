import Image from "next/image";
import Logo from "../assets/imgs/dark-logo.png"
import { useState } from "react"
import styles from "../styles/Auth.module.css";
import axios from "axios";
import { baseApiUrl } from "../global";
import { errorMessage, successMessage } from "../config/Toastify";
import { useStore } from "../config/Store";
import { useRouter } from "next/router";
import LoadingGif from "../assets/gifs/loading.gif";
import Loading from "../components/view/Loading";
import { arrobaIcon, confirmPasswordIcon, nameIcon, passwordIcon } from "../components/view/Icons";

export default function Auth() {
	// deixar o formulario mais bonito e responsivo e adicionar icones
	const [formMode, setFormMode] = useState<"signin" | "signup">("signup");
	const [name, setName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confirmPassword, setConfirmPassword] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);
	const router = useRouter();

	const { setUser } = useStore();

	function alternateFomMode(e: any) {
		e.preventDefault();
		formMode === "signup" ? setFormMode("signin") : setFormMode("signup");
	}

	function signup() {

		const formUser = {
			name,
			email,
			password,
			confirmPassword
		}

		axios.post(`${baseApiUrl}/signup`, formUser)
			.then(resp => resp.data)
			.then(data => {
				setFormMode("signin");
				setEmail(formUser.email);
				setPassword(formUser.password);
				successMessage("Cadastro realizado com sucesso");
			}).catch(err => errorMessage(err.response.data))
	}

	async function signin() {
		setLoading(true);
		const formUser = {
			email,
			password
		}

		await axios.post(`${baseApiUrl}/signin`, formUser)
			.then(res => res.data)
			.then(user => {
				setUser(user);
				localStorage.setItem("user", JSON.stringify(user));
				router.push("/");
			})
			.catch(err => errorMessage(err.response?.data))
		setLoading(false);
	}

	return (
		<div className={styles.auth}>
			{loading ? (
				<Loading/>
			) : (
				<>
					<form onSubmit={e => e.preventDefault()}>
						<div className={styles.logo}>
							<Image src={Logo.src} alt="Logo" width={99} height={38} />
						</div>
						<hr />
						{formMode === "signup" ? (
							<div className={styles.areaForm}>
								<input
									type="text"
									name="name"
									id="name"
									required
									onChange={(e) => setName(e.target.value)}
								/>
								<label htmlFor="name">
									<i className="v-middle">{nameIcon}</i> | Nome ou Apelido
								</label>
							</div>
						) : null}
						<div className={styles.areaForm}>
							<input
								type="text"
								name="email"
								id="email"
								required
								onChange={(e) => setEmail(e.target.value)}
							/>
							<label htmlFor="email">
								<i className="v-middle">{arrobaIcon}</i> | E-mail
							</label>
						</div>
						<div className={styles.areaForm}>
							<input
								type="password"
								name="password"
								id="password"
								required
								onChange={(e) => setPassword(e.target.value)}
							/>
							<label htmlFor="password"> 
								<i className="v-middle">{passwordIcon}</i> | Senha
							</label>
						</div>
						{formMode === "signup" ? (
							<div className={styles.areaForm}>
								<input
									type="password"
									name="confirmPassword"
									id="confirmPassword"
									required
									onChange={(e) => setConfirmPassword(e.target.value)}
								/>
								<label htmlFor="confirmPassword">
									<i className="v-middle">{confirmPasswordIcon}</i> | Confirme a Senha
								</label>
							</div>
						) : null}
						{formMode === "signup" ? (
							<>
								<a onClick={alternateFomMode}>Já possui cadastro?</a>
								<button className={styles.button} onClick={signup}>
									Criar
								</button>
							</>
						) : (
							<>
								<a onClick={alternateFomMode}>Não possui cadastro?</a>
								<button className={styles.button} onClick={signin}>
									Entrar
								</button>
							</>
						)}
					</form>
					<div className={styles.wellcome}>
						<h1>Developer <span>Annotation</span></h1>
						<p>Um APP simples e objetivo para auxiliar os desenvolvedores a fazerem anotações.</p>
					</div>
				</>
			)}
		</div>
	)
}