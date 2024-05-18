import Notification from '@/domain/@shared/notification/notification'
import NotificationError from '@/domain/@shared/notification/notification.error'

export default abstract class Entity {
  protected _id: string
  protected _notification: Notification

  constructor() {
    this._notification = new Notification()
  }

  get id() {
    return this._id
  }

  get notification() {
    return this._notification
  }

  get hasNotificationErrors() {
    return this._notification.hasErrors(this.contextName)
  }

  get notificationErrors() {
    return this._notification.getErrors(this.contextName)
  }

  get notificationMessages() {
    return this._notification.messages(this.contextName)
  }

  abstract get contextName(): string

  addNotificationError(message: string) {
    this._notification.addError({
      message,
      context: this.contextName,
    })
  }

  throwIfHasNotificationErrors() {
    if (this.hasNotificationErrors) {
      throw new NotificationError(this.notificationErrors)
    }
  }
}
