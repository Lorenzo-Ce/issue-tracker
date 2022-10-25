import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,  Button } from '@chakra-ui/react'

export function BasicModal({title, isOpen, onClose, size='md', children }) {
        
        return (
            <Modal 
                isOpen={isOpen} 
                onClose={onClose}
                size
            >
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    overflow='scroll'
                >
                    {children}
                </ModalBody>
        
                <ModalFooter>
                </ModalFooter>
                </ModalContent>
            </Modal>
    )
}
export default BasicModal
