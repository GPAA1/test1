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
exports.ModeService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ModeService = class ModeService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getMode(idUser) {
        const user = await this.prisma.user.findFirst({
            where: { idUser: idUser },
        });
        if (user) {
            return user.message_mode;
        }
        return 'standart';
    }
    async setMode(idUser, mode) {
        const user = await this.prisma.user.findFirst({
            where: { idUser: idUser },
        });
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                message_mode: mode,
            },
        });
        return 'ok';
    }
};
exports.ModeService = ModeService;
exports.ModeService = ModeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ModeService);
//# sourceMappingURL=mode.service.js.map