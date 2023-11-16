import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Col,
  Button,
  Label,
  Input,
  Container,
  Row,
} from "reactstrap";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

// const inter = Inter({ subsets: ["latin"] });

export default function Game() {
  const [operandA, setOperandA] = useState(null);
  const [operandB, setOperandB] = useState(null);
  const [operation, setOperation] = useState(null);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);

  const generateOperands = async () => {
    const response = await fetch(`https://localhost:7172/Calculator/generate`);
    const data = await response.json();

    setOperandA(data.operandA);
    setOperandB(data.operandB);
  };

  // const calculate = async () => {
  //   var operation = "add";
  //   const response = await fetch(
  //     `https://localhost:7172/Calculator/operation=${operation}?operandA=${operandA}&operandB=${operandB}&answer=${userAnswer}`
  //   );
  //   const data = await response.json();

  //   setResult(data);
  // };

  const restart = async () => {
    try {
      setScore(0);
      // var operation = "add";
      const response = await fetch(`https://localhost:7172/Calculator/restart`);
      // const data = await response.json();

      // setResult(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      var operation = "multiply";
      console.log(event.target.userAnswer.value);
      const userAnswer = Number(event.target.userAnswer.value);

      const response = await fetch(
        `https://localhost:7172/Calculator/calculate?operation=${operation}&operandA=${operandA}&operandB=${operandB}&answer=${userAnswer}`
      );

      // console.log(typeof(Number(userAnswer)))
      // const data = await response.json();
      console.log("dvdfv", response.status);
      // setResult(data);
      console.log(userAnswer);
      var mark = score;

      if (response.status == 400) {
        mark = score - 1;
        setScore(mark);
      } else {
        mark = score + 1;
        setScore(mark);
        if (mark > highestScore) {
          setHighestScore(mark);
        }
      }
      console.log(score);

      // after submitting, generate another operands
      await generateOperands();

      // if (userAnswer == result) {
      //   mark = score - 1;
      //   setScore(mark);
      //   console.log(score);
      // } else {
      //   mark = score + 1;
      //   setScore(mark);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>Flash Card App</title>
        <meta
          name="description"
          content="A flash card app to practice multiplication tables"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
      // className={`${styles.main} ${inter.className}`}
      >
        {/* <div>
          <CountdownCircleTimer
            isPlaying
            duration={60}
            colors={[
              ["#004777", 0.33],
              ["#F7B801", 0.33],
              ["#A30000", 0.33],
            ]}
          >
            {({ remainingTime }) => remainingTime}
          </CountdownCircleTimer>
        </div> */}
        <div>
          {/* <Container> */}
          <Row xs="3">
            <Col className="bg-light">Current Score: {score}</Col>
            <Col className="bg-light">Time Remaining: {}</Col>
            <Col className="bg-light">Highest Score: {highestScore}</Col>
          </Row>
          {/* </Container> */}
        </div>

        <div>
          <button onClick={generateOperands}>Generate</button>
          {/* <button onClick={calculate}>Calculate</button> */}
          <br />
          {operandA} * {operandB}
          {/* OperandB = {operandB}
          Result = {result}
          Score = {score} */}
          {/* <Input placeholder="Enter your answer here" />
           */}
        </div>

        <div>
          <Form onSubmit={handleSubmit}>
            <FormGroup row>
              <Label for="userAnswer" m={3}>
                Your Answer:
              </Label>
              <Col sm={10}>
                <Input
                  id="userAnswer"
                  name="answer"
                  placeholder="Enter your answer here"
                  type="text"
                />
              </Col>
            </FormGroup>
            <FormGroup check row>
              <Col
                sm={{
                  offset: 2,
                  size: 10,
                }}
              >
                <Button>Submit</Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
        <Button onClick={restart}>Restart Game</Button>
      </main>
    </>
  );
}
