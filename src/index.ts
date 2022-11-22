import { EventEmitter } from "./emitter";
import { Actions, Data, Person, Persons } from "./types";

class Bank extends EventEmitter {
  persons: Persons = {};

  constructor() {
    super();
    this.on(Actions.add, (data) => {
      return this.add(data);
    }).on(Actions.withdraw, (data) => {
      return this.withdraw(data);
    });
  }

  register(person: Person): number {
    const id = Date.now();

    this.persons[id] = { ...person };
    this.emit(Actions.register, person);

    return id;
  }

  private add(data: Data): void {
    const { personId, amount } = data;

    const person: Person = this.persons[personId];

    if (!person) {
      throw new Error(`Пользователь с идентификатором ${personId} не найден`);
    }

    person.balance = person.balance + amount;

    this.emit(Actions.changeBalance, {
      name: person.name,
      balance: person.balance,
    });
  }

  private withdraw(data: Data): void {
    const { personId, amount } = data;

    const person: Person = this.persons[personId];

    if (!person) {
      throw new Error(`Пользователь с идентификатором ${personId} не найден`);
    }

    if (person.balance <= 0 || person.balance < amount) {
      throw new Error(`
      Недостаточно средств на балансе.
      Баланс: ${person.balance}
      Сумма снятия: ${amount}`);
    }

    person.balance = person.balance - amount;

    this.emit(Actions.changeBalance, {
      name: person.name,
      balance: person.balance,
    });
  }
}

const bank = new Bank();

const personId = bank.register({
  name: "Джон Доу",
  balance: 100,
});

bank.emit(Actions.add, { personId, amount: 1100 });

bank.emit(Actions.withdraw, { personId, amount: 333 });
