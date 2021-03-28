const { users } = require("./data");
const bcrypt = require("bcryptjs");

const findByEmail = jest.fn((email) => {
  const [user] = users.filter((el) => String(el.email) === String(email));
  return user;
});

const findById = jest.fn((id) => {
  const [user] = users.filter((el) => String(el._id) === String(id));
  return user;
});

const create = jest.fn(({ email, password, subscription = "free" }) => {
  const pass = bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  const newUser = {
    email,
    password: pass,
    _id: "605482561aec3e0c8c1ea764",
    subscription,
    validPassword: function (pass) {
      return bcrypt.compareSync(pass, this.password);
    },
  };
  users.push(newUser);
  return newUser;
});

const updateToken = jest.fn((id, token) => {
  return {};
});

const updateAvatar = jest.fn((id, avatarURL, imgIdCloud) => {
  return {};
});

module.exports = {
  findByEmail,
  findById,
  create,
  updateToken,
  updateAvatar,
};
