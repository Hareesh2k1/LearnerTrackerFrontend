import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'
import '../App.css'

const Main = (props) => {
  return (
    <div className="main-container">
      <div> {/* to display Sidebar */}
        <Sidebar />
      </div>
      <div className="main-content justify-content-between">
        <header> {/* to display Header */}
          <Header />
        </header>
        <main> {/* to display Main Content */}
          {props.child} {/* to display the main content */}
        </main>
        <Footer /> {/* to display Footer */}
      </div>
    </div>
  )
}

export default Main