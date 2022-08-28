import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../../utils/dataAccess";
import { Place } from "../../../types/Place";

interface Props {
  place?: Place;
}

export const Form: FunctionComponent<Props> = ({ place }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await fetch(place["@id"], { method: "DELETE" });
      router.push("/places");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <h1>{place ? `Edit Place ${place["@id"]}` : `Create Place`}</h1>
      <Formik
        initialValues={place ? { ...place } : new Place()}
        validate={(values) => {
          const errors = {};
          // add your validation logic here
          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];
          try {
            await fetch(isCreation ? "/places" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/places");
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
              <label className="form-control-label" htmlFor="_title">
                title
              </label>
              <input
                name="title"
                id="_title"
                value={values.title ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.title && touched.title ? " is-invalid" : ""
                }`}
                aria-invalid={errors.title && touched.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="title"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_description">
                description
              </label>
              <input
                name="description"
                id="_description"
                value={values.description ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.description && touched.description ? " is-invalid" : ""
                }`}
                aria-invalid={errors.description && touched.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="description"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_address">
                address
              </label>
              <input
                name="address"
                id="_address"
                value={values.address ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.address && touched.address ? " is-invalid" : ""
                }`}
                aria-invalid={errors.address && touched.address}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="address"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_city">
                city
              </label>
              <input
                name="city"
                id="_city"
                value={values.city ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.city && touched.city ? " is-invalid" : ""
                }`}
                aria-invalid={errors.city && touched.city}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage className="text-danger" component="div" name="city" />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_postalCode">
                postalCode
              </label>
              <input
                name="postalCode"
                id="_postalCode"
                value={values.postalCode ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.postalCode && touched.postalCode ? " is-invalid" : ""
              }`}
                aria-invalid={errors.postalCode && touched.postalCode}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="postalCode"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_influx">
                influx
              </label>
              <input
                name="influx"
                id="_influx"
                value={values.influx ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.influx && touched.influx ? " is-invalid" : ""
                }`}
                aria-invalid={errors.influx && touched.influx}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="influx"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_types">
                types
              </label>
              <input
                name="types"
                id="_types"
                value={values.types ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.types && touched.types ? " is-invalid" : ""
                }`}
                aria-invalid={errors.types && touched.types}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="types"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_longitude">
                longitude
              </label>
              <input
                name="longitude"
                id="_longitude"
                value={values.longitude ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.longitude && touched.longitude ? " is-invalid" : ""
                }`}
                aria-invalid={errors.longitude && touched.longitude}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="longitude"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_latitude">
                latitude
              </label>
              <input
                name="latitude"
                id="_latitude"
                value={values.latitude ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.latitude && touched.latitude ? " is-invalid" : ""
                }`}
                aria-invalid={errors.latitude && touched.latitude}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="latitude"
            />
            <div className="form-group">
              <label className="form-control-label" htmlFor="_rating">
                rating
              </label>
              <input
                name="rating"
                id="_rating"
                value={values.rating ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.rating && touched.rating ? " is-invalid" : ""
                }`}
                aria-invalid={errors.rating && touched.rating}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="rating"
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
              <label className="form-control-label" htmlFor="_creator">
                creator
              </label>
              <input
                name="creator"
                id="_creator"
                value={values.creator ?? ""}
                type="text"
                placeholder=""
                className={`form-control${
                  errors.creator && touched.creator ? " is-invalid" : ""
                }`}
                aria-invalid={errors.creator && touched.creator}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <ErrorMessage
              className="text-danger"
              component="div"
              name="creator"
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
      <Link href="/places">
        <a className="btn btn-primary">Back to list</a>
      </Link>
      {place && (
        <button className="btn btn-danger" onClick={handleDelete}>
          <a>Delete</a>
        </button>
      )}
    </div>
  );
};
