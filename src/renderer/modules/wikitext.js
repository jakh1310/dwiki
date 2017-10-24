const wt = {}

const htmlEscape = [
  { type: 'lt', regex: /</g, replace: "&lt;" },
  { type: 'gt', regex: />/g, replace: "&gt;" }
]

const reg = [
  { type: 'bold-italics', regex: /'{5}([^'].*?[^'])'{5}(?!')/g, replace: "<span class='bold italics'>$1</span>" }, // boldit
  { type: 'bold', regex: /'{3}([^'].*?[^'])'{3}(?!')/g, replace: "<span class='bold'>$1</span>" }, // bold
  { type: 'italics', regex: /'{2}([^'].*?[^'])'{2}(?!')/g, replace: "<span class='italics'>$1</span>" }, // italics
  { type: 'named-local', regex: /\[{2}([^\]\n]+)\|([^\]\n]+)\]{2}/g, replace: "<a href='#/article/$1'>$2</a>" }, // named local
  { type: 'local', regex: /\[{2}([^\]\n]+)\]{2}/g, replace: "<a href='#/article/$1'>$1</a>" }, // link
  { type: 'named-link', regex: /\[([^\]\n\s]+)\s([^\]\n]+)\](?!\])/g, replace: "<a href='$1' class='ext' target='_blank'>$2</a>" }, // namedSite
  { type: 'link', regex: /\[([^\]\n\s]+)\](?!\])/g, replace: "<a href='$1' class='ext' target='_blank'>$1</a>" }, // website
  { type: 'strike', regex: /~~(.+?)~~/g, replace: "<span class='strike'>$1</span>" }, // strike
  { type: 'underline', regex: /__(.+?)__/g, replace: "<span class='underline'>$1</span>" }, // underline
  { type: 'hidden', regex: /(?:<!--)(.*?)(?:-->)/g, replace: "" }, // hidden
  { type: 'paragraph', regex: /((?:[^\n][\n]?)+)/gm, replace: "<p>$1</p>" }, // paragraph
  { type: 'h4', regex: /(?:<p>)={4}([^=].*?[^=])={4}(?!\=)(?:[\n]?<\/p>)/g, replace: "<h4>$1</h4>" }, // h4 -- hacky but works
  { type: 'h3', regex: /(?:<p>)={3}([^=].*?[^=])={3}(?!\=)(?:[\n]?<\/p>)/g, replace: "<h3>$1</h3>" }, // h3 -- hacky but works
  { type: 'h2', regex: /(?:<p>)={2}([^=].*?[^=])={2}(?!\=)(?:[\n]?<\/p>)/g, replace: "<h2>$1</h2><hr>" } // h2 -- hacky but works
]

// Process all the regex replacements
wt.process = function (string) {
  let str = string
  // Escape all HTML tags
  htmlEscape.forEach((item) => {
    str = str.replace(item.regex, item.replace)
  })

  // Format rest of the document
  reg.forEach((item) => {
    str = str.replace(item.regex, item.replace)
  })

  return str
}

// Format titles to not include spaces or punctuation other than
// '_', '-', '(', ')'
wt.formatTitle = function (string) {
  let str = string
  str = str.toLowerCase().replace(/\s/g, '_').replace(/[^\w\-\(\)]/g, '')

  return str
}

export default wt