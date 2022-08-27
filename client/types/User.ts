export class User {
  public "@id"?: string;

  constructor(
    _id?: string,
    public email?: string,
    public username?: string,
    public name?: string,
    public roles?: string,
    public password?: string,
    public comments?: string[],
    public places?: string[],
    public userIdentifier?: string
  ) {
    this["@id"] = _id;
  }
}
