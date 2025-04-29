export default {
    name: 'location',
    title: 'Location',
    type: 'object',
    fields: [
      {
        name: 'address',
        title: 'Full Address',
        type: 'text',
        rows: 3,
        validation: Rule => Rule.required()
      },
      {
        name: 'coordinates',
        title: 'Coordinates',
        type: 'object',
        fields: [
          {
            name: 'latitude',
            title: 'Latitude',
            type: 'number',
            validation: Rule => Rule.required().precision(6)
          },
          {
            name: 'longitude',
            title: 'Longitude',
            type: 'number',
            validation: Rule => Rule.required().precision(6)
          }
        ]
      },
      {
        name: 'googleMapsUrl',
        title: 'Google Maps URL',
        type: 'url',
        description: 'Direct link to this location on Google Maps'
      }
    ],
    preview: {
      select: {
        address: 'address',
        lat: 'coordinates.latitude',
        lng: 'coordinates.longitude'
      },
      prepare({address, lat, lng}) {
        return {
          title: address,
          subtitle: lat && lng ? `${lat}, ${lng}` : 'Coordinates not set'
        }
      }
    }
  }