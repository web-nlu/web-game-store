'use client'
import {useState} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";
import {CldImage} from "next-cloudinary";

type AccountSlideProps = {
  imageGallery: ImageDetail[]
}

export default function AccountDetailSlide({imageGallery}: AccountSlideProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imageGallery.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imageGallery.length - 1 ? 0 : prevIndex + 1
    );
  };
  return (
    <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-4">
      <div className="relative h-96 w-full mb-4 rounded-md overflow-hidden">
        {/* Placeholder for actual image */}
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
          <CldImage alt={`Hình ảnh ${currentImageIndex}`} src={imageGallery[currentImageIndex].image} fill />
        </div>

        {/* Navigation buttons */}
        <button
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 p-2 rounded-full text-white hover:bg-opacity-60"
          onClick={handlePrevImage}
        >
          <ChevronLeftIcon size={24}/>
        </button>
        <button
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-40 p-2 rounded-full text-white hover:bg-opacity-60"
          onClick={handleNextImage}
        >
          <ChevronRightIcon size={24}/>
        </button>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {imageGallery.map((img, index) => (
          <div
            key={img.id}
            className={`h-20 w-20 flex-shrink-0 rounded overflow-hidden cursor-pointer border-2 ${currentImageIndex === index ? 'border-blue-600' : 'border-transparent'}`}
            onClick={() => setCurrentImageIndex(index)}
          >
            {/*<div className="h-full w-full bg-gray-300 flex items-center justify-center">*/}
              <CldImage alt={`Hình ảnh ${index}`} src={img.image} width={200} height={200} crop={'fill'} />
            {/*</div>*/}
          </div>
        ))}
      </div>
    </div>
  )
}