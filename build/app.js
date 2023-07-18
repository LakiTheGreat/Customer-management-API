"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Middleware imports
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var app = (0, express_1.default)();
// 1) Middlewares
app.use((0, morgan_1.default)("dev")); //logs req data in terminal
app.use(function (req, res, next) {
    console.log("Hello from the middleware 👋");
    next();
});
// app.use(express.json); //add body to req
// app.use("/v1", router);
// app.use((err: any, req: express.Request, res: express.Response) => {
//   res.status(404).send("Route not found");
// });
exports.default = app;
