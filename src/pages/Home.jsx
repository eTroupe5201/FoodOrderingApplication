import { Banner} from "../components/Banner";
import { ImageSlider} from "../components/ImageSlider";
import loadable from "@loadable/component";

const DiscoverOurStory = loadable(() => import("../components/DiscoverOurStory"), {resolveComponent: (components) => components.DiscoverOurStory});
const OurTeam = loadable(() => import("../components/OurTeam"), {resolveComponent: (components) => components.OurTeam});

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