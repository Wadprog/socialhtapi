import { HookContext } from "@feathersjs/feathers";


export default async (context: HookContext): Promise<HookContext> => {
    const { app } = context;
    const sequelize = app.get('sequelizeClient');
    const role = await sequelize.models.Role.findOne({
        where: {
            name: 'user'
        }
    });

    context.data.roleId = role?.id || 1;
    return context;
}