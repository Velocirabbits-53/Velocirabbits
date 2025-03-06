"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
//Import the router------------------------------
const routers_1 = require("./routers/routers");
//Boilerplate adjustment of data--------------------------------------
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
//Define the router handler------------------------------
app.use('/user', routers_1.router);
//Boilerplate to check if the code is working correctly---------------------------
app.get('/', (req, res) => {
    res.status(200).json('Hello from the backend');
});
//Boilerplate to send a 404 error if page doesn't exit---------------------------
app.use((req, res) => {
    res.status(404).json('This is a 404 error');
});
//Boilerplate to send a 500 error if system error--------------------------------
app.use((err, req, res, next) => {
    const defaultErr = {
        log: 'You are receiving an error from the server',
        status: 500,
        message: { err: 'This is a 500 error message' },
    };
    const errorObj = Object.assign(defaultErr, err);
    res.status(errorObj.status).send(errorObj.message);
});
//Boilerplate to send a console.log when the server starts--------------------------------
app.listen(PORT, () => {
    console.log(`Now listening on ${PORT}`);
});
exports.default = app;
