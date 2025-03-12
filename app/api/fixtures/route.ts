export async function GET(request: Request) {
    let res = await fetch(`https://api-football-v1.p.rapidapi.com/v2/fixtures/rounds/39/current`)
    let data = await res.json()
    console.log(data)
    return Response.json(data)
}