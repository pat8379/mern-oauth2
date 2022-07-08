import React, {useState} from 'react'

function Delete() {
    const [name, setName] = useState()

    const handleDel = async (e) => {
        e.preventDefault()
        try {
            const results = await fetch(`/api/players/${name}`, {
                method: 'DELETE'
            })
            const response = await results.json()
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <h3>Delete a player</h3>
        <form onSubmit={handleDel}>
            <input value={name} placeholder='player name' onChange={(e) => setName(e.target.value)} required/>
            <button type='submit'>delete</button>
        </form>
    </div>
  )
}

export default Delete