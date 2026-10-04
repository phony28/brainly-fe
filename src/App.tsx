import { Button } from "./components/button";
import { Card } from "./components/Card";
import { Sidebar } from "./components/sideBar";
import { PlusIcon } from "./icons/plusIcon";
import { ShareIcon } from "./icons/shareIcon";

function App() {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <main className="ml-72 p-4">
        <Button variant="primary" text="Share Brain" startIcon={<ShareIcon />} />
        <Button variant="secondary" text="Add Content" startIcon={<PlusIcon />} />

        <Card
          title="Sample YouTube Video"
          link="https://www.youtube.com/watch?v=vzVbqXVID-Y"
          type="youtube"
        />
      </main>
    </div>
  );
}
  
  

export default App;
