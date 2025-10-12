import type { StaticImageData } from 'next/image'

import cafeDesParents from '@/images/sections/cafe-des-parents/cafe-parent.webp'
import espaceRencontre from '@/images/sections/espace-rencontre/espace-rencontre.jpg'
import espaceRencontre2 from '@/images/sections/espace-rencontre/espace-rencontre-2.jpg'
import mediationEquine from '@/images/sections/mediation-equine/cheval-rencontre-2.jpeg'
import parentalite from '@/images/sections/parentalite/parentalite.webp'
import parentalite2 from '@/images/sections/parentalite/parentalite-2.webp'
import therapies from '@/images/sections/therapies/therapie.webp'

type ImageRegistry = Record<string, StaticImageData>

const registry: ImageRegistry = {
  'cafe-des-parents': cafeDesParents,
  'espace-rencontre': espaceRencontre,
  'espace-rencontre-2': espaceRencontre2,
  'mediation-equine': mediationEquine,
  parentalite,
  'parentalite-2': parentalite2,
  therapies,
}

export function resolveSectionImages(
  entries:
    | Array<{
        imageId?: string | null
        alt?: string | null
      }>
    | null
    | undefined,
) {
  if (!entries) {
    return []
  }

  return entries
    .map((entry) => {
      if (!entry?.imageId) {
        return null
      }

      let image = registry[entry.imageId]
      if (!image) {
        return null
      }

      return {
        image,
        alt: entry.alt ?? '',
        id: entry.imageId,
      }
    })
    .filter(Boolean) as Array<{
    image: StaticImageData
    alt: string
    id: string
  }>
}

