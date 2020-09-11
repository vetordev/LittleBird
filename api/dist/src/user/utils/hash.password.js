"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sha256_1 = __importDefault(require("crypto-js/sha256"));
function hashPassword(password) {
    const hash = sha256_1.default(password);
    return hash.toString();
}
exports.default = hashPassword;
;
//# sourceMappingURL=hash.password.js.map