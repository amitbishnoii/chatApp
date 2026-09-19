import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import config from "../config/envConfig.js";

export const LoginUser = (req: Request, res: Response) => {
    if (req.body.username === "avrit") {
        console.log("logging in...");
        res.status(200).send({ message: "login success" });
    } else {
        res.status(404).send({ message: "you are not avrit" });
    }
};

export const SignUpUser = async (req: Request, res: Response) => {
    try {
        const { username, password, firstName, lastName, birthday } = req.body;
        const exists = await User.findOne({ username: username });
        if (exists) {
            return res
                .status(409)
                .send({ message: "username taken!", success: false });
        }
        const encryptedPass = await bcrypt.hash(password, 12);
        const user = await User.create({
            username,
            password: encryptedPass,
            firstName,
            lastName,
            birthday,
        });

        if (!user) {
            return res
                .status(400)
                .send({ message: "Error creating User!", success: false });
        }

        const { password: passwd, ...userInfo } = user.toObject();

        const token = jwt.sign(
            { role: userInfo.role, id: userInfo._id },
            config.jwt_secret,
        );

        return res
            .status(201)
            .send({ message: "user created!", userInfo, success: true, token });
    } catch (error) {
        if (error instanceof Error && error.name === "ValidationError") {
            return res
                .status(400)
                .send({ message: error.message, success: false });
        } else if (error instanceof Error) {
            res.status(500).send({ message: error.message, success: false });
            return;
        } else {
            res.status(500).send({
                message: "Internal server Error!",
                success: false,
            });
        }
    }
};
