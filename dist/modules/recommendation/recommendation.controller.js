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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecommendationController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const recommendation_service_1 = require("./recommendation.service");
let RecommendationController = class RecommendationController {
    constructor(recommendationService) {
        this.recommendationService = recommendationService;
    }
    async recommendationCreate(res, body) {
        const result = await this.recommendationService.recommendationCreate(body);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async recommendationGet(res, body) {
        const result = await this.recommendationService.recommendationGet();
        return res.status(common_1.HttpStatus.OK).json(result);
    }
    async recommendationGetIndividual(res, idRecommendation) {
        const result = await this.recommendationService.recommendationGetIndividual(idRecommendation);
        return res.status(common_1.HttpStatus.OK).json(result);
    }
};
exports.RecommendationController = RecommendationController;
__decorate([
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('formdata')),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RecommendationController.prototype, "recommendationCreate", null);
__decorate([
    (0, common_1.Get)('get'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RecommendationController.prototype, "recommendationGet", null);
__decorate([
    (0, common_1.Get)('individual'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)("idRecommendation")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RecommendationController.prototype, "recommendationGetIndividual", null);
exports.RecommendationController = RecommendationController = __decorate([
    (0, common_1.Controller)('recommendations'),
    __metadata("design:paramtypes", [recommendation_service_1.RecommendationService])
], RecommendationController);
//# sourceMappingURL=recommendation.controller.js.map