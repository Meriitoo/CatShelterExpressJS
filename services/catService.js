const User = require('../models/User');
const Cat = require('../models/Cat');

exports.create = (ownerId, catData) => {
    console.log("Received cat data:", catData);
    return Cat.create({ owner: ownerId, ...catData });
};

exports.getAll = async () => {
    try {
        // Query all cats and populate the breed field with the actual breed name
        return await Cat.find({}).populate('breed', 'name').lean();
    } catch (error) {
        throw new Error('Error fetching cats');
    }
};


exports.getOne = (catId) => Cat.findById(catId).lean();

exports.edit = (catId, catData) => Cat.findByIdAndUpdate(catId, catData, { runValidators: true });

exports.shelter = async (userId, catId) => {
    const cat = await Cat.findById(catId);
    cat.shelters.push(userId);

    return await cat.save();

}

exports.delete = (catId) => Cat.findByIdAndDelete(catId);

exports.search = async (name) => {
    let cat = await this.getAll();

    if (name){
        cat = cat.filter(x => x.name.toLowerCase() == name.toLowerCase());
    }

    return cat;
};



