import { FunctionComponent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ErrorMessage, Formik } from "formik";
import { fetch } from "../../../utils/dataAccess";
import { Type } from "../../../types/Type";

interface Props {
  type?: Type;
}

export const Form: FunctionComponent<Props> = ({ type }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce type ?")) return;

    try {
      await fetch(type["@id"], { method: "DELETE" });
      router.push("/admin/types");
    } catch (error) {
      setError(`Error when deleting the resource: ${error}`);
      console.error(error);
    }
  };

  return (
    <div>
      <Formik
        initialValues={type ? { ...type } : new Type()}
        validate={(values) => {
          const errors = {};
          if(!values.name) {
            errors.name = 'Le nom est requis';
          }

          return errors;
        }}
        onSubmit={async (values, { setSubmitting, setStatus, setErrors }) => {
          const isCreation = !values["@id"];

          try {
            await fetch(isCreation ? "/types" : values["@id"], {
              method: isCreation ? "POST" : "PUT",
              body: JSON.stringify(values),
            });
            setStatus({
              isValid: true,
              msg: `Element ${isCreation ? "created" : "updated"}.`,
            });
            router.push("/admin/types");
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
            <div className="space-y-8 divide-y divide-gray-200">
              <div>
                <div>
                  <h1 className="text-lg leading-6 font-medium text-gray-900">Type de lieu</h1>
                  <p className="mt-1 text-sm text-gray-500">Informations à propos d'un type de lieu</p>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="_name" className="block text-sm font-medium text-gray-700">
                      Nom
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="_name"
                        value={values.name ?? ""}
                        placeholder=""
                        className={`shadow-sm focus:ring-amber-500 focus:border-amber-500 block w-full sm:text-sm border-gray-300 rounded-md${
                          errors.name && touched.name ? " border-red-500" : ""
                        }`}
                        aria-invalid={errors.name && touched.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                    </div>
                  <ErrorMessage className="text-red-500" component="div" name="name" />
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
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <Link href="/admin/types">
                  <a className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500">
                    Retour
                  </a>
                </Link>
                {type && (
                    <button type="button" onClick={handleDelete} className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                      <a>Supprimer</a>
                    </button>
                )}
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                  {type ? "Modifier" : "Créer"}
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
