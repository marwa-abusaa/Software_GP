const db = require('../config/db');
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: [true, "Email can't be empty"],
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Email format is not correct",
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    firstName: {
        type: String,
        required: [true, "First name is required"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'], // You can adjust this to your needs
        required: [true, "Gender is required"],
    },
    birthdate: {
        type: Date,
        required: [true, "Birthdate is required"],
    },
    role:{
        type: String,
        //supervisor
        enum: ['user', 'supervisor','admin'], // You can adjust this to your needs
        required: [true, "role is required"],
    }

}, { timestamps: true });

// Encrypt password before saving
userSchema.pre("save", async function() {
    var user = this;
    if (!user.isModified("password")) {
        return;
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    } catch (err) {
        throw err;
    }
});

// Used while signing in to decrypt
userSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        console.log('----------------password:', this.password);
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
};

const UserModel = db.model('user', userSchema);
module.exports = UserModel;
