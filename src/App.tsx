// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import { useState } from 'react';
import Button from './components/Button/Button';
import type { MouseEvent } from 'react';
import Input from './components/Input/Input';


function App() {
	const [counter, setCounter] = useState<number>(0);


	const addCounter = (e: MouseEvent) => {
		console.log(e);
	};

	return (
		<>
			<Button onClick={addCounter}>Button1</Button>
			<Input placeholder='Email'></Input>
			
		</>
	);
}
export default App;

{/* <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div> */}