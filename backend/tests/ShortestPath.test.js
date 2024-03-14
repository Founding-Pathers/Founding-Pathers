const mongoose = require('mongoose');

const dbFunction = require('./dbFunctionality');

const shortestRouteModel = require('../models/ShortestPath');

beforeAll(async () => await dbFunction.connect());

afterEach(async () => await dbFunction.clearDatabase());

afterAll(async () => await dbFunction.closeDatabase());

describe('shortest route', () => {
    it('can be created properly', async () => {
        await expect(async () => {
            await shortestRouteModel.create(testShortestRouteData);
        })
        .not
        .toThrow();
    });
    
    it('cannot be created without type', async () => {
        await expect(async () => {
            await shortestRouteModel.create(testShortestRouteDataWithoutType);
        })
        .rejects
        .toThrow(mongoose.Error.ValidationError);
    })

    it('cannot be created without geometry', async () => {
        await expect(async () => {
            await shortestRouteModel.create(testShortestRouteDataWithoutGeometry);
        })
        .rejects
        .toThrow(mongoose.Error.ValidationError);
    })

    it('cannot be created with wrong geometry type', async () => {
        await expect(async () => {
            await shortestRouteModel.create(testShortestRouteDataWrongGeometry);
        })
        .rejects
        .toThrow(mongoose.Error.ValidationError);
    })
});

const testShortestRouteData = {
    _id: 12345,
    type: "testType",
    properties: null,
    geometry: {
        type: "Point",
        coordinates: [123123, 123123],
    }
}

const testShortestRouteDataWithoutType = {
    _id: 12345,
    properties: null,
    geometry: {
        type: "Point",
        coordinates: [123123, 123123],
    }
}

const testShortestRouteDataWithoutGeometry = {
    _id: 12345,
    type: "testType",
    properties: null,
}

const testShortestRouteDataWrongGeometry = {
    _id: 12345,
    properties: null,
    geometry: {
        type: "String",
        coordinates: [123123, 123123],
    }
}