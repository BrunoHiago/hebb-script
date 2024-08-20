import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

type ModalLogsProps = {
  logs: string[];
  onClose: () => void;
};
const ModalLogs = ({ logs, onClose }: ModalLogsProps) => {
  return (
    <Modal isOpen={true} onClose={onClose} scrollBehavior="inside">
      <ModalContent className="text-gray-800">
        <ModalHeader>Logs</ModalHeader>

        <ModalBody>
          <pre className="text-xs">
            {logs.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
          </pre>
        </ModalBody>
        <ModalFooter>
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
            onClick={onClose}
          >
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalLogs;
