import mongoose from "mongoose";


const contentSchema = new mongoose.Schema({
    heading: {
        type: Boolean,
        default: false,
    },
    paragraph: {
        type: Boolean,
        default: false,
    },
    image: {
        type: Boolean,
        default: false,
    },
    linebreak: {
        type: Boolean,
        default: false,
    },
    span: {
        type: Boolean,
        default: false,
    },
    bold: {
        type: Boolean,
        default: false,
    },
    italic: {
        type: Boolean,
        default: false,
    },
    underline: {
        type: Boolean,
        default: false,
    },
    text: {
        type: String,
    },
    url: {
        type: String,
    },
});

const historySchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
        },
        title: {
            type: String,
            default: false,
        },
        content: [contentSchema],
        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        blog_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        },
        medium_url: {
            type: String
        }
    },
    { timestamps: true }
);

const History = mongoose.model("History", historySchema);
export default History;
