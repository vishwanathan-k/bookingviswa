import { EventController } from "../controller/EventController";

export const EventRoutes = [
  {
    method: "get",
    route: "/api/event",
    controller: EventController,
    action: "all",
  },
  {
    method: "get",
    route: "/api/event/:id",
    controller: EventController,
    action: "one",
  },
  {
    method: "post",
    route: "/api/event",
    controller: EventController,
    action: "save",
  },
  {
    method: "put",
    route: "/api/eventUpdate/:id",
    controller: EventController,
    action: "updateEvent",
  },
];
