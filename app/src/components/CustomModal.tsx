import { Dispatch, FC, SetStateAction, useState } from "react";

interface Props {
	setOpen: Dispatch<SetStateAction<boolean>>;
	state?: 'create' | 'join';
}

const CustomModal: FC<Props> = ({ setOpen, state }) => {
	const [value, setValue] = useState('');
	const [error, setError] = useState('');

	const handleClick = () => {
		if (!value) {
			setError('Give room name')
		} else {
			console.log(value);
			setOpen(false);
		}
	}

	return (<>
		<div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
		>
			<div className="relative my-6 mx-auto w-80">
				{/*content*/}
				<div className="border-0 rounded-lg shadow-lg relative flex flex-col gap-6 w-full p-5 bg-white outline-none focus:outline-none">
					{/*header*/}
					<div className="flex items-start justify-between border-b pb-2 border-solid border-slate-200 rounded-t">
						<h3 className="text-3xl font-semibold">
							{state === 'create' ? 'Create ' : 'Join '}Room
						</h3>
					</div>
					<div className="flex flex-col gap-1">
						<input type="text" value={value} onChange={(event) => setValue(event.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus-visible:outline-none block w-full p-2.5" />
						<div className="text-red-500 text-sm font-semibold px-2">
							{error}
						</div>
					</div>
					<div className="flex items-center justify-between pt-3 px-1 border-t border-solid border-slate-200 rounded-b">
						<button
							className="text-red-500 border rounded border-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
							type="button"
							onClick={() => setOpen(false)}
						>
							Close
						</button>
						<button
							className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
							type="button"
							onClick={() => handleClick()}
						>
							{state === 'create' ? 'Create' : 'Join'}
						</button>
					</div>
				</div>
			</div>
		</div>
		<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
	</>
	)
}

export default CustomModal