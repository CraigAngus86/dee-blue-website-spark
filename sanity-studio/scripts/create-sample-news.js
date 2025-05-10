import { createClient } from '@sanity/client'

// Create a client
const client = createClient({
  projectId: 'gxtptap2',
  dataset: 'production',
  token: 'sk4okIOCzdhNUk2eyKVkbZ6g11Fk4vaPKiyJr8nPsMWqGvhumaPjNxVvN5bRsMuzVNLV8iJSMgeDe3tTHGpYYnzyQZE2T4n66Psc20XqqD63y2zAhWfQFBWYaJW9oyzkV0TbWpbvBrbcZ7jRXkPIO8BuApT5QTnsfZo9Y2f8QqtEgZ1h7asc',
  useCdn: false,
  apiVersion: '2021-10-21'
})

// Sample news articles
const sampleArticles = [
  {
    _type: 'newsArticle',
    title: 'Banks o\' Dee Secure Vital Win Against Lossiemouth',
    slug: {
      _type: 'slug',
      current: 'win-against-lossiemouth-april-2025'
    },
    publishedAt: new Date().toISOString(),
    category: 'matchReport',
    excerpt: 'Banks o\' Dee FC claimed a crucial 2-1 victory away at Lossiemouth FC to strengthen their position in the Highland League.',
    author: 'Club Reporter',
    isFeature: true,
    body: [
      {
        _type: 'block',
        style: 'normal',
        _key: 'intro123',
        children: [
          {
            _type: 'span',
            _key: 'intro123span',
            text: 'Banks o\' Dee FC secured an important 2-1 win away at Lossiemouth on Saturday, moving the club up to fourth position in the Highland League table. The team showed great determination throughout the match, with a spectacular late goal sealing all three points.'
          }
        ],
        markDefs: []
      },
      {
        _type: 'block',
        style: 'normal',
        _key: 'para1',
        children: [
          {
            _type: 'span',
            _key: 'para1span',
            text: 'Manager Paul Lawson praised the team\'s performance, highlighting the defensive resilience shown throughout the match. "We knew it would be a tough away fixture, but the lads showed great character today. This win gives us momentum heading into next week\'s match against Forres Mechanics."'
          }
        ],
        markDefs: []
      }
    ]
  },
  {
    _type: 'newsArticle',
    title: 'Upcoming Highland Derby: Banks o\' Dee vs Forres Mechanics',
    slug: {
      _type: 'slug',
      current: 'upcoming-highland-derby-forres'
    },
    publishedAt: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
    category: 'matchReport',
    excerpt: 'Preview of the upcoming home match against Forres Mechanics at Spain Park on April 12th.',
    author: 'Club Media Team',
    body: [
      {
        _type: 'block',
        style: 'normal',
        _key: 'intro456',
        children: [
          {
            _type: 'span',
            _key: 'intro456span',
            text: 'Banks o\' Dee FC will face Forres Mechanics in a much-anticipated Highland League clash at Spain Park on April 12th. Following our recent victory against Lossiemouth, the team will be looking to continue their good form and strengthen their position in the league table.'
          }
        ],
        markDefs: []
      }
    ]
  },
  {
    _type: 'newsArticle',
    title: 'Youth Academy Trials Announced for Summer 2025',
    slug: {
      _type: 'slug',
      current: 'youth-academy-trials-summer-2025'
    },
    publishedAt: new Date(Date.now() - 5 * 86400000).toISOString(), // 5 days ago
    category: 'clubNews',
    excerpt: 'Banks o\' Dee FC is excited to announce summer trials for our expanding youth academy program.',
    author: 'Youth Development Officer',
    body: [
      {
        _type: 'block',
        style: 'normal',
        _key: 'youthintro',
        children: [
          {
            _type: 'span',
            _key: 'youthintrospan',
            text: 'Following the successful launch of our comprehensive youth academy program, Banks o\' Dee FC is pleased to announce summer trials for young players aged 8-16. The trials will take place at our Spain Park facility, which features our FIFA-standard 3G artificial pitch.'
          }
        ],
        markDefs: []
      }
    ]
  },
  {
    _type: 'newsArticle',
    title: 'Spain Park Hospitality Packages Now Available',
    slug: {
      _type: 'slug',
      current: 'spain-park-hospitality-packages'
    },
    publishedAt: new Date(Date.now() - 7 * 86400000).toISOString(), // 7 days ago
    category: 'commercialNews',
    excerpt: 'Experience the best of Highland League football with our premium matchday hospitality packages.',
    author: 'Commercial Department',
    body: [
      {
        _type: 'block',
        style: 'normal',
        _key: 'hospintro',
        children: [
          {
            _type: 'span',
            _key: 'hospintrospan',
            text: 'Banks o\' Dee FC is proud to announce the launch of our new hospitality packages at Spain Park for the remainder of the 2024/25 season. These packages offer an enhanced matchday experience with premium seating, catering, and the opportunity to meet players after the match.'
          }
        ],
        markDefs: []
      }
    ]
  }
]

// Create the documents
async function createSampleArticles() {
  console.log('Creating sample news articles...')
  
  for (const article of sampleArticles) {
    try {
      console.log(`Creating article: "${article.title}"`)
      await client.create(article)
    } catch (err) {
      console.error(`Error creating article "${article.title}":`, err.message)
    }
  }
  
  console.log('Finished creating sample articles')
}

// Run the function
createSampleArticles()
