const mongoose = require('mongoose');

const dbFunction = require('./dbFunctionality');

const routeFeedbackModel = require('../models/RouteFeedback');

beforeAll(async () => await dbFunction.connect());

afterEach(async () => await dbFunction.clearDatabase());

afterAll(async () => await dbFunction.closeDatabase());

describe('route feedback', () => {
    it('can be created properly', async () => {
        await expect(async () => {
            await routeFeedbackModel.create(testRouteFeedBack);
        })
        .not
        .toThrow();
    });
    
    it('cannot be created without overall_exp', async () => {
        await expect(async () => {
            await routeFeedbackModel.create(testRouteFeedBackWithoutOverall);
        })
        .rejects
        .toThrow(mongoose.Error.ValidationError);
    })

    it('cannot be created without general_comments', async () => {
        await expect(async () => {
            await routeFeedbackModel.create(testRouteFeedBackWithoutComments);
        })
        .rejects
        .toThrow(mongoose.Error.ValidationError);
    })

    it('cannot be created with wrong general_comments type', async () => {
        await expect(async () => {
            await routeFeedbackModel.create(testRouteFeedBackWithIncorrectType);
        })
        .rejects
        .toThrow(mongoose.Error.ValidationError);
    })
});

const testRouteFeedBack = {
    _id: "testID1",
    overall_exp: 4,
    created_at:  new Date(),
    email: "testing@example.com",
    general_comments: "test123",
    previous_use: true,
    faster_path: true,
    more_suited: true,
    reasons: "test123",
}

const testRouteFeedBackWithoutOverall = {
    _id: "testID2",
    created_at:  new Date(),
    email: "testing@example.com",
    general_comments: "test123",
    previous_use: true,
    faster_path: true,
    more_suited: true,
    reasons: "test123",
}

const testRouteFeedBackWithoutComments = {
    _id: "testID3",
    created_at:  new Date(),
    email: "testing@example.com",
    overall_exp: 4,
    previous_use: true,
    faster_path: true,
    more_suited: true,
    reasons: "test123",
}

const testRouteFeedBackWithIncorrectType = {
    _id: "testID4",
    overall_exp: 4,
    email: "testing@example.com",
    general_comments: [123],
    previous_use: true,
    faster_path: true,
    more_suited: true,
    reasons: "test123",
}