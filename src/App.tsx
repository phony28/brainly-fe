
import { Button } from "./components/ui/button";

function App() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-3xl font-bold text-purple-600 underline">
        Tailwind is working!
      </h1>

      <div className="flex gap-4">
        <Button
          variant="primary"
          size="md"
          text="Primary Button"
          onClick={() => alert("Primary clicked!")}
        />
        <Button
          variant="secondary"
          size="md"
          text="Secondary Button"
          onClick={() => alert("Secondary clicked!")}
        />
      </div>
    </div>
  );
}

export default App;
