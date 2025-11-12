import { PropertyCard } from '@/components/ui/Custom/PropertyCard';
import React from 'react'

const PropertyListing = () => {

    const properties = [
  {
    id: 1,
    title: "3772 Life Camp, Abuja",
    address: "721 S Central Avenue, Life Camp",
    price: "₦15,000,000.00",
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop",
    status: "Pre-sale"
  },
  {
    id: 2,
    title: "Luxury Villa, Maitama",
    address: "45 Diplomatic Drive, Maitama",
    price: "₦85,000,000.00",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop",
    status: "For Sale"
  },
  {
    id: 3,
    title: "Modern Apartment, Wuse 2",
    address: "12 Adetokunbo Ademola Crescent",
    price: "₦32,500,000.00",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&h=600&fit=crop",
    status: "New"
  },
  {
    id: 4,
    title: "Duplex, Gwarinpa",
    address: "8th Avenue, Gwarinpa Estate",
    price: "₦42,000,000.00",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&h=600&fit=crop",
    status: "Hot Deal"
  },
  {
    id: 5,
    title: "Detached House, Asokoro",
    address: "Yakubu Gowon Way, Asokoro",
    price: "₦120,000,000.00",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop",
    status: "Exclusive"
  },
  {
    id: 6,
    title: "Bungalow, Lugbe",
    address: "Airport Road, Lugbe",
    price: "₦18,500,000.00",
    image: "https://images.unsplash.com/photo-1591474200742-8e512e6f98f8?w=800&h=600&fit=crop",
    status: "Pre-sale"
  }
];
  return (
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              title={property.title}
              address={property.address}
              price={property.price}
              image={property.image}
              status={property.status}
            />
          ))}
        </div>
  )
}

export default PropertyListing