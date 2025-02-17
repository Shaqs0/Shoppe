import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginUser, registerUser } from '../../api/user';
import { Profile } from '../../interfaces/profile.interface';
import { userActions } from '../../store/user.slice';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';

export function SignPage() {
	const [isSignIn, setIsSignIn] = useState(true);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const dispatch = useDispatch();  
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Profile>();

	const onSubmit = async (data: Profile) => {
		try {
			let result;
			if (isSignIn) {
				result = await loginUser(data);
				console.log('Sign In Success', result);
				dispatch(userActions.setTokens({
					accessToken: result.access_token,
					refreshToken: result.refresh_token
				}));
			} else {
				result = await registerUser(data);
				console.log('Register Success', result);
				dispatch(userActions.setTokens({
					accessToken: result.access_token,
					refreshToken: result.refresh_token
				}));
			}
		} catch (error) {
			console.log(error);
			if (error instanceof AxiosError) {
				setErrorMessage(error.response?.data.message || 'Ошибка при обработке запроса.');
			} else {
				setErrorMessage('Неизвестная ошибка');
			}
		}
	};
	

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="w-full max-w-md">
				<p className="text-center text-3xl font-medium">My Account</p>
				<div className="mt-16 flex justify-center space-x-4 bg-[#EFEFEF]">
					<button
						className={`w-1/2 rounded-lg px-5 py-2 ${
							isSignIn ? 'bg-[white]' : 'bg-[gray-100]'
						}`}
						onClick={() => setIsSignIn(true)}
					>
            Sign in
					</button>
					<button
						className={`w-1/2 rounded-lg px-5 py-2 ${
							!isSignIn ? 'bg-[white]' : 'bg-[#EFEFEF]'
						}`}
						onClick={() => setIsSignIn(false)}
					>
            Register
					</button>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className="mt-32 space-y-4">
					{!isSignIn && (
						<>
							<div className="relative">
								<input
									type="text"
									className="peer mt-2 w-full border-b border-b-[#D8D8D8] p-2 focus:outline-none focus:ring-0"
									{...register('name', { required: 'Name is required' })}
									placeholder="Name"
								/>
								{errors.name && (
									<p className="mt-1 text-sm text-[red-500]">
										{String(errors.name.message)}
									</p>
								)}
							</div>
							<div className="relative">
								<input
									type="text"
									className="peer mt-2 w-full border-b border-b-[#D8D8D8] p-2 focus:outline-none focus:ring-0"
									{...register('surname', { required: 'Surname is required' })}
									placeholder="Surname"
								/>
								{errors.surname && (
									<p className="mt-1 text-sm text-[red-500]">
										{String(errors.surname.message)}
									</p>
								)}
							</div>
							<div className="relative">
								<input
									type="text"
									className="peer mt-2 w-full border-b border-b-[#D8D8D8] p-2 focus:outline-none focus:ring-0"
									{...register('patronymic', {
										required: 'Patronymic is required',
									})}
									placeholder="Patronymic"
								/>
								{errors.patronymic && (
									<p className="mt-1 text-sm text-[red-500]">
										{String(errors.patronymic.message)}
									</p>
								)}
							</div>
						</>
					)}
					<div className="relative">
						<input
							type="email"
							className="peer mt-2 w-full border-b border-b-[#D8D8D8] p-2 focus:outline-none focus:ring-0"
							{...register('email', { required: 'Email is required' })}
							placeholder="Email"
							autoComplete="username"
						/>
						{errors.email && (
							<p className="mt-1 text-sm text-[red-500]">
								{String(errors.email.message)}
							</p>
						)}
					</div>
					<div className="relative">
						<input
							type="password"
							className="peer mt-2 w-full border-b border-b-[#D8D8D8] p-2 focus:outline-none focus:ring-0"
							{...register('password', {
								required: 'Password is required',
								minLength: {
									value: 10,
									message: 'Password must be at least 10 characters',
								},
							})}
							placeholder="Password"
							autoComplete={isSignIn ? 'current-password' : 'new-password'}
						/>
						{errors.password && (
							<p className="mt-1 text-sm text-[red-500]">
								{String(errors.password.message)}
							</p>
						)}
					</div>
					{isSignIn && (
						<div className="flex items-center">
							<input
								type="checkbox"
								className="mt-4 h-[17px] w-[16px] rounded border-[gray-300] text-[black]"
								{...register('rememberMe')}
							/>
							<label className="ml-2 mt-4 text-[gray-700]">Remember me</label>
						</div>
					)}
					{errorMessage && (
						<p className="mt-3 text-center text-sm text-[red-500]">
							{errorMessage}
						</p>
					)}
					<div>
						<button
							type="submit"
							className="mt-16 w-full rounded-lg bg-[black] py-2 font-bold text-[white] hover:bg-[gray-800]"
						>
							{isSignIn ? 'SIGN IN' : 'REGISTER'}
						</button>
					</div>
				</form>
				{isSignIn && (
					<p className="mt-3 text-center text-sm text-[gray-500]">
            Have you forgotten your password?
					</p>
				)}
			</div>
		</div>
	);
}
