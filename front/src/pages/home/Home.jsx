import './home.css'
import Topbar from '../../components/topbar/Topbar'
import Navbar from '../../components/navbar/Navbar'
import MiddleSection from '../../components/middleSection/MiddleSection'
import Footer from '../../components/Footer/Footer'
import LastCourse from '../../components/LastCourse/LastCourse'
import AboutCourse from '../../components/aboutCourse/AboutCourse'
import PopularCourse from '../../components/popularCourse/PopularCourse'
import PresellCourse from '../../components/PresellCourse/PresellCourse'
import LastArticle from '../../components/lastArticle/LastArticle'

const Home = () => {
  return (
    <div>
      <Topbar />
      <Navbar />
      <MiddleSection />
      <LastCourse />
      <AboutCourse />
      <PopularCourse />
      <PresellCourse />
      <LastArticle />
      <Footer />
    </div>
  )
}

export default Home
