import Card from './components/Card';
import './App.css';
import Update from './components/Update'
import Newword from './components/Newword';
import Categories from './components/Categories';
import Title from './components/Title';

function App() {
  return (
    <div className="App">
      <Title />
      <Card />
      <Categories />
      <Newword />
      <Update />
    </div>
  );
}

export default App;
