import type { NextPage } from 'next'
import { Layout } from "../components/front/Layout";
import Link from "next/link";
import Image from 'next/image';
import hero from '../images/dog-walk.jpg';
import banner from '../images/dog-walk-2.jpg';

import {
  SparklesIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline'

const metrics = [
  { id: 1, stat: '50+', emphasis: 'Lieux', rest: 'disponibles' },
  { id: 2, stat: '100+', emphasis: 'Membres', rest: 'inscrits' },
  { id: 3, stat: '10+', emphasis: 'Villes', rest: 'différentes' },
  { id: 4, stat: '10+', emphasis: 'Balades', rest: 'en cours d\'organisation' },
]

const Home: NextPage = () => {

  return (
    <Layout>
      <div className="relative">
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              <Image
                src={hero}
                className="h-full w-full object-cover"
                alt="Dog walking"
                placeholder="blur"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-800 to-amber-700 mix-blend-multiply" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
              <h1 className="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                <span className="block text-white">Trouver une balade n'a jamais été</span>
                <span className="block text-amber-200">aussi simple</span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-amber-200 sm:max-w-3xl">
                Trouver un lieu qui vous correspond à vous et votre chien, organiser une balade simplement.
              </p>
              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                  <Link
                    href="/places"
                    className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-amber-700 shadow-sm hover:bg-amber-50 sm:px-8"
                  >
                    Voir les lieux
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center rounded-md border border-transparent bg-amber-500 bg-opacity-60 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8"
                  >
                    S'inscrire
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-100">
      </div>

      <div className="relative overflow-hidden pt-16 pb-32">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-gray-100" />
        <div className="relative">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div className="mx-auto max-w-xl px-4 sm:px-6 lg:mx-0 lg:max-w-none lg:py-16 lg:px-0">
              <div>
                <div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-r from-orange-600 to-amber-600">
                      <MapPinIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">Trouver un lieu</h2>
                  <p className="mt-4 text-lg text-gray-500">Trouver un lieu qui vous correspond à vous et à votre chien grâce à notre algorithme de recherche puissant.</p>
                  <div className="mt-6">
                    <Link
                      href="/places"
                      className="inline-flex rounded-md border border-transparent bg-gradient-to-r from-orange-600 to-amber-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-orange-700 hover:to-amber-700"
                    >
                      Trouver un lieu
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:mt-0">
              <div className="-mr-48 pl-4 sm:pl-6 md:-mr-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                <img
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="https://tailwindui.com/img/component-images/inbox-app-screenshot-1.jpg"
                  alt="Inbox user interface"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-24">
          <div className="lg:mx-auto lg:grid lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div className="mx-auto max-w-xl px-4 sm:px-6 lg:col-start-2 lg:mx-0 lg:max-w-none lg:py-32 lg:px-0">
              <div>
                <div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-r from-orange-600 to-amber-600">
                      <SparklesIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </span>
                </div>
                <div className="mt-6">
                  <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                    Organiser une balade
                  </h2>
                  <p className="mt-4 text-lg text-gray-500">Trouver des personnes pour organiser une balade facilement. Discutez avec les membres de la plateforme.</p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="inline-flex rounded-md border border-transparent bg-gradient-to-r from-orange-600 to-amber-600 bg-origin-border px-4 py-2 text-base font-medium text-white shadow-sm hover:from-orange-700 hover:to-amber-700"
                    >
                      Voir les balades en cours
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-12 sm:mt-16 lg:col-start-1 lg:mt-0">
              <div className="-ml-48 pr-4 sm:pr-6 md:-ml-16 lg:relative lg:m-0 lg:h-full lg:px-0">
                <img
                  className="w-full rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                  src="https://tailwindui.com/img/component-images/inbox-app-screenshot-2.jpg"
                  alt="Customer profile user interface"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-gray-900">
        <div className="absolute inset-x-0 bottom-0 h-80 xl:top-0 xl:h-full">
          <div className="h-full w-full xl:grid xl:grid-cols-2">
            <div className="h-full xl:relative xl:col-start-2">
              <Image
                className="h-full w-full object-cover opacity-25 xl:absolute xl:inset-0"
                src={banner}
                alt="Two dogs walking in forest"
                placeholder="blur"
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gray-900 xl:inset-y-0 xl:left-0 xl:h-full xl:w-32 xl:bg-gradient-to-r"
              />
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 xl:grid xl:grid-flow-col-dense xl:grid-cols-2 xl:gap-x-8">
          <div className="relative pt-12 pb-64 sm:pt-24 sm:pb-64 xl:col-start-1 xl:pb-24">
            <h2 className="text-base font-semibold">
                <span className="bg-gradient-to-r from-orange-300 to-amber-300 bg-clip-text text-transparent">
                  Statistiques
                </span>
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-white">
              Disponible sur la plateforme
            </p>
            <p className="mt-5 text-lg text-gray-300">
              De nombreux lieux sont déjà disponibles sur StrollDog, n'attendez plus pour ajouter les vôtres !
            </p>
            <div className="mt-12 grid grid-cols-1 gap-y-12 gap-x-6 sm:grid-cols-2">
              {metrics.map((item) => (
                <p key={item.id}>
                  <span className="block text-2xl font-bold text-white">{item.stat}</span>
                  <span className="mt-1 block text-base text-gray-300">
                      <span className="font-medium text-white">{item.emphasis}</span> {item.rest}
                    </span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-4xl py-16 px-4 sm:px-6 sm:py-24 lg:flex lg:max-w-7xl lg:items-center lg:justify-between lg:px-8">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            <span className="block">Prêt à commencer ?</span>
            <span className="-mb-1 block bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text pb-1 text-transparent">
              Créer un compte
              </span>
          </h2>
          <div className="mt-6 space-y-4 sm:flex sm:space-y-0 sm:space-x-5">
            <a
              href="#"
              className="flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-orange-600 to-amber-600 bg-origin-border px-4 py-3 text-base font-medium text-white shadow-sm hover:from-orange-700 hover:to-amber-700"
            >
              En savoir plus
            </a>
            <Link
              href="/register"
              className="flex items-center justify-center rounded-md border border-transparent bg-amber-50 px-4 py-3 text-base font-medium text-amber-800 shadow-sm hover:bg-amber-100"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Home
