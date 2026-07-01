console.log("La URI es:", process.env.MONGO_URI);
require("dotenv").config();

const mongoose = require("mongoose");

const User = require("./src/models/User");
const Post = require('./src/models/Post');
const Comment = require('./src/models/Comment');
const Tag = require('./src/models/Tag');


async function seedDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        await Comment.deleteMany({});
        await Post.deleteMany({});
        await Tag.deleteMany({});
        await User.deleteMany({});

        //Users
        const userMartina = await User.create({
            fullName: "Martina",
            nickname: "martinam",
            email: "martina@ejemplo.com",
            password: "password1201",
            birthDate: "2001-01-12T00:00:00.000Z"
        });

        const userSanti = await User.create({
            fullName: "Santi",
            nickname: "santiago",
            email: "santiago@ejemplo.com",
            password: "password123",
            birthDate: "2004-06-12T00:00:00.000Z"
        });

        const userRo = await User.create({
            fullName: "Ro",
            nickname: "roalaniz",
            email: "ro@ejemplo.com",
            password: "contrasenia",
            birthDate: "2002-07-22T00:00:00.000Z"
        });

        const userEstefi = await User.create({
            fullName: "Estefi",
            nickname: "estefi",
            email: "estefi@ejemplo.com",
            password: "contrasenia24",
            birthDate: "1998-11-19T00:00:00.000Z"
        });

        // Tags
        const tagEstrategias = await Tag.create({
            name: "Estrategias"
        });

        const tagInterfaces = await Tag.create({
            name: "Interfaces"
        });

        // Posts
        const postSanti = await Post.create({
            description: "Terminando el setup del frontend en React para el TP de la facu.",
            user: userSanti._id,
            images: [{ url: "https://picsum.photos/id/0/800/600" }],
            tags: [tagInterfaces._id]
        });

        const postMartina = await Post.create({
            description: "Por fin metí los finales de Estructuras de Datos y Bases de Datos. Ahora a armar las valijas para viajar.",
            user: userMartina._id,
            images: [], // Este post no tiene imágenes
            tags: [tagEstrategias._id]
        });

        const postRo = await Post.create({
            description: "Probando la nueva arquitectura en Node. La separación de responsabilidades hace todo más fácil.",
            user: userRo._id,
            images: [{ url: "https://picsum.photos/id/1080/800/600" }],
            tags: [tagEstrategias._id]
        });

        // Comentarios
        await Comment.create({
            content: "¡Felicidades! Disfrutá mucho el viaje.",
            visible: true,
            user: userEstefi._id, // Comentario escrito por Estefi
            post: postMartina._id // En la publicación de Martina
        });

        await Comment.create({
            content: "Pasá el repo de GitHub cuando lo tengas andando.",
            visible: true,
            user: userRo._id,     // Comentario escrito por Ro
            post: postSanti._id   // En la publicación de Santi
        });

        console.log("Datos creados exitosamente en la base de datos.");

    } catch (error) {
        console.error("Error durante el seed:", error);
        process.exit(1);
    } finally {
        await mongoose.disconnect();
        console.log("Desconectado de MongoDB");
    }
}

seedDB();
