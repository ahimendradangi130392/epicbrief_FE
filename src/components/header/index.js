import { ArrowUpDownIcon, CalendarIcon, ChevronDownIcon, TriangleDownIcon } from '@chakra-ui/icons'
import FilterIcon from '../../assets/svg/filter'
import SortIcon from '../../assets/svg/sort'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Grid,
    Box,
    Flex,
    Text,
    Input
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { RangeDatepicker } from 'chakra-dayzed-datepicker'

const filterType = ["filterByName", "Filter"]
const sortType = ["recent", "oldest"]
const actionType = ["delete", "edit"]

const Header = ({ selectedDates, setSelectedDates, searchHandleChange, searchValue, onEditClick, onSortChangeHandle, onActionChangeHandle, onFilterChangeHandle, filter, action, sort }) => {
    return (
        <Box  >
            <Text fontSize='2xl' fontWeight='600' m='0 0 20px'> Meetings</Text>
            <Flex minWidth='max-content' alignItems='center' justifyContent='space-between' >
                <Grid p='4 0'  >
                    <Flex gap='2'>
                        <Menu>
                            <MenuButton textTransform={'capitalize'} h='40px' colorScheme='white' color={"#000"} borderRadius='md'
                                borderWidth='1px' as={Button} leftIcon={<FilterIcon />}>
                                {filter ? filter : "Filter"}
                            </MenuButton>
                            <MenuList>
                                {filterType.map(val => <MenuItem textTransform={'capitalize'} onClick={() => onFilterChangeHandle(val)
                                }>{val}</MenuItem>)}
                            </MenuList>
                        </Menu>
                        <Menu>
                            <MenuButton textTransform={'capitalize'} h='40px' colorScheme='white' color={"#000"} borderRadius='md'
                                borderWidth='1px' as={Button} rightIcon={<ChevronDownIcon color='#9d9a9a' />}>
                                Actions
                            </MenuButton>
                            <MenuList>
                                {actionType.map(val => <MenuItem textTransform='capitalize' onClick={() => onActionChangeHandle(val)
                                }>{val}</MenuItem>)}
                            </MenuList>
                        </Menu>
                        {filter== "filterByName" && <Input onChange={searchHandleChange} name="name" value={searchValue} id="outlined-basic" placeholder="search by name" variant="outlined" sx={{ width: '250px', border: '1px solid #B6B6B6', borderRadius: " 5px", marginBottom: '10px' }} />}

                    </Flex>
                </Grid>
                <Grid p='4 0'>
                    <Flex gap='2'>
                        <Menu>
                            <MenuButton textTransform='capitalize' minWidth='140px' h='40px' colorScheme='white' color={"#000"} borderRadius='md'
                                borderWidth='1px' as={Button} leftIcon={<SortIcon />}>

                                Sort:{sort ? sort : "oldest"}
                            </MenuButton>
                            <MenuList >
                                {sortType.map(val => <MenuItem textTransform='capitalize' onClick={() => onSortChangeHandle(val)}>{val}</MenuItem>)}

                            </MenuList>
                        </Menu>
                        {/* <Menu>
                            <MenuButton h='36px' colorScheme='white' color={"#000"} borderRadius='md'
                                borderWidth='1px' leftIcon={<CalendarIcon color='#9d9a9a' />}>
                                Actions
                            </MenuButton>

                        </Menu> */}
                        <Flex className="custom-datepicker" borderRadius='md'
                            borderWidth='1px'
                            w='240px'>
                            <CalendarIcon color='#9d9a9a' m='8px 0px 0 8px' />
                            <RangeDatepicker style={{ padding: "0 0 0 34px" }}
                                selectedDates={selectedDates}
                                onDateChange={setSelectedDates}
                                configs={{
                                    dateFormat: 'dd-MM-yyyy',

                                }}
                            />
                        </Flex>
                    </Flex>
                </Grid>
            </Flex>
        </Box>
    )
}

export default Header