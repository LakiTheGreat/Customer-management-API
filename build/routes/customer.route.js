"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var coontrollers_1 = require("../coontrollers");
var router = express_1.default.Router();
router.get("/", coontrollers_1.getCustomers);
exports.default = router;
