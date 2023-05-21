import { FC } from "react";
import Avatar from "./Avatar";

interface Props {
	avatar?: string;
	message?: string;
	self?: boolean;
}

const CustomMessage: FC<Props> = ({ avatar, message, self }) => {

	return (
		<div className="">
			<div className={`${self ? 'col-start-6 col-end-13' : 'col-start-1 col-end-8'} p-3 rounded-lg`}>
				<div className={`flex items-center ${self ? 'gap-2 flex-row-reverse justify-start' : 'flex-row'}`}>
					<Avatar src={avatar} />
					<div
						className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-lg"
					>
						<div>{message}</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CustomMessage