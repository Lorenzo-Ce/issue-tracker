import { Box, Text, Image, Button, Spacer, Flex,
        Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon} from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { useAuthorization } from '../hooks/useAuthorization'
import axios from '../utils/axios'
import userIcon from '/userIcon.svg'
import teamIcon from '/teamIcon.svg'
import projectIcon from '/projectIcon.svg'
import issueIcon from '/issueIcon.svg'
import { useNavigate } from 'react-router-dom'



export const Sidebar = ({handleSidebar, isSidebarVisible}) => {
    const {authorization, setAuthorization} = useAuthorization()
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [isIconVisible, setIsIconVisible] = useState(() => {
        return window.innerWidth > 800 ? true : false
    })
    useEffect(() => {
        const showIcon = e => {
            const {innerWidth} = e.target
            if(innerWidth > 800){
                setIsIconVisible(true)
            } else setIsIconVisible(false)
        }
        window.addEventListener('resize',(e) => showIcon(e))
        return window.removeEventListener('resize', showIcon)
    },[])

    const handleLogout = async () => {
        try{
            setIsLoading(true)
            const response = await axios.post('/logout')
            setAuthorization({})
            navigate('/login', {replace: true})
        } catch (e) {
            console.error(e)
        } finally{
            setIsLoading(false)
        }
    }
    return(
    <Flex flexDirection='column' as='aside' textAlign='left' padding='0.8em 0.4em' w="220px" h='100vh' bg='white' color='blue.800' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'
        position={isIconVisible ? 'relative' : 'fixed'} zIndex='10'
    >    
        {!isIconVisible && 
            <Box as='section' mb='0.5em'  display='flex' justifyContent='flex-end'>
                <CloseIcon boxSize='18px' mr='0.5em' color='red.500' cursor='pointer' focusable 
                onClick={handleSidebar}/>
            </Box>
        }
        <Box as='section' mb='1em' display='flex' >
            <Image src={userIcon} boxSize='24px' alt='userIcon' float='left' mr='0.4em'/>
            <Text fontSize='lg'>Hello {authorization.username}</Text>
        </Box>
        <Accordion allowMultiple defaultIndex={[]}>
            <AccordionItem pl='0'>
            <h2>
                <AccordionButton>
                <Image src={teamIcon} boxSize='24px' alt='teamIcon' mr='0.4em'/>  
                <Box flex='1' textAlign='left'>
                    Teams
                </Box>
                <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
            </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
            <h2>
                <AccordionButton>
                <Image src={projectIcon} boxSize='24px' alt='teamIcon' mr='0.4em'/>
                <Box flex='1' textAlign='left'>
                    Projects
                </Box>
                <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
            </AccordionPanel>
            </AccordionItem>
            <AccordionItem>
            <h2>
                <AccordionButton>
                <Image src={issueIcon} boxSize='24px' alt='teamIcon' mr='0.4em'/>
                <Box flex='1' textAlign='left'>
                    Issues
                </Box>
                <AccordionIcon />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat.
            </AccordionPanel>
            </AccordionItem>
        </Accordion>
    <Spacer/>
        <Button     
            mb='5px' 
            colorScheme='red'
            loadingText='Logging out'
            isLoading={isLoading} 
            onClick={handleLogout}
        >
            Logout
        </Button>   
    </Flex>     
    )
}