import { Button } from "./components/button";
import { PlusIcon } from "./icons/plusIcon";
import { ShareIcon } from "./icons/shareIcon";

function App() {
  return (
    <div>
      <Button variant="primary" text="Share Brain" startIcon={<ShareIcon />} />
      <Button variant="secondary" text="Add Content" startIcon={<PlusIcon />} />
    </div>
  );
}

export default App;
