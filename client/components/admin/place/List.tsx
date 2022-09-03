import { useLayoutEffect, useRef, useState, FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../common/ReferenceLinks";
import { Place } from "../../../types/Place";

interface Props {
  places: Place[];
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const List: FunctionComponent<Props> = ({ places }) => {

  const checkbox = useRef()
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [selectedPlace, setSelectedPlace] = useState([])

  useLayoutEffect(() => {
    const isIndeterminate = selectedPlace.length > 0 && selectedPlace.length < places.length
    setChecked(selectedPlace.length === places.length)
    setIndeterminate(isIndeterminate)
    checkbox.current.indeterminate = isIndeterminate
  }, [selectedPlace])

  function toggleAll() {
    setSelectedPlace(checked || indeterminate ? [] : places)
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Lieux</h1>
          <p className="mt-2 text-sm text-gray-700">
            Une liste de tout les lieux de la plateforme
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link href="/admin/places/create">
            <a className="inline-flex items-center justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 sm:w-auto">Créer un lieu</a>
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {selectedPlace.length > 0 && (
                <div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
                  <button
                    type="button"
                    className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Tout éditer
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center rounded border border-gray-300 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    Tout supprimer
                  </button>
                </div>
              )}
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500 sm:left-6"
                        ref={checkbox}
                        checked={checked}
                        onChange={toggleAll}
                      />
                    </th>
                    <th scope="col" className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                      Titre
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Adresse
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Types
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Créateur
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {places.map((place) => (
                    <tr key={place["@id"]} className={selectedPlace.includes(place) ? 'bg-gray-50' : undefined}>
                      <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                        {selectedPlace.includes(place) && (
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-amber-600" />
                        )}
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500 sm:left-6"
                          value={place["@id"]}
                          checked={selectedPlace.includes(place)}
                          onChange={(e) =>
                            setSelectedPlace(
                              e.target.checked
                                ? [...selectedPlace, place]
                                : selectedPlace.filter((p) => p !== place)
                            )
                          }
                        />
                      </td>
                      <td
                        className={classNames(
                          'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                          selectedPlace.includes(place) ? 'text-amber-600' : 'text-gray-900'
                        )}
                      >
                        {place['title']}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900">{place['address']}</div>
                        <div className="text-gray-500">{place['postalCode']} {place['city']}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><ReferenceLinks items={place["types"]} type="Type" /></td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><ReferenceLinks items={place["creator"]} type="User" /></td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link href={`/admin${place["@id"]}/edit`}>
                          <a className="text-amber-600 hover:text-amber-900">
                            Modifier<span className="sr-only">, {place['title']}</span>
                          </a>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
