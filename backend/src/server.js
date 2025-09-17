import express from "express";
import catalogueRoutes from "./routes/catalogueRoutes.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import ratelimiter from "./middleware/rateLimiter.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 5001


app.use(express.json());

//app.use(ratelimiter)
app.use("/api/packages", ratelimiter, catalogueRoutes);

// app.use((req,res, next) => {
//     console.log(`New Package Request ${req.method} received & URI is ${req.url}`);
//     next();
// });

app.use("/api/packages", catalogueRoutes);

connectDB().then(()=>{
    app.listen(PORT,() =>{
        console.log("Server started on PORT: ",PORT);
    });
});


