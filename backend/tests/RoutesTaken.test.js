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
    route_id: "90123",
    travel_mode: "Walking",
    user_validated: true,
    edges_validation: new Map([
        ["entity1", 
            {
                lon: 123,
                lat: 123,
                pictures: "true", 
                comments: "test description" 
            }
        ]
    ]),
    deleted: false,
    created_at: new Date()
}

const newRoutesTakenWithoutEmail = {
    route_id: "90123",
    user_validated: true,
    travel_mode: "Walking",
    edges_validation: new Map([
        ["entity1", 
            {
                lon: 123,
                lat: 123,
                pictures: "true", 
                comments: "test description" 
            }
        ]
    ]),
    deleted: false,
    created_at: new Date()
}