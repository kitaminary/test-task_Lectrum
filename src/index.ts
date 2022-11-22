// Для запуска файла использовать команду ts-node src/index.ts находясь в папке homeworks/2
import { EventEmitter } from './emitter';

class Bank extends EventEmitter {
    persons: any = {};

    constructor() {
        super();
        this.on('add', (data: any) => this.add(data));
    }

    register (person: any) {
        const id = Date.now();

        this.persons[id] = { ...person };
        this.emit('register', person);

        return id;
    }

    add (data: any) {
        const { personId, amount } = data;
        const person = this.persons[personId];

        if (!person) {
            throw new Error(`Пользователь с идентификатором ${personId} не найден`);
        }

        person.balance = person.balance + amount;

        this.emit('changeBalance', { name: person.name, amount: person.balance});
    }
}

const bank = new Bank();

const personId = bank.register({
    name: 'Джон Доу',
    balance: 100
});

bank.emit('add', { personId, amount: 20 });

// Задание со звёздочкой
bank.emit('withdraw', { personId, amount: 20 });
