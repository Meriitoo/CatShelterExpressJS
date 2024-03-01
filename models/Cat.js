const mongoose = require('mongoose');

const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    breed: {
        type: mongoose.Types.ObjectId,
        ref: 'Breed', 
        required: true,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
    },
    shelters: [{
        type: mongoose.Types.ObjectId,
        ref: 'User',      
    }],
});

const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;