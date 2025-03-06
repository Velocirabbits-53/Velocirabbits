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
//Boilerplate imports
import { useRef } from "react";
import "../../public/styles/App.css";
import { useNavigate } from "react-router-dom";
import "../../public/styles/Login-Page.css";
function Login() {
    // declare navigate to change web addresses
    const navigate = useNavigate();
    // setting the username/passRefs as useRef.
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    function loginRequest() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!usernameRef.current || !passwordRef.current) {
                console.error("Username or password input is not available.");
                return;
            }
            // the buttonclick invokes this function
            const username = usernameRef.current.value;
            const password = passwordRef.current.value;
            console.log(username);
            console.log(password);
            try {
                console.log("hello Anthony");
                const response = yield fetch("http://localhost:3000/user/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ username: username, password: password }),
                });
                console.log("The value of response.body is", response);
                if (response.ok) {
                    console.log("You are logged in");
                    // the line below is currently refreshing the page. we can test a redirect with another page once we have one, but it currently isn't correct.
                    // window.location.href = '/' //put page structure for Dashboard/Homepage here.
                    navigate("/dashboard", {
                        state: { username: `${username}` },
                    });
                }
                else {
                    const error = yield response.json();
                    console.error("Login failed", error);
                    alert("Login failed" + (error.message || "Invalid login information."));
                }
            }
            catch (error) {
                console.error(error);
            }
        });
    }
    const registerButtonClick = () => __awaiter(this, void 0, void 0, function* () {
        // redirect user to Register.jsx
        navigate("/register");
    });
    return (_jsxs(_Fragment, { children: [_jsx("h1", { children: "Log In" }), _jsxs("div", { className: 'inputs', children: ["//add label for username via htmlFor attribute", _jsx("label", { className: 'label', htmlFor: 'username', children: "Username" }), _jsx("input", { type: 'text', id: 'username', ref: usernameRef })] }), _jsxs("div", { className: 'inputs', children: [' ', "//add label for password via htmlFor attribute", _jsx("label", { className: 'label', htmlFor: 'password', children: "Password" }), _jsx("input", { type: 'password', id: 'password', ref: passwordRef })] }), _jsx("div", { className: "card", children: _jsxs("div", { children: [_jsx("button", { onClick: loginRequest, children: "Login" }), _jsx("button", { onClick: registerButtonClick, children: "Register" })] }) })] }));
}
export default Login;
