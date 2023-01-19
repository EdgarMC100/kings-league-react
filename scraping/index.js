import * as cheerio from 'cheerio'

const URLS = {
  leaderboard: 'https://kingsleague.pro/estadisticas/clasificacion/'
}

async function scraper (url) {
  const res = await fetch(url)
  const htmlString = await res.text()
  // Create a querying function, bound to a document created from the provided markup.
  const cheerioAPI = cheerio.load(htmlString)
  return cheerioAPI
}

async function getLeaderBoard () {
  const $ = await scraper(URLS.leaderboard)
  const $rows = $('table tbody tr')

  $rows.each((index, el) => {
    const $el = $(el)
    const rowTeam = $el.find('.fs-table-text_3').text().trim()
    const rowVictories = $el.find('.fs-table-text_4').text().trim()
    const rowLoses = $el.find('.fs-table-text_5').text()
    const rowGoalsScored = $el.find('.fs-table-text_6').text()
    const rowGoalsConceded = $el.find('.fs-table-text_7').text()
    const rowCardsYellow = $el.find('.fs-table-text_8').text()
    const rowCardsRed = $el.find('.fs-table-text_9').text()
    console.log({ rowTeam, rowVictories, rowLoses, rowGoalsScored, rowGoalsConceded, rowCardsYellow, rowCardsRed })
  })
}

// const leaderBoard = [
//   {
//     team: 'Team 1',
//     victories: 0,
//     loses: 0,
//     goalsScored: 0,
//     goalsConceded: 0,
//     cardsYellow: 0,
//     cardsRed: 0
//   }
// ]

await getLeaderBoard()
