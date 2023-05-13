import React, { Component } from 'react'
import './Taskbar.css'
import OutsideAlerter from './OutsideAlerter'
import windowsIcon from '/icons/windows.png'
import shutDownIcon from '/icons/shutdown.png'
import aboutIcon from '/icons/about.png'
import projectsIcon from '/icons/projects.png'
import GitHubIcon from '/icons/github.png'
import contactIcon from '/icons/contact.png'

class Taskbar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentTime: '4:20 PM',
            startMenuOpen: false,
        };
        this.handleOpenStartMenu = this.handleOpenStartMenu.bind(this);
    }

    /* Returns current time as H:MM AM/PM */
    getTime() {
        var today = new Date();

        var hours = today.getHours();
        var minutes = today.getMinutes();
        var meridiem = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;

        /* 12:00 PM should be 12, not 0 */
        hours = hours ? hours : 12;

        /* 0-Prefix single-digit minutes */
        minutes = minutes < 10 ? '0' + minutes : minutes; 

        return hours + ':' + minutes + ' ' + meridiem;
    }

    /* Toggles start menu */
    handleOpenStartMenu(event) {
        this.setState({
            startMenuOpen: !this.state.startMenuOpen,
        });
    }

    /* On mount, set the Taskbar Clock to update every second */
    componentDidMount() {
        this.interval = setInterval(() => 
            this.setState({
                currentTime: this.getTime(),
            }),
            1000 /* 1s */
        );
    }

    /* On unmount, remove the Taskbar Clock interval to prevent memory leaks */
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className='taskbar' style={this.props.style}>
                <button 
                    className={`
                        taskbar-child taskbar-start-btn 
                        ${this.state.startMenuOpen ? 'taskbar-start-btn-open': ''}
                    `}
                    onClick={this.handleOpenStartMenu}
                >
                    <img src={ windowsIcon } alt='start icon' width='26' height='20' draggable='false'/>
                    Start
                </button>
                
                { this.state.startMenuOpen &&
                    <OutsideAlerter callback={this.handleOpenStartMenu}>
                        <div className='taskbar-start-menu'>
                            <div className='taskbar-start-menu-child taskbar-start-menu-sidebar'>
                                <span className='strong'>ianyeoh</span><span className='light'>.com</span>
                            </div>
                            <div className='taskbar-start-menu-child taskbar-start-menu-content'>
                                <div className='taskbar-start-menu-row' onClick={this.props.handleAboutMe}>
                                    <img src={ aboutIcon } alt='about me' width='50' height='50' draggable='false'/>
                                    About Me
                                </div>
                                <div className='taskbar-start-menu-row' onClick={this.props.handleMyProjects}>
                                    <img src={ projectsIcon } alt='my projects' width='50' height='50' draggable='false'/>
                                    My Projects
                                </div>
                                <a href="https://github.com/ianyeoh" target='_blank'>
                                    <div className='taskbar-start-menu-row'>
                                        <img src={ GitHubIcon } alt='github logo' width='50' height='50' draggable='false'/>
                                        My GitHub
                                    </div>
                                </a>
                                <div className='taskbar-start-menu-row' onClick={this.props.handleContactMe}>
                                    <img src={ contactIcon } alt='contact me' width='50' height='50' draggable='false'/>
                                    Contact Me
                                </div>
                                <hr />
                                <div className='taskbar-start-menu-row' onClick={this.props.handleShutDown}>
                                    <img src={ shutDownIcon } alt='shutdown icon' width='50' height='50' draggable='false'/>
                                    Shut Down...
                                </div>                       
                            </div>
                        </div>
                    </OutsideAlerter>
                }

                <div className='taskbar-child taskbar-clock'>
                    {this.state.currentTime}
                </div>
            </div>
        )
    }
}

export default Taskbar