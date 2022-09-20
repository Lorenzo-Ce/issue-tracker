import { Heading, Text } from "@chakra-ui/react"

export const ProjectInfo = () => {

    return(
    <>
        <Heading fontSize='xl' fontWeight='bold'>PROJECT INFO</Heading>
        <span>
            <Text fontWeight='bold'>Name:</Text> Project Name
        </span>
        <span>
            <Text fontWeight='bold'>Description:</Text>
                <p>
                    Lorem ipsum dolor sit amet,consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore mag aliqua.
                    Ut enim ad minim veniam,quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
        </span>
        <span>
            <Text fontWeight='bold'>Status:</Text> Open
        </span>
        <span>
            <Text fontWeight='bold'>Opening Date:</Text> 1/1/2022
        </span>
        <span>
            <Text fontWeight='bold'>Closing Date:</Text> 2/1/2022
        </span>
    </>
    )
}