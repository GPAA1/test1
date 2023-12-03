import { PrismaService } from '../prisma/prisma.service';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    getPromocode(idUser: any): Promise<any>;
    allowSuggestions(idUser: string, isSuggestion: string): Promise<any>;
    getUserAll(): Promise<any>;
    getProfile(idUser: any): Promise<any>;
    setProfile(idUser: any, tariffPlan: any, time: any, isOne: any): Promise<any>;
    setAllDateProfile(idUser: any, data: any): Promise<any>;
    setTariffTemp(idUser: any, tariffPlan: any): Promise<any>;
    uploadPromocode(idUser: any, promocode: any): Promise<any>;
    getCheckUser(idUser: any): Promise<any>;
    optUser(idUser: any): Promise<any>;
    recommendationsProfile(idUser: any, isBotProp: string): Promise<any>;
    optProfile(idUser: any): Promise<any>;
}
