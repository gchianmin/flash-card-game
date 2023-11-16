import React, { useState, useEffect } from "react";
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
  FormFeedback,
  Toast,
  ToastBody,
  ToastHeader,
} from "reactstrap";

const ToastStatus = ({ correct }) => {
    const [isCorrectAnswer, setIsCorrectAnswer] = useState(null);

    const handleAnswer = (userAnswer) => {
        // Simulate answer validation logic
        // const isCorrect = /* Your answer validation logic here */;
    
        // Update state based on whether the answer is correct
        setIsCorrectAnswer(true);
    
        // Automatically dismiss the toast after 1 second
        setTimeout(() => {
          setIsCorrectAnswer(false);
        }, 1000);
      };

  return (
    <div className="p-3 my-2 rounded">
      {isCorrectAnswer ? (
        <Toast className="bg-success">
          <ToastHeader>
            Correct Answer
          </ToastHeader>
          <ToastBody>
            Well done! Your answer is correct.
          </ToastBody>
        </Toast>
      ) : (
        <Toast className="bg-danger">
          <ToastHeader>
            Incorrect Answer
          </ToastHeader>
          <ToastBody>
            Sorry, your answer is incorrect. Please try again.
          </ToastBody>
        </Toast>
      )}
      </div>
  );
};

export default ToastStatus;
