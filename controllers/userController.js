import User_model from "../models/user.js";
import dcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

export function getUsers(req, res){
    res.send("Get all users");
};

export function saveUser(req, res){
    const { email, firstName, lastName, password, role } = req.body;

    if (!email || !firstName || !lastName || !password || !role) {
        return res.status(400).send("Missing required user fields.");
    }

    const hashedPassword = dcrypt.hashSync(password, 10);

    const user = new User_model({
        email,
        firstName,
        lastName,
        password: hashedPassword,
        role
    });

    user.save()
        .then(() => res.send("User saved successfully..."))
        .catch((err) => res.status(500).send("User not saved. " + err.message));
};

export function loginUser(req, res){
    console.log("LoginUser reached");
    console.log("Request body:", req.body);

    const email = req.body.email;
    const password = req.body.password;

    User_model.findOne({ email })
        .then((foundUser) => {
            if (!foundUser) return res.status(404).send("User not found...");
            if (dcrypt.compareSync(password, foundUser.password)) {
                const token = jsonwebtoken.sign({
                    email: foundUser.email,
                    firstName: foundUser.firstName,
                    lastName: foundUser.lastName,
                    role: foundUser.role,
                    img: foundUser.img
                }, "secretkey123");

                res.json({ message: "User logged in successfully...", token });
            } else {
                res.send("Incorrect password...");
            }
        })
        .catch((err) => res.status(500).send("Login failed: " + err.message));
};
