'use client'
import React, { useState } from 'react'

const TeamSelection = ({ fixtures }) => {
    const [selectedTeam, setSelectedTeam] = useState(null)
    const allTeams = fixtures.flatMap(fix => [
        fix.homeTeam.name,
        fix.awayTeam.name
    ])

    console.log(allTeams)

    const handleChange = (event) => {
        setSelectedTeam(event.target.value)
        console.log(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(`You have selected the team, ${selectedTeam}`)
    }

    
    return (
        <div>
            <h2>Select your team for this round</h2>
            <form>
                <select onChange={handleChange}>
                    {allTeams.map((team) => (
                        <option value={team} key={team}>{team}</option>
                    ))}
                </select>
                <button onClick={handleSubmit}>Submit Pick</button>
            </form>
        </div>
    )
}

export default TeamSelection