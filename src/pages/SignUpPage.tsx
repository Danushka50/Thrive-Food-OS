import React, { useState } from 'react';
import './SignUpPage.css';
import OtpInput from '../components/OtpInput';
import { useNavigate } from 'react-router-dom';
import { registerUser, sendOtp, verifyOtp } from '../services/authService';

const SignUpPage: React.FC = () => {

	const navigate = useNavigate();
	const [step, setStep] = useState(1);
	const [loading, setLoading] = useState(false);

	const nextStep = () => setStep((prev) => prev + 1);

	const [password, setPassword] = useState("");

	// 1. Centralized Form Data
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		dob: '',
		gender: '',
		phone: '',
		password: ''
	});

	const [confirmPassword, setConfirmPassword] = useState("");
	const [isConfirmTouched, setIsConfirmTouched] = useState(false);
	const [otp, setOtp] = useState<string>('');

	// Helpers for updating state
	const updateField = (field: string, value: string) => {
		setFormData(prev => ({ ...prev, [field]: value }));
	};

	// 2. Password Validation Logic
	const passwordsMatch = formData.password === confirmPassword;
	const showConfirmError = isConfirmTouched && !passwordsMatch && confirmPassword.length > 0;

	const requirements = {
		length: formData.password.length >= 8,
		lowercase: /[a-z]/.test(formData.password),
		uppercase: /[A-Z]/.test(formData.password),
		number: /[0-9]/.test(formData.password),
		special: /[!@#$%^&*_]/.test(formData.password),
	};

	const strengthCount = Object.values(requirements).filter(Boolean).length;

	const getStrengthLabel = () => {
		if (strengthCount <= 0) return "";
		if (strengthCount === 1) return "Weak";
		if (strengthCount === 2) return "Fair";
		if (strengthCount === 3) return "Good";
		return "Strong Password";
	};

	// --- API LOGIC PER STEP ---

	const handleStep1Continue = () => {
		if (!formData.firstName || !formData.email) return alert("Please fill in required fields");
		setStep(2);
	};

	const handleSendOtp = async () => {
		if (!formData.phone) return alert("Please enter your phone number");
		setLoading(true);
		try {
			await sendOtp(formData.phone);
			setStep(3);
		} catch (err) {
			alert("Failed to send OTP. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleVerifyOtp = async () => {
		if (otp.length < 4) return alert("Please enter full OTP");
		setLoading(true);
		try {
			await verifyOtp(otp);
			setStep(4);
		} catch (err) {
			alert("Invalid OTP code. Try 8400 for testing.");
		} finally {
			setLoading(false);
		}
	};

	const handleCreateAccount = async () => {
		setLoading(true);
		try {
			await registerUser(formData);
			alert("Account Created Successfully!");
			navigate('/login');
		} catch (err: any) {
			alert(err.response?.data?.message || "Registration failed");
		} finally {
			setLoading(false);
		}
	};





	// Logic: Check if they match only after the user starts typing in Confirm Password


	const [isSendCodePressed, setIsSendCodePressed] = useState<boolean>(false);



	return (
		<div className="landing-wrapper">
			{/* Background Watermark */}
			<div className="bg-watermark">THRIVE</div>

			<header className="navbar">
				<div className="logo-text">THRIVE</div>
			</header>

			<main className="hero-content">
				<div className="hero-left">
					<h1 className="hero-title">
						Build your meals. Track your nutrition. Own your lifestyle.
					</h1>
					<p className="hero-subtitle">
						Design every ingredient, every gram, every cook style. <br />
						We make it. We deliver it.
					</p>

					{/* Decorative Food Images */}
					<div className="food-decor">
						<img src="https://e7.pngegg.com/pngimages/786/552/png-clipart-platter-of-grilled-lamb-italian-cuisine-pizza-pasta-food-plate-healthy-food-food-beef-thumbnail.png" className="plate plate-lg" alt="Main dish" />
						<img src="https://png.pngtree.com/png-clipart/20250427/original/pngtree-healthy-food-plate-with-fruits-and-vegetables-png-image_20850628.png" className="plate plate-sm top" alt="Side dish" />
						<img src="https://img.freepik.com/free-psd/hearty-dinner-plate-with-roasted-meat-mashed-potatoes-mixed-vegetables_84443-65709.jpg?semt=ais_hybrid&w=740&q=80" className="plate plate-sm bottom" alt="Side dish" />
					</div>
				</div>

				<div className="form-card">
					{step === 1 && (
						<div className="step-content">
							<h2 className="title">Create your Account</h2>
							<p className="subtitle">Lets start with basic details</p>
							<div className="grid-row">
								<div className="input-group">
									<label>FIRST NAME</label>
									<input type="text" value={formData.firstName} onChange={(e) => updateField('firstName', e.target.value)} />
								</div>
								<div className="input-group">
									<label>LAST NAME</label>
									<input type="text" value={formData.lastName} onChange={(e) => updateField('lastName', e.target.value)} />
								</div>
							</div>
							<div className="input-group">
								<label>EMAIL</label>
								<input type="email" value={formData.email} onChange={(e) => updateField('email', e.target.value)} />							</div>
							<div className="grid-row">
								<div className="input-group">
									<label>DATE OF BIRTH</label>
									<input type="date" value={formData.dob} onChange={(e) => updateField('dob', e.target.value)} />								</div>
								<div className="input-group">
									<label>GENDER</label>
									<input type="text" value={formData.gender} onChange={(e) => updateField('gender', e.target.value)} />								</div>
							</div>
							<button className="primary-btn" onClick={handleStep1Continue}>Continue</button>
						</div>
					)}

					{step === 2 && (
						<div className="step-content">
							<h2 className="title">Your mobile number</h2>
							<p className="subtitle">We'll send a one-time code to verify you</p>
							<div className="input-group">
								<label>MOBILE NUMBER</label>
								<input type="text" placeholder="+94" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} />
							</div>
							<div className="info-box">
								An OTP will be sent to this number. Standard SMS rates may apply.
							</div>
							<button className="primary-btn" onClick={handleSendOtp} disabled={loading}>
								{loading ? "Sending..." : "Send OTP"}
							</button>
						</div>
					)}

					{step === 3 && (
						<div className="step-content">
							<h2 className="title">Enter OTP Code</h2>
							<p className="subtitle-otp">We sent a 4-digit code to</p>
							<p className="phone-number">{formData.phone}</p>
							<OtpInput onComplete={(code) => setOtp(code)} />
							<p className="timer">Expires in 02:45</p>
							<p className="resend-text">
								Didn't receive it? <button className="resend-link">Resend code</button>
							</p>
							<button className="primary-btn" onClick={handleVerifyOtp} disabled={loading}>
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
						</div>
					)}

					{step === 4 && (
						<div className="step-content">
							<h2 className="title">Set your password</h2>
							<p className="subtitle">Minimum 8 characters. Mix letters and numbers.</p>

							<div className="input-group">
								<label>PASSWORD</label>
								<div className="password-wrapper">
									<input type="password" value={formData.password} onChange={(e) => updateField('password', e.target.value)} />
									{/* Strength Meter Logic */}
									<div className="strength-meter">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`bar ${strengthCount >= i ? 'active' : ''}`}></div>
                    ))}
                  </div>
                  <span className="strength-label">{getStrengthLabel()}</span>
								</div>
							</div>

							<div className="input-group">
								<label>CONFIRM PASSWORD</label>
								<div className="input-wrapper-inline">
									<input
										type="password"
										value={confirmPassword}
										className={showConfirmError ? "input-error" : ""}
										onChange={(e) => {
											setConfirmPassword(e.target.value);
											setIsConfirmTouched(true);
										}}
										placeholder="Confirm Password"
									/>
									{/* Inline Error Icon */}
									{showConfirmError && (
										<span className="error-icon-inline" title="Passwords do not match">
											⚠️
										</span>
									)}
									{/* Optional: Success Checkmark */}
									{!showConfirmError && passwordsMatch && confirmPassword.length > 0 && (
										<span className="success-icon-inline">
											✓
										</span>
									)}
								</div>
							</div>

							<div className="requirements">
								<label>PASSWORD REQUIREMENTS</label>
								<ul className='requirements-box'>
									<li className={requirements.length ? "valid" : ""}>
										{requirements.length ? "✓" : "○"} At least 8 characters
									</li>
									<li className={requirements.uppercase ? "valid" : ""}>
										{requirements.uppercase ? "✓" : "○"} One uppercase letter
									</li>
									<li className={requirements.number ? "valid" : ""}>
										{requirements.number ? "✓" : "○"} One number
									</li>
									<li className={requirements.special ? "valid" : ""}>
										{requirements.special ? "✓" : "○"} Special character (optional)
									</li>
								</ul>
							</div>

							<button className="primary-btn" disabled={loading || strengthCount < 3 || !passwordsMatch} onClick={handleCreateAccount}>
                {loading ? "Creating..." : "Create Account"}
              </button>
						</div>
					)}
				</div>
			</main>
		</div>
	);
};

export default SignUpPage;