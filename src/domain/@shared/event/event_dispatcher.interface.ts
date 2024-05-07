import EventInterface from '@/domain/@shared/event/event.interface'
import EventHandlerInterface from '@/domain/@shared/event/event_handler.interface'

/**
 * Event Dispatcher Interface
 *
 * This interface defines the methods that an Event Dispatcher should implement
 * in order to be able to notify event handlers of events
 *
 * @see EventInterface
 * @see EventHandlerInterface
 * @see EventDispatcher
 */
export default interface EventDispatcherInterface {
  /**
   * Notify all event handlers for the given event
   * @param event
   */
  notify(event: EventInterface): void

  /**
   * Register an event handler for the given event
   * @param event
   * @param eventHandler
   */
  register(event: string, eventHandler: EventHandlerInterface): void

  /**
   * Unregister an event handler for the given event
   * @param event
   * @param eventHandler
   */
  unregister(event: string, eventHandler: EventHandlerInterface): void

  /**
   * Unregister all event handlers for the given event
   * @param event
   */
  unregisterAll(): void
}
