import React, { useRef } from 'react'

const DynamicTextArea = (props) => {
    const textarea = useRef()

    const handleInput = (e) => {
        textarea.current.style.height = "auto"
        textarea.current.style.height = `${textarea.current.scrollHeight}px`
    }

  return (
    <textarea ref={textarea} onInput={handleInput} {...props} ></textarea>
  )
}

export default DynamicTextArea