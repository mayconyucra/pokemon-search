import { useEffect, useState } from "react"


const analizaJSON = (resp) => (resp.json ? resp.json() : resp)

const comprobarRed = (resp) => {
  if (resp.status >= 200 && resp.status < 300) {
    return resp
  }
  return analizaJSON(resp).then(resp => {
    throw resp
  })
}
const encabezado = { "Content-Type": "application/json" }
const App = () => {
  const [word, setword] = useState("")

  const handleChange = (e) => {
    setword(e.target.value)
  }

  const [error, seterror] = useState(null)
  const [datapokemon, setdatapokemon] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    search(word)
  }
  const search = (text) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${text}`, { encabezado, method: "GET" })
      .then(comprobarRed)
      .then(analizaJSON)
      .then(({ ...data }) => setdatapokemon(data))
      .catch((error) => seterror(error))
  }

  useEffect(() => {
    search()
  }, [])
  return (

    <>
      <div className="container py-4 text-light" style={{ height: "100vh"}}>
        <div className="row align-items-center h-100">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <form
              onSubmit={handleSubmit}
              className="form-control"
              style={{ backgroundColor: "transparent", border: "none" }}>
              <input
                className="form-control form-control-lg mb-4 p-3"
                type="search"
                placeholder="Buscar Pokémon"
                name="word"
                style={{ backgroundColor: "transparent", color: "white" }}
                onChange={handleChange} />
              <button className="btn btn-primary btn-lg px-3" type="submit">Buscar</button>
            </form>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <h1 className="text-center display-1"> Buscador de Pokémon</h1>
          </div>
        </div>
      </div>
      <div className="container py-4 bg-success" style={{ height: "100vh" }}>
        {
          datapokemon && datapokemon.length < 1 ?
            <span className="d-block text-center text-light">Cargando...</span>
            :
            <div className="container">
              <h1 className="display-1 text-center text-light"> {datapokemon.name}</h1>
              <h1 className="text-center text-light"> {datapokemon.height}</h1>
              <h1 className="text-center text-light"> {datapokemon.location_area_encounters}</h1>
              <img src={datapokemon.sprites.other.home.front_default}  alt={datapokemon.name} />
            </div>
        }
      </div>

    </>
  )
}

export default App

