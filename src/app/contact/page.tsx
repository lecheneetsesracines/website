'use client'

import { Container } from '@/components/Container'
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Contact() {
  return (
    <Container className="mt-9">
      <div className="relative isolate bg-white dark:bg-amber-900">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
          <div className="relative px-6 pt-24 pb-20 sm:pt-32 lg:static lg:px-8 lg:py-48">
            <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
              <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-amber-100 ring-1 ring-amber-900/10 lg:w-1/2 dark:bg-amber-900 dark:ring-white/5">
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 size-full stroke-amber-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] dark:stroke-amber-700"
                >
                  <defs>
                    <pattern
                      x="100%"
                      y={-1}
                      id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                      width={200}
                      height={200}
                      patternUnits="userSpaceOnUse"
                    >
                      <path d="M130 200V.5M.5 .5H200" fill="none" />
                    </pattern>
                  </defs>
                  <rect
                    className="fill-amber-50 dark:fill-amber-800"
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                  />
                  <svg
                    x="100%"
                    y={-1}
                    className="overflow-visible fill-amber-50 dark:fill-amber-800"
                  >
                    <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                  </svg>
                  <rect
                    fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                    width="100%"
                    height="100%"
                    strokeWidth={0}
                  />
                </svg>
              </div>
              <h2 className="text-4xl font-semibold tracking-tight text-pretty text-amber-900 sm:text-5xl dark:text-white">
                Contactez-nous
              </h2>
              <dl className="mt-10 space-y-4 text-base/7 text-amber-700 dark:text-amber-300">
                <p className="mt-6 text-xl font-semibold text-amber-700 dark:text-amber-300">
                  Informations de contact :
                </p>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Address</span>
                    <BuildingOffice2Icon
                      aria-hidden="true"
                      className="h-7 w-6 text-amber-400 dark:text-amber-400"
                    />
                  </dt>
                  <dd>
                    <Link
                      className="hover:text-amber-900 dark:hover:text-white"
                      href="https://www.google.com/maps?rlz=1C5CHFA_enFR977FR977&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQRRgnGDsyDAgCECMYJxiABBiKBTINCAMQLhivARjHARiABDIKCAQQABiABBiiBDIHCAUQABjvBTIKCAYQABiABBiiBDIGCAcQRRg80gEHMjEzajBqN6gCALACAA&um=1&ie=UTF-8&fb=1&gl=fr&sa=X&geocode=KaEvb0Gc-uVHMVYUQ6j61y9N&daddr=5+Pl.+Praslin,+77000+Melun"
                    >
                      5 Place Praslin
                      <br />
                      77000 Melun
                    </Link>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Telephone</span>
                    <PhoneIcon
                      aria-hidden="true"
                      className="h-7 w-6 text-amber-400 dark:text-amber-400"
                    />
                  </dt>
                  <dd>
                    <Link
                      href="tel:+33 (0)6 95 60 52 21"
                      className="hover:text-amber-900 dark:hover:text-white"
                    >
                      +33 (0)6 95 60 52 21
                    </Link>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt className="flex-none">
                    <span className="sr-only">Email</span>
                    <EnvelopeIcon
                      aria-hidden="true"
                      className="h-7 w-6 text-amber-400 dark:text-amber-400"
                    />
                  </dt>
                  <dd>
                    <Link
                      href="mailto:lechene77familles@gmail.com"
                      className="hover:text-amber-900 dark:hover:text-white"
                    >
                      lechene77familles@gmail.com
                    </Link>
                  </dd>
                </div>
                <p className="mt-6 text-xl font-semibold text-amber-700 dark:text-amber-300">
                  Horaires d’ouverture au public :
                </p>
                <p className="mt-6 text-lg/8 text-amber-700 dark:text-amber-300">
                  les mardis de 17h à 20h
                  <br />
                  les mercredis de 9h à 18h
                  <br />
                  les vendredis de 17h à 20h
                  <br />
                  les samedis de 9h à 18h
                </p>
                <p className="mt-6 text-lg/8 text-amber-700 dark:text-amber-300">
                  Le secretariat est ouvert les lundis, mardis, jeudis et
                  vendredis de 13h à 18h.
                </p>
                <p className="mt-6 text-xl font-semibold text-amber-700 dark:text-amber-300">
                  Accès depuis la gare de Melun :
                </p>
                <p className="mt-6 text-lg/8 text-amber-700 dark:text-amber-300">
                  Bus 3601 / 3604 arrêt Notre-Dame ou 12min en marchant
                </p>
                <p className="mt-6 text-xl font-semibold text-amber-700 dark:text-amber-300">
                  Direction gare de Melun :
                </p>
                <p className="mt-6 text-lg/8 text-amber-700 dark:text-amber-300">
                  Bus 3603 / 3605 arrêt Praslin Université
                </p>
              </dl>
            </div>
          </div>
          <form
            action="#"
            method="POST"
            className="px-6 pt-20 pb-24 sm:pb-32 lg:px-8 lg:py-48"
            onSubmit={(e) => {
              e.preventDefault()
              const formData = new FormData(e.currentTarget)
              const firstName = formData.get('first-name') || ''
              const lastName = formData.get('last-name') || ''
              const email = formData.get('email') || ''
              const phone = formData.get('phone-number') || ''
              const message = formData.get('message') || ''

              const subject = encodeURIComponent(
                `Demande de contact - ${firstName} ${lastName}`,
              )
              const body = encodeURIComponent(`Bonjour,

Voici mes informations de contact :

Prénom : ${firstName}
Nom : ${lastName}
Email : ${email}
Téléphone : ${phone}

Message :
${message}

Cordialement,
${firstName} ${lastName}`)

              window.location.href = `mailto:lechene77familles@gmail.com?subject=${subject}&body=${body}`
            }}
          >
            <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
              <iframe
                className="mb-9 w-full rounded-lg border-0 shadow-sm dark:border-green-700"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2641.8169636297253!2d2.655250877706947!3d48.53673937129036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e5fa9c416f2fa1%3A0x4d2fd7faa8431456!2sLE%20CH%C3%8ANE%20ET%20SES%20RACINES!5e0!3m2!1sfr!2sfr!4v1746603563142!5m2!1sfr!2sfr"
                width="400"
                height="250"
                loading="lazy"
              />
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm/6 font-semibold text-amber-900 dark:text-white"
                  >
                    Prénom
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="first-name"
                      name="first-name"
                      type="text"
                      autoComplete="given-name"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-amber-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-amber-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-amber-500"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm/6 font-semibold text-amber-900 dark:text-white"
                  >
                    Nom de famille
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="last-name"
                      name="last-name"
                      type="text"
                      autoComplete="family-name"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-amber-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-amber-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-amber-500"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm/6 font-semibold text-amber-900 dark:text-white"
                  >
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-amber-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-amber-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-amber-500"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone-number"
                    className="block text-sm/6 font-semibold text-amber-900 dark:text-white"
                  >
                    Numéro de téléphone
                  </label>
                  <div className="mt-2.5">
                    <input
                      id="phone-number"
                      name="phone-number"
                      type="tel"
                      autoComplete="tel"
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-amber-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-amber-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-amber-500"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm/6 font-semibold text-amber-900 dark:text-white"
                  >
                    Message
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-amber-900 outline-1 -outline-offset-1 outline-zinc-300 placeholder:text-amber-400 focus:outline-2 focus:-outline-offset-2 focus:outline-teal-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-amber-500"
                      defaultValue={''}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-teal-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-green-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:bg-green-600 dark:hover:bg-green-700 dark:focus-visible:outline-green-500"
                >
                  Envoyer
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Container>
  )
}
