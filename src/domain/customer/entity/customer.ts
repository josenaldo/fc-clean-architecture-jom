import Entity from '@/domain/@shared/entity/entity.abstract'
import NotificationError from '@/domain/@shared/notification/notification.error'
import Address from '@/domain/customer/value-object/address'

export default class Customer extends Entity {
  private _name: string = ''
  private _address!: Address
  private _active: boolean = false
  private _rewardPoints: number = 0

  constructor(
    id: string,
    name: string,
    active?: boolean,
    rewardPoints?: number,
    address?: Address
  ) {
    super()
    this._id = id
    this._name = name

    if (active !== undefined) {
      this._active = active
    }

    if (rewardPoints !== undefined) {
      this._rewardPoints = rewardPoints
    }

    if (address !== undefined) {
      this._address = address
    }

    this.validate()
  }

  get contextName(): string {
    return 'Customer'
  }

  validate() {
    if (this.id.length === 0) {
      this._notification.addError({
        message: 'ID is required',
        context: this.contextName,
      })
    }

    if (this._name.length === 0) {
      this._notification.addError({
        message: 'Name is required',
        context: this.contextName,
      })
    }

    if (this.hasNotificationErrors) {
      throw new NotificationError(this.notificationErrors)
    }
  }

  get name() {
    return this._name
  }

  get rewardPoints() {
    return this._rewardPoints
  }

  get address() {
    return this._address
  }

  isActive(): boolean {
    return this._active
  }

  changeName(name: string) {
    this._name = name
    this.validate()
  }

  changeAddress(address: Address) {
    this._address = address
  }

  activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer')
    }
    this._active = true
  }

  deactivate() {
    this._active = false
  }

  addRewardPoints(points: number) {
    if (points <= 0 || isNaN(points) || !isFinite(points)) {
      throw new Error('Reward points must be a positive number')
    }

    this._rewardPoints += points
  }
}
