export type NotificationError = {
  message: string
  context: string
}

export default class Notification {
  private errors: NotificationError[] = []

  hasErrors(context?: string): boolean {
    if (context) {
      return this.errors.some((error) => error.context === context)
    }
    return this.errors.length > 0
  }

  addError(error: NotificationError): void {
    this.errors.push(error)
  }

  messages(context?: string): string {
    let messagesByContext: {
      [key: string]: string[]
    } = this.extractMessagesByContext(context)

    const entries = Object.entries(messagesByContext)

    let messages = ''

    messages = this.convertMessagesByContextToString(entries, messages)

    return messages
  }

  private extractMessagesByContext(context: string): {
    [key: string]: string[]
  } {
    let messagesByContext: {
      [key: string]: string[]
    } = {}

    this.errors
      .filter((error) => !context || error.context === context)
      .forEach((error) => {
        if (!messagesByContext[error.context]) {
          messagesByContext[error.context] = []
        }
        messagesByContext[error.context].push(error.message)
      })
    return messagesByContext
  }

  private convertMessagesByContextToString(
    entries: [string, string[]][],
    messages: string
  ) {
    entries.forEach(([key, value], index) => {
      messages += `${key.toLowerCase()}: ${value.join(', ')}`
      if (index < entries.length - 1) {
        messages += ' | '
      }
    })
    return messages
  }
}
