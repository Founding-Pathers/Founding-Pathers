const mongoose = require('mongoose');

const dbFunction = require('./dbFunctionality');

const userModel = require('../models/User');

beforeAll(async () => await dbFunction.connect());

afterEach(async () => await dbFunction.clearDatabase());

afterAll(async () => await dbFunction.closeDatabase());

describe('user', () => {
    it('can be created properly', async () => {
        await expect(async () => {
            await userModel.create(testNewUser);
        })
        .not
        .toThrow();
    });
    
    it('cannot be created without id', async () => {
        await expect(async () => {
            await userModel.create(testNewUserWithoutId);
        })
        .rejects
        .toThrow(mongoose.Error.ValidationError);
    })

    it('cannot be created without password', async () => {
        await expect(async () => {
            await userModel.create(testNewUserWithoutPass);
        })
        .rejects
        .toThrow(mongoose.Error.ValidationError);
    })
});

const testNewUser = {
    first_name: 'Testing',
    last_name: 'Bot',
    email: 'TestBot@test.com',
    password: 'Test123'
}

const testNewUserWithoutId = {
    first_name: 'Testing',
    last_name: 'Bot',
    password: 'Test123'
}

const testNewUserWithoutPass = {
    first_name: 'Testing',
    last_name: 'Bot',
    password: 'Test123'
}
