import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,  Button } from '@chakra-ui/react'

export function BasicModal({title, isOpen, onClose, children }) {
        
        return (
            <Modal 
                isOpen={isOpen} 
                onClose={onClose}
                scrollBehavior='inside'
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {children}
                </ModalBody>
        
                <ModalFooter>
                </ModalFooter>
                </ModalContent>
            </Modal>
    )
}
export default BasicModal
