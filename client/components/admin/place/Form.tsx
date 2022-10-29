import { FunctionComponent, useState, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../../utils/dataAccess";
import { Place } from "../../../types/Place";
import Select from "../type/Select";

interface Props {
  place?: Place;
}

export const Form: FunctionComponent<Props> = ({ place }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce lieu ?")) return;

    try {
      await fetch(place["@id"], { method: "DELETE" });
      router.push("/admin/places");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={place ? { ...place } : new Place()}
        validate={(values) => {
          const errors = {};

          if (!values.title) {
            errors.title = "Le nom est requis";
          }

          if (!values.description) {
            errors.description = "La description est requise";
          }

          if(!values.influx) {
            errors.influx = "L'affluence est requise";
          }

          if(!values.address) {
            errors.address = "L'adresse est requise";
          }

          if(!values.postalCode) {
            errors.postalCode = "Le code postal est requis";
          }

          if(!values.city) {
            errors.city = "La ville est requise";
          }

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
            router.push("/admin/places");
          } catch (error) {
            setStatus({
              isValid: false,
              msg: `${error.defaultErrorMsg}`,
            });
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
          <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
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
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div>
                  <h2 className="text-lg leading-6 font-medium text-gray-900">Lieu</h2>
                  <p className="mt-1 text-sm text-gray-500">Informations à propos du lieu</p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="_title" className="block text-sm font-medium text-gray-700">
                      Titre
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="title"
                        id="_title"
                        value={values.title ?? ""}
                        placeholder=""
                        className={`shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-300 rounded-md${
                          errors.title && touched.title ? " border-red-500" : ""
                        }`}
                        aria-invalid={errors.title && touched.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <ErrorMessage className="text-red-500 text-sm" component="div" name="title" />
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="_description" className="block text-sm font-medium text-gray-700">
                      Description
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="_description"
                        name="description"
                        rows={3}
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm${
                          errors.description && touched.description ? " border-red-500" : ""
                        }`}
                        value={values.description ?? ""}
                        aria-invalid={errors.description && touched.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                       <ErrorMessage
                        className="text-red-500 text-sm"
                        component="div"
                        name="description"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Description du lieu.</p>
                  </div>

                  <div className="sm:col-span-3">
                    <ErrorMessage className="text-red-500 text-sm" component="div" name="types" />
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="_influx" className="block text-sm font-medium text-gray-700">
                      Affluence
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="influx"
                        id="_influx"
                        value={values.influx ?? ""}
                        placeholder=""
                        className={`shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-300 rounded-md${
                          errors.influx && touched.influx ? " border-red-500" : ""
                        }`}
                        aria-invalid={errors.influx && touched.influx}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                    <ErrorMessage className="text-red-500 text-sm" component="div" name="influx" />
                  </div>
                </div>
              </div>

              <div className="pt-8">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Localisation</h3>
                  <p className="mt-1 text-sm text-gray-500">Informations sur la localité du lieu</p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label htmlFor="_address" className="block text-sm font-medium text-gray-700">
                      Adresse
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="address"
                        id="_address"
                        value={values.address ?? ""}
                        autoComplete="street-address"
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm${
                          errors.address && touched.address ? " border-red-500" : ""
                        }`}
                        aria-invalid={errors.address && touched.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage className="text-red-500 text-sm" component="div" name="address" />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="_postalCode" className="block text-sm font-medium text-gray-700">
                      Code postal
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="postalCode"
                        id="_postalCode"
                        value={values.postalCode ?? ""}
                        autoComplete="postal-code"
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm${
                          errors.postalCode && touched.postalCode ? " border-red-500" : ""
                        }`}
                        aria-invalid={errors.postalCode && touched.postalCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage className="text-red-500 text-sm" component="div" name="postalCode"/>
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="_city" className="block text-sm font-medium text-gray-700">
                      Ville
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="city"
                        id="_city"
                        value={values.city ?? ""}
                        autoComplete="address-level2"
                        className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm${
                          errors.city && touched.city ? " border-red-500" : ""
                        }`}
                        aria-invalid={errors.city && touched.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <ErrorMessage className="text-red-500 text-sm" component="div" name="city" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <Link href="/admin/places" className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                  Retour
                </Link>
                {place && (
                    <button type="button" onClick={handleDelete} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      Supprimer
                    </button>
                )}
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  {place ? "Modifier" : "Créer"}
                </button>
              </div>
            </div>

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
          </form>
        )}
      </Formik>
    </div>
  );
};
