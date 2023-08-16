const { isObjectIdOrHexString } = require('mongoose');
const mongoose = require('mongoose')

const Food = new mongoose.Schema(
	{  
		title: { type: String, required: true, unique: true },
		image: { type: String, required: true},
		content: { type: String},
		price: { type: Number, required: true },
		isPopular: { type: Boolean},
        type: { type: String, required: true }
	}
)

const FoodModel = mongoose.model('FoodData', Food, 'foods');

module.exports = FoodModel

