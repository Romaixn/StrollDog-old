import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetch } from "../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import { User } from "../../types/User";

interface Props {
  user: User;
}

export const Show: FunctionComponent<Props> = ({ user }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(user["@id"], { method: "DELETE" });
      router.push("/users");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Show User ${user["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">email</th>
            <td>{user["email"]}</td>
          </tr>
          <tr>
            <th scope="row">username</th>
            <td>{user["username"]}</td>
          </tr>
          <tr>
            <th scope="row">name</th>
            <td>{user["name"]}</td>
          </tr>
          <tr>
            <th scope="row">roles</th>
            <td>{user["roles"]}</td>
          </tr>
          <tr>
            <th scope="row">password</th>
            <td>{user["password"]}</td>
          </tr>
          <tr>
            <th scope="row">comments</th>
            <td>
              <ReferenceLinks items={user["comments"]} type="Comment" />
            </td>
          </tr>
          <tr>
            <th scope="row">places</th>
            <td>
              <ReferenceLinks items={user["places"]} type="Place" />
            </td>
          </tr>
          <tr>
            <th scope="row">userIdentifier</th>
            <td>{user["userIdentifier"]}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/users">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={`${user["@id"]}/edit`}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        <a>Delete</a>
      </button>
    </div>
  );
};
