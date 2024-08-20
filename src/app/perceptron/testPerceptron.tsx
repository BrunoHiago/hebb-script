import { PerceptronClass } from "@/utils/class/PerceptronClass";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useCallback, useState } from "react";

type ModalProps = {
  perceptronObj: PerceptronClass;
  isOpen: boolean;
  onClose: () => void;
};

const ModalTest = ({ perceptronObj, isOpen, onClose }: ModalProps) => {
  const [matrix, setMatrix] = useState<Array<number>>(
    Array.from({ length: 100 }, () => -1)
  );
  const [result, setResult] = useState<number>(0);
  const handleClick = useCallback(
    (index: number, event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      setMatrix((prevMatrix) => {
        const newMatrix = [...prevMatrix];
        newMatrix[index] = prevMatrix[index] === 1 ? -1 : 1;
        return newMatrix;
      });
    },
    []
  );

  const calculate = useCallback(() => {
    setResult(perceptronObj.test(matrix));
  }, [matrix, perceptronObj]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className="text-black">
        <ModalHeader>Testar</ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-10 gap-1">
            {matrix.map((value, index) => (
              <div
                key={index}
                className={`w-8 h-8 border border-gray-400 flex items-center justify-center cursor-pointer ${
                  value === 1 ? "bg-black" : "bg-white"
                }`}
                onClick={(event) => handleClick(index, event)}
                style={{ width: "20px", height: "20px" }}
              ></div>
            ))}
          </div>
          <h1 className="text-center mt-4">
            Resultado: {result > 0 ? "A" : result < 0 ? "B" : "Indefinido"}
          </h1>
        </ModalBody>
        <ModalFooter>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={calculate}
          >
            Testar
          </button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalTest;
