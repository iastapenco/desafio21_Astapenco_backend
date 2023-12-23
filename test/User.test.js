import mongoose from "mongoose";
import { userModel } from "../src/dao/models/users.models.js";
import Assert from "assert";
import "dotenv/config";

const assert = Assert.strict;

await mongoose.connect(process.env.MONGO_URL);

describe("Test CRUD de Usuarios en la ruta /api/users", function () {
  before(() => {
    console.log("Arrancando el test");
  });

  beforeEach(() => {
    console.log("Comienza test");
  });

  it("Obtener todos los usuarios mediante método GET", async () => {
    const users = await userModel.find();

    assert.strictEqual(Array.isArray(users), true);
  });

  it("Obtener un usuario mediante método GET", async () => {
    const user = await userModel.findById("65749f983e63b75a474da063");

    assert.ok(user._id);
  });

  it("Crear un usuario mediante método POST", async () => {
    const newUser = {
      first_name: "Luisito",
      last_name: "Brocco",
      age: 62,
      email: "luisito@luisito.com",
      password: "Luisito9561",
    };

    const user = await userModel.create(newUser);

    assert.ok(user._id);
  });

  it("Actualizar un usuario mediante método PUT", async () => {
    const updateUser = {
      email: "fede@fede.com",
      password: "Fede356",
      age: 29,
      first_name: "Federico",
      last_name: "Brocco",
    };

    const user = await userModel.findByIdAndUpdate(
      "6546dd5316ff9eb31f091357",
      updateUser
    );

    assert.ok(user._id);
  });

  it("Eliminar un usuario mediante método DELETE", async () => {
    const resultado = await userModel.findByIdAndDelete(
      "6586f89e1fcd09d5594bcb43"
    );

    assert.strictEqual(typeof resultado, "object");
  });
});
