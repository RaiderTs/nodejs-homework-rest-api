const contacts = [
  {
    _id: "60548d4f0b01af0ee03c789g",
    name: "Max",
    email: "max@gmail.net",
    userId: "605482561aec3e0c8c1ea764",
  },
  {
    _id: "60548da90b01af0ee03c78a9",
    name: "Oleg",
    email: "oleg@gmail.net",
    userId: "605482561aec3e0c8c1ea764",
  },
];

const newContact = {
  name: "Alex",
  email: "alex@gmail.net",
  phone: "2323234567",
};

const User = {
  _id: "6060c99cc637d61e28363ae0",
  email: "alex.tsotsko21@gmail.com",
  password: "$2a$08$VfnWmi2JfmfJQo6kF9EJ7.5UFWQxsYfCcMfMH8DKp5chnjydWay6u",
  subscription: "free",
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwNjBjOTljYzYzN2Q2MWUyODM2M2FlMCIsImlhdCI6MTYxNjk1NTg4OSwiZXhwIjoxNjE2OTg0Njg5fQ.59JsKWJ6U45tZvJZOwPyrbxbj620QZKJinAESY1bprE",
  imgIdCloude: null,
  updatedAt: "2021-03-28T18:34:06.309Z",
  avatarURL:
    "https://res.cloudinary.com/dzzpi1562/image/upload/v1616956446/avatars/hj6nmtiqcte00hohdq1n.jpg",
};

const users = [];
users[0] = User;

const newUser = { email: "test@test.com", password: "123456" };

module.exports = { contacts, newContact, User, users, newUser };
