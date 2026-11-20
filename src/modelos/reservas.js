const mongoose = require("mongoose");
//Mongo utiliza esquemas para definir la estructura de los documenntos en una colección

//definicion de un esquema para el modelo de la reserva
const reservaSchema = new mongoose.Schema(
  {
    estudiante: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      trim: true,
      match: [/@/, "Por favor ingresa un correo electrónico válido"],
    },
    sala: {
      type: String,
      enum: ["Sala Norte", "Sala Sur", "Sala Multimedia"],
    },
    fecha: { type: String, required: true, trim: true },
    turno: {
      type: String,
      enum: ["Mañana", "Tarde", "Noche"],
    },
    personas: {
      type: Number,
      required: true,
      min: 1,
      max: 6,
      validate: {
        validator: Number.isInteger,
        message: "La cantidad de personas debe ser entera.",
      },
    },
  },
  //Se especifica el nombre de la coleccion en la base de datos donde se almacenarán los documentos de  este modelo
  { collection: "reservas" },
);
//Define el nombre que se le asignará al modelo de Reserva basado en el esquema reservaSchema
const Reserva = mongoose.model("reserva", reservaSchema);

module.exports = { Reserva };
