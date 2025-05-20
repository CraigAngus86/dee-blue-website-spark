import { useState } from 'react'
import { useClient } from 'sanity'

export default function generateFolderNameAction(props) {
  // Only apply to matchGallery documents
  if (props.type !== 'matchGallery') {
    return null
  }
  
  const [isGenerating, setIsGenerating] = useState(false)
  const doc = props.draft || props.published || {}
  const sanityClient = useClient({apiVersion: '2023-05-03'})

  return {
    label: 'Generate Names',
    icon: () => '📁',
    disabled: isGenerating || !doc.matchDate || !doc.homeTeam || !doc.awayTeam,
    onHandle: async () => {
      if (!doc.matchDate || !doc.homeTeam || !doc.awayTeam) {
        alert('Please add match date, home team, and away team first')
        props.onComplete()
        return
      }

      setIsGenerating(true)
      
      try {
        // Parse the date
        const dateObj = new Date(doc.matchDate)
        
        // Format for folder name (yymmdd)
        const yearStr = dateObj.getFullYear().toString().substr(-2)
        const monthStr = (dateObj.getMonth() + 1).toString().padStart(2, '0')
        const dayStr = dateObj.getDate().toString().padStart(2, '0')
        const dateStr = `${yearStr}${monthStr}${dayStr}`
        
        // Format for title (dd-mm-yyyy)
        const titleDateStr = `${dayStr}-${monthStr}-${dateObj.getFullYear()}`
        
        // Get team names
        const homeTeamName = doc.homeTeam
        const awayTeamName = doc.awayTeam
        
        // Format for folder name
        const homeTeamForFolder = homeTeamName.replace(/\s+/g, '_').replace(/'/g, '')
        const awayTeamForFolder = awayTeamName.replace(/\s+/g, '_').replace(/'/g, '')
        
        // Generate folder name and title
        const folderName = `${dateStr}_${homeTeamForFolder}_${awayTeamForFolder}`
        const title = `${homeTeamName} v ${awayTeamName} - ${titleDateStr}`
        
        // Update document
        await sanityClient
          .patch(doc._id)
          .set({
            folderName: folderName,
            title: title,
            sanityId: doc._id,
          })
          .commit()
        
        alert(`Names generated:\n\nTitle: ${title}\nFolder: ${folderName}\nSanity ID: ${doc._id}`)
        
        // Reload to see changes
        window.location.reload()
      } catch (error) {
        console.error('Error generating names:', error)
        alert(`Error: ${error.message || 'Unknown error'}`)
        props.onComplete()
      } finally {
        setIsGenerating(false)
      }
    }
  }
}
