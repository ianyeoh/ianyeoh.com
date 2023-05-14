import React, { useState } from 'react'
import './App.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import OutsideAlerter from './components/ui/OutsideAlerter'
import Taskbar from './components/ui/Taskbar'
import { Window, WindowHeader } from './components/ui/Window'
import { DesktopIcon, IconImg, IconLabel } from './components/ui/DesktopIcon'
import DidYouKnowIcon from '/img/didyouknow.png'
import MessageIcon from '/icons/message.png'
import MyProjectsIcon from '/icons/myprojects.png'
import RecycleBinIcon from '/icons/recycle-bin.png'
import ComputerIcon from '/icons/computer.png'
import DirectoryIcon from '/icons/directory.png'
import HelpBookIcon from '/icons/help-book.png'
import NotepadIcon from '/icons/notepad.png'
import ShutdownComputerIcon from '/icons/shutdown-computer.png'

function App() {
    const [shutDown, setShutDown] = useState(false);

    /* 
     * Tracks the focus of windows. Focused windows have a blue header,
     * while the headers of windows not in focus are greyed out. Only one 
     * window can be in focus at any given time, and it is possible for no 
     * windows to be in focus.
     * 
     * We can leave this uninitialised since null values are false, and
     * focused windows are created as needed. Only initial windows need to be set
     * if those windows are to be in focus.
     */ 
    const [inFocus, setInFocus] = useState({
        'welcome': true,
    });

    /* 
     * Tracks visibility of windows to open/close. As before, only 
     * windows that should be visible on load must be declared here.
     */ 
    const [visibleWindows, setVisibleWindows] = useState({
        'welcome': true,
    })

    /* 
     * Tracks the current maximum z-index of all windows. On window focus,
     * we want the window to be brought to the front, and on unfocus the window
     * should maintain it's z-index relative to all other windows.
     * 
     * To achieve this, when a window is brought into focus it's z-index is set
     * to the current maximum z-index, and the maximum is incremented. This is a
     * lazy approach since it is possible for the z-index to overflow the signed
     * integer limit this is unlikely since it is a ridiculously large number 
     * (2147483647). 
     * 
     * Non-assigned indexes are by default = 0, but newly opened windows are assigned
     * the max value on open.
     */
    const [zIndex, setZIndex] = useState({
        'max': 3,
    });

    /* 
     * Tracks which icon was last clicked (clicked icons have a blue background).
     * We can leave this unintialised since null values are false, and clicked icons
     * are initialised as needed.
     */
    const [clickedIcon, setClickedIcon] = useState({});

    /* 
     * Handles an icon single click. Sets the icon state to clicked and removes 
     * clicked status from all other icons.
     */
    function clickIcon(icon) {
        var newClickedIcon = {...icon};

        for (const key in clickedIcon) {
            newClickedIcon[key] = false;
        }

        if (icon !== null) {
            newClickedIcon[icon] = true;
        }
        setClickedIcon(newClickedIcon);
    }

    /* Handles an icon double click. Opens the associated window of the passed icon */
    function doubleClickIcon(icon) {
        clickIcon(null);
        openWindow(icon);
    }

    /* 
     * Set the given window as the currently focused window. If focus is null,
     * sets all windows as unfocused.
     */
    function setFocus(focus) {
        var newFocus = {};
        for (const key in inFocus) {
            newFocus[key] = false;
        }

        if (focus !== null) {
           newFocus[focus] = true;
        }
        setInFocus(newFocus);

        /* Set z-index */
        if (focus !== null) {
            var newZIndex = {...zIndex};
            newZIndex[focus] = zIndex.max + 1;
            newZIndex.max = zIndex.max + 2;
            setZIndex(newZIndex);
        }
    }

    /* Closes the passed window if open */
    function closeWindow(window) {
        var newVisibility = {...visibleWindows};
        
        if (visibleWindows[window]) {
            newVisibility[window] = !visibleWindows[window];
        }

        setVisibleWindows(newVisibility);
    }

    /* 
     * Opens the passed window if not already open. Set focus to new window, and
     * gives z priority.
     */
    function openWindow(window) {
        var newVisibility = {...visibleWindows};
        
        /* If window not already open, make it visible */
        if (!visibleWindows[window]) {
            newVisibility[window] = !visibleWindows[window];
        }

        /* Bring the window to the front */
        var newZIndex = {...zIndex};
        newZIndex[window] = zIndex.max + 1;
        newZIndex.max = zIndex.max + 2;
        setZIndex(newZIndex);

        /* Focus on newly opened window */
        setFocus(window);

        setVisibleWindows(newVisibility);
    }

    return (
        !shutDown ? (
            <div>
                {/* Desktop icons */}
                <OutsideAlerter callback={() => clickIcon(null)}>
                    <DesktopIcon id='welcome' style={{
                        top: '0px',
                        left: '0px',
                    }} onClick={(e) => clickIcon(e.currentTarget.id)}
                    onDoubleClick={(e) => doubleClickIcon(e.currentTarget.id)}>
                        <IconImg src={HelpBookIcon} alt='help book' clicked={clickedIcon.welcome}/>
                        <IconLabel clicked={clickedIcon.welcome}>Help</IconLabel>
                    </DesktopIcon>

                    <DesktopIcon id='myprojects' style={{
                        top: '0px',
                        right: '0px',
                    }} onClick={(e) => clickIcon(e.currentTarget.id)}
                    onDoubleClick={(e) => doubleClickIcon(e.currentTarget.id)}>
                        <IconImg src={DirectoryIcon} alt='directory' clicked={clickedIcon.myprojects}/>
                        <IconLabel clicked={clickedIcon.myprojects}>My Projects</IconLabel>
                    </DesktopIcon>

                    <DesktopIcon id='aboutme' style={{
                        top: '90px',
                        right: '0px',
                    }} onClick={(e) => clickIcon(e.currentTarget.id)}
                    onDoubleClick={(e) => doubleClickIcon(e.currentTarget.id)}>
                        <IconImg src={NotepadIcon} alt='notepad' clicked={clickedIcon.aboutme}/>
                        <IconLabel clicked={clickedIcon.aboutme}>About Me</IconLabel>
                    </DesktopIcon>

                    <DesktopIcon id='recycle' style={{
                        bottom: '50px',
                        right: '0px',
                    }} onClick={(e) => clickIcon(e.currentTarget.id)}
                    onDoubleClick={(e) => doubleClickIcon(e.currentTarget.id)}>
                        <IconImg src={RecycleBinIcon} alt='recycle bin' clicked={clickedIcon.recycle}/>
                        <IconLabel clicked={clickedIcon.recycle}>Recycle Bin</IconLabel>
                    </DesktopIcon>
                </OutsideAlerter>

                {/* Windows */}
                <OutsideAlerter callback={() => setFocus(null)}>
                    <Window id='welcome' visible={visibleWindows.welcome}
                    handleClick={(e) => setFocus(e.currentTarget.id)} 
                    style={{
                        zIndex: zIndex.welcome,
                        width:'620px', height:'600px', top:'100px', left:'100px'
                    }}>
                        <WindowHeader onClose={() => closeWindow('welcome')} active={inFocus.welcome}>
                            Welcome 
                        </WindowHeader>
                        <div className='window-body'>
                            <h1 className='header'>
                                <span className='normal black'>welcome to </span>
                                <span className='bold black'>ianyeoh</span>
                                <span className='normal white'>.COM</span>
                            </h1>
                            <img src={DidYouKnowIcon} className='inset-border' alt='did you know...'/>
                        </div>
                    </Window>

                    <Window id='aboutme' visible={visibleWindows.aboutme}
                    handleClick={(e) => setFocus(e.currentTarget.id)} 
                    style={{
                        zIndex: zIndex.aboutme,
                        width:'520px', height:'560px', top:'110px', left:'110px'
                    }}>
                        <WindowHeader onClose={() => closeWindow('aboutme')} active={inFocus.aboutme}>
                            About Me
                        </WindowHeader>
                        <div className='window-body'>
                            <Tabs className='tabs' selectedTabClassName='tab-selected' selectedTabPanelClassName='tab-panel-selected'>
                                <TabList className='tab-list'>
                                    <Tab className='tab'>About Me</Tab>
                                    <Tab className='tab'>Experience</Tab>
                                    <Tab className='tab'>Skills</Tab>
                                </TabList>
                                
                                <TabPanel className='tab-panel'>
                                    <h2>Hello, I'm Ian.</h2>
                                    <p>
                                        I'm based in Sydney, Australia and I'm currently in my penultimate
                                        year studying a Bachelor of Software Engineering (Honours) at UNSW.
                                    </p>

                                    <h3>What I do</h3>
                                    <p>
                                        Currently, I'm studying full-time while looking for any software engineering
                                        related employment opportunities that may come my way.
                                    </p>

                                    <h3>This site</h3>
                                    <p>
                                        You might have noticed this site is reminiscent of the Windows 95 default desktop. 
                                        While admittedly the oldest version of Windows I've ever used is XP, I've always 
                                        been a fan of the graphical interfaces of early operating systems and their use of 
                                        the limited technology of the time.
                                        <br/><br/>
                                        I built this site in React.js over a couple of days. If you're interested,
                                        you can find the source code 
                                        <a href='https://gitlab.ianyeoh.com/ianyeoh/ianyeoh-com' target='_blank'> <span className='link'>here.</span></a>
                                    </p>

                                </TabPanel>

                                <TabPanel className='tab-panel'>
                                    <h2>Experience</h2>
                                    <p>
                                        I've worked previously in IT in both internships and paid roles as a Systems
                                        Administrator intern and also re-cycling and re-deploying used IT assets, respectively.
                                        <br/><br/>
                                        Apart from that, I have significant (3+ years) experience in web development from working on
                                        personal projects. In my spare time, I also enjoy working on DIY projects programming 
                                        microprocessors and microcontrollers to automate things in my life.
                                    </p>
                                </TabPanel>

                                <TabPanel className='tab-panel'>
                                    <h2>Skills</h2>
                                    <h3>Proficient:</h3>
                                    <ul>
                                        <li>C, C++</li>
                                        <li>Python (Django), and MicroPython</li>
                                        <li>HTML5/CSS/JavaScript (NodeJS, ReactJS)</li>
                                        <li>SQL</li>
                                        <li>Common tools i.e Unix, Git</li>
                                        <li>Web hosting services i.e. AWS (S3, Lambda), Oracle Cloud</li>
                                    </ul>
                                    <h3>Familiar:</h3>
                                    <ul>
                                        <li>Java</li>
                                        <li>Matlab</li>
                                        <li>PHP</li>
                                    </ul>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </Window>

                    <Window id='myprojects' visible={visibleWindows.myprojects}
                    handleClick={(e) => setFocus(e.currentTarget.id)} 
                    style={{
                        zIndex: zIndex.myprojects,
                        width:'500px', height:'450px', top:'120px', left:'120px'
                    }}>
                        <WindowHeader onClose={() => closeWindow('myprojects')} active={inFocus.myprojects}>
                            <img src={MyProjectsIcon} alt='a computer' width='25px'/>
                            My Projects
                        </WindowHeader>
                        <div className='window-explorer'>
                            <div className='window-explorer-nested'>
                                {/* <DesktopIcon id='welcome' style={{
                                    top: '50px',
                                    left: '5px',
                                }} onClick={(e) => clickIcon(e.currentTarget.id)}
                                onDoubleClick={(e) => doubleClickIcon(e.currentTarget.id)}>
                                    <IconImg src={HelpBookIcon} alt='help book' clicked={clickedIcon.welcome}/>
                                    <IconLabel clicked={clickedIcon.welcome} style={{color: 'black'}}>Help</IconLabel>
                                </DesktopIcon> */}
                            </div>
                        </div>
                    </Window>

                    <Window id='contactme' visible={visibleWindows.contactme}
                    handleClick={(e) => setFocus(e.currentTarget.id)} 
                    style={{
                        zIndex: zIndex.contactme,
                        width:'250px', height:'200px', top:'130px', left:'130px'
                    }}>
                        <WindowHeader onClose={() => closeWindow('contactme')} active={inFocus.contactme}>
                            Contact Me
                        </WindowHeader>
                        <div className='window-body'>
                            <h3>
                                Want to get in touch? <br/>
                                Send me a message:
                            </h3>
                            <a href='mailto: ianyeoh2@gmail.com'>
                                <img src={MessageIcon} alt='an envelope' className='float-left'/>
                            </a>
                            <p className='email'>ianyeoh2@gmail.com</p>
                        </div>
                    </Window>

                    <Window id='shutdown' visible={visibleWindows.shutdown}
                    handleClick={(e) => setFocus(e.currentTarget.id)} 
                    style={{
                        zIndex: zIndex.shutdown,
                        width:'480px', height:'160px', top:'140px', left:'140px'
                    }}>
                        <WindowHeader onClose={() => closeWindow('shutdown')} active={inFocus.shutdown}>
                            Shut Down Windows
                        </WindowHeader>
                        <div className='window-body'>
                            <div className='arrange-horizontally'>
                                <img src={ShutdownComputerIcon} alt='shutdown with computer' height='40px'/>
                                <p className='shutdown-text'>
                                    Are you sure you want to shut down the computer?
                                </p>
                            </div>
                            <div className='shutdown-buttons'>
                                <button className='shutdown-button outset-border'onClick={() => setShutDown(true)}>Yes</button>
                                <button className='shutdown-button outset-border' onClick={() => closeWindow('shutdown')}>No</button>
                            </div>
                        </div>
                    </Window>

                    <Window id='recycle' visible={visibleWindows.recycle}
                    handleClick={(e) => setFocus(e.currentTarget.id)} 
                    style={{
                        zIndex: zIndex.recycle,
                        width:'500px', height:'450px', top:'140px', left:'140px'
                    }}>
                        <WindowHeader onClose={() => closeWindow('recycle')} active={inFocus.recycle}>
                            Recycle Bin
                        </WindowHeader>
                        <div className='window-explorer'>
                            <div className='window-explorer-nested'>
                            </div>
                        </div>
                    </Window>
                </OutsideAlerter>

                {/* The taskbar */}
                <Taskbar style={{zIndex: 2147483647}}
                handleAboutMe={() => openWindow('aboutme')}
                handleMyProjects={() => openWindow('myprojects')}
                handleContactMe={() => openWindow('contactme')}
                handleShutDown={() => openWindow('shutdown')}
                />
            </div>
        ) : (
            <div className='shutdown'></div>
        )
    )
}

export default App
