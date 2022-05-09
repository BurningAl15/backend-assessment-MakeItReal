const { Schema, model } = require("mongoose");

const FavSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  items: [
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        default: "",
        trim: true,
        maxLength: 255,
      },
      link: {
        type: String,
        required: true,
      },
    },
  ],
});

FavSchema.methods.toJSON = function () {
  const { __v, ...data } = this.toObject();
  return data;
};

module.exports = model("Fav", FavSchema);
