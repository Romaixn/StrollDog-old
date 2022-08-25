import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../../components/common/ReferenceLinks";
import { Type } from "../../types/Type";

interface Props {
  types: Type[];
}

export const List: FunctionComponent<Props> = ({ types }) => (
  <div>
    <h1>Type List</h1>
    <Link href="/types/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>places</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {types &&
          types.length !== 0 &&
          types.map((type) => (
            <tr key={type["@id"]}>
              <th scope="row">
                <ReferenceLinks items={type["@id"]} type="type" />
              </th>
              <td>{type["name"]}</td>
              <td>
                <ReferenceLinks items={type["places"]} type="Place" />
              </td>
              <td>
                <ReferenceLinks
                  items={type["@id"]}
                  type="type"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${type["@id"]}/edit`}>
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
