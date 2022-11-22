// Для запуска файла использовать команду ts-node src/index.ts находясь в папке homeworks/2
import { EventEmitter } from './emitter'
import { Actions, Data, Person } from './types'

class Bank extends EventEmitter {
  persons: Data[] = []

  constructor() {
    super()
    this.on(Actions.add, (data: Data) => {
      return this.add(data)
    })
  }

  register(person: Data): number {
    const id = 1

    this.persons[id] = { ...person }
    this.emit(Actions.register, person)

    console.log(this.persons)

    return id
  }

  changeBalance(data: Data) {
    [...this.persons, data]
  }

  private add(data: Data): void {
    const { personId, amount } = data


    if (personId === undefined) {
      throw new Error('personId is required')
    }

    const person: Data = this.persons[personId]

    if (!amount) {
      throw new Error('Не указана сумма')
    }

    if (!person) {
      throw new Error(`Пользователь с идентификатором ${personId} не найден`)
    }

    if (person.balance === undefined) {
        throw new Error('Баланс не найден')
    }

    const balance = person.balance + amount

    if (person.name === undefined) {
      throw new Error('Имя является обязательным')
    }

    this.emit(Actions.changeBalance, {
    ...person,
      name: person.name,
      amount: balance,
    })
  }

  withdraw(data: Data): void {
    const { personId, amount } = data

    if (personId === undefined) {
      throw new Error('personId is required')
    }

    const person: Data = this.persons[personId]

    if (!amount) {
      throw new Error('Не указана сумма')
    }

    if (!person) {
      throw new Error(`Пользователь с идентификатором ${personId} не найден`)
    }

    if (person.balance === undefined) {
        throw new Error('Баланс не найден')
    }

    const balance = person.balance - amount

    if (person.name === undefined) {
      throw new Error('Имя является обязательным')
    }

    this.emit(Actions.changeBalance, {
        ...person,
        name: person.name,
        amount: balance,
    })
  }
}

const bank = new Bank()

const personId = bank.register({
  name: 'Джон Доу',
  balance: 100,
})

bank.emit(Actions.add, {personId, amount: 10 })
// Задание со звёздочкой
bank.emit(Actions.withdraw, { personId, amount: 23 })
