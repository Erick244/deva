import Image from "next/image";
import DefaultImage from "../assets/imgs/default-category.png";
import styles from "../styles/Category.module.css";

interface CategoryProps {
	imageUrl: string | null;
	categoryName: string;
	onClick: () => void;
}

export default function Category(props: CategoryProps) {
	return (
		<div className={styles.category} title={props.categoryName} onClick={() => props.onClick?.()}>
			{ props.imageUrl ? (
				<img 
					src={props.imageUrl} 
					alt="Imagem da categoria personalizada" 
					width={150}
					height={150}
				/>
			) : (
				<Image 
					src={DefaultImage} 
					alt="Imagem da categoria padrão" 
					quality={70} 
					priority={true}
					width={150}
					height={150}
				/>
			)}
		</div>
	)
}