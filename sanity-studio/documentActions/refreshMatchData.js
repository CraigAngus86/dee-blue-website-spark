import { useState } from 'react'
import { useClient } from 'sanity'

export default function refreshMatchDataAction(props) {
  // Only apply to matchGallery documents
  if (props.type !== 'matchGallery') {
    return null
  }
  
  const [isUpdating, setIsUpdating] = useState(false)
  const doc = props.draft || props.published || {}
  const sanityClient = useClient({apiVersion: '2023-05-03'})

  return {
    label: 'Enter Match Data',
    icon: () => '📋',
    disabled: isUpdating || !doc.matchDate,
    onHandle: async () => {
      if (!doc.matchDate) {
        alert('Please add a match date first')
        props.onComplete()
        return
      }

      setIsUpdating(true)
      
      try {
        const dateObj = new Date(doc.matchDate)
        const yearStr = dateObj.getFullYear().toString().substr(-2)
        const monthStr = (dateObj.getMonth() + 1).toString().padStart(2, '0')
        const dayStr = dateObj.getDate().toString().padStart(2, '0')
        const dateStr = `${yearStr}${monthStr}${dayStr}`
        
        // Prompt for home team
        const homeTeam = prompt('Enter Home Team Name:', '')
        if (!homeTeam) {
          alert('Operation cancelled')
          props.onComplete()
          return
        }
        
        // Prompt for away team
        const awayTeam = prompt('Enter Away Team Name:', '')
        if (!awayTeam) {
          alert('Operation cancelled')
          props.onComplete()
          return
        }
        
        // Generate folder name
        const homeTeamForFolder = homeTeam.replace(/\s+/g, '_')
        const awayTeamForFolder = awayTeam.replace(/\s+/g, '_')
        const folderName = `${dateStr}_${homeTeamForFolder}_${awayTeamForFolder}`
        
        // Make up a match ID (since we can't get it from Supabase)
        const matchId = `manual-${Date.now()}`
        
        // Update document using Sanity client
        await sanityClient
          .patch(doc._id)
          .set({
            supabaseId: matchId,
            homeTeam: homeTeam,
            awayTeam: awayTeam,
            folderName: folderName
          })
          .commit()
        
        alert(`Match data updated: ${homeTeam} vs ${awayTeam}`)
        
        // Reload the page to see the updated data
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
