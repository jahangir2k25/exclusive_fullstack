const { Schema, model } = require("mongoose");

const productSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		required: true,
		trim: true,
	},
	review: {
		type: Number,
		required: true,
		min: 0,
		max: 5,
	},
	category: {
		type: String,
		trim: true,
		required: true,
	},
	stock: {
		type: Number,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	colours: [
		{
			type: String,
			trim: true,
		}
	],
	size: [
		{
			type: String,
			trim: true,
		}
	],
	images: [
		{
			url: { type: String, required: true },
			public_id: { type: String, required: false },
		}
	],
}, { timestamps: true });

module.exports = model("Product", productSchema);
