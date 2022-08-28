import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { fetch } from "../../../utils/dataAccess";
import ReferenceLinks from "../common/ReferenceLinks";
import { Comment } from "../../../types/Comment";

interface Props {
  comment: Comment;
}

export const Show: FunctionComponent<Props> = ({ comment }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(comment["@id"], { method: "DELETE" });
      router.push("/comments");
    } catch (error) {
      setError("Error when deleting the resource.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{`Show Comment ${comment["@id"]}`}</h1>
      <table className="table table-responsive table-striped table-hover">
        <thead>
          <tr>
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">content</th>
            <td>{comment["content"]}</td>
          </tr>
          <tr>
            <th scope="row">creator</th>
            <td>{comment["creator"]}</td>
          </tr>
          <tr>
            <th scope="row">place</th>
            <td>
              <ReferenceLinks items={comment["place"]} type="Place" />
            </td>
          </tr>
          <tr>
            <th scope="row">createdAt</th>
            <td>{comment["createdAt"]}</td>
          </tr>
        </tbody>
      </table>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <Link href="/comments">
        <a className="btn btn-primary">Back to list</a>
      </Link>{" "}
      <Link href={`${comment["@id"]}/edit`}>
        <a className="btn btn-warning">Edit</a>
      </Link>
      <button className="btn btn-danger" onClick={handleDelete}>
        <a>Delete</a>
      </button>
    </div>
  );
};
