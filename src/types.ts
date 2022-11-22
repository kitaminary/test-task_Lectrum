export { Person, Actions, Persons, Data, Handler};

enum Actions {
  register = "register",
  changeBalance = "changeBalance",
  withdraw = "withdraw",
  add = "add",
}

interface Person {
  name: string;
  balance: number;
}

interface Data {
  personId: number;
  amount: number;
}

interface Persons {
  [key: string]: Person;
}

interface Generic {
  personId: number;
  amount: number;
  name: string;
  balance: number;
}

type Handler = (arg: Generic) => void
