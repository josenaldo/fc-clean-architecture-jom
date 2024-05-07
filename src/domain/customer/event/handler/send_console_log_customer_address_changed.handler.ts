import EventHandlerInterface from '@/domain/@shared/event/event_handler.interface'
import CustomerAddressChangedEvent from '@/domain/customer/event/customer_address_changed.event'

export default class SendConsoleLogCustomerAddressChangedHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle(event: CustomerAddressChangedEvent): void {
    const { id, name, address } = event.eventData
    const endereco = `${address.street}, ${address.number}, ${address.zipCode}, ${address.city}`
    console.log(
      `Endereço do cliente: ${id}, ${name} alterado para: ${endereco}`
    )
  }
}
