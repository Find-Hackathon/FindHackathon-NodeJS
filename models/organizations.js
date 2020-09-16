const mongoose = require('mongoose');
const {
    subscribe
} = require('../routes');
const Schema = mongoose.Schema;

const OrganizationsSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    attendees: [{
        subscribe: {
            type: String,
        },
    }]

});

module.exports = mongoose.model('organizations', OrganizationsSchema);