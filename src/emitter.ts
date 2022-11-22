export class EventEmitter {
    events = Object.create(null);

    constructor() {
        this
            .on('register', (person: any) => {
            console.log(`Пользователь ${person.name} был успешно зарегистрирован`);
            })
            .on('changeBalance', ({ name, amount }: any) => {
                console.log(`На счету ${name} — ${amount}$`);
            });
    }

    on (type: any, handler: any) {
        if (type in this.events) {
            this.events[type].push(handler);
        } else {
            this.events[type] = [handler];
        }

        return this;
    }

    emit(type: any, data: any) {
        const handlers = this.events[type];

        if (Array.isArray(handlers)) {
            handlers.forEach((handler) => handler(data));
        }

        return this;
    }
}
