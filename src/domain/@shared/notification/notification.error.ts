import Notification, {
  NotificationErrorProps,
} from '@/domain/@shared/notification/notification'

export default class NotificationError extends Error {
  constructor(public errors: NotificationErrorProps[]) {
    super(Notification.messages(errors))
  }
}
