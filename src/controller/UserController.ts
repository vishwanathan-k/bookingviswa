import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
var jwt = require("jsonwebtoken");

export class UserController {
  private userRepository = getRepository(User);

  // User login
  async login(request: Request, response: Response, next: NextFunction) {
    try {
      let users = await this.userRepository.findOne({
        email: request.body.email,
      });
      const token = jwt.sign({ foo: users }, "eventBookingApp");
      if (users) {
        const password = jwt.verify(users.password, "eventBookingApp");
        if (password.foo === request.body.password) {
          let resData = {
            _isScuuess: true,
            statusCode: 200,
            message: "success",
            data: token,
          };
          return resData;
        } else {
          let resData = {
            _isScuuess: true,
            statusCode: 403,
            message: "Password does not exist.",
            data: {},
          };
          return resData;
        }
      } else {
        let resData = {
          _isScuuess: true,
          statusCode: 204,
          message: "User does not exist.",
          data: {},
        };
        return resData;
      }
    } catch (error) {
      return error;
    }
  }

  // User List
  async all(request: Request, response: Response, next: NextFunction) {
    try {
      let users = await this.userRepository.find();
      let resData = {
        _isScuuess: true,
        statusCode: 200,
        message: "success",
        data: users,
      };
      return resData;
    } catch (error) {
      return error;
    }
  }

  // Get One User
  async one(request: Request, response: Response, next: NextFunction) {
    try {
      let userData = await this.userRepository.findOne(request.params.id);
      let resData = {
        _isScuuess: true,
        statusCode: 200,
        data: userData,
        message: "success",
      };
      return resData;
    } catch (error) {
      return error;
    }
  }

  // Add User
  async save(request: Request, response: Response, next: NextFunction) {
    try {
      const password = jwt.sign({ foo: "password" }, "eventBookingApp");
      let userObj = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: password,
        age: request.body.age,
      };
      let user = this.userRepository.save(userObj);
      let resData = {
        _isScuuess: true,
        statusCode: 200,
        message: "User  has been added.",
      };
      return resData;
    } catch (error) {
      return error;
    }
  }

  // Update User
  async userUpdate(request: Request, response: Response, next: NextFunction) {
    try {
      let userObj = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        age: request.body.age,
      };
      this.userRepository.update({ id: request.params.id }, userObj);
      let updatedUser = await this.userRepository.findOne(request.params.id);
      return {
        _isSuccess: true,
        message: "User has been updated.",
        data: updatedUser,
        statusCode: 200,
      };
    } catch (err) {
      return err;
    }
  }
}
