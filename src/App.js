import { useState, useEffect } from 'react';
import './App.css';
import shuffleArray from './utilities/shuffleArray';
import Card from './components/Card/Card';

function App() {
	//set up card values
	const seed = ['Dan', 'Pam', 'Katherine', 'Kitty', 'Gartholomew', 'Mortgage', 'White Sox', 'Chicago', 'Tacos', 'Ten', 'Cookies', 'Football'];
	const cards = [...seed, ...seed];
	shuffleArray(cards)

	// state hooks
	const [cardOrder, setCardOrder] = useState([...cards]);
	const [foundCards, setFoundCards] = useState([]);
	const [cardsSelected, setCardsSelected] = useState([]);
	const [gameOver, setGameOver] = useState(false);
	

	/* begin game state management */
	/*  */
	useEffect(() => {
		// timeout needed or else you don't get to see the second card you picked!
		let timeout;
		if (cardsSelected.length === 2) {
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

		if (cardOrder[firstIndex] === cardOrder[secondIndex]) {
			setFoundCards((foundCards) => [...foundCards, cardOrder[firstIndex]]);
			setCardsSelected([])
		} else {
			setCardsSelected([])
		}
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
	
	const cardClickHandler = (index) => {
        setCardsSelected((cardsSelected) => [...cardsSelected, index]);
    };
	/*  */
	/* end card state management */

	const handleRestart = () => {
		shuffleArray(cards);
		setCardOrder([...cards]);
		setFoundCards([]);
		setCardsSelected([]);
		setGameOver(false);
	}

	return (
		<div className="App">
			{!gameOver ?
				cardOrder.map((el, index) => (
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
