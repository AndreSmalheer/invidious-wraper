import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

const videos = [
    {"title": "video 1", "src": "test0.wav"},
    {"title": "video 2", "src": "test.wav"}
]

function App() {

    return(
    <>
        <h1>this is my app</h1>

        {videos.map((video, index) =>(
            <div key={index}>
                <h2>{video.title}</h2>
                <p>{video.src}</p>
            </div>
        ))}
    </>
    )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
