export class Type {
  public "@id"?: string;

  constructor(_id?: string, public name?: string, public places?: string[]) {
    this["@id"] = _id;
  }
}
