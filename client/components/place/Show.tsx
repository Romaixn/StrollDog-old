import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetch } from "../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import { Place } from "../../types/Place";

interface Props {
  place: Place;
}

export const Show: FunctionComponent<Props> = ({ place }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(place["@id"], { method: "DELETE" });
      router.push("/places");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Show Place ${place["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">title</th>
            <td>{place["title"]}</td>
          </tr>
          <tr>
            <th scope="row">description</th>
            <td>{place["description"]}</td>
          </tr>
          <tr>
            <th scope="row">address</th>
            <td>{place["address"]}</td>
          </tr>
          <tr>
            <th scope="row">city</th>
            <td>{place["city"]}</td>
          </tr>
          <tr>
            <th scope="row">postalCode</th>
            <td>{place["postalCode"]}</td>
          </tr>
          <tr>
            <th scope="row">influx</th>
            <td>{place["influx"]}</td>
          </tr>
          <tr>
            <th scope="row">types</th>
            <td>
              <ReferenceLinks items={place["types"]} type="Type" />
            </td>
          </tr>
          <tr>
            <th scope="row">longitude</th>
            <td>{place["longitude"]}</td>
          </tr>
          <tr>
            <th scope="row">latitude</th>
            <td>{place["latitude"]}</td>
          </tr>
          <tr>
            <th scope="row">rating</th>
            <td>{place["rating"]}</td>
          </tr>
          <tr>
            <th scope="row">comments</th>
            <td>
              <ReferenceLinks items={place["comments"]} type="Comment" />
            </td>
          </tr>
          <tr>
            <th scope="row">creator</th>
            <td>{place["creator"]}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/places">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={`${place["@id"]}/edit`}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        <a>Delete</a>
      </button>
    </div>
  );
};
