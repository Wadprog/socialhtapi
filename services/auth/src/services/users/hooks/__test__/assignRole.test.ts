import { HookContext } from "@feathersjs/feathers";
import { sequelizeWrapper } from "@webvital/micro-common";
import assignRole from "../assignRole";


jest.mock("@webvital/micro-common", () => ({
    sequelizeWrapper: {
        client: {
            models: {
                Role: {
                    findOne: jest.fn(),
                },
            },
        },
    },
}));

describe("assignRole hook", () => {
    let context: HookContext;

    beforeEach(() => {
        context = {
            data: {},
        } as HookContext;
        jest.clearAllMocks();
    });

    it("should assign roleId to context.data", async () => {
        const role = { id: 1, name: "user" };
        (sequelizeWrapper.client.models.Role.findOne as jest.Mock).mockResolvedValue(role);

        await assignRole(context);

        expect(sequelizeWrapper.client.models.Role.findOne).toHaveBeenCalledWith({
            where: { name: "user" },
        });
        expect(context.data.roleId).toBe(role.id);
    });

    it("should not assign roleId if role is not found", async () => {
        (sequelizeWrapper.client.models.Role.findOne as jest.Mock).mockResolvedValue(null);

        await assignRole(context);

        expect(sequelizeWrapper.client.models.Role.findOne).toHaveBeenCalledWith({
            where: { name: "user" },
        });
        expect(context.data.roleId).toBeUndefined();
    });
})