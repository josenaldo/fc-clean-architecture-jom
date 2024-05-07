import EventHandlerInterface from '@/domain/@shared/event/event_handler.interface'
import ProductCreatedEvent from '@/domain/product/event/product_created.event'

export default class SendEmailWhenProductisCreatedHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    console.log('Send email to user. Email Data: ', event.eventData)
  }
}
