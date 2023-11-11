import bcrypt from "bcryptjs";

const users = [
  {
    name: "admin",
    email: "admin@email.com",
    password: bcrypt.hashSync("password12345", 10),
    isAdmin: true,
  },
  {
    name: "mario",
    email: "mario@email.com",
    password: bcrypt.hashSync("password12345", 10),
    isAdmin: false,
  },
  {
    name: "peach",
    email: "peach@email.com",
    password: bcrypt.hashSync("password12345", 10),
    isAdmin: false,
  },
];

export default users;
