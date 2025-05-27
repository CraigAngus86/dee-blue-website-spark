import { deskTool } from 'sanity/desk'

export const structure = (S) =>
  S.list()
    .title('Content')
    .items([
      // News & Media
      S.listItem()
        .title('News & Media')
        .child(
          S.list()
            .title('News & Media')
            .items([
              S.listItem().title('News Articles').child(S.documentTypeList('newsArticle')),
              S.listItem().title('Match Galleries').child(S.documentTypeList('matchGallery')),
            ])
        ),
      // Team
      S.listItem()
        .title('Team')
        .child(
          S.list()
            .title('Team')
            .items([
              S.listItem().title('Player Profiles').child(S.documentTypeList('playerProfile')),
            ])
        ),
        
      // Fan Engagement - Expanded section
      S.listItem()
        .title('Fan Engagement')
        .child(
          S.list()
            .title('Fan Engagement')
            .items([
              S.listItem().title('Fan of the Month').child(S.documentTypeList('fanOfMonth')),
              S.listItem().title('Fan Submissions').child(S.documentTypeList('fanSubmission')),
              S.listItem().title('Fan Photos').child(S.documentTypeList('fanPhoto')),
              S.listItem().title('Fan Polls').child(S.documentTypeList('fanPoll')),
            ])
        ),
      // Commercial
      S.listItem()
        .title('Commercial')
        .child(
          S.list()
            .title('Commercial')
            .items([
              S.listItem().title('Sponsors').child(S.documentTypeList('sponsor')),
              S.listItem().title('Commercial Packages').child(S.documentTypeList('commercialPackage')),
            ])
        ),
      // Stadium
      S.listItem()
        .title('Stadium')
        .child(S.documentTypeList('stadiumInfo')),
    ])
