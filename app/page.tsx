import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  let fixtures = []
  try {
    let res = await fetch(`https://v3.football.api-sports.io/fixtures/rounds?league=39&season=2024&current=true`, {
      method: "GET",
      headers: {
        'x-rapidapi-key': `${process.env.API_FOOTBALL_KEY}`,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    })
    let data = await res.json()
    console.log(data)
  } catch (error) {
    console.log(error)
  }

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return <p>Hello {data.user.id}</p>
}