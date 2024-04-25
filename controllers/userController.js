import { User } from "../models/userModel.js";
import { validateEmail, validateLength } from "../utils/validation.js";
import { generateToken } from "../utils/generateToken.js";

//Register new users
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!validateEmail(email)) {
      res.status(400);
      throw new Error("Invalid email address");
    }
    const emailExist = User.findOne({ email });
    if (emailExist) {
      res.status(400);
      throw new Error("Account Already Exist");
    }

    if (!validateLength(password, 6, 15)) {
      res.status(400);
      throw new Error("Password should be atleast 6 characters");
    }

    if ((name, email, password)) {
      const user = User.create({
        name,
        email,
        password,
      });
      generateToken(res, user._id);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error happen");
  }
};

//User login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401);
      throw new Error("Account not Exist");
    }

    const check = await checkPassword(password);

    if (check) {
      generateToken(res, user._id);
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401);
      throw new Error("Invalid Password");
    }
  } catch (error) {
    console.log(error);
    throw new Error("login Error");
  }
};

//logout User
const logoutUser = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "Logged Out Successfully",
  });
};
export { registerUser, loginUser };
