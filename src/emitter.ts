import { Actions, Data, Handler, Person } from './types'

export class EventEmitter {
  events = Object.create(null)

  constructor() {
    this.on(Actions.register, (person: Person): void => {
      console.log(`Пользователь ${person.name} был успешно зарегистрирован`)
    })
      .on(Actions.changeBalance, (data: Data) => {
        const { name, amount } = data
        console.log(`На счету ${name} — ${amount}$`)
      })
      .on(Actions.withdraw, (data: Data): void => {
        const { name, amount } = data
        console.log(`На счету ${name} — ${amount}$`)
      })
      .on(Actions.add, (data: Data): void => {
        const { name, amount } = data
        console.log(`На счету ${name} — ${amount}$`)
      })
  }

  on(type: string, handler: Handler) {
    if (type in this.events) {
      this.events[type].push(handler)
    } else {
      this.events[type] = [handler]
    }

    return this
  }

  emit(type: string, data: Data) {
    const handlers = this.events[type]

    if (Array.isArray(handlers)) {
      handlers.forEach((handler) => handler(data))
    }

    return this
  }
}
