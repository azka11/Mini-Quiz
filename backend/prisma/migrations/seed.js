// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient();

// const seedData = async () => {
//   try {

//     //Seeding Category
//     const category = await prisma.category.createMany({
//       data: [
//         {
//           admin_id: 1,
//           category_name: "Javascript"
//         },
//         {
//           admin_id: 1,
//           category_name: "HTML"
//         },
//         {
//           admin_id: 1,
//           category_name: "CSS"
//         },
//       ],
//     });

//     //Seeding Question
//     const question = await prisma.question.createMany({
//       data: [
//         {
//           admin_id: 1,
//           category_id:1,
//           question_text: "Manakah pernyataan yang benar pada javascript?",
//           correct_answer: "Javascript adalah sebuah bahasa pemrograman"
//         },
//         {
//           admin_id: 1,
//           category_id: 1,
//           question_text: "Berikut adalah framework javascript...",
//           correct_answer: "React JS"
//         },
//         {
//           admin_id: 1,
//           category_id: 1,
//           question_text: "Ciri-ciri pemakaian Component pada javascript adalah ...",
//           correct_answer: "Reusable"
//         },
//         {
//           admin_id: 1,
//           category_id:1,
//           question_text: "Tipe data java script termasuk tipe...",
//           correct_answer: "Dynamic data type"
//         },
//         {
//           admin_id: 1,
//           category_id:1,
//           question_text: "Apakah satu variabel yang sudah memiliki nilai number dapat di isi dengan nilai string?",
//           correct_answer: "Bisa"
//         },
//         {
//           admin_id: 1,
//           category_id:1,
//           question_text: "Cara penulisan variabel yang benar....",
//           correct_answer: "$nilai satu"
//         },
//         {
//           admin_id: 1,
//           category_id:1,
//           question_text: "Konsep stack adalah...",
//           correct_answer: "LIFO"
//         },
//         {
//           admin_id: 1,
//           category_id:1,
//           question_text: "Operator aritmatika untuk pangkat menggunakan...",
//           correct_answer: "**"
//         },
//         {
//           admin_id: 1,
//           category_id:1,
//           question_text: "Operator aritmatika untuk modulus menggunakan...",
//           correct_answer: "%"
//         },
//         {
//           admin_id: 1,
//           category_id:1,
//           question_text: "Output dari (3 > 3) and (3 < 1) pada javascript adalah...",
//           correct_answer: "ERROR"
//         },
//       ],
//     });

//     //Seeding Multiple Choice
//     const multipleChoice = await prisma.multipleChoice.createMany({
//       data: [
//         { admin_id: 1, question_id: 1, choice_answer: "bukan yang ini" },
//         { admin_id: 1, question_id: 1, choice_answer: "bukan juga yang ini" },
//         { admin_id: 1, question_id: 1, choice_answer: "Javascript adalah sebuah bahasa pemrograman" },
//         { admin_id: 1, question_id: 1, choice_answer: "Jawaban nya yg C ya ges" },
//         { admin_id: 1, question_id: 2, choice_answer: "React JS" },
//         { admin_id: 1, question_id: 2, choice_answer: "Bukan Yang Ini Guys" },
//         { admin_id: 1, question_id: 2, choice_answer: "Yang ini ngawur" },
//         { admin_id: 1, question_id: 2, choice_answer: "Yang A Bener Tuh" },
//         { admin_id: 1, question_id: 3, choice_answer: "Bukan yang ini" },
//         { admin_id: 1, question_id: 3, choice_answer: "Ini juga bukan weh" },
//         { admin_id: 1, question_id: 3, choice_answer: "Reusable" },
//         { admin_id: 1, question_id: 3, choice_answer: "Diatas gua bener nih" },
//       ],
//     });


//     console.log("Seeding complete.");
//   } catch (error) {
//     console.error("Error seeding data:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// };

// seedData()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });
