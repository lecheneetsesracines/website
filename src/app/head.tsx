import avatarImage from '@/images/avatar-new.png'
import image1 from '@/images/photos/image-1.jpg'
import image2 from '@/images/photos/image-2.jpg'
import image3 from '@/images/photos/image-3.jpg'
import image4 from '@/images/photos/image-4.jpg'
import image5 from '@/images/photos/image-5.jpg'
import parentaliteImage from '@/app/sections/parentalite/parentalite.webp'
import therapieImage from '@/app/sections/therapies/therapie.webp'
import cafeParentImage from '@/app/sections/cafe-des-parents/cafe-parent.webp'

export default function Head(): JSX.Element {
  const images = [
    avatarImage,
    image1,
    image2,
    image3,
    image4,
    image5,
    parentaliteImage,
    therapieImage,
    cafeParentImage,
  ]

  return (
    <>
      {images.map((img) => (
        <link key={img.src ?? img} rel="preload" href={img.src ?? img} as="image" />
      ))}
    </>
  )
}
