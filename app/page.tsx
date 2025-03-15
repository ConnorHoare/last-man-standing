import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { createGame } from './games/actions'

export default async function Home() {
  const supabase = await createClient()

  let competitions = [];

  try {
    const res = await fetch(`https://v3.football.api-sports.io/leagues/?country=england&type=league`, {
      method: "GET",
      headers: {
        'x-apisports-key': `${process.env.API_FOOTBALL_KEY}`,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    })
    const data = await res.json()

    competitions = data.response.slice(0,17)
    console.log(competitions)
  } catch (error) {
    console.log(error)
  }

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div>
      <form>
        <label>Game Name</label>
        <input name='gameName' type='text' required className='border' />
        <select  name='leagueId' className='border'>
          {competitions.map((comp) => (
            <option value={comp.league.id} key={comp.league.id}>{comp.league.name}</option>
          ))}
        </select>
        <button formAction={createGame}>Create Game</button>
      </form>
    </div>
  )
}