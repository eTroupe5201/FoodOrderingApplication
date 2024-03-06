import { Banner} from "../components/Banner";
import { ImageSlider} from "../components/ImageSlider";
import { DiscoverOurStory} from "../components/DiscoverOurStory";
import { OurTeam} from "../components/OurTeam";
<meta name="google-site-verification" content="0FsKFS07odguibzn9Wjd4k-_f1hMpUZZoZt28KRdTBc" />
//tag for google site verification, ownership of website
export function Home(){

 return (
    <div title="home-page">
        <ImageSlider />
        <Banner />
        <DiscoverOurStory />
        <OurTeam />
    </div>
    );
}
//wrap in fragment to return multiple components