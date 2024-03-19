const mongoose = require('mongoose');

const dbFunction = require('./dbFunctionality');

const computedRoutesModel = require('../models/ComputedRoutes');

beforeAll(async () => await dbFunction.connect());

afterEach(async () => await dbFunction.clearDatabase());

afterAll(async () => await dbFunction.closeDatabase());

describe('computed route', () => {
    it('can be created properly', async () => {
        await expect(async () => {
            await computedRoutesModel.create(testComputedRoute);
        })
        .not
        .toThrow();
    });
    
    it('cannot be created without start_node_index', async () => {
        await expect(async () => {
            await computedRoutesModel.create(testComputedRouteWithoutStart);
        })
        .rejects
        .toThrow(mongoose.Error.ValidationError);
    })

    it('cannot be created without end_node_index', async () => {
        await expect(async () => {
            await computedRoutesModel.create(testComputedRouteWithoutEnd);
        })
        .rejects
        .toThrow(mongoose.Error.ValidationError);
    })

    it('cannot be created without travel_mode', async () => {
        await expect(async () => {
            await computedRoutesModel.create(testComputedRouteWithoutTravelMode);
        })
        .rejects
        .toThrow(mongoose.Error.ValidationError);
    })

    it('cannot be created without is_sheltered', async () => {
        await expect(async () => {
            await computedRoutesModel.create(testComputedRouteWithoutShelterOption);
        })
        .rejects
        .toThrow(mongoose.Error.ValidationError);
    })
});

const testComputedRoute = {
    _id: "1",
    start_node_index: 10291,
    end_node_index: 19201,
    travel_mode: 2,
    is_sheltered: true,
    best_route: [123123, 123123]
}

const testComputedRouteWithoutStart = {
    _id: "2",
    end_node_index: 19201,
    travel_mode: 2,
    is_sheltered: true,
    best_route: [123123, 123123]
}

const testComputedRouteWithoutEnd = {
    _id: "3",
    end_node_index: 19201,
    travel_mode: 2,
    is_sheltered: true,
    best_route: [123123, 123123]
}

const testComputedRouteWithoutTravelMode = {
    _id: "4",
    start_node_index: 10291,
    end_node_index: 19201,
    is_sheltered: true,
    best_route: [123123, 123123]
}

const testComputedRouteWithoutShelterOption = {
    _id: "5",
    start_node_index: 10291,
    end_node_index: 19201,
    travel_mode: 2,
    best_route: [123123, 123123]
}