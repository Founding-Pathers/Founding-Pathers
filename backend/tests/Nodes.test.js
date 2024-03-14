const mongoose = require('mongoose');

const dbFunction = require('./dbFunctionality');

const nodesModel = require('../models/Nodes');

beforeAll(async () => await dbFunction.connect());

afterEach(async () => await dbFunction.clearDatabase());

afterAll(async () => await dbFunction.closeDatabase());

describe('nodes', () => {
    it('returns null if id not found', async () => {
    await expect(nodesModel.findOne(mongoose.Types.ObjectId()))
        .resolves
        .toBeNull();
    });
    
    
    it('can be retrieved correctly', async () => {
        await expect( () => {
            let idQuery = { _id: "93102" };
            const nodeFound = nodesModel.findOne(idQuery);

            expect(nodeFound.id).toBe(nodeId);
            expect(nodeFound.start_node_index).toBe(newNodeInfo.start_node_index)
            expect(nodeFound.end_node_index).toBe(newNodeInfo.end_node_index)
        });
    });
});

const newNodeInfo = {
    _id : "93102",
    start_node_index: 90123,
    end_node_index: 12309,
    distance: 1000
}