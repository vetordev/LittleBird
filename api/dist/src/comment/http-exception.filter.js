"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryFailedExceptionFilter = void 0;
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let QueryFailedExceptionFilter = class QueryFailedExceptionFilter {
    catch(exception, host) {
        const context = host.switchToHttp();
        const response = context.getResponse();
        let errorResponse;
        if (exception.code == 23503) {
            errorResponse = {
                error: "A chave estrangeira não existe no servidor.",
            };
            response.status(404).json(errorResponse);
        }
        else
            response.status(500).json({ error: "Erro interno no servidor." });
    }
};
QueryFailedExceptionFilter = __decorate([
    common_1.Catch(typeorm_1.QueryFailedError)
], QueryFailedExceptionFilter);
exports.QueryFailedExceptionFilter = QueryFailedExceptionFilter;
//# sourceMappingURL=http-exception.filter.js.map