import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import visibilityIconOff from '../assets/svg/visibilityIconOff.svg';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome</p>
        </header>
        <form>
          <input
            id="name"
            className="nameInput"
            type="text"
            placeholder="Name"
            value={name}
            autoComplete="name"
            onChange={onChange}
          />
          <input
            id="email"
            className="emailInput"
            type="email"
            placeholder="Email"
            value={email}
            autoComplete="email"
            onChange={onChange}
          />
          <div className="passwordInputDiv">
            <input
              type={showPassword ? 'text' : 'password'}
              className="passwordInput"
              placeholder="Password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={onChange}
            />
            <img
              src={showPassword ? visibilityIcon : visibilityIconOff}
              alt="Show Password"
              className="showPassword"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password
          </Link>

          <div className="signUpBar">
            <p className="signUpText">Sign up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#ffffff" width="34px" height="34px" />
            </button>
          </div>
        </form>
        {/*  Google OAuth */}
        <Link to="/sign-in" className="registerLink">
          Sign in instead
        </Link>
      </div>
    </>
  );
}

export default SignUp;
