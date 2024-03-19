const mongoose = require('mongoose');

const dbFunction = require('./dbFunctionality');

const userPreferencesModel = require('../models/UserPref');

beforeAll(async () => await dbFunction.connect());

afterEach(async () => await dbFunction.clearDatabase());

afterAll(async () => await dbFunction.closeDatabase());

describe('log', () => {
    it('can be created properly', async () => {
        await expect(() => userPreferencesModel.create(newUserPref))
        .not
        .toThrow();
    })
})

const newUserPref = {
id: 'testId',
deleted: false,
wheelchair_friendly: false,
f_and_b: false,
is_sheltered: false,
tourist_attraction: false,
bus_stop: false,
mrt: false,
pickup_dropoff: false,
nature: false,
};