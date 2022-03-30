"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
const CONNECTION_URL = "mongodb://localhost:27017/tododb";
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api', routes_1.todoRoutes);
app.use('/api', routes_1.userRoutes);
mongoose_1.default.connect(CONNECTION_URL).then(() => app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)));
