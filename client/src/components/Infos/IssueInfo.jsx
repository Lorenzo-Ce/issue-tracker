import { Heading, Text, Box, Image, Flex, Input, InputGroup, InputRightElement, Button, useDisclosure } from "@chakra-ui/react"
import { CloseIcon, DeleteIcon, TimeIcon } from '@chakra-ui/icons'
import { useState,useEffect } from "react"
import { useAuthorization } from "../../hooks/useAuthorization"
import useSubmitData from "../../hooks/useSubmitData"
import useDeleteData from "../../hooks/useDeleteData"
import { Label } from "../Alerts/Label"
import BasicModal from "../Modals/BasicModal"
import { initialIssueFormValues } from "../../utils/initializeForm"
import { REGX_DATETIME } from "../../utils/regex"
import  {nanoid} from 'nanoid'
import format from "date-fns/format"
import imagePlaceholder from "../../assets/imagePlaceholder.png"

export const IssueInfo = ({projectId, issueInfo, setIssueInfo, setProject}) => {
    const {authorization} = useAuthorization()
    const {isOpen: isOpenImg, onClose: onCloseImg, onOpen: OnOpenImg} = useDisclosure()
    const {handleSubmit: submitComment, resetMessage, successMessage, submitError, isLoadingSubmit: isLoadingComment} = useSubmitData(`/projects/${projectId}/issues`, 'put' )
    const {handleDelete: deleteComment, successMessage: successDeleteMessage, isDeleting, payload: updatedIssue} = useDeleteData(`/projects/${projectId}/issues/${issueInfo._id}/`)
    const [isPosting, setIsPosting] = useState(false)
    const [comment, setComment] = useState({
        _id: '',
        author: authorization.username,
        text: '',
        date: '',
    })
    
    useEffect(() => {
        const subcomment = async (e, issueToUpdate) => {
            const response = await submitComment(e, issueToUpdate)
            const updatedIssue = response?.issues.find(issue => issue._id === issueInfo._id)
            setIssueInfo(updatedIssue)
            setIsPosting(false)
        }
        setComment(prevComment => ({...prevComment, _id: nanoid(), date: new Date().toISOString()}))
        if(isPosting){
            const newIssue = {...issueInfo}
            newIssue.comments = [...newIssue.comments, comment]
            subcomment(null, newIssue)
        }
    }, [isPosting])

    useEffect(() => {
        if(successDeleteMessage !==''){
            setIssueInfo(updatedIssue)
            setProject(prevProject => {
                const issueIndex = prevProject.issues.findIndex(issue => issue._id === updatedIssue._id)
                prevProject.issues[issueIndex] = updatedIssue
                return prevProject
            })
        }
    },[successDeleteMessage])

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
                p='2px'
                boxSize='20px'
                cursor='pointer'
                color='red.300' 
                border='0px'
                borderColor='transparent'
                borderRadius='50vh'
                transition='color 0.5s ease-out, border-color 0.5s;'
                _hover={{
                    color:'red.500', 
                    border: '1px solid',
                    borderColor:'red.500',
                }}
                onClick={() => {setIssueInfo(initialIssueFormValues)}}
            />
        </Flex>
    <Flex  
        flexDirection={['column', 'row']}
        justifyContent='space-between'
    >
        <Image 
            src={issueInfo.image !== '' ?`http://127.0.0.1:3500/images/${issueInfo.image}` : '' } 
            alt={issueInfo.name}
            objectFit='cover'
            objectPosition='center'
            maxHeight='200px'
            width={{sm: '49%', md: '40%'}}
            fallbackSrc={imagePlaceholder}
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
            <Flex gap='1em' flexWrap='wrap' mt='0.5em' fontSize='12px'>
                <Box>
                    <Text fontWeight='bold' textTransform='uppercase'>Status</Text> 
                    <Label padding='0.1em 0.5em'>{issueInfo.status}</Label>
                </Box>
                <Box>
                    <Text fontWeight='bold' textTransform='uppercase'>Opening Date</Text>  
                    {issueInfo.openingDate ? issueInfo.openingDate.replace(REGX_DATETIME, '$3-$2-$1') : ' Not Defined'}
                </Box>
                <Box> 
                    <Text fontWeight='bold' textTransform='uppercase'>Closing date </Text>
                    {issueInfo.closingDate ? issueInfo.closingDate.replace(REGX_DATETIME, '$3-$2-$1') : ' Not Defined' }
                </Box>
            </Flex>
        </Box>
    </Flex>
    <Box mt='1em'>
    <Heading fontSize='md' fontWeight='bold' mb='0.2em'>
        Comments
    </Heading>
    {  
        issueInfo.comments?.length > 0 &&
        issueInfo.comments.map(({_id, author, text, date}) => {        
            const timezoneDate = format(new Date(date), "dd-MM-yyyy kk:mm")
            return(
                <Box 
                    key={_id}
                    background='blue.100' 
                    borderRadius='5px' 
                    boxShadow='rgba(0, 0, 0, 0.1) 0px 3px 10px'
                    mb='0.7em'
                >
                    <Box
                        p='1em' 
                        fontSize='12px' 
                        color='blue.600'
                    >               
                    {
                        author === authorization.username &&
                        isDeleting ? 
                            <TimeIcon 
                                float='right'
                                boxSize='15px'
                                cursor='pointer'
                                color='red.300'
                            /> :
                            <DeleteIcon 
                                float='right'
                                boxSize='15px'
                                cursor='pointer'
                                color='red.300'
                                transition='color 0.25s'
                                _hover={{color:'red.500'}}
                                onClick={async () => {
                                    await deleteComment(_id)
                                }}
                            />
                    }
                        <Text as='span' fontWeight='bold'>
                            {author} &#9679; {timezoneDate}
                        </Text>
                        <Text fontSize='16px'>
                            {text}
                        </Text>
                    </Box>
                </Box>
        )}
        )
    }
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
                    isLoading={isLoadingComment} 
                    onClick={() => {setIsPosting(true)}}
                >
                    Comment
                </Button>
            </InputRightElement>
        </InputGroup>
    </Box>
    <BasicModal isOpen={isOpenImg} onClose={onCloseImg} size='lg'>
    <Image 
        src={`http://127.0.0.1:3500/images/${issueInfo.image}`} 
        alt={issueInfo.name}
        overflow='scroll'
        width='100%'
        margin='0 auto'
        transition='trasform 0.25s'
    />       
    </BasicModal>
    </>
    )
}
