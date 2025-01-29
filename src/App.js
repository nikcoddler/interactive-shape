import logo from './logo.svg';
import './App.css';
import Shape from './Shape';

const BOX_DATA = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1],
];

function App() {

  return (
    <div className="App">
     <Shape data={BOX_DATA}/>
    </div>
  );
}

export default App;
