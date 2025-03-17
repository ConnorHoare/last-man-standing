'use server'

import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export async function getLeagueDetails() {
    const supabase = await createClient()

    const {data: gameData, error: gameError} = await supabase.from("games").select('*');

    if(gameError) {
        console.log("Error fetching the game");
        redirect("/error")
        return
    }

    return gameData
}