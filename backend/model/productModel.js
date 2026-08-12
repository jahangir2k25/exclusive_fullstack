const { Schema, model } = require("mongoose");

const productSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	category: {
		type: string,
		required: true
	},
	reviews: [
		{
			type: string,
			ref: "Review",
			trim: true
		}
	],
	stock: {
		type: Number,
		required: true,
		trim: true
	},
	colors: [
		{
			type: String,
			trim: true
		}
	],
	sizes: [
		{
			type: String,
			trim: true
		}
	],
	images: [
		{
			url: { type: String, required: true },
			isMain: Boolean,
			default: false
		}
	]
}, { timestamps: true })

// const User = Model("User", userSchema);

module.exports = model("Product", productSchema);
