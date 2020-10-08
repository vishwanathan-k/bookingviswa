import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Event } from "../entity/Event";
var fs = require("file-system");
export class EventController {
  private eventRepository = getRepository(Event);

  // Event List
  async all(request: Request, response: Response, next: NextFunction) {
    try {
      let eventList = await this.eventRepository.find();
      let resData = {
        _isScuuess: true,
        statusCode: 200,
        message: "success",
        data: eventList,
      };
      return resData;
    } catch (error) {
      return error;
    }
  }

  // Get One Event
  async one(request: Request, response: Response, next: NextFunction) {
    try {
      let event = await this.eventRepository.findOne(request.params.id);
      let resData = {
        _isScuuess: true,
        statusCode: 200,
        message: "success",
        data: event,
      };
      return resData;
    } catch (error) {
      return error;
    }
  }

  // Event Add
  async save(request: Request, response: Response, next: NextFunction) {
    try {
      let file_path =
        "D:/Task/Event-Booking-Application/event-booking-application-Backend/public/img-event.png";
      let data = fs.readFileSync(file_path);
      let encodedImage = new Buffer(data, "binary").toString("base64");
      let eventObj = {
        name: request.body.name,
        date: request.body.date,
        numberOfSeats: request.body.numberOfSeats,
        eventCreater: request.body.eventCreater,
        eventImage: encodedImage,
      };
      this.eventRepository.save(eventObj);
      let resData = {
        _isScuuess: true,
        statusCode: 200,
        message: "success",
      };
      return resData;
    } catch (error) {
      return error;
    }
  }

  // Update Event
  async updateEvent(request: Request, response: Response, next: NextFunction) {
    try {
      let file_path =
        "D:/Task/Event-Booking-Application/event-booking-application-Backend/public/img-event.png";
      let data = fs.readFileSync(file_path);
      let encodedImage = new Buffer(data, "binary").toString("base64");
      let eventObj = {
        name: request.body.name,
        date: request.body.date,
        numberOfSeats: request.body.numberOfSeats,
        eventCreater: request.body.eventCreater,
        eventImage: encodedImage,
      };
      this.eventRepository.update({ id: request.params.id }, eventObj);
      let updatedUser = await this.eventRepository.findOne(request.params.id);
      let resData = {
        _isScuuess: true,
        statusCode: 200,
        message: "success",
        data: updatedUser,
      };
      return resData;
    } catch (error) {
      return error;
    }
  }
}
