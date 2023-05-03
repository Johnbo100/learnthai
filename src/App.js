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
      <Newword />
      <Update />
      
      <Categories />
    </div>
  );
}

export default App;
