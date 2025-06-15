// GOD Document Content - Organized by Section for Admin Reference

export const GOD_CONTENT = {
  executiveSummary: {
    purpose: "Novice-friendly admin dashboard enabling non-technical staff to manage all website content without Sanity CMS knowledge or backend access.",
    businessValue: ["Task delegation", "Workflow efficiency", "Consistent formatting", "Revenue optimization"]
  },
  
  highFrequency: [
    { name: "News Article Creation", frequency: "Twice weekly minimum", priority: "🔥" },
    { name: "Match Result Updates", frequency: "Every Saturday + midweek games", priority: "🔥" },
    { name: "Fan Photo Moderation", frequency: "Ongoing submissions need quick approval", priority: "🔥" }
  ],
  
  mediumFrequency: [
    { name: "Match Gallery Upload", frequency: "After every home match", priority: "⚡" },
    { name: "Commercial Enquiry Management", frequency: "Sporadic but time-sensitive", priority: "⚡" },
    { name: "Fan of the Month Features", frequency: "Monthly cycle management", priority: "⚡" }
  ],
  
  lowFrequency: [
    { name: "Player Profile Updates", frequency: "Transfer windows, season start", priority: "📅" },
    { name: "Sponsor Management", frequency: "Contract renewals, new partnerships", priority: "📅" },
    { name: "Poll Creation & Management", frequency: "Monthly engagement campaigns", priority: "📅" },
    { name: "Team/Competition Data", frequency: "Season setup, occasional updates", priority: "📅" },
    { name: "Stadium/Commercial Content", frequency: "Rare updates to static content", priority: "📅" }
  ],
  
  technicalNotes: {
    supabase: "166 matches need pagination, 37 teams need searchable dropdowns, UUID linking systems",
    sanity: "11 document types, complex moderation workflows, cross-system integration",
    cloudinary: "Auto-folder creation, naming: DDMMYY_HomeTeam_AwayTeam"
  }
};
