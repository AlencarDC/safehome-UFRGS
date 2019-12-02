import EventListener from './EventListener';

class EventManager {
  private listeners: Map<string, EventListener[]>;

  constructor () {
    this.listeners = new Map<string, EventListener[]>();
  }

  public subscribe(event: string, listener: EventListener) {
    let listeners = this.listeners.get(event);
    if (listeners == null){
      listeners = [];
    }

    listeners.push(listener);

    this.listeners.set(event, listeners);
  }

  public unsubscribe(event: string, listener: EventListener): void {
    let listeners = this.listeners.get(event);
    
    const index = listeners.indexOf(listener);
    listeners.splice(index, 1);

    this.listeners.set(event, listeners);
  }

  public notify(event: string, data?: any): void {
    const listeners = this.listeners.get(event);

    listeners.forEach(listener => listener.update(data));
  }
}

export default EventManager;