"use client";
import { Button, useDisclosure } from "@nextui-org/react";
import Modal, { FormValues } from "./modal";
import { useEffect, useState } from "react";
import ModalTest from "./modalTest";

export type TrainIa = {
  weights: Array<number>;
  bias: number;
};

const Home = () => {
  const modalTrain = useDisclosure();
  const modalTest = useDisclosure();

  const [matrix, setMatrix] = useState<Record<number, Array<number>>>({
    0: Array.from({ length: 100 }, () => -1),
    1: Array.from({ length: 100 }, () => -1),
  });

  const [trainIa, setTrainIa] = useState<TrainIa>({
    weights: Array.from({ length: 100 }, () => 0),
    bias: 0,
  });

  const onSaved = (data: FormValues) => {
    modalTrain.onClose();
    setMatrix(data.matrix);
  };

  useEffect(() => {
    console.log(matrix);

    const matrixA = matrix[0];
    const matrixB = matrix[1];

    const saida = [1, -1];
    const newWeights = Array.from({ length: 100 }, () => 0);
    let newBias = 0;

    for (let i = 0; i < 100; i++) {
      newWeights[i] = matrixA[i] * saida[0] + matrixB[i] * saida[1];
    }

    newBias = saida[0] + saida[1];

    setTrainIa({
      weights: newWeights,
      bias: newBias,
    });
  }, [matrix]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Hebb Script</h1>
      <p className="text-center">
        Primeiro, você precisa treinar a rede neural. Para isso, clique no botão
        &ldquo;Treinar&rdquo; e preencha a matriz de treinamento.
      </p>
      <div className="flex flex-row gap-3">
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={modalTrain.onOpenChange}
        >
          Treinar
        </Button>
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={modalTest.onOpenChange}
        >
          Testar
        </Button>
      </div>

      <Modal
        isOpen={modalTrain.isOpen}
        onClose={modalTrain.onClose}
        onSaved={onSaved}
      />
      <ModalTest
        isOpen={modalTest.isOpen}
        onClose={modalTest.onClose}
        trainIa={trainIa}
      />
    </main>
  );
};

export default Home;
