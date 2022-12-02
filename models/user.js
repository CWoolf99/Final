import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	user: { type: String, required: true },
	adress: { type: String, required: true },
	number: { type: String, required: true },
	age: { type: String, required: true },
	photo: { type: String, required: true }
});

export default mongoose.model('usersFinal', userSchema);