import './App.css'
import { useRef, useEffect } from 'react'
import Color from 'color'

var randomColor = () => '#' + (Math.random().toString(16) + '00000').slice(2, 8)

function App() {
  const ref = useRef()
  useEffect(() => {
    const canvas = ref.current
    const { width, height } = canvas.getBoundingClientRect()
    canvas.width = width
    canvas.height = height + 100
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, width, height)

    let currdarken = 0.8
    let currsat = 0.4

    let darkdelta = 0.001
    let cwdelta = -0.00001
    let chdelta = 0.001
    let alphadelta = 0.00001

    let cowidth = 10
    let coheight = 50
    let curralpha = 0.5
    let cohmult = 50

    let t = 0
    function fill() {
      t += 0.001
      ctx.setTransform(
        1,
        Math.sin(t),
        Math.sin(t),
        1,
        Math.random(),
        Math.random(),
      )
      for (let i = 0; i < 1000; i++) {
        if (i % 100 === 0) {
          ctx.fillStyle = Color(randomColor())
            .darken(currdarken)
            .desaturate(currsat)
        }
        ctx.fillRect(
          Math.random() * (width + 100) - 100,
          Math.random() * (height + 100) - 100,
          1 * Math.random() * cowidth,
          coheight * Math.random() * cohmult,
        )
      }
      currdarken -= darkdelta
      curralpha -= alphadelta
      coheight -= chdelta
      cowidth -= cwdelta
      if (currdarken < 0.4 || currdarken > 0.9) darkdelta *= -1
      if (cowidth < 0 || cowidth > 50) cwdelta *= -1
      if (coheight < 0 || coheight > 50) chdelta *= -1
      if (curralpha < 0 || curralpha > 1) alphadelta *= -1
      cohmult += Math.sin(t) * 50
      currsat = Math.cos(t)

      requestAnimationFrame(fill)
    }

    fill()
  }, [])
  return <canvas ref={ref} style={{ width: '100%', height: '100%' }} />
}

export default App
