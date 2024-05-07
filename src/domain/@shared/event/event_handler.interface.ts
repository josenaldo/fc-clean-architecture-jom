import EventInterface from '@/domain/@shared/event/event.interface'

export default interface EventHandlerInterface<
  T extends EventInterface = EventInterface,
> {
  handle(event: T): void
}
