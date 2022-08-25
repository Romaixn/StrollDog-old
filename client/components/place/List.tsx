import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { Place } from "../../types/Place";

interface Props {
  places: Place[];
}

export const List: FunctionComponent<Props> = ({ places }) => (
  <div>
    <h1>Place List</h1>
    <Link href="/places/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>title</th>
          <th>description</th>
          <th>address</th>
          <th>city</th>
          <th>postalCode</th>
          <th>influx</th>
          <th>types</th>
          <th>longitude</th>
          <th>latitude</th>
          <th>rating</th>
          <th>comments</th>
          <th>creator</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {places &&
          places.length !== 0 &&
          places.map((place) => (
            <tr key={place["@id"]}>
              <th scope="row">
                <ReferenceLinks items={place["@id"]} type="place" />
              </th>
              <td>{place["title"]}</td>
              <td>{place["description"]}</td>
              <td>{place["address"]}</td>
              <td>{place["city"]}</td>
              <td>{place["postalCode"]}</td>
              <td>{place["influx"]}</td>
              <td>
                <ReferenceLinks items={place["types"]} type="Type" />
              </td>
              <td>{place["longitude"]}</td>
              <td>{place["latitude"]}</td>
              <td>{place["rating"]}</td>
              <td>
                <ReferenceLinks items={place["comments"]} type="Comment" />
              </td>
              <td>{place["creator"]}</td>
              <td>
                <ReferenceLinks
                  items={place["@id"]}
                  type="place"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${place["@id"]}/edit`}>
                  <a>
                    <i className="bi bi-pen" aria-hidden="true" />
                    <span className="sr-only">Edit</span>
                  </a>
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);
