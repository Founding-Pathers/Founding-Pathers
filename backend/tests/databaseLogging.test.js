const mongoose = require('mongoose');

const dbFunction = require('./dbFunctionality');

const LoggingModel = require('../models/DatabaseLogging');

beforeAll(async () => await dbFunction.connect());

afterEach(async () => await dbFunction.clearDatabase());

afterAll(async () => await dbFunction.closeDatabase());

describe('log', () => {
    it('can be created properly', () => {
        expect( () => {
            LoggingModel.create(testLog);
        })
        .not
        .toThrow();
    });

});

const testLog = {
    _id: "12345",
    file_name: "test.csv",
    createdAt: 'createdAt'
}