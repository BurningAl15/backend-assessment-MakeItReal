/* eslint-disable no-underscore-dangle */
const { response, request } = require("express");

const Fav = require("../models/fav");

const favsShowAll = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const userId = req.user._id;
  const query = { user: userId };

  const [total, user] = await Promise.all([
    Fav.countDocuments(query),
    Fav.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    user,
  });
};

const favShowById = async (req = request, res = response) => {
  const { id } = req.params;
  const userId = req.user._id;
  const query = { user: userId, id };

  const fav = await Fav.findOne(query);

  res.json(fav);
};

const favsCreate = async (req, res = response) => {
  const { name, items } = req.body;
  const data = {
    name,
    items,
    user: req.user._id,
  };
  const fav = new Fav(data);

  // Save on DB
  await fav.save();
  res.json({
    fav,
  });
};

const favsDelete = async (req, res = response) => {
  const { id } = req.params;
  const userId = req.user._id;
  await Fav.findOneAndDelete({ id, user: userId });

  res.json({ msg: "Fav successfully deleted!" });
};
module.exports = {
  favShowById,
  favsShowAll,
  favsCreate,
  favsDelete,
};
