
// preview.js
import React from 'react'

export default function Preview(props) {
  const {document} = props
  
  // Return a simple preview component
  return (
    <div style={{padding: '1em', background: '#f7f7f7'}}>
      <h2>Content Preview</h2>
      <p>This is a basic preview for document ID: {document && document._id}</p>
      <p>You can customize this preview component to show a live preview of your content.</p>
    </div>
  )
}
