import React from 'react'
import { getLeagueDetails } from './actions'
import Image from 'next/image'

const page = async () => {

    const games = await getLeagueDetails()
    console.log(games)

    return (
        <div>
            <div className='flex gap-4 '>
                {games?.map((game) => (
                    <div key={game.id}>
                        <p>Name: {game.name}</p>
                        <p>Status: {game.status}</p>
                        <p>League ID: {game.league}</p>
                        <Image src={`https://media.api-sports.io/football/leagues/${game.league}.png`} height={50} width={50} alt="league logo" />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page