const expressFramework = require("express");
const secureHash = require("bcrypt");
const jwtToken = require("jsonwebtoken");

const UserSchema = require("../models/User");

const route = expressFramework.Router();

const numberOfSaltRounds = 10;

const secretKey = process.env.JWT_PRIVATE_KEY;

route.use((req, resp, proceed) => {
    secureHash.genSalt(numberOfSaltRounds, (saltError, salt) => {
        secureHash.hash(req.body.password, salt, (hashError, hashed) => {
            req.securePassword = hashed;
            proceed();
        });
    });
});

route.post("/login", async (req, resp) => {
    const { username, password } = req.body;
    if (username && password) {
        const account = await UserSchema.findOne({ username }).exec();
        if (account) {
            const match = await secureHash.compare(password, account.password);
            if (match) {
                const sessionToken = jwtToken.sign({ id: account._id }, secretKey, { algorithm: "RS256" });
                return resp.status(200).json({ username: account.username, token: sessionToken });
            } 
            return resp.status(401).json({ error: "Credentials are incorrect" });
        }
    } 
    return resp.status(400).json({ error: "Missing credentials" });
});

route.post("/register", async (req, resp) => {
    const { username, password, passwordConfirmation } = req.body;
    if (username && password && passwordConfirmation && password === passwordConfirmation) {
        const newUser = new UserSchema({ username, password: req.securePassword });
        try {
            const savedAccount = await newUser.save();
            const sessionToken = jwtToken.sign({ id: newUser._id }, secretKey, { algorithm: "RS256" });
            return resp.status(201).json({ userId: savedAccount._id, username: savedAccount.username, token: sessionToken });
        } catch (saveError) {
            return resp.status(500).json({ error: "An error occurred during registration." });
        }
    } else {
        return resp.status(400).json({ error: "Password mismatch or missing data" });
    }
});

module.exports = route;
