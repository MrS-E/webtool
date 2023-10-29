import { PrismaClient } from "@prisma/client";
import { sha512} from "js-sha512";
import bcrypt  from "bcryptjs";

const db = new PrismaClient();


async function seed()  {
  await Promise.all([
      ...await getUsers().then(res => res.map((user) => db.user.create({ data: user }))),
      ...getModules().map(module=> db.module.create({data: module}))
    ]
  );
}

seed();

async function getUsers() {
  return [
    {
      firstname: "Hans",
      lastname: "Meier",
      email: "hans.meier@gmail.com",
      auth: await generateHash("Passwort1234")
    },
    {
      firstname: "a",
      lastname: "k",
      email: "a.k@gmail.co",
      auth: await generateHash("123")
    }
  ]
}

function getModules(){
  return[
    {
      module_number: 1,
      module_name: "Password Manager"
    }
  ]
}

function generateHash(password: string)  {
  return Promise.resolve(bcrypt
    .hash(sha512(password), 10)
    .then(hash=>hash))
}