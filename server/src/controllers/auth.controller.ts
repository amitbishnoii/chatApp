import type { Request, Response } from "express";

export const LoginUser = (req: Request, res: Response) => {
    if (req.body.username === "avrit") {
        console.log("logging in...");
        res.status(200).send({ message: "login success" });
    } else {
        res.status(404).send({ message: "you are not avrit" });
    }
};
