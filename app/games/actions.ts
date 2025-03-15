'use server'

import { createClient } from "@/utils/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createGame(formData: FormData) {
    const supabase = await createClient()

    const gameName = formData.get("gameName") as string
    const leagueId = formData.get("leagueId")

    const { data: userData, error: userError } = await supabase.auth.getUser()

    if (userError) {
        console.error('Sign-up Error:', userError)
        redirect('/error')
        return
    }

    const admin = userData?.user

    const { data: gameData, error: gameError } = await supabase.from("games").insert([
        {
            admin_id: admin.id,
            name: gameName,
            status: "open",
            league: leagueId
        }
    ]).select()

    if (gameError) {
        console.error('No game returned from creatGame')
        redirect('/error')
        return
    }

    revalidatePath('/', "layout")
    redirect('/games')
}

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