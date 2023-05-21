import { FC } from "react";

interface Props {
	src?: string;
	name?: string;
}

const Avatar: FC<Props> = ({ src, name }) => {
	if (!src) {
		return <div
			className="flex items-center justify-center h-10 w-10 rounded-full text-lg font-semibold bg-indigo-500 flex-shrink-0"
		>
			{name && name[0].toLocaleUpperCase()}
		</div>
	}

	return (
		<div className="h-10 w-10 rounded-full border overflow-hidden">
			<img
				src={src}
				alt="Avatar"
				className="h-full w-full"
			/>
		</div>
	)
}

export default Avatar