import { Observer } from './observer';

export class Subject {
  private observerCollection: Array<Observer> = new Array<Observer>();

  registerObserver(update: (state: unknown) => void): void {
    const observer = new Observer();
    observer.update = update;
    this.observerCollection.push(observer);
  }

  notifyObservers(state: unknown): void {
    this.observerCollection.forEach((x) => {
      x.update(state);
    });
  }
}
