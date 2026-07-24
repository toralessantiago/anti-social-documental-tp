console.log("La URI es:", process.env.MONGO_URI);
require("dotenv").config();

const mongoose = require("mongoose");

const User = require("./src/models/User");
const Post = require("./src/models/Post");
const Comment = require("./src/models/Comment");
const Tag = require("./src/models/Tag");

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Comment.deleteMany({});
    await Post.deleteMany({});
    await Tag.deleteMany({});
    await User.deleteMany({});

    //Users
    const userMartina = await User.create({
      fullname: "Martina",
      nickname: "martinam",
      email: "martina@ejemplo.com",
      password: "password1201",
      birthDate: "2001-01-12",
      bio: "Probando123",
      location: "Argentina",
    });

    const userSanti = await User.create({
      fullname: "Santi",
      nickname: "santiago",
      email: "santiago@ejemplo.com",
      password: "password123",
      birthDate: "2004-06-12",
      bio: "Probando123",
      location: "Argentina",
    });

    const userRo = await User.create({
      fullname: "Ro",
      nickname: "roalaniz",
      email: "ro@ejemplo.com",
      password: "contrasenia",
      birthDate: "2002-07-22",
      bio: "Probando123",
      location: "Argentina",
    });

    const userEstefi = await User.create({
      fullname: "Estefi",
      nickname: "estefi",
      email: "estefi@ejemplo.com",
      password: "contrasenia24",
      birthDate: "1998-11-19",
      bio: "Probando123",
      location: "Argentina",
    });

    // Nuevos usuarios

    const userCarlos = await User.create({
      fullname: "Carlos Pérez",
      nickname: "carlostech",
      email: "carlos@gmail.com",
      password: "password123",
      birthDate: "1998-09-14",
      bio: "Programador Full Stack",
      location: "Córdoba",
    });

    const userAna = await User.create({
      fullname: "Ana López",
      nickname: "anaviajera",
      email: "ana@gmail.com",
      password: "password123",
      birthDate: "2000-05-20",
      bio: "Viajar es vivir",
      location: "Mendoza",
    });

    const userMatias = await User.create({
      fullname: "Matías Ruiz",
      nickname: "mati_fit",
      email: "matias@gmail.com",
      password: "password123",
      birthDate: "1997-08-11",
      bio: "Entrenando todos los días",
      location: "Rosario",
    });

    const userVale = await User.create({
      fullname: "Valentina Díaz",
      nickname: "valefood",
      email: "vale@gmail.com",
      password: "password123",
      birthDate: "2001-12-01",
      bio: "Fanática de la cocina",
      location: "La Plata",
    });

    // Tags

    const tagEstrategias = await Tag.create({ name: "Estrategias" });
    const tagInterfaces = await Tag.create({ name: "Interfaces" });
    const tagJavaScript = await Tag.create({ name: "JavaScript" });
    const tagViajes = await Tag.create({ name: "Viajes" });
    const tagFitness = await Tag.create({ name: "Fitness" });
    const tagRecetas = await Tag.create({ name: "Recetas" });

    // Posts
    // ======================
    // POSTS
    // ======================

    const postSanti = await Post.create({
      description:
        "Terminando el setup del frontend en React para el TP de la facu.",
      user: userSanti._id,
      images: [{ url: "https://picsum.photos/id/0/800/600" }],
      tags: [tagInterfaces._id],
    });

    const postMartina = await Post.create({
      description:
        "Por fin metí los finales de Estructuras de Datos y Bases de Datos.",
      user: userMartina._id,
      images: [],
      tags: [tagEstrategias._id],
    });

    const postRo = await Post.create({
      description: "Probando la nueva arquitectura en Node.",
      user: userRo._id,
      images: [{ url: "https://picsum.photos/id/1080/800/600" }],
      tags: [tagEstrategias._id],
    });

    const postCarlos = await Post.create({
      description: "Hoy aprendí a usar populate en Mongoose.",
      user: userCarlos._id,
      images: [{ url: "https://picsum.photos/id/180/800/600" }],
      tags: [tagJavaScript._id],
    });

    const postAna = await Post.create({
      description: "Primer día de vacaciones en Brasil.",
      user: userAna._id,
      images: [{ url: "https://picsum.photos/id/1015/800/600" }],
      tags: [tagViajes._id],
    });

    const postMatias = await Post.create({
      description: "Nuevo récord en press de banca.",
      user: userMatias._id,
      images: [{ url: "https://picsum.photos/id/433/800/600" }],
      tags: [tagFitness._id],
    });

    const postVale = await Post.create({
      description: "Preparé una pizza casera espectacular.",
      user: userVale._id,
      images: [{ url: "https://picsum.photos/id/292/800/600" }],
      tags: [tagRecetas._id],
    });

   // ======================
// COMMENTS
// ======================

await Comment.create({
  content: "¡Felicidades! Disfrutá mucho el viaje.",
  visible: true,
  user: userEstefi._id,
  post: postMartina._id,
});

await Comment.create({
  content: "Pasá el repo de GitHub cuando lo tengas andando.",
  visible: true,
  user: userRo._id,
  post: postSanti._id,
});

await Comment.create({
  content: "Muy buena explicación.",
  visible: true,
  user: userCarlos._id,
  post: postRo._id,
});

await Comment.create({
  content: "¡Qué linda vista!",
  visible: true,
  user: userMartina._id,
  post: postAna._id,
});

await Comment.create({
  content: "Esa pizza tiene una pinta increíble.",
  visible: true,
  user: userSanti._id,
  post: postVale._id,
});

await Comment.create({
  content: "Felicitaciones por el nuevo récord.",
  visible: true,
  user: userAna._id,
  post: postMatias._id,
});

console.log("Datos creados exitosamente en la base de datos.");

} catch (error) {
  console.error("Error durante el seed:", error);
  process.exit(1);
}

}

seedDB();