import { useState, useEffect } from 'react';
import './App.css';
import shuffleArray from './utilities/shuffleArray';
import Card from './components/Card/Card';


//set up card values
const seed = ['Dan', 'Pam', 'Katherine', 'Kitty', 'Gartholomew', 'Mortgage', 'White Sox', 'Chicago', 'Tacos', 'Ten', 'Cookies', 'Football'];
const cards = [...seed, ...seed];
shuffleArray(cards)


function App() {
	// state hooks
	const [foundCards, setFoundCards] = useState([]);
	const [cardsSelected, setCardsSelected] = useState([]);
	const [isChecking, setIsChecking] = useState(false);
	const [gameOver, setGameOver] = useState(false);
	

	/* begin game state management */
	/*  */
	useEffect(() => {
		// timeout needed or else you don't get to see the second card you picked!
		let timeout;
		if (cardsSelected.length === 2) {
			setIsChecking(true);
			timeout = setTimeout(checkSelectedCards, 250);
		}

		return () => clearTimeout(timeout);
	})

	useEffect(() => {
		if (foundCards.length === seed.length) {
			setGameOver(true)
		}
	}, [foundCards]);

	const checkSelectedCards = () => {
		const [firstIndex, secondIndex] = cardsSelected;

		if (cards[firstIndex] === cards[secondIndex]) {
			setFoundCards((foundCards) => [...foundCards, cards[firstIndex]]);
		}

		setCardsSelected([]);
		setIsChecking(false);
	}
	/*  */
	/* end game state management */
	

	/* begin card state management */
	/*  */
	const checkIsSelected = (index) => {
		return cardsSelected.indexOf(index) !== -1;
	};

	const checkIsFound = (name) => {
		return foundCards.indexOf(name) > -1;
	};

	// const checkIsDisabled = (index) => {
	// 	return 
	// }
	
	const cardClickHandler = (index) => {
        setCardsSelected((cardsSelected) => [...cardsSelected, index]);
    };
	/*  */
	/* end card state management */

	const handleRestart = () => {
		shuffleArray(cards);
		setFoundCards([]);
		setCardsSelected([]);
		setGameOver(false);
	}

	return (
		<div className={`App ${isChecking ? 'is-checking' : null}`}>
			{/* <h1> MEMORY GAME </h1> */}
			{!gameOver ?
				cards.map((el, index) => (
					<Card 
						name={el} 
						key={index} 
						index={index}
						isSelected={checkIsSelected(index)}
						isFound={checkIsFound(el)}
						clickHandler={cardClickHandler}
					/>))
			: 
				<div className="game-over">
					<h1>Wow! You did it! Good job!</h1>
					<button onClick={handleRestart}>Restart!</button>
				</div>
			}
		</div>
	);
}

export default App;
