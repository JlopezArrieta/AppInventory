import app from "./app";

import * as dotenv from "dotenv";
dotenv.config();

const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});




