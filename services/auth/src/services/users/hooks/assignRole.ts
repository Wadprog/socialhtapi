import { HookContext } from "@feathersjs/feathers";
import { sequelizeWrapper } from "@webvital/micro-common";


export default async (context: HookContext): Promise<HookContext> => {
    const sequelize = sequelizeWrapper.client
    const role = await sequelize.models.Role.findOne({ where: { name: 'user' } });
    //@ts-ignore
    context.data.roleId = role?.id;
    return context;
}