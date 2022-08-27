import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../utils/dataAccess";
import { User } from "../../types/User";

interface Props {
  user?: User;
}

export const Form: FunctionComponent<Props> = ({ user }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(user["@id"], { method: "DELETE" });
      router.push("/users");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{user ? `Edit User ${user["@id"]}` : `Create User`}</h1>
      <Formik
        initialValues={user ? { ...user } : new User()}
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/users" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/users");
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
              <label className="form-control-label" htmlFor="_email">
                email
              </label>
              <input
                name="email"
                id="_email"
                value={values.email ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.email && touched.email ? " is-invalid" : ""
                }`}
                aria-invalid={errors.email && touched.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="email"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_username">
                username
              </label>
              <input
                name="username"
                id="_username"
                value={values.username ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.username && touched.username ? " is-invalid" : ""
                }`}
                aria-invalid={errors.username && touched.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="username"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_name">
                name
              </label>
              <input
                name="name"
                id="_name"
                value={values.name ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.name && touched.name ? " is-invalid" : ""
                }`}
                aria-invalid={errors.name && touched.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage className="text-danger" component="div" name="name" />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_roles">
                roles
              </label>
              <input
                name="roles"
                id="_roles"
                value={values.roles ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.roles && touched.roles ? " is-invalid" : ""
                }`}
                aria-invalid={errors.roles && touched.roles}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="roles"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_password">
                password
              </label>
              <input
                name="password"
                id="_password"
                value={values.password ?? ""}
                type="text"
                placeholder="The hashed password"
                className={`form-control${
                  errors.password && touched.password ? " is-invalid" : ""
                }`}
                aria-invalid={errors.password && touched.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="password"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_comments">
                comments
              </label>
              <input
                name="comments"
                id="_comments"
                value={values.comments ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.comments && touched.comments ? " is-invalid" : ""
                }`}
                aria-invalid={errors.comments && touched.comments}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="comments"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_places">
                places
              </label>
              <input
                name="places"
                id="_places"
                value={values.places ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.places && touched.places ? " is-invalid" : ""
                }`}
                aria-invalid={errors.places && touched.places}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="places"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_userIdentifier">
                userIdentifier
              </label>
              <input
                name="userIdentifier"
                id="_userIdentifier"
                value={values.userIdentifier ?? ""}
                type="text"
                placeholder="A visual identifier that represents this user."
                className={`form-control${
                  errors.userIdentifier && touched.userIdentifier
                    ? " is-invalid"
                    : ""
                }`}
                aria-invalid={errors.userIdentifier && touched.userIdentifier}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="userIdentifier"
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
      <Link href="/users">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {user && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
