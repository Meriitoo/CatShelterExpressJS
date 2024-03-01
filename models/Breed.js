
const mongoose = require('mongoose');

const breedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    }
});

const Breed = mongoose.model('Breed', breedSchema);

module.exports = Breed;
