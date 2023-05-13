import React from 'react'
import Draggable from 'react-draggable'
import './Window.css'
import closeIcon from '/icons/close.png'

export function Window(props) {
    /* Bypass ReactDOM.findDOMNode() deprecated warning */
    const nodeRef = React.useRef(null);
    
    return (
        props.visible &&
        <Draggable nodeRef={nodeRef} handle='.handle'>
            <div id={props.id} ref={nodeRef} className='window' style={props.style} onClick={props.handleClick}>
                {props.children}
            </div>
        </Draggable>
    )
}

/* Renders the  */
export function WindowHeader(props) {
    return (
        <div className={`
            window-header handle 
            ${props.active ? 'active': 'inactive'}
        `}>
            <div className='window-header-title'>
                {props.children}   
            </div>  
            <button id={props.id} className='window-header-close' onClick={props.onClose}>
                <img src={closeIcon} alt="close button" width='28' height='28'/>
            </button>
        </div>
    )
}
