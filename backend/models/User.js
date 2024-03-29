var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// Schema for users of app
const UserSchema = new Schema(
  {
    first_name: {
      type: String,
      // required: true,
    },
    last_name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      // required: true,
    },
  },
  {
    timestamps: true,
    collection: "userAccount",
  }
);
const User = mongoose.model("User", UserSchema);

// hash password before saving
// UserSchema.pre("save", function (next) {
//   var user = this;
//   if (!user.isModified("password")) return next();
//   bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
//     if (err) return next(err);
//     bcrypt.hash(user.password, salt, function (err, hash) {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });
// });

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

// get user by id from DB collection users

module.exports = User;
