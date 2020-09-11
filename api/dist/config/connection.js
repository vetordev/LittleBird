"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config({
    path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env"
});
exports.connection = {
    type: process.env.TYPE,
    host: String(process.env.HOST),
    port: Number(process.env.PORT),
    username: String(process.env.USERDB),
    password: String(process.env.PASSWORD),
    database: String(process.env.DATABASE),
    autoLoadEntities: Boolean(process.env.AUTO_LOAD_ENTITIES),
    synchronize: Boolean(process.env.SYNCHRONIZE)
};
//# sourceMappingURL=connection.js.map