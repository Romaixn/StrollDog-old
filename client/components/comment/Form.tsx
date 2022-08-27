import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { Comment } from "../../types/Comment";

interface Props {
  comment?: Comment;
}

export const Form: FunctionComponent<Props> = ({ comment }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(comment["@id"], { method: "DELETE" });
      router.push("/comments");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{comment ? `Edit Comment ${comment["@id"]}` : `Create Comment`}</h1>
      <Formik
        initialValues={comment ? { ...comment } : new Comment()}
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/comments" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/comments");
          } catch (error) {
            setStatus({
              isValid: false,
              msg: `${error.defaultErrorMsg}`,
            });
            setErrors(error.fields);
          }
          setSubmitting(false);
        }}
      >
        {({
          values,
          status,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-control-label" htmlFor="_content">
                content
              </label>
              <input
                name="content"
                id="_content"
                value={values.content ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.content && touched.content ? " is-invalid" : ""
                }`}
                aria-invalid={errors.content && touched.content}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="content"
            />

            <div className="form-group">
              <label className="form-control-label" htmlFor="_place">
                place
              </label>
              <input
                name="place"
                id="_place"
                value={values.place ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.place && touched.place ? " is-invalid" : ""
                }`}
                aria-invalid={errors.place && touched.place}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="place"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_createdAt">
                createdAt
              </label>
              <input
                name="createdAt"
                id="_createdAt"
                value={values.createdAt ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.createdAt && touched.createdAt ? " is-invalid" : ""
                }`}
                aria-invalid={errors.createdAt && touched.createdAt}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="createdAt"
            />

            {status && status.msg && (
              <div
                className={`alert ${
                  status.isValid ? "alert-success" : "alert-danger"
                }`}
                role="alert"
              >
                {status.msg}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-success"
              disabled={isSubmitting}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
      <Link href="/comments">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {comment && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
