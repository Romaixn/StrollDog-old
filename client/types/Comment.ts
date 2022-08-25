export class Comment {
  public "@id"?: string;

  constructor(
    _id?: string,
    public content?: string,
    public creator?: any,
    public place?: string,
    public createdAt?: Date
  ) {
    this["@id"] = _id;
  }
}
