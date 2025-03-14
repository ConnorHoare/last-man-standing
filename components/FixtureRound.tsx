import Image from 'next/image'
import React from 'react'
import TeamSelection from './TeamSelection'

const FixtureRound = async () => {
    let fixtures = []
  let fixtureData
  try {
    const res = await fetch(`http://api.football-data.org/v4/competitions/PL/matches/?matchday=29&status=SCHEDULED`, {
      method: "GET",
      headers: {
        'X-Auth-Token': `${process.env.FOOTBALL_API_KEY}`,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    })
    const data = await res.json()
    fixtures = data.matches
    fixtureData = data
    console.log(fixtureData)
  } catch (error) {
    console.log(error)
  }
  return (
    <div><div>
    <ul>
      <h2>Matchday {fixtureData.filters.matchday}</h2>
      {fixtures.map((game) => (
        <li key={game.id} className='flex items-center'>
          <div className='flex items-center'>
            <div>
            {game.homeTeam.name}
            </div>
            <div className='w-[45px] h-[45px] relative'>
              <Image src={game.homeTeam.crest} fill objectFit='contain' alt='crest'/>
            </div>
          </div>
          <p>vs</p>
          <div className='flex items-center'>
            <div className='w-[45px] h-[45px] relative'>
              <Image src={game.awayTeam.crest} fill objectFit='contain' alt='crest'/>
            </div>
            <div>
            {game.awayTeam.name}
            </div>
          </div>
        </li>
      ))}
    </ul>
    <TeamSelection fixtures={fixtures} />
  </div></div>
  )
}

export default FixtureRound