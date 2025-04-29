export default {
    name: 'bodyContent',
    title: 'Body Content',
    type: 'array',
    of: [
      {
        type: 'block',
        styles: [
          {title: 'Normal', value: 'normal'},
          {title: 'H2', value: 'h2'},
          {title: 'H3', value: 'h3'},
          {title: 'H4', value: 'h4'},
          {title: 'Quote', value: 'blockquote'}
        ],
        marks: {
          decorators: [
            {title: 'Strong', value: 'strong'},
            {title: 'Emphasis', value: 'em'},
            {title: 'Underline', value: 'underline'},
            {title: 'Strike', value: 'strike-through'}
          ],
          annotations: [
            {
              name: 'link',
              type: 'object',
              title: 'Link',
              fields: [
                {
                  name: 'href',
                  type: 'url',
                  title: 'URL',
                  validation: Rule => Rule.uri({
                    scheme: ['http', 'https', 'mailto', 'tel']
                  })
                },
                {
                  name: 'blank',
                  type: 'boolean',
                  title: 'Open in new tab',
                  initialValue: true
                }
              ]
            }
          ]
        }
      },
      {
        type: 'image',
        options: {
          hotspot: true
        },
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: 'Alternative text',
            description: 'Important for SEO and accessibility',
            validation: Rule => Rule.required()
          },
          {
            name: 'caption',
            type: 'string',
            title: 'Caption',
            description: 'Caption displayed below the image'
          }
        ]
      },
      {
        type: 'object',
        name: 'youtubeEmbed',
        title: 'YouTube Embed',
        fields: [
          {
            name: 'url',
            type: 'url',
            title: 'YouTube URL',
            validation: Rule => Rule.required()
          },
          {
            name: 'caption',
            type: 'string',
            title: 'Caption'
          }
        ],
        preview: {
          select: {
            url: 'url',
            caption: 'caption'
          },
          prepare({url, caption}) {
            return {
              title: caption || 'YouTube Video',
              subtitle: url
            }
          }
        }
      },
      {
        type: 'object',
        name: 'callout',
        title: 'Callout Box',
        fields: [
          {
            name: 'content',
            type: 'text',
            rows: 4,
            title: 'Content'
          },
          {
            name: 'type',
            type: 'string',
            title: 'Type',
            options: {
              list: [
                {title: 'Info', value: 'info'},
                {title: 'Warning', value: 'warning'},
                {title: 'Success', value: 'success'},
                {title: 'Highlight', value: 'highlight'}
              ],
              layout: 'radio',
              direction: 'horizontal'
            },
            initialValue: 'info'
          }
        ],
        preview: {
          select: {
            content: 'content',
            type: 'type'
          },
          prepare({content, type}) {
            return {
              title: `${type.charAt(0).toUpperCase() + type.slice(1)} Callout`,
              subtitle: content
            }
          }
        }
      },
      {
        type: 'object',
        name: 'statistic',
        title: 'Statistic',
        fields: [
          {
            name: 'value',
            type: 'string',
            title: 'Value',
            description: 'E.g., "73%", "2,500"',
            validation: Rule => Rule.required()
          },
          {
            name: 'label',
            type: 'string',
            title: 'Label',
            description: 'Description of what the value represents',
            validation: Rule => Rule.required()
          },
          {
            name: 'description',
            type: 'text',
            rows: 2,
            title: 'Description',
            description: 'Additional context for this statistic'
          }
        ],
        preview: {
          select: {
            value: 'value',
            label: 'label'
          },
          prepare({value, label}) {
            return {
              title: `Statistic: ${value}`,
              subtitle: label
            }
          }
        }
      }
    ]
  }