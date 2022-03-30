var mongoose = require("mongoose");
const crypto = require("crypto");
const { v4: uuidv4 } = require("uuid");

var userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      maxlength: 32,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      maxlength: 32,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    encry_password: {
      type: String,
      required: true,
    },
    salt: String,
    role: {
      type: Number,
      default: 2,
    },
  },
  { timestamps: true }
);

// PASSWORD CHECKING
userSchema
  .virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = uuidv4();
    this.encry_password = this.securePassword(password);
  })
  .get(function () {
    return this._password;
  });

// PASSWORD HASHING
userSchema.methods = {
  authenticate: function (mainpassword) {
    return this.securePassword(mainpassword) === this.encry_password;
  },
  securePassword: function (mainpassword) {
    if (!mainpassword) {
      return "";
    }
    try {
      return crypto
        .createHmac("sha256", this.salt)
        .update(mainpassword)
        .digest("hex");
    } catch (error) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema);
