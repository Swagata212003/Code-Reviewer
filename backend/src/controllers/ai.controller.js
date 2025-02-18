// const aiService = require("../services/ai.service")

// module.exports.getReview= async(req,res) =>{
//     const code = req.body.code;

//     if(!code) {
//         return res.status(400).send("Prompt is required");
//     }

//     const response = await aiService(code);

//     res.send(response);
// }


const generateContent = require("../services/ai.service");

module.exports.getReview = async (req, res) => {
    const code = req.body.code;

    if (!code) {
        return res.status(400).send("Code is required");
    }

    try {
        const response = await generateContent(code);
        res.send({ review: response });
    } catch (error) {
        res.status(500).send("Error generating review");
    }
};
