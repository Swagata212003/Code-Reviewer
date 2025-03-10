// const express = require('express');
// const aiRoutes = require('./routes/ai.routes')
// const cors = require('cors');
// const app = express()

// app.use(cors());




// app.use(express.json())
// app.get('/', (req,res) =>{
//     res.send('Hello World')
// })

// app.use('/ai',aiRoutes)

// module.exports = app


const express = require("express");
const aiRoutes = require("./routes/ai.routes");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/ai", aiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
