export class Influx {
  public "@id"?: string;

  constructor(_id?: string, public value?: string) {
    this["@id"] = _id;
  }
}
