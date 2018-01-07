import {
  observable,
  computed,
  // autorun,
  action,
} from 'mobx'

export default class AppState {
  @observable counter = 0
  @observable name = 'Jokcy'
  @computed get msg() {
    return `${this.name} say count is ${this.counter}`
  }
  @action add() {
    this.counter += 1
  }
  @action changeName(name) {
    this.name = name
  }
}

