export { Person, Data, Handler, Actions}

enum Actions {
  register = 'register',
  changeBalance = 'changeBalance',
  withdraw = 'withdraw',
  add = 'add',
}

interface Person {
  name: string
  balance: number
  amount?: number
  personId?: number
}

interface Data {
  name: string
  personId?: number
  amount?: number
  balance: number
}

interface Handler {
  (person: any): void
  (data: Data): void
  (data: Data): void
  (data: Data): void
}
