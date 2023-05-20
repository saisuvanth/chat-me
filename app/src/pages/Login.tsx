import { FC, MouseEventHandler, useContext, useEffect } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: FC = () => {
	const navigate = useNavigate();
	const { login, user } = useContext(AuthContext);

	const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
		event.preventDefault();
		login().then(res => {
			console.log(res);
			fetch(`${process.env.REACT_APP_API_URL}/api/auth/fetch`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(res.user)
			}).then(res => res.json()).then(res1 => {
				console.log(res1);
				navigate('/', { replace: true });
			})
		})
	}

	useEffect(() => {
		if (user) {
			navigate('/', { replace: true });
		}
	}, [user]);

	return (
		<div className='h-screen w-screen flex flex-col'>
			<div className='flex-1 flex flex-col justify-center items-center'>
				<div className='w-full max-w-md'>
					<div className='bg-white px-4 py-6 rounded-lg shadow-lg text-black'>
						<div className='flex flex-col gap-4 items-center'>
							<h1 className='text-4xl font-bold'>Login</h1>
							<p className='text-md text-gray-500'>Please login to your account.</p>
							<button onClick={handleClick} type="button" className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
								<svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
								Sign in with Google
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login