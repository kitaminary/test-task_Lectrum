import { Actions, Data, Handler, Person } from "./types";

export class EventEmitter {
  events = Object.create(null);

  constructor() {
    this.on(Actions.register, (person) => {
      const { name } = person;
      console.log(`Пользователь ${name} был успешно зарегистрирован`);
    }).on(Actions.changeBalance, (person) => {
      const { name, balance } = person;
      console.log(`На счету ${name} — ${balance}$`);
    });
  }

  on(type: string, handler: Handler) {
    if (type in this.events) {
      this.events[type].push(handler);
    } else {
      this.events[type] = [handler];
    }

    return this;
  }

  emit(type: string, data: Person | Data) {
    const handlers = this.events[type];

    if (Array.isArray(handlers)) {
      handlers.forEach((handler) => handler(data));
    }

    return this;
  }
}
