const mongoose = require('mongoose');

const dbFunction = require('./dbFunctionality');

const routesModel = require('../models/Routes');

beforeAll(async () => await dbFunction.connect());

afterEach(async () => await dbFunction.clearDatabase());

afterAll(async () => await dbFunction.closeDatabase());

describe('routes', () => {
    it('returns null if id not found', async () => {
    await expect(routesModel.findOne(mongoose.Types.ObjectId()))
        .resolves
        .toBeNull();
    });
    
    
    it('can be retrieved correctly', async () => {
        await expect(async () => {
            let idQuery = { _id: "93102" };
            const routeFound = await routesModel.findOne(idQuery);

            expect(routeFound.id).toBe(nodeId);
            expect(routeFound.start_node_index).toBe(newRouteInfo.start_node_index)
            expect(routeFound.end_node_index).toBe(newRouteInfo.end_node_index)
        });
    });
});

const newRouteInfo = {
    _id : "93102",
    start_node_index: 90123,
    end_node_index: 12309,
    distance: 1000
}