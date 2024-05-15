import Notification from '@/domain/@shared/notification/notification'

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
}
