import { Button } from "./components/button";
import { Card } from "./components/Card";
import { PlusIcon } from "./icons/plusIcon";
import { ShareIcon } from "./icons/shareIcon";

function App() {
  return (
    <div>
      <Button variant="primary" text="Share Brain" startIcon={<ShareIcon />} />
      <Button variant="secondary" text="Add Content" startIcon={<PlusIcon />} />

      <Card
        title="Sample YouTube Video"
        link="https://www.youtube.com/watch?v=vzVbqXVID-Y"
        type="youtube"
      />
    </div>
  );
}
  
  

export default App;
