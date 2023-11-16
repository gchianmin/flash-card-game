import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { MdOutlineRestartAlt, MdOutlineHome } from "react-icons/md";
import {
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  FormText,
  Toast,
  ToastBody,
} from "reactstrap";
import CountdownTimer from "@/components/CountdownTimer";

export default function Page() {
  const router = useRouter();
  const [operandA, setOperandA] = useState(null);
  const [operandB, setOperandB] = useState(null);
  const [hs, setHs] = useState(null);
  const [score, setScore] = useState(0);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);

  const {
    query: { operation },
  } = router;

  useEffect(() => {
    if (!router.isReady) return;
    generateOperands();
    restart();
    console.log("called");
  }, [router.isReady]);

  let symbol = "";
  let prompt = "";

  switch (operation) {
    case "Addition":
      symbol = "+";
      break;

    case "Subtraction":
      symbol = "-";
      break;

    case "Multiplication":
      symbol = "×";
      break;

    case "Division":
      symbol = "÷";
      prompt = "Please round up to 2 decimal places (if any)";
      break;

    default:
      symbol = symbol;
  }

  const generateOperands = async () => {
    let response;
    let data;
    response = await fetch(`https://localhost:7172/Calculator/generate`);
    data = await response.json();

    while (data.operandB == 0 && operation == "Division") {
      response = await fetch(`https://localhost:7172/Calculator/generate`);
      data = await response.json();
    }

    setOperandA(data.operandA);
    setOperandB(data.operandB);

    const resp = await fetch(`https://localhost:7172/Calculator/gethashset`);
    const dat = await resp.json();
    setHs(dat);
  };

  const restart = async () => {
    try {
      setScore(0);
      await fetch(`https://localhost:7172/Calculator/restart`);
    } catch (error) {}
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const userAnswer = Number(event.target.userAnswer.value);
      event.target.userAnswer.value = null;
      const response = await fetch(
        `https://localhost:7172/Calculator/calculate?operation=${operation}&operandA=${operandA}&operandB=${operandB}&answer=${userAnswer}`
      );

      var mark = score;

      if (response.status == 400) {
        setIsCorrectAnswer(false);
        setTimeout(() => {
          setIsCorrectAnswer(null);
        }, 800);

        // avoid mark being negative
        if (mark > 0) {
          mark = score - 1;
          setScore(mark);
        }
      } else {
        setIsCorrectAnswer(true);
        mark = score + 1;
        setScore(mark);
        setTimeout(() => {
          setIsCorrectAnswer(null);
        }, 800);

        // after submitting the correct ans, generate another operands
        await generateOperands();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Head>
        <title>{operation}</title>
        <meta name="description" content="Addition" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="./logo.ico" />
      </Head>

      <main>
        <div className="text-center">
          <Row xs="2" className="m-5">
            <Col>
              <Button color="primary" outline onClick={() => router.push("/")}>
                <MdOutlineHome size={30} color="changeColor" className="mx-2" />
                Home
              </Button>
            </Col>

            <Col>
              {" "}
              <Button outline color="success" onClick={() => router.reload()}>
                <MdOutlineRestartAlt size={30} color="changeColor" />
                Restart
              </Button>
            </Col>
          </Row>
        </div>

        <div>
          <Card className="m-5">
            <CardHeader tag="h5">
              <Row xs="2">
                <Col>Current Score: {score}</Col>

                <Col className="d-flex flex-row justify-content-end p-1">
                  Time Remaining:{" "}
                  <CountdownTimer
                    initialTime={60}
                    score={score}
                    operation={operation}
                  />
                </Col>
              </Row>
            </CardHeader>

            <CardBody className="text-center" tag="h1">
              {operandA} {symbol} {operandB}
            </CardBody>

            <CardFooter className="text-center">
              <Form onSubmit={handleSubmit}>
                <FormGroup row>
                  <Label for="userAnswer"></Label>
                  <Col sm={5} className="container">
                    <Input
                      id="userAnswer"
                      name="userAnswer"
                      placeholder="Enter your answer here"
                      type="text"
                      className="text-center"
                    />
                    <FormText color="secondary">
                      <em>{prompt}</em>
                    </FormText>
                  </Col>
                </FormGroup>

                <FormGroup check row>
                  <Col>
                    <Button color="primary">Submit</Button>
                  </Col>
                </FormGroup>
              </Form>
            </CardFooter>
          </Card>

          <div className="container mx-5 rounded">
            {isCorrectAnswer && (
              <Toast className="bg-success text-white">
                <ToastBody>Well done!</ToastBody>
              </Toast>
            )}

            {!isCorrectAnswer && isCorrectAnswer != null && (
              <Toast className="bg-danger text-white">
                <ToastBody>Try again.</ToastBody>
              </Toast>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
