import EventInterface from '@/domain/@shared/event/event.interface'
import EventDispatcherInterface from '@/domain/@shared/event/event_dispatcher.interface'
import EventHandlerInterface from '@/domain/@shared/event/event_handler.interface'

export default class EventDispatcher implements EventDispatcherInterface {
  private _eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {}

  get getEventhandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this._eventHandlers
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name

    const eventHandlers = this._eventHandlers[eventName]

    if (!eventHandlers) {
      return
    }

    eventHandlers.forEach((eventHandler) => {
      eventHandler.handle(event)
    })
  }

  register(
    event: string,
    eventHandler: EventHandlerInterface<EventInterface>
  ): void {
    if (!this._eventHandlers[event]) {
      this._eventHandlers[event] = []
    }

    if (this._eventHandlers[event].includes(eventHandler)) {
      return
    }

    this._eventHandlers[event].push(eventHandler)
  }

  unregister(
    event: string,
    eventHandler: EventHandlerInterface<EventInterface>
  ): void {
    if (!this._eventHandlers[event]) {
      this._eventHandlers[event] = []
      return
    }

    this._eventHandlers[event] = this._eventHandlers[event].filter(
      (handler) => handler !== eventHandler
    )
  }

  unregisterAll(): void {
    this._eventHandlers = {}
  }
}
