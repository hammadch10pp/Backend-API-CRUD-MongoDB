const User = require("../models/userModels");

class UserController {
  // GET all users
  async getAllUsers(req, res, next) {
    try {
      const users = await User.find();

      res.json({
        success: true,
        data: users,
        count: users.length,
        message: "Users retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // GET single user by ID
  async getUserById(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          error: `User with ID ${id} not found`,
        });
      }

      res.json({
        success: true,
        data: user,
        message: "User retrieved successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // POST create new user
  async createUser(req, res, next) {
    try {
      const { name, email, age, role } = req.body;

      // Check if email already exists
      const existingUser = await User.findOne({
        email: email.toLowerCase(),
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          error: "Email already registered",
        });
      }

      const newUser = await User.create({
        name: name.trim(),
        email: email.toLowerCase(),
        age,
        role: role || "user",
      });

      res.status(201).json({
        success: true,
        data: newUser,
        message: "User created successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  // PUT update user
  async updateUser(req, res, next) {
  try {
    const { id } = req.params;
    const { name, email, age, role } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: `User with ID ${id} not found`,
      });
    }

    // Check duplicate email only if email is changed
    if (email && email.toLowerCase() !== user.email) {
      const existingUser = await User.findOne({
        email: email.toLowerCase(),
      });

      if (existingUser) {
        return res.status(409).json({
          success: false,
          error: "Email already registered",
        });
      }
    }

    user.name = name || user.name;
    user.email = email ? email.toLowerCase() : user.email;
    user.age = age || user.age;
    user.role = role || user.role;

    await user.save();

    res.json({
      success: true,
      data: user,
      message: "User updated successfully",
    });

  } catch (error) {
    next(error);
  }
}

  // DELETE user
  async deleteUser(req, res, next) {
    try {
      const { id } = req.params;

      const user = await User.findById(id);

      if (!user) {
        return res.status(404).json({
          success: false,
          error: `User with ID ${id} not found`,
        });
      }

      await User.findByIdAndDelete(id);

      res.json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();