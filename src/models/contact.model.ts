import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    institueName: {
        type: String,
        require: true
    },
    query: {
        type: String,
        require: true
    }
});

const Contact = mongoose.model("Contact", contactSchema);
export default Contact;