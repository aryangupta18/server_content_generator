require("dotenv").config();
const axios = require("axios");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const History = require("../models/ContentHistory");

const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const apiController = asyncHandler(async (req, res) => {
    const { prompt } = req.body;
    try {
        const response = await ai.interactions.create({
            model: "gemini-3.5-flash-lite",
            input:
                "you are a helpful writing assistant that generates creative content. without any user interaction. you are going to help me generate content about " + prompt,
        });

        const content = response.output_text.trim();

        // * saving the generated content to the database
        const history = await History.create({
            user: req.user,
            content: content,
        });

        // * save the history to the user's history collection in the database
        const userFound = await User.findById(req.user)

        // * increase the apiRequestCount for the user
        userFound.apiRequestCount += 1;

        if (userFound) {
            userFound.history.push(history._id);
            await userFound.save();
        }

        res.json({ response: content });
        
    } catch (error) {
        res.status(500).json({
            message: error.message,
            stack: error.stack,
        });
    }
})

module.exports = apiController

//! TypeError: argument handler must be a function
// * because i did not export the apiController