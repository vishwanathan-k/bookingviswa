import { Binary, getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Booking } from "../entity/Booking";
import { Event } from "../entity/Event";
var fs = require("file-system");
export class BookingController {
  private bookingRepository = getRepository(Booking);
  private eventRepository = getRepository(Event);

   // Booking List
  async all(request: Request, response: Response, next: NextFunction) {
    try {
      let bookingList = await this.bookingRepository.find();
      let resData = {
        _isScuuess: true,
        statusCode: 200,
        message: "success",
        data: bookingList,
      };
      return resData;
    } catch (error) {
      return error;
    }
  }

   // Get One Booking
  async one(request: Request, response: Response, next: NextFunction) {
    try {
      let bookingData = await this.bookingRepository.findOne(request.params.id);
      let resData = {
        _isScuuess: true,
        statusCode: 200,
        message: "success",
        data: bookingData,
      };
      return resData;
    } catch (error) {
      return error;
    }
  }

   // Add Booking
  async save(request: Request, response: Response, next: NextFunction) {
    try {
      let file_path =
        "D:/Task/Event-Booking-Application/event-booking-application-Backend/public/img-event.png";
      let data = fs.readFileSync(file_path);
      let encodedImage = new Buffer(data, "binary").toString("base64");
      var insert_data = {
        eventId: request.body.eventId,
        userId: request.body.userId,
        userImage: encodedImage,
        name: request.body.name,
        phoneNo: request.body.phoneNo,
        numberOfSeats: request.body.numberOfSeats,
        namerOfAttendee: request.body.namerOfAttendee,
        eventDate: request.body.eventDate,
      };
      this.bookingRepository.save(insert_data);
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

  // Update Booking
  async update(request: Request, response: Response, next: NextFunction) {
    try {
      let file_path =
        "D:/Task/Event-Booking-Application/event-booking-application-Backend/public/img-event.png";
      let data = fs.readFileSync(file_path);
      let encodedImage = new Buffer(data, "binary").toString("base64");
      var update_data = {
        eventId: request.body.eventId,
        userId: request.body.userId,
        userImage: encodedImage,
        name: request.body.name,
        phoneNo: request.body.phoneNo,
        numberOfSeats: request.body.numberOfSeats,
        namerOfAttendee: request.body.namerOfAttendee,
        eventDate: request.body.eventDate,
      };
      this.bookingRepository.update({ id: request.body.id }, update_data);
      let updatedBooking = await this.bookingRepository.findOne(
        request.body.id
      );
      let resData = {
        _isScuuess: true,
        statusCode: 200,
        data: updatedBooking,
        message: "success",
      };
      return resData;
    } catch (error) {
      return error;
    }
  }

  // Delete Booking
  async remove(request: Request, response: Response, next: NextFunction) {
    try {
      let bookingToRemove = await this.bookingRepository.findOne(
        request.params.id
      );
      await this.bookingRepository.remove(bookingToRemove);
      return "Success";
    } catch (error) {
      return error;
    }
  }

  // Serarch Event
  async search(request: Request, response: Response, next: NextFunction) {
    try {
      let eventSearch = await this.eventRepository.find({
        name: "%" + request.params.name + "%",
      });
      let resData = {
        _isScuuess: true,
        statusCode: 200,
        data: eventSearch,
        message: "success",
      };
      return resData;
    } catch (error) {
      return error;
    }
  }
}
