import StandardErrorBoundary from "./Components/StandardErrorBoundary";
import Table from "./Components/Table";

function App() {
  return (
    <StandardErrorBoundary>
    <div className="text-center">
      <header className="">
        <h1 className='mt-4'>React Lab 2</h1>
        <hr></hr>
      </header>
    </div>
    <Table />
    </StandardErrorBoundary>
  );
}

export default App;
