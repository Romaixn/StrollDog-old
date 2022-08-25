export class Place {
  public "@id"?: string;

  constructor(
    _id?: string,
    public title?: string,
    public description?: string,
    public address?: string,
    public city?: string,
    public postalCode?: string,
    public influx?: string,
    public types?: string[],
    public longitude?: number,
    public latitude?: number,
    public rating?: number,
    public comments?: string[],
    public creator?: any
  ) {
    this["@id"] = _id;
  }
}
