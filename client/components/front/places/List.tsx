import { FunctionComponent } from "react";
import Link from "next/link";
import { Place } from "../../../types/Place";

interface Props {
  places: Place[];
}

export const List: FunctionComponent<Props> = ({ places }) => {
  return (
    <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
      {places.map((place) => (
        <div key={place['@id']} className="flex flex-col overflow-hidden rounded-lg shadow-lg">
          <div className="flex-shrink-0">
            <img className="h-48 w-full object-cover" src="" alt="" />
          </div>
          <div className="flex flex-1 flex-col justify-between bg-white p-6">
            <div className="flex-1">
              <p className="text-sm font-medium text-amber-600">
                <a href="#" className="hover:underline">
                  Category name
                </a>
              </p>
              <a href="#" className="mt-2 block">
                <p className="text-xl font-semibold text-gray-900">{place.title}</p>
                <p className="mt-3 text-base text-gray-500">{place.description}</p>
              </a>
            </div>
            <div className="mt-6 flex items-center">
              <div className="flex-shrink-0">
                <a href="#">
                  <span className="sr-only">Author name</span>
                  <img className="h-10 w-10 rounded-full" src="" alt="" />
                </a>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  <a href="#" className="hover:underline">
                    Author name
                  </a>
                </p>
                <div className="flex space-x-1 text-sm text-gray-500">
                  <time dateTime="">Date</time>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
