import React, { useState } from 'react'


function GetAll() {
    const [name, setName] = useState()
    const [allResults, setAllResults] = useState()
    const [errorRes, setErrorRes] = useState()

    const handleGetAll = async (e) => {
        // setAllResults([])
        e.preventDefault()
        try {
            const results = await fetch('/api/players')
            const response = await results.json()    
            // console.log(results.status)
            if (results.status === 200) {
                setErrorRes()
                const temporaryResults = response.map(element => {
                    return {
                        playersName: element.playersName,
                        rating: element.rating,
                        position: element.position,
                        team: element.team
                    }
                });
                // console.log(temporaryResults)
                setAllResults(temporaryResults)
            } else {
                setErrorRes(response.msg)
            }
            console.log(response)
            // console.log(response.status)
        } catch (error) {
            console.log(error)
        }
    }

    const handleGet = async (e) => {
        e.preventDefault()
        try {
            const results = await fetch(`/api/players/${name}`)
            const response = await results.json()
            console.log(response)
            // console.log('hi')
            console.log(response[0].playersName)
            
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <h3>Get all players</h3>
        <button onClick={handleGetAll}>fetch</button>
        {allResults && allResults.map((n) => (
            <p>{n.playersName} - {n.rating} - {n.position} - {n.team}</p>
        ))}
        {errorRes && <p>{errorRes}</p>}
        <h3>Get individually</h3>
        <form onSubmit={handleGet}>
            <input value={name} placeholder='player name' onChange={(e) => setName(e.target.value)} required/>
            <button type='submit'>fetch</button>
        </form>
    </div>
  )
}

export default GetAll