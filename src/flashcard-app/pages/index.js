import Head from "next/head";
import Image from "next/image";
import React from "react";
import { Button, ButtonGroup } from "reactstrap";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>FlashMath</title>
        <meta
          name="description"
          content="A flash card app to practice multiplication tables"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="text-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={300}
            height={200}
            className="mt-5"
          />

          <p className="lead hero pb-3">
            <em>Practice Math at ease</em>
          </p>
          <p className="pb-3">Select an operation to start practicing now!</p>

          <ButtonGroup vertical>
            <Button
              color="primary"
              className="m-2"
              onClick={() => router.push(`/calculation/Addition`)}
            >
              Addition
            </Button>

            <Button
              color="primary"
              className="m-2"
              onClick={() => router.push(`/calculation/Subtraction`)}
            >
              Subtraction
            </Button>

            <Button
              color="primary"
              className="m-2"
              onClick={() => router.push(`/calculation/Multiplication`)}
            >
              Multiplication
            </Button>

            <Button
              color="primary"
              className="m-2"
              onClick={() => router.push(`/calculation/Division`)}
            >
              Division
            </Button>
          </ButtonGroup>
        </div>
      </main>
    </>
  );
}
