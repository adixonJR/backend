import { useState } from 'react'
import './App.css'

function App() {
  const preguntas = [
    {
      pregunta: "¿Cuál es mi comida favorita?",
      opciones: ["Pollo a la brasa", "Pizza", "Ceviche", "Tallarines con Atun"],
      respuesta: "Tallarines con Atun"
    },
    {
      pregunta: "¿Qué cosa me pone de mal humor rápidamente?",
      opciones: ["Que me ignoren", "El ruido", "El tráfico", "No dormir"],
      respuesta: "Que me ignoren"
    },
    {
      pregunta: "¿Cuál es mi mayor sueño?",
      opciones: ["Tener un negocio", "Viajar", "Ser famoso", "Ser millonario"],
      respuesta: "Tener un negocio"
    },
    {
      pregunta: "¿Qué música escucho más?",
      opciones: ["Reggaetón", "Rock", "Salsa", "Pop" , "trap"],
      respuesta: "trap"
    },
    {
      pregunta: "¿Mi saga favorita?",
      opciones: ["Rápidos y Furiosos", "Marvel", "Harry Potter", "Star Wars"],
      respuesta: "Marvel"
    },
    {
      pregunta: "¿Qué valoro más en una relación?",
      opciones: ["Confianza", "Diversión", "Regalos", "Aventuras"],
      respuesta: "Confianza"
    },
    {
      pregunta: "¿Qué me preocupa más?",
      opciones: ["Fallar a alguien", "No tener dinero", "Perder algo", "No dormir"],
      respuesta: "Fallar a alguien"
    },
    {
      pregunta: "¿Qué hago en mi tiempo libre?",
      opciones: ["Ver Peliculas", "Salir", "Dormir", "Leer"],
      respuesta: "Ver Peliculas"
    },
    {
      pregunta: "¿Cuál es mi postre favorito?",
      opciones: ["Helado", "Pastel", "Chocolate", "Gelatina"],
      respuesta: "Gelatina"
    },
    {
      pregunta: "¿Cómo describo mi personalidad?",
      opciones: ["Detallista", "Serio", "Tímido", "Extrovertido"],
      respuesta: "Extrovertido"
    }
  ]

  const [index, setIndex] = useState(0)
  const [seleccion, setSeleccion] = useState("")
  const [terminado, setTerminado] = useState(false)

  // Guardará todas sus respuestas
  const [respuestasMarcadas, setRespuestasMarcadas] = useState<string[]>([])


  const preguntaActual = preguntas[index]

  const siguiente = () => {
    // Guarda la respuesta marcada en un array
    const nuevas = [...respuestasMarcadas]
    nuevas[index] = seleccion
    setRespuestasMarcadas(nuevas)

    if (index + 1 < preguntas.length) {
      setIndex(index + 1)
      setSeleccion("")
    } else {
      setTerminado(true)
    }
  }

  // Calcular el puntaje
  const puntaje = respuestasMarcadas.filter(
    (r, i) => r === preguntas[i].respuesta
  ).length

  return (
    <div className="container">
      <div className="card">
        <h1>❤️ Test para mi enamorada ❤️</h1>

        {!terminado ? (
          <>
            <h2 className="pregunta">{preguntaActual.pregunta}</h2>

            <div className="opciones">
              {preguntaActual.opciones.map((op, i) => (
                <label key={i} className="opcion">
                  <input
                    type="radio"
                    name="respuesta"
                    value={op}
                    checked={seleccion === op}
                    onChange={() => setSeleccion(op)}
                  />
                  <span>{op}</span>
                </label>
              ))}
            </div>

            <button 
              disabled={!seleccion}
              onClick={siguiente}
              className="btn"
            >
              Siguiente ➜
            </button>
          </>
        ) : (
          <>
            <h2 className="fin">🎉 ¡Terminaste! 🎉</h2>
            <h3 style={{ color: "black" }}>
  Puntaje final: <b style={{ color: "black" }}>{puntaje} / 10</b>
</h3>


            <div style={{ textAlign: "left", marginTop: "20px" }}>
              {preguntas.map((p, i) => (
                <div 
                  key={i}
                  style={{
                    background: "#fff",
                    padding: "12px",
                    marginBottom: "10px",
                    borderRadius: "10px",
                    border: "2px solid #ffb3c6"
                  }}
                >
                  <p><b>{i + 1}. {p.pregunta}</b></p>
                  <p style={{ color: "black" }}>  Respuesta de mi enamorada: <b style={{ color: "red" }}>{respuestasMarcadas[i]}</b></p>
<p style={{ color: "black" }}> Respuesta correcta: <b style={{ color: "green" }}>{p.respuesta}</b></p>

                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
