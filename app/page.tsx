import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import Image from 'next/image'

export default async function Home() {
  const supabase = await createClient()
  let fixtures = []
  let fixtureData = {}
  try {
    let res = await fetch(`http://api.football-data.org/v4/competitions/PL/matches/?matchday=29&status=SCHEDULED`, {
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

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div>
      <div>
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
      </div>
    </div>
  )
}