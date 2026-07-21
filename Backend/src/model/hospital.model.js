import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const hospitalSchema = new Schema({
    hospitalName: {
        type: String,
        required: true,
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    contactPerson: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["PENDING", "APPROVED", "REJECTED"],
        default: "PENDING"
    },
    bloodInventory: {
        type: Schema.Types.ObjectId,
        ref: 'BloodInventory'
    },
    donationRequest: {
        type: Schema.Types.ObjectId,
        ref: 'DonationRequest'
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true });

hospitalSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

hospitalSchema.methods.isPasswordcorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

hospitalSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
};

hospitalSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
};

export const Hospital = model("Hospital", hospitalSchema);
