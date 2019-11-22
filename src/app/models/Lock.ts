import EventListener from './EventListener';


class Lock implements EventListener {
  private name: string;
  private status: boolean;

  constructor (name: string, status: boolean) {
    this.name = name;
    this.status = status;
  }

  public turnON(): void {
    this.status = true;
  }

  public turnOFF(): void {
    this.status = false;
  }

  public update(newStatus: boolean) {
    this.status = newStatus;
  }

  public isON(): boolean {
    return this.status;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }
}

export default Lock;