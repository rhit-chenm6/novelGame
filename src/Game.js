import React, { Ref } from 'react';
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
            ],
            gameStage: 'startPage',
            text: mytext,
            score: 0
        };
        this.startGame = this.startGame.bind(this);
        this.quitGame = this.quitGame.bind(this);
        this.checkMCQ = this.checkMCQ.bind(this);
        this.nextPart = this.nextPart.bind(this);
        this.addScore = this.addScore.bind(this);
        this.finishGame = this.finishGame.bind(this);

    }

    startGame() {
        this.setState({ gameStage: 'MCQ' })
    }

    finishGame() {
        this.setState({ score: 0})
        this.setState({ gameStage: 'startPage' })
    }

    nextPart() {
        this.setState({ gameStage: 'crossWord' })
    }

    quitGame() {
        window.close();
    }

    checkMCQ(id, choice, answer) {
        if (choice === answer) {
            this.addScore();
            console.log(this.state.score);
        } else {
            this.deductScore();
        }
        const mcqDiv = document.getElementById(id);
        mcqDiv.style.display = 'none';
    }

    checkCrossWord(direction, number, answer) {
        const crossWordPad = document.getElementById("crossWord");
        if (crossWordPad.onCrosswordCorrect) {
            console.log("all correct");
        }
    }

    deductScore() {
        const newScore = this.state.score -= 1;
        this.setState({ score: newScore });
    }

    addScore() {
        const newScore = this.state.score += 1;
        this.setState({ score: newScore });
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
                    clue: 'the hall hosts art events',
                    answer: 'HATFIELD',
                    row: 1,
                    col: 0,
                },
                2: {
                    clue: 'the fist name of the web programming online class\'\s professor',
                    answer: 'ELIZA',
                    row: 3,
                    col: 3,
                },
                3: {
                    clue: 'the event on the night before homecoming',
                    answer: 'BONFIRE',
                    row: 6,
                    col: 0,
                },
            },
            down: {
                4: {
                    clue: 'last name of CS department head',
                    answer: 'MELLOR',
                    row: 2,
                    col: 3,
                },
                5: {
                    clue: 'the residence hall with only male',
                    answer: 'DEMING',
                    row: 0,
                    col: 5,
                }
            },
        }

        return (
            <div>
                <audio
                    ref="audio_tag"
                    autoPlay={true}
                    loop={true}
                    controls={true} >
                    <source type="audio/mp3" src={music} />
                </audio>
                <Text text={this.state.text} score={this.state.score} />
                <Mission stage={this.state.gameStage} startGame={this.startGame} quitGame={this.quitGame}
                    mcqs={rows} addScore={this.addScore} crossWordData={data} nextPart={this.nextPart}
                    finishGame={this.finishGame} />
                {/* {this.state.gameStage = 'finish' &&
                    <POPupwindow content="finished!" handlePopUpClose={this.closeGame}/>
                } */}
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
            {(props.stage == 'MCQ') &&
                <div>
                    {props.mcqs}
                    <button onClick={props.nextPart}>Next Part</button>

                </div>
            }
            {(props.stage == 'crossWord') &&
                <div>
                    <Crossword id="crossWord" onCorrect={props.addScore}
                        data={props.crossWordData}
                    />
                    <button onClick={props.finishGame}>Finish</button>
                </div>

            }
            {(props.stage == 'startPage') &&
                <div>
                    <button onClick={props.startGame}>Start</button> <br />
                    <button onClick={props.quitGame}>Quit</button>
                </div>
            }

        </div>
    );
}

export default Game;
