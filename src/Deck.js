import logo from './logo.svg';
import axios from "axios";
import { useEffect, useRef, useState } from 'react';
import Card from './Card';


function Deck() {

    const [deck, setDeck] = useState("new")
    const [cards, setCards] = useState([])
    const [dealing, setDealing] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        async function fetchDeck() {
            const deckResult = await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1");
            if(deckResult.data.remaining === 0) setDealing(false);
            setDeck(deckResult.data);
        };
        fetchDeck();
    },[setDeck])

    async function drawCard() { 
        try {
            let drawResult = await axios.get("https://deckofcardsapi.com/api/deck/" + deck.deck_id + "/draw/");
            setCards([...cards , drawResult.data.cards[0]]);
        
        } catch (err){
            alert(err);
        }
        
    };

    const toggleContinuousDraw = () => {
        setDealing(!dealing);
    }

    useEffect(()=> {
        if(dealing && !timerRef.current) {
            console.log("starting timer");
            timerRef.current = setInterval(async () => {
                await drawCard();
            }, 1000);
        }
        return () => {
            clearInterval(timerRef.current);
            timerRef.current = null;
            console.log("cleanup timer");
        }
    }, [dealing, setDealing, cards]);

    const cardPile = cards.map(card => (
        <Card code={card.code} image={card.images.svg} key={card.id}/>
    ));

    return (
        <div>
           <button key="drawButton" onClick={toggleContinuousDraw}>{dealing ? "Stop" : "Start"} Drawing Cards</button>
           <div key="cardPile">{cardPile}</div>
        </div>
    );
}
export default Deck;