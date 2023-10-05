import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OptService {
  constructor(private prisma: PrismaService) {}
  async createOpt(idUser: any, chanel: any): Promise<any> {
    // const user = await this.prisma.user.findUnique({
    //   where: {
    //     id: idUser
    //   }
    // });
    const user = await this.prisma.user.update({
      where: {
        id: idUser
      },
      data: {
        opt_chanel_create: chanel
      }
    });
    const chanel_bd = await this.prisma.userChanel.findFirst({
      where: { idChanel: chanel },
    });

    const opt_bd = await this.prisma.opt.findUnique({
      where: { chanel: chanel },
    });
    
    if(opt_bd) {
      await this.prisma.opt.delete({
        where: { chanel: chanel },
      });
    }

    const opt = await this.prisma.opt.create({
      data: {
        idUser: user.id,
        title:  chanel_bd.title,
        chanel: chanel,
        category: chanel_bd.category
      },
    });
    return 'ok';
  }
  async getOpt(idUser: any): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: idUser },
      include: {
        opts: true,
      },
    });
    return user.opts[0];
  }

  async getOptCategories(idUser:any, category: any, filter: any): Promise<any> {
    let opts
    
    if(filter && filter !== 'none') {
      const filterPrepar = this.parseFilter(filter)
      const user = await this.prisma.user.findUnique({
        where: {
          id: idUser
        }
      });
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          filter_opt: filterPrepar,
        },
      });
      const filterData = {[filterPrepar]: 'desc'}

      if (category === 'all') {
        opts = await this.prisma.opt.findMany({
          orderBy: [ filterData ],
        });
        return opts
      } else {
        opts = await this.prisma.opt.findMany({
          where: {
            category: category,
          },
          orderBy: [ filterData ],
        });
        return opts
      }
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: idUser
      }
    });

    if(user.filter_opt === "none") {
      if (category === 'all') {
        opts = await this.prisma.opt.findMany();
        return opts
      } else {
        opts = await this.prisma.opt.findMany({
          where: {
            category: category,
          },
        });
        return opts
      }
    }

    if (category === 'all') {
      opts = await this.prisma.catalog.findMany({
        orderBy: [ {[user.filter ]: 'desc'} ]
      });
    } else {
      opts = await this.prisma.catalog.findMany({
        where: {
          category: category,
        },
        orderBy: [ {[user.filter ]: 'desc'} ]
      });
    }
    return opts;
  }

  async setOpt(idUser: any, data: any): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: idUser },
      // include: {
      //   opts: true,
      // },
    });

    const opt = await this.prisma.opt.update({
      where: { chanel: user.opt_chanel_create},
      data: data,
    });

    return opt;
  }

  async getStatOpt(chanel: any): Promise<any> {
    const opt = await this.prisma.opt.findFirst({
      where: { chanel: chanel }
    });

    console.log(opt)

    const user = await this.prisma.user.findFirst({
      where: { id: opt.idUser }
    });

    const result = {...opt , user_id: user.id}
    return result;
  }

  async setOptInto(idUser: any, idOpt: any, body: any): Promise<any> {
    const optOld = await this.prisma.optInto.findFirst({
      where: {
        chanel: idOpt,
        idUser: idUser
      }
    });
    if(optOld) {
      const opt = await this.prisma.optInto.update({
        where: {
          id: optOld.id,
        },
        data : body
      });
      return opt
    } else {
      const opt = await this.prisma.optInto.create({
        data : {
          ...body,
          chanel: idOpt,
          idUser: idUser
        }
      });
      return opt
    }
  }

  async setRecommendationInto(idUser: any, idOpt: any, body: any): Promise<any> {
    const optOld = await this.prisma.recommendationInto.findFirst({
      where: {
        chanel: idOpt,
        idUser: idUser
      }
    });
    if(optOld) {
      const opt = await this.prisma.recommendationInto.update({
        where: {
          id: optOld.id,
        },
        data : body
      });
      return opt
    } else {
      const opt = await this.prisma.recommendationInto.create({
        data : {
          ...body,
          chanel: idOpt,
          idUser: idUser
        }
      });
      return opt
    }
  }


  async getOptInto(idOpt: any): Promise<any> {
    const opt = await this.prisma.optInto.findFirst({
      where: {
        chanel: idOpt,
      },
    });

    return opt;
  }

  parseFilter(name: any) {
    if(name === 'repost') {
      return 'forwards_count'
    } else if(name === 'numberSubscribers') {
      return 'participants_count'
    } else if(name === 'coveragePub') {
      return 'avg_post_reach'
    } else if(name === 'coverageDay') {
      return 'daily_reach'
    } else if(name === 'indexSay') {
      return 'ci_index'
    }
  }
}
