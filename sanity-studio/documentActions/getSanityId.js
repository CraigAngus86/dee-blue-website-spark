import { useState } from 'react'
import { useClient } from 'sanity'

export default function getSanityIdAction(props) {
  // Only apply to newsArticle documents
  if (props.type !== 'newsArticle') {
    return null
  }

  const [isUpdating, setIsUpdating] = useState(false)
  const doc = props.draft || props.published || {}
  const sanityClient = useClient({apiVersion: '2023-05-03'})

  return {
    label: 'Get Document ID',
    icon: () => '🆔',
    disabled: isUpdating || !doc._id,
    onHandle: async () => {
      if (!doc._id) {
        alert('Document must be saved first')
        props.onComplete()
        return
      }

      setIsUpdating(true)
      
      try {
        // Simply set the sanityId field to the document ID
        await sanityClient
          .patch(doc._id)
          .set({
            sanityId: doc._id
          })
          .commit()

        alert(`Document ID copied: ${doc._id}`)
        
        // Reload to see the updated field
        window.location.reload()
      } catch (error) {
        console.error('Error:', error)
        alert(`Error: ${error.message || 'Unknown error'}`)
        props.onComplete()
      } finally {
        setIsUpdating(false)
      }
    }
  }
}
