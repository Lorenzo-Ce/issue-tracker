import { Heading, Text, Box, Image, Flex, Input, InputGroup, InputRightElement, Button, useDisclosure } from "@chakra-ui/react"
import { useState } from "react"
import { REGX_DATE } from "../../utils/regex"
import { Label } from "../Label"
import { CloseIcon } from '@chakra-ui/icons'
import useHover from "../../hooks/useHover"
import BasicModal from "../Modals/BasicModal"
import { useAuthorization } from "../../hooks/useAuthorization"


export const IssueInfo = ({issueInfo, setIssueInfo}) => {
    const {isHover, onHoverEnter, onHoverLeave, onHoverSwitch} = useHover()
    const {isOpen: isOpenImg, onClose: onCloseImg, onOpen: OnOpenImg} = useDisclosure()
    
    const {authorization} = useAuthorization()
    const [comment, setComment] = useState({
        author: authorization.username,
        text: '',
        date: '',
    })

    return(
    <>
        <Flex 
            alignItems='baseline'
            justifyContent='space-between'
        >
            <Heading fontSize='xl' fontWeight='bold' mb='0.2em'>
                {issueInfo.name}
            </Heading>
            <CloseIcon 
                boxSize='20px'
                cursor='pointer'
                color={isHover['closeIcon'] ? 'red.500' : 'red.300'} 
                border={isHover['closeIcon'] ? '1px solid' : '0px'}
                p='2px'
                borderColor={isHover['closeIcon'] ? 'red.500' : 'white'}
                borderRadius='50vh'
                transition='color 1s ease-out, border-color 0.5s;'
                onMouseEnter={(e) => onHoverEnter(e, 'closeIcon')}
                onMouseLeave={(e) => onHoverLeave(e, 'closeIcon')}
                onClick={() => {setIssueInfo({})}}
            />
        </Flex>
    <Box 
        display='flex' 
        flexDirection={['column', 'row']}
        justifyContent='space-between'
    >
        <Image 
            src={`http://127.0.0.1:3500/images/${issueInfo.image}`} 
            alt={issueInfo.name}
            objectFit='cover'
            objectPosition='center'
            width={{sm: '49%', md: '40%'}}
            onClick={OnOpenImg}
        />    
        <Box
            width={{sm: '49%', md: '59%'}}
        >
            <Box>
                    <p> 
                        {issueInfo.description} 
                    </p>
            </Box>
            <Box display='flex' gap='1em' flexWrap='wrap' mt='0.5em' fontSize='12px'>
                <Box>
                    <Text fontWeight='bold' textTransform='uppercase'>Status</Text> 
                    <Label padding='0.1em 0.5em'>{issueInfo.status}</Label>
                </Box>
                <Box>
                    <Text fontWeight='bold' textTransform='uppercase'>Opening Date</Text>  
                    {issueInfo.openingDate ? issueInfo.openingDate.replace(REGX_DATE, '$3-$2-$1') : ' Not Defined'}
                </Box>
                <Box> 
                    <Text fontWeight='bold' textTransform='uppercase'>Closing date </Text>
                    {issueInfo.closingDate ? issueInfo.closingDate.replace(REGX_DATE, '$3-$2-$1') : ' Not Defined' }
                </Box>
            </Box>
        </Box>
    </Box>
    {issueInfo.comments.length === 0 &&    
        <Box mt='1em'>
        <Heading fontSize='md' fontWeight='bold' mb='0.2em'>
            Comments
        </Heading>
        <Box 
            background='blue.100' 
            borderRadius='5px' 
            boxShadow='rgba(0, 0, 0, 0.1) 0px 3px 10px'
            mb='0.7em'
        >
            <Box 
                as='p' 
                p='1em' 
                fontSize='12px' 
                color='blue.600'
            >
                <Text as='span' fontWeight='bold'>
                    Author &#9679; 07/08/2000
                </Text>
                <Text fontSize='16px'>
                   Message
                </Text>
            </Box>
        </Box>
        <InputGroup size='md'>
            <Input
                name="comment"
                pr='4.5rem'
                type='text'
                placeholder='Enter Comment'
                value={comment.text}
                onChange={e => {setComment(prev => ({...prev, text: e.target.value}))}}
            />
                <InputRightElement 
                    width='6rem'
                >
                <Button 
                    h='1.75rem' 
                    size='sm'
                    isLoading={false} 
                    onClick={() => {
                        //setComment(prev => ({...prev, date: new Date().toISOString()})
                        console.log(new Date().toISOString())
                    }}
                >
                    Comment
                </Button>
            </InputRightElement>
        </InputGroup>
    </Box>
    }
    <BasicModal isOpen={isOpenImg} onClose={onCloseImg} size='lg'>
    <Image 
            src={`http://127.0.0.1:3500/images/${issueInfo.image}`} 
            alt={issueInfo.name}
            overflow='scroll'
            transition='trasform 0.25s'
        />       
    </BasicModal>
    </>
    )
}

//TODO Add update function, Add ZOOM
//