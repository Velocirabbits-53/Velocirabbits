var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useRef } from 'react';
import '../../public/styles/App.css';
import '../../public/styles/Register.css';
import { useNavigate } from 'react-router-dom';
function Register() {
    // declare navigate to change web addresses
    const navigate = useNavigate();
    // setting the email/passRefs as useRef.
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    function regRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!usernameRef.current || !passwordRef.current) {
                console.error('Username or password input is not available.');
                return;
            }
            // the buttonclick invokes this function
            const username = usernameRef.current.value;
            const password = passwordRef.current.value;
            if (!username || !password) {
                console.error('Registration failed: Empty fields.');
                alert('Username and password cannot be empty.');
                return;
            }
            try {
                const response = yield fetch('http://localhost:3000/user/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: username, password: password }),
                });
                if (response.ok) {
                    console.log('You are logged in');
                    navigate('/dashboard', {
                        state: { username: `${username}` },
                    });
                }
                else {
                    let error;
                    try {
                        error = yield response.json();
                    }
                    catch (_a) {
                        error = { message: 'Unknown error occurred' };
                    }
                    console.error('Registration failed', error);
                    alert('Login failed: ' + (error.message || 'Invalid login information.'));
                }
            }
            catch (error) {
                console.error('Network error:', error);
                alert('Network error: Please try again later.');
            }
        });
    }
    return (_jsxs(_Fragment, { children: [_jsx("h1", { children: "Register" }), _jsxs("div", { className: 'inputs', children: [_jsx("label", { className: 'label', htmlFor: 'username', children: "Username" }), _jsx("input", { id: 'username', type: 'username', ref: usernameRef })] }), _jsxs("div", { className: 'inputs', children: [' ', _jsx("label", { className: 'label', htmlFor: 'password', children: "Password" }), _jsx("input", { id: 'password', type: 'password', ref: passwordRef })] }), _jsx("div", { className: 'card', children: _jsx("button", { onClick: (e) => {
                        e.preventDefault();
                        regRequest();
                    }, children: "Sign Up" }) })] }));
}
export default Register;
