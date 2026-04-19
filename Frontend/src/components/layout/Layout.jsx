import Header from './Header'
import Footer from './Footer'
import TopBar from './TopBar'
import FloatingActionButton from '../ui/FloatingActionButton'

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <main>{children}</main>
      <Footer />
      <FloatingActionButton />
    </div>
  )
}

export default Layout