import Notification from "../notification/notification";
export default abstract class Entity {
  //entity with notification
  protected _id: string;
  public notification: Notification;

  constructor() {
    this.notification = new Notification();
  }

  get id(): string {
    return this._id;
  }
}
