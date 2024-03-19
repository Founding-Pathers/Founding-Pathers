const mongoose = require('mongoose');

const dbFunction = require('./dbFunctionality');

const userModel = require('../models/User');

beforeAll(async () => await dbFunction.connect());

beforeEach(async () => await createUser());

afterEach(async () => await dbFunction.clearDatabase());

afterAll(async () => await dbFunction.closeDatabase());

describe('user', () => {
        it('returns null if unknown', async () => {
            await expect(userModel.findOne(mongoose.Types.ObjectId()))
            .resolves
            .toBeNull();
        })

        it('retrieves correct user if Id found', async () => {
            let idQuery = { _id: userId };
            const user = await userModel.findOne(idQuery);
    
            expect(user.id).toBe(userId);
            expect(user.first_name).toBe(newUserInfo.first_name);
        });
});

const createUser = async () => {
    const createdUser = await userModel.create(newUserInfo);
    userId = createdUser.id;
}

let userId;

const newUserInfo = {
    first_name: 'Testing',
    last_name: 'Bot',
    email: 'TestBot@test.com',
    password: 'Test123'
}


