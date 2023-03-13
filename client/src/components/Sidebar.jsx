import { Box, Text, Image, Button, Spacer, Flex } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../utils/axios'
import useAuthorization from '../hooks/useAuthorization'
import userIcon from '/userIcon.svg'
import issueIcon from '/issueIcon.svg'
import projectIcon from '/projectIcon.svg'

export const Sidebar = ({handleSidebar}) => {
    const navigate = useNavigate()
    const {authorization, setAuthorization} = useAuthorization()
    const [isLoading, setIsLoading] = useState(false)
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
    <Flex flexDirection='column' as='aside' textAlign='left' padding='0.8em 0.4em' width='200px' h='100vh' bg='white' color='blue.800' boxShadow='rgba(0, 0, 0, 0.1) 0px 4px 12px'
        position={isIconVisible ? 'sticky' : 'fixed'} top='0' zIndex='10'
    >    
        {!isIconVisible && 
            <Box as='section' mb='0.5em'  display='flex' justifyContent='flex-end'>
                <CloseIcon
                    id='closeIcon' 
                    boxSize='16px' mr='0.5em' 
                    border='0'
                    color='red.400' 
                    cursor='pointer' 
                    focusable
                    onClick={handleSidebar}
                    transition='color 0.3s, transform 0.3s'
                    _hover={{
                        color: 'red.500',
                        transform: 'scale(1.3)',
                        borderColor: 'red.500',
                        borderRadius: '100vh'
                    }}
                />
            </Box>
        }
        <Box 
            as='section' 
            display='flex' 
            pb='1em' 
            borderBottom='2px solid lightgray'
        >
            <Image src={userIcon} boxSize='24px' alt='userIcon' float='left' mr='0.4em'/>
            <Text fontSize='lg'>Hello, {authorization.username}</Text>
        </Box>
        <h2>
        <Flex 
            justifyContent='space-between' 
            alignItems='center' 
            p='0.5em 0.7em'
            borderBottom='1px solid lightgray'
        >
            <Link to='/dashboard'>
                Dashboard
            </Link>
            <Image src={projectIcon} boxSize='20px' alt='teamIcon' mr='0.4em'/>
        </Flex>
        </h2>
        <h2>
        <Flex 
            justifyContent='space-between' 
            alignItems='center' 
            p='0.5em 0.7em'
        >
            <Link to='/issues'>
                My Issues
            </Link>
            <Image src={issueIcon} boxSize='20px' alt='teamIcon' mr='0.4em'/>
        </Flex>
        </h2>
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