import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../common/ReferenceLinks";
import { User } from "../../../types/User";

interface Props {
  users: User[];
}

export const List: FunctionComponent<Props> = ({ users }) => (
  <div>
    <h1>User List</h1>
    <Link href="/users/create">
      <a className="btn btn-primary">Create</a>
    </Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>email</th>
          <th>username</th>
          <th>name</th>
          <th>roles</th>
          <th>password</th>
          <th>comments</th>
          <th>places</th>
          <th>userIdentifier</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {users &&
          users.length !== 0 &&
          users.map((user) => (
            <tr key={user["@id"]}>
              <th scope="row">
                <ReferenceLinks items={user["@id"]} type="user" />
              </th>
              <td>{user["email"]}</td>
              <td>{user["username"]}</td>
              <td>{user["name"]}</td>
              <td>{user["roles"]}</td>
              <td>{user["password"]}</td>
              <td>
                <ReferenceLinks items={user["comments"]} type="Comment" />
              </td>
              <td>
                <ReferenceLinks items={user["places"]} type="Place" />
              </td>
              <td>{user["userIdentifier"]}</td>
              <td>
                <ReferenceLinks
                  items={user["@id"]}
                  type="user"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${user["@id"]}/edit`}>
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
