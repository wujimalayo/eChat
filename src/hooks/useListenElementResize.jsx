import { useState, useEffect } from "react";
import styles from 'src/assets/scss/global.scss'

const ListenElementResize = (element) => {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [onOff, setOnoff] = useState(false)

    useEffect(() => {
        if (element && element.current && !onOff) {
            const dom = element.current
            const iframe = document.createElement("iframe")
            iframe.classList.add(styles["listenElementResize"])
            if (!dom.style.position) {
                dom.style.position = "relative"
            }
            dom.appendChild(iframe)
            setWidth(iframe.clientWidth)
            setWidth(iframe.clientHeight)
            iframe.contentWindow.addEventListener("resize", resize)
            setOnoff(true)
        }
    }, [element])

    const resize = e => {
        const w = e.target.innerWidth || 0
        const h = e.target.innerHeight || 0
        setWidth(w)
        setHeight(h)
    }

    return {
        width,
        height
    }
}


export default ListenElementResize