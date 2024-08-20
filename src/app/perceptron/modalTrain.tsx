import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

type ModalProps = {
  matrixOriginal: Record<number, Array<number>>;
  isOpen: boolean;
  onClose: () => void;
  onSaved: (data: FormValues) => void;
};

export type FormValues = {
  word: number;
  matrix: Record<number, Array<number>>;
};

const ModalTrain = ({
  matrixOriginal,
  isOpen,
  onClose,
  onSaved,
}: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [matrix, setMatrix] = useState<Record<number, Array<number>>>({
    0: Array.from({ length: 100 }, () => -1),
    1: Array.from({ length: 100 }, () => -1),
  });
  const [word, setWord] = useState<number | undefined>(undefined);

  const letters = [
    { key: 0, label: "A" },
    { key: 1, label: "B" },
  ];

  useEffect(() => {
    setMatrix(matrixOriginal);
  }, [matrixOriginal]);

  const handleClick = useCallback(
    (word: number, index: number, event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();

      setMatrix((prevMatrix) => ({
        ...prevMatrix,
        [word]: {
          ...prevMatrix[word],
          [index]: prevMatrix[word][index] === 1 ? -1 : 1,
        },
      }));
    },
    []
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent className="text-black">
        <ModalHeader>Treinar a IA</ModalHeader>
        <ModalBody>
          <form
            onSubmit={handleSubmit((data) => {
              data.matrix = matrix;
              onSaved(data);
            })}
            className="flex flex-col gap-2"
          >
            <span className="text-sm text-gray-500">
              Selecione a letra que deseja salvar.
            </span>
            <Select
              {...register("word", { required: true })}
              label="Selecione uma letra"
              placeholder="Selecione uma letra"
              className="w-full"
              onSelectionChange={(keys) => setWord(Number(keys.currentKey))}
            >
              {letters.map((letter) => (
                <SelectItem
                  key={letter.key}
                  value={letter.key}
                  className="text-gray-700"
                >
                  {letter.label}
                </SelectItem>
              ))}
            </Select>
            {errors.word && (
              <span className="text-xs text-red-500">
                O campo não pode ser vazio.
              </span>
            )}
            <span className="text-sm text-gray-500">
              Digite a matriz de pixels.
            </span>
            <div className="grid grid-cols-10 gap-2 mt-2">
              {word !== undefined &&
                Object.entries(matrix[word || 0]).map(([key, value]) => (
                  <div
                    key={key}
                    className={`border border-black ${
                      value === 1 ? "bg-black" : "bg-slate-200"
                    }`}
                    onClick={(event) => handleClick(word, Number(key), event)}
                    style={{ width: "20px", height: "20px" }}
                  ></div>
                ))}
            </div>
            <ModalFooter>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Salvar
              </button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalTrain;
