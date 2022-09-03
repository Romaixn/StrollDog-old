import { useLayoutEffect, useRef, useState, FunctionComponent } from "react";
import Link from "next/link";
import ReferenceLinks from "../common/ReferenceLinks";
import { Type } from "../../../types/Type";

interface Props {
  types: Type[];
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const List: FunctionComponent<Props> = ({ types }) => {

  const checkbox = useRef()
  const [checked, setChecked] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const [selectedType, setSelectedPlace] = useState([])

  useLayoutEffect(() => {
    const isIndeterminate = selectedType.length > 0 && selectedType.length < types.length
    setChecked(selectedType.length === types.length)
    setIndeterminate(isIndeterminate)
    checkbox.current.indeterminate = isIndeterminate
  }, [selectedType])

  function toggleAll() {
    setSelectedPlace(checked || indeterminate ? [] : types)
    setChecked(!checked && !indeterminate)
    setIndeterminate(false)
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Types</h1>
          <p className="mt-2 text-sm text-gray-700">
            Une liste de tout les types de lieux présents dans l'application et les lieux qui se rattachent.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link href="/admin/types/create">
            <a className="inline-flex items-center justify-center rounded-md border border-transparent bg-amber-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 sm:w-auto">Créer un type</a>
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              {selectedType.length > 0 && (
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
                      Nom
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Lieux
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {types.map((type) => (
                    <tr key={type["@id"]} className={selectedType.includes(type) ? 'bg-gray-50' : undefined}>
                      <td className="relative w-12 px-6 sm:w-16 sm:px-8">
                        {selectedType.includes(type) && (
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-amber-600" />
                        )}
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500 sm:left-6"
                          value={type["@id"]}
                          checked={selectedType.includes(type)}
                          onChange={(e) =>
                            setSelectedPlace(
                              e.target.checked
                                ? [...selectedType, type]
                                : selectedType.filter((p) => p !== type)
                            )
                          }
                        />
                      </td>
                      <td
                        className={classNames(
                          'whitespace-nowrap py-4 pr-3 text-sm font-medium',
                          selectedType.includes(type) ? 'text-amber-600' : 'text-gray-900'
                        )}
                      >
                        {type['name']}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"><ReferenceLinks items={type["places"]} type="Place" /></td>
                      <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link href={`/admin${type["@id"]}/edit`}>
                          <a className="text-amber-600 hover:text-amber-900">
                            Modifier<span className="sr-only">, {type['name']}</span>
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
