import React, {useState} from 'react'

function Post() {
    const [playersName, setPlayersName] = useState()
    const [rating, setRating] = useState()
    const [position, setPosition] = useState()
    const [team, setTeam] = useState()

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
                const results = await fetch('/api/players', {
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
        <h3>Post a player</h3>
        <form onSubmit={handleSubmit}>
            <input placeholder='player name' value={playersName} required onChange={(e) => setPlayersName(e.target.value)}/>
            <input type="number" required placeholder="rating" value={rating} onChange={(e) => setRating(e.target.value)} min="1" max="99"/>
            <input placeholder='position' value={position} required onChange={(e) => setPosition(e.target.value)}/>
            <input placeholder='team' value={team} required onChange={(e) => setTeam(e.target.value)}/>
            <button type='submit'>Post</button>
        </form>
    </div>
  )
}

export default Post