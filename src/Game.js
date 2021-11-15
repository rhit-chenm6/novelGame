import React from 'react';
import './index.css';
import mytext from './plot.js';
import music from './bensound-littleidea.mp3';
import Crossword from '@jaredreisinger/react-crossword';

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mcqs: [{ id: "mcq1", question: 'When is Rose-Hulman established?', choice1: '1877', choice2: '1864', choice3: '1874', answer: '1874' },
            { id: "mcq2", question: 'How many years have Rose-Hulman been ranked No. 1 Engineering College?', choice1: '22', choice2: '23', choice3: '24', answer: '23' },
            { id: "mcq3", question: 'What is Rose-Hulman\'\s motto', choice1: 'Labor and Knowledge', choice2: 'Labor and Science', choice3: 'Science and Knowledge', answer: 'Labor and Knowledge' },
            { id: "mcq4", question: 'test question4', choice1: 'correct', choice2: 'wrong', choice3: 'wrong', answer: 'correct' },
            { id: "mcq5", question: 'test question5', choice1: 'correct', choice2: 'wrong', choice3: 'wrong', answer: 'correct' }
            ],
            gameStage: 'startPage',
            text: mytext,
            score: 0
        };
        this.startGame = this.startGame.bind(this);
        this.quitGame = this.quitGame.bind(this);
        this.checkMCQ = this.checkMCQ.bind(this);
        this.nextPart = this.nextPart.bind(this);

    }

    startGame() {
        this.setState({ gameStage: 'MCQ' })
    }

    nextPart() {
        this.setState({ gameStage: 'crossWord' })
    }

    quitGame() {
        window.close();
    }

    checkMCQ(id, choice, answer) {
        if (choice === answer) {
            const newScore = this.state.score += 1;
            this.setState({ score: newScore })
            console.log(this.state.score);
        } else {
            const newScore = this.state.score -= 1;
            this.setState({ score: newScore })
        }
        const mcqDiv = document.getElementById(id);
        mcqDiv.style.display = 'none';
    }

    render() {
        const length = this.state.mcqs.length;
        const rows = [];
        this.state.mcqs.forEach((mcq) => {
            rows.push(
                <MCQ
                    key={mcq.id}
                    id={mcq.id}
                    question={mcq.question}
                    choice1={mcq.choice1}
                    choice2={mcq.choice2}
                    choice3={mcq.choice3}
                    answer={mcq.answer}
                    checkMCQ={this.checkMCQ}
                />
            );
        });

        const data = {
            across: {
                1: {
                    clue: 'one plus one',
                    answer: 'TWO',
                    row: 0,
                    col: 0,
                },
            },
            down: {
                2: {
                    clue: 'three minus two',
                    answer: 'ONE',
                    row: 0,
                    col: 2,
                },
            },
        }

        return (
            <div>
                <audio
                    ref="audio_tag"
                    autoPlay={false}
                    loop={true}
                    controls={true} >
                    <source type="audio/mp3" src={music} />
                </audio>
                <Text text={this.state.text} score={this.state.score} />
                <Mission state={this.state.gameStage} startGame={this.startGame} quitGame={this.quitGame}
                    mcqs={rows} crossWordData={data} nextPart={this.nextPart} />
            </div>
        );
    }
}

function Text(props) {
    return (
        <div>
            <h2>{props.text}</h2>
            <h2>Your score is: {props.score}</h2>
        </div>
    );
}

function MCQ(props) {
    return (
        <div id={props.id}>
            <h3>{props.question}</h3>
            <button id="choice1" onClick={() => props.checkMCQ(props.id, props.choice1, props.answer)}>{props.choice1}</button>
            <button id="choice2" onClick={() => props.checkMCQ(props.id, props.choice2, props.answer)}>{props.choice2}</button>
            <button id="choice3" onClick={() => props.checkMCQ(props.id, props.choice3, props.answer)}>{props.choice3}</button>
        </div>
    )
}

function Mission(props) {
    return (
        <div>
            {(props.state === 'MCQ') &&
                <div>
                    {props.mcqs}
                    <button onClick={props.nextPart}>Next Part</button>

                </div>
            }
            {(props.state === 'crossWord') &&
                <Crossword data={props.crossWordData} />
            }
            {(props.state === 'fillInBlank') &&
                <h1>This is a space for fill in blank page</h1>
            }
            {(props.state == 'startPage') &&
                <div>
                    <button onClick={props.startGame}>Start</button> <br />
                    <button onClick={props.quitGame}>Quit</button>
                </div>
            }

        </div>
    );
}

export default Game;
