import { ArrowUpDownIcon, CalendarIcon, ChevronDownIcon, TriangleDownIcon } from '@chakra-ui/icons'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Grid,
    Box,
    Flex,
    CardFooter,
    Code,
    Text
} from '@chakra-ui/react'
import React from 'react'

const Footer = ({paging,fetchMeetings,filtermeeting}) => {

    const onPageChange = (page) => {
        if (page == "next") {
            fetchMeetings(paging)
        } else {
            fetchMeetings(undefined)

        }
    }
    return (
        <Box  >
            <Flex minWidth='max-content' alignItems='center' justifyContent='space-between' m='15px 0' >
                <Grid p='4 0'  >
                    <Flex gap='2'>
                        {/* <Text fontSize='sm'>Showing 1 to 5 of 42 results</Text> */}
                    </Flex>
                </Grid>
                <Grid p='4 0'>
                    <Flex gap='2'>
                        <Button isDisabled ={filtermeeting.length == 0} h='34px' colorScheme='white' color={"#000"} borderRadius='md'
                            borderWidth='1px' onClick={() => onPageChange("prev")}>
                            First
                        </Button>
                        <Button isDisabled ={paging == undefined || filtermeeting.length == 0} h='34px' colorScheme='white' color={"#000"} borderRadius='md'
                            borderWidth='1px' onClick={() => onPageChange("next")} >
                            Next
                        </Button>
                        {/* <Button colorScheme='teal' variant='outline'>
                            Next
                        </Button> */}

                    </Flex>
                </Grid>
            </Flex>
        </Box>
    )
}

export default Footer