import React, { useState } from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    Checkbox,
    UnorderedList,
    ListItem,
    Card,
    Button,
} from '@chakra-ui/react'

// const data=[{
//     id:1,
//     name:"Apple x startup",
//     Time:"June 22nd, 2023 8:15 AM",
//     account:"Apple",
//     nextsteps:"Lorem ipsum dolor sit amet"
// },{
//     id:2,
//     name:"Apple x startup",
//     Time:"June 22nd, 2023 8:15 AM",
//     account:"Apple",
//     nextsteps:"Lorem ipsum dolor sit amet"
// },{
//     id:3,
//     name:"Apple x startup",
//     Time:"June 22nd, 2023 8:15 AM",
//     account:"Apple",
//     nextsteps:"Lorem ipsum dolor sit amet"
// },{
//     id:4,
//     name:"Apple x startup",
//     Time:"June 22nd, 2023 8:15 AM",
//     account:"Apple",
//     nextsteps:"Lorem ipsum dolor sit amet"
// },{
//     id:5,
//     name:"Apple x startup",
//     Time:"June 22nd, 2023 8:15 AM",
//     account:"Apple",
//     nextsteps:"Lorem ipsum dolor sit amet"
// }]
const TableData = ({ onSelectTableRow, selected, selectedAll, onSelectAllTableRow, data }) => {
    const [show, setShow] = useState('')
    const onShowMore = (item) => {
        setShow(prevState => {
            if (prevState !== item.id) {
                return item.id
            } else return ''
        }
        )
    }


    return (
        <Card m={"30px 0 0"} >

            <Box>
                <TableContainer>
                    <Table size='sm' orientation='horizontal'>
                        <Thead >
                            <Tr h='48px'>
                                <Th w='20px'>
                                    <Checkbox
                                        isChecked={selectedAll}
                                        onChange={(e) => onSelectAllTableRow(!selectedAll, '')}
                                    >
                                    </Checkbox>
                                </Th>
                                <Th textTransform={"capitalize"}>Name</Th>
                                <Th textTransform={"capitalize"}>Time</Th>
                                <Th textTransform={"capitalize"}>Account</Th>
                                <Th textTransform={"capitalize"}>Next steps</Th>
                            </Tr>
                        </Thead>
                        <Tbody verticalAlign='baseline'>
                            {data && data.length ? data.map(item => {
                                return (
                                    <Tr>
                                        <Td>
                                            <Checkbox
                                                isChecked={selected.includes(item.id)}
                                                onChange={(e) => onSelectTableRow(false, item.id)}

                                            >
                                            </Checkbox>
                                        </Td>
                                        <Td color='#01c4ff'>{item?.properties?.hs_meeting_title}</Td>
                                        <Td>{new Date(item?.properties?.hs_createdate).toLocaleString()}</Td>
                                        <Td >{item?.properties?.owner_details?.firstName} {item?.properties?.owner_details?.lastName}</Td>
                                        <Td>
                                            <div className={`${item.id == show && 'show-alldescription-data'} description-data `} dangerouslySetInnerHTML={{ __html: item?.properties?.hs_body_preview_html }}></div>
                                            <Button onClick={() => onShowMore(item)} m='5px 0' fontSize='12px' h='25px' p='0 5px' colorScheme='teal' variant='outline' borderRadius='md' color='#767676'
                                                borderWidth='0px'>
                                                Show all
                                            </Button>
                                        </Td>

                                    </Tr>
                                )

                            }) : ''}



                        </Tbody>
                    </Table>
                    {data && data.length == 0 ? <div className='nodata-found'>No records</div> : ''}

                </TableContainer>

            </Box>
        </Card>
    )
}

export default TableData