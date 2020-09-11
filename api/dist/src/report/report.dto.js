"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateReportCommentParamDto = exports.CreateReportReplyParamDto = exports.CreateReportCommentBodyDto = exports.CreateReportReplyBodyDto = void 0;
const class_validator_1 = require("class-validator");
class CreateReportReplyBodyDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateReportReplyBodyDto.prototype, "report_content", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateReportReplyBodyDto.prototype, "report_type", void 0);
exports.CreateReportReplyBodyDto = CreateReportReplyBodyDto;
;
class CreateReportCommentBodyDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateReportCommentBodyDto.prototype, "report_content", void 0);
__decorate([
    class_validator_1.IsInt(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateReportCommentBodyDto.prototype, "report_type", void 0);
exports.CreateReportCommentBodyDto = CreateReportCommentBodyDto;
;
class CreateReportReplyParamDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateReportReplyParamDto.prototype, "reply_id", void 0);
exports.CreateReportReplyParamDto = CreateReportReplyParamDto;
;
class CreateReportCommentParamDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", Number)
], CreateReportCommentParamDto.prototype, "comment_id", void 0);
exports.CreateReportCommentParamDto = CreateReportCommentParamDto;
;
//# sourceMappingURL=report.dto.js.map