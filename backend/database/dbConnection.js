// import mongoose from "mongoose";

// export const dbConnection = () => {
//   mongoose
//     .connect(process.env.MONGO_URI, {
//       dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM",
//     })
//     .then(() => {
//       console.log("Connected to database!");
//     })
//     .catch((err) => {
//       console.log("Some error occured while connecting to database:", err);
//     });
// };
import mongoose from "mongoose";

export const dbConnection = () => {
  const mongoUri = process.env.MONGO_URI; // Accessing the environment variable

  // Check if mongoUri is defined
  if (!mongoUri) {
    console.error("MONGO_URI is not defined in environment variables.");
    process.exit(1); // Exit the process if MONGO_URI is not defined
  }

  mongoose
    .connect(mongoUri, {
      dbName: "MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM",
    })
    .then(() => {
      console.log("Connected to database!");
    })
    .catch((err) => {
      console.error("Some error occurred while connecting to database:", err);
    });
};
