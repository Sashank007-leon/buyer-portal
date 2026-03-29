import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import favouriteRoutes from './routes/favourite.routes';
import propertyRoutes from './routes/property.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/favourites", favouriteRoutes);
app.use("/api/properties", propertyRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});