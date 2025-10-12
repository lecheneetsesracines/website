'use client'

interface ContactFormProps {
  emailHref: string
  mapEmbedUrl?: string
}

export function ContactForm({ emailHref, mapEmbedUrl }: ContactFormProps) {
  return (
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

        const target = emailHref || 'mailto:lechene77familles@gmail.com'
        const separator = target.includes('?') ? '&' : '?'
        window.location.href = `${target}${separator}subject=${subject}&body=${body}`
      }}
    >
      <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
        {mapEmbedUrl ? (
          <iframe
            className="mb-9 w-full rounded-lg border-0 shadow-sm dark:border-green-700"
            src={mapEmbedUrl}
            width="400"
            height="250"
            loading="lazy"
          />
        ) : null}
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
  )
}

