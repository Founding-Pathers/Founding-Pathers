const mongoose = require('mongoose');

const dbFunction = require('./dbFunctionality');

const routesTakenModel = require('../models/RoutesTaken');

beforeAll(async () => await dbFunction.connect());

afterEach(async () => await dbFunction.clearDatabase());

afterAll(async () => await dbFunction.closeDatabase());

describe('routes taken', () => {
    it('can be taken by the user properly', async () => {
    await expect(async () => {
        await routesTakenModel.create(newRoutesTaken)
        })
        .not
        .toThrow();
    });

    it('cannot be taken by the user without account_id ', async () => {
        await expect(async () => {
            await routesTakenModel.create(newRoutesTakenWithoutEmail)
            })
            .rejects
            .toThrow(mongoose.Error.ValidationError);
        });
    
    
    it('can be retrieved correctly', async () => {
        await expect(async () => {
            let idQuery = { account_id: "stqz92715sa" };
            const routeFound = await routesTakenModel.findOne(idQuery);

            expect(routeFound.routes_index).toBe(90123);
        });
    });
});

const newRoutesTaken = {
    email : "test@example.com",
    route_index: "90123",
    user_validated: true,
    edges_validation: new Map([
        ["entity1", 
            {
                validation: true, 
                issue_desc: "test description" 
            }
        ]
    ]),
    deleted: false
}

const newRoutesTakenWithoutEmail = {
    route_index: "90123",
    user_validated: true,
    edges_validation:
        {
            validation: null,
            issue_desc: null
        },
    deleted: false
}