import Gravatar from 'react-gravatar';
import { useStore } from '../../config/Store';
import styles from "../../styles/Profile.module.css";
import loadingGif from "../../assets/gifs/loading.gif";
import Image from 'next/image';

export default function Profile() {
	const { user, setUserFormVisible } = useStore();

	return (
		<div className={styles.profile} onClick={() => setUserFormVisible(true)}>
			{user.imageUrl ? (
				<img
					src={user.imageUrl}
					alt="Imagem de Perfil"
				/>
			) : (
				<>
					{user.email ? (
						<Gravatar email={user.email} />
					) : (
						<Image 
							src={loadingGif.src} 
							alt="Imagem de Perfil"
							width={50}
							height={50}
						/>
					)}
				</>
			)}
		</div>
	)
}