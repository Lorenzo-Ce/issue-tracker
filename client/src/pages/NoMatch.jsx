import { Box, Grid, Heading } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom'
import Error404 from '../assets/404_error.svg'

export const NoMatch = () => {

    return(
        <Box 
            display='flex'
            color='blue.700'
            >
            <Grid
                placeContent='center'
                position='relative'
                maxWidth='1500px'
                height='80vh'
                margin='0 auto'
                p='2em'
                _before={{
                    content: `""`,
                    position: 'absolute',
                    zIndex: '0',
                    height: '380px',
                    width: '380px',
                    opacity: '0.3',
                    right: '5%',
                    bottom: '5%',
                    backgroundImage: `${Error404}`
                }}
            >
                <Box
                position='relative'
                    zIndex='2'
                >
                    <Heading fontSize='4xl'
                        pb='1em'
                    >
                        Page Not Found
                    </Heading>
                    <Box as='p' 
                        pb='0.3em'
                    > 
                        {`I'm sorry, we can't find the page you are looking for. 
                        You can start over to the main page:`}
                    </Box> 
                    <NavLink to='/dashboard'
                        className='routerLink'
                        >       
                        &gt; Click Here for the Main Page
                    </NavLink>
                    <br/>
                    <NavLink to='/dashboard/myIssues'
                        className='routerLink'
                        >       
                        &gt; Click Here for My Issues
                    </NavLink>
                </Box>
            </Grid>
        </Box>
    )
}
export default NoMatch