import { useState } from 'react';
import { useForm } from 'react-hook-form';

export function SignPage() {
	const [isSignIn, setIsSignIn] = useState(true);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const onSubmit = (data: any) => {
		console.log(isSignIn ? 'Sign In Data' : 'Register Data', data);
	};

	return (
		<div className="flex min-h-[80vh] items-center justify-center">
			<div className="w-full max-w-md">
				<p className="text-center text-3xl font-medium">My Account</p>
				<div className="mt-16 flex justify-center space-x-4 bg-[#EFEFEF]">
					<button
						className={`w-1/2 rounded-lg px-5 py-2 ${
							isSignIn ? ' bg-[white]' : 'bg-[gray-100]'
						}`}
						onClick={() => setIsSignIn(true)}
					>
            Sign in
					</button>
					<button
						className={`w-1/2 rounded-lg px-5 py-2 ${
							!isSignIn ? ' bg-[white]' : 'bg-[#EFEFEF]'
						}`}
						onClick={() => setIsSignIn(false)}
					>
            Register
					</button>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className="mt-32 space-y-4">
					<div className="relative">
						<input
							type="email"
							className="peer mt-2 w-full border-b border-b-[#D8D8D8] p-2 focus:outline-none focus:ring-0"
							{...register('email', { required: 'Email is required' })}
							placeholder="Email"
						/>


						{errors.email && (
							<p className="mt-1 text-sm text-[red-500]">{errors.email.message}</p>
						)}
					</div>
					<div className="relative">
						<input
							type="password"
							className="peer mt-2 w-full border-b border-b-[#D8D8D8] p-2 focus:outline-none focus:ring-0"
							{...register('password', {
								required: 'Password is required',
								minLength: {
									value: 6,
									message: 'Password must be at least 6 characters',
								},
							})}
							placeholder="Password"
						/>


						{errors.password && (
							<p className="mt-1 text-sm text-[red-500]">{errors.password.message}</p>
						)}
					</div>
					{isSignIn && (
						<div className="flex items-center">
							<input
								type="checkbox"
								className="mt-4 h-[17px] w-[16px] rounded border-[gray-300] text-[black] "
								{...register('rememberMe')}
							/>
							<label className="ml-2 mt-4 text-[gray-700]">Remember me</label>
						</div>
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
