"use client";
import { Button, useDisclosure } from "@nextui-org/react";
import ModalTrain, { FormValues } from "./modalTrain";
import ModalTest from "./testPerceptron";
import { PerceptronClass } from "@/utils/class/PerceptronClass";
import { useState } from "react";
import ModalLogs from "./modalLogs";
import { BiArrowBack } from "react-icons/bi";
import Link from "next/link";

const PerceptronPage = () => {
  const modalTrain = useDisclosure();
  const modalTest = useDisclosure();
  const modalLogs = useDisclosure();

  const [perceptronObj, setPerceptronObj] = useState(new PerceptronClass());

  const onSaved = async (data: FormValues) => {
    modalTrain.onClose();

    perceptronObj.setMatrix(data.matrix);
    await perceptronObj.train();
    console.log(perceptronObj.getLogs());
    modalLogs.onOpen();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex items-center w-2/3">
        <Link href="/">
          <BiArrowBack className="text-4xl font-bold mr-9" />
        </Link>
        <h1 className="text-4xl font-bold">Perceptron Script</h1>
      </div>

      <p className="text-center">
        Um simples programa que usa aprendizado Perceptron para treinar um rede
        neural para identidicar letras do alfabeto.
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

      {modalTrain.isOpen && (
        <ModalTrain
          matrixOriginal={perceptronObj.getMatrix()}
          isOpen={modalTrain.isOpen}
          onClose={modalTrain.onClose}
          onSaved={onSaved}
        />
      )}

      {modalLogs.isOpen && (
        <ModalLogs logs={perceptronObj.getLogs()} onClose={modalLogs.onClose} />
      )}

      {modalTest.isOpen && (
        <ModalTest
          isOpen={modalTest.isOpen}
          onClose={modalTest.onClose}
          perceptronObj={perceptronObj}
        />
      )}
    </main>
  );
};

export default PerceptronPage;
