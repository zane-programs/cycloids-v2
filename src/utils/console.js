import { format as formatDate } from "date-fns";

export class Console {
  constructor(container) {
    this._list = document.createElement("ol");
    this._list.classList.add("console-list");

    container.appendChild(this._list);
  }

  log(message) {
    this._list.appendChild(Console._createMessageElement(message));
  }

  clear() {
    this._list.innerHTML = "";
  }

  static _createMessageElement(message) {
    const listItem = document.createElement("li");

    const timestamp = document.createElement("strong");
    timestamp.innerText = `[${formatDate(new Date(), "HH:mm:ss.SSS")}] `;

    const messageText = document.createTextNode(message);

    listItem.appendChild(timestamp);
    listItem.appendChild(messageText);

    return listItem;
  }
}
