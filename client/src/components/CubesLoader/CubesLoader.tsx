import "./loader.css"

interface CubesLoaderProps {
 className?: string;
 classNameItem?: string;
}

export const CubesLoader = ({className = "", classNameItem = ""}: CubesLoaderProps) => (
    <div className={`${className} spinner`}>
		<div className={`${classNameItem} spinner-item`} />
		<div className={`${classNameItem} spinner-item`} />
		<div className={`${classNameItem} spinner-item`} />
	</div>
)