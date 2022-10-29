import { FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../common/ReferenceLinks";
import { Comment } from "../../../types/Comment";

interface Props {
  comments: Comment[];
}

export const List: FunctionComponent<Props> = ({ comments }) => (
  <div>
    <h1>Comment List</h1>
    <Link href="/comments/create" className="btn btn-primary">Create</Link>
    <table className="table table-responsive table-striped table-hover">
      <thead>
        <tr>
          <th>id</th>
          <th>content</th>
          <th>creator</th>
          <th>place</th>
          <th>createdAt</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {comments &&
          comments.length !== 0 &&
          comments.map((comment) => (
            <tr key={comment["@id"]}>
              <th scope="row">
                <ReferenceLinks items={comment["@id"]} type="comment" />
              </th>
              <td>{comment["content"]}</td>
              <td>{comment["creator"]}</td>
              <td>
                <ReferenceLinks items={comment["place"]} type="Place" />
              </td>
              <td>{comment["createdAt"]}</td>
              <td>
                <ReferenceLinks
                  items={comment["@id"]}
                  type="comment"
                  useIcon={true}
                />
              </td>
              <td>
                <Link href={`${comment["@id"]}/edit`}>
                  <i className="bi bi-pen" aria-hidden="true" />
                  <span className="sr-only">Edit</span>
                </Link>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  </div>
);
