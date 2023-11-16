import { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Image from "next/image";
import { useRouter } from "next/router";

const CountdownTimer = ({ initialTime, score, operation }) => {
  const router = useRouter();
  const [time, setTime] = useState(initialTime);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => {
        const newTime = prevTime - 1;

        if (newTime <= 0) {
          clearInterval(intervalId);
          setModal(true);
          return 0;
        }

        return newTime;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = `${Math.floor(time / 60)}:${(time % 60).toLocaleString(
    "en-US",
    {
      minimumIntegerDigits: 2,
      useGrouping: false,
    }
  )}`;

  return (
    <>
      {formattedTime}
      <Modal isOpen={modal}>
        <ModalHeader>Time's Up!</ModalHeader>
        <ModalBody className="text-center">
          <Image
            src="/fireworks.png"
            alt="Logo"
            width={300}
            height={200}
            className="mb-4"
          />

          <p>Your score for this round is {score}!</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => router.reload()}>
            Play Again
          </Button>{" "}
          <Button color="secondary" onClick={() => router.push("/")}>
            Main Menu
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CountdownTimer;
