import React, { useState } from 'react'
import './DesktopIcon.css'

export function DesktopIcon(props) {
    return (
        <div id={props.id} style={props.style} 
        onClick={props.onClick} onDoubleClick={props.onDoubleClick}
        className='icon'>
            {props.children}
        </div>
    )
}

export function IconImg(props) {
    return (
        <img className={`icon-img ${props.clicked && 'clicked-img'}`} 
        style={props.style} src={props.src} alt={props.alt} />
    )
}

export function IconLabel(props) {
    return (
        <p className={`icon-label ${props.clicked && 'clicked-label'} 
        ${props.color === 'black' ? 'black-label': 'white-label'}`} 
        style={props.style}>
            {props.children}
        </p>
    )
}