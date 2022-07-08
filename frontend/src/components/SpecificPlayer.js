import React, {useState} from 'react'

function SpecificPlayer() {
    const [playersName, setPlayersName] = useState()
    const [rating, setRating] = useState()
    const [position, setPosition] = useState()
    const [team, setTeam] = useState()

    const [allResults, setAllResults] = useState()
    const [errorRes, setErrorRes] = useState()

    const handleGetAll = async (e) => {
        e.preventDefault()
        try {
            const results = await fetch('/api/players/account/specificPlayer')

            if (results.status === 401) {
                setErrorRes("Unauthorized")
                return
            }

            const response = await results.json()  

            if (response.message) {
                setErrorRes(response.message)
                return
            } else {
                setErrorRes()
                const temporaryResults = response.map(element => {
                    return {
                        playersName: element.playersName,
                        rating: element.rating,
                        position: element.position,
                        team: element.team
                    }
                });
                setAllResults(temporaryResults)
            }

            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (playersName && rating && position && team) {
            try {
                const body = {
                    playersName,
                    rating: Number(rating),
                    position,
                    team
                }
                const results = await fetch('/api/players/specificPlayer', {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body)
                })
                const response = await results.json()
                console.log(response)
                // console.log(results)
            } catch (error) {
                console.log(error)
            }
        } else {
            console.log('at least one of the fields is empty')
        }
    }

  return (
    <div>
        <h3>Get all players on your account</h3>
        <button onClick={handleGetAll}>fetch</button>
        {allResults && allResults.map((n) => (
            <p>{n.playersName} - {n.rating} - {n.position} - {n.team}</p>
        ))}
        {errorRes && <p>{errorRes}</p>}
        <h3>Add a player to your account</h3>
        <form onSubmit={handleSubmit}>
            <input placeholder='player name' value={playersName} required onChange={(e) => setPlayersName(e.target.value)}/>
            <input type="number" required placeholder="rating" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="99"/>
            <input placeholder='position' value={position} required onChange={(e) => setPosition(e.target.value)}/>
            <input placeholder='team' value={team} required onChange={(e) => setTeam(e.target.value)}/>
            <button type='submit'>Add</button>
        </form>
    </div>
  )
}

export default SpecificPlayer