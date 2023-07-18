"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = __importDefault(require("express"));
var customer_route_1 = __importDefault(require("./customer.route"));
exports.router = express_1.default.Router();
var routes = [
    {
        path: "/customers",
        route: customer_route_1.default,
    },
];
routes.forEach(function (route) {
    exports.router.use(route.path, route.route);
});
