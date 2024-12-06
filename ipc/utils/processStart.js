import { Notification } from "electron"

export const notify = (title, body) => {
    new Notification({
      title: title,
      body: body
    }).show()
  }