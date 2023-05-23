import React, { useEffect, useState } from 'react';
import {
    Box,
    Grid,
} from '@chakra-ui/react';
import TableData from '../components/table';
import Header from '../components/header';
import Footer from '../components/footer';
import { getMeetings, deleteMeeting } from '../services';
import { deleteFireBaseData } from '../firebase';
import EditMeeting from '../components/editMeeting/editMeeting';
import { useToast } from "@chakra-ui/react"
import { Skeleton, Stack } from "@chakra-ui/react"

function convert(str) {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
}

function Demo() {
    const toast = useToast()
    const [isEditOpen, setEditOpen] = useState(false)
    const [editData, setEditData] = useState({})
    const [action, setAction] = useState('')
    const [filter, setFilter] = useState('')
    const [sort, setSort] = useState('')
    const [selected, setSelected] = useState([])
    const [selectedAll, setSelectedAll] = useState(false)
    const [meetings, setMeetings] = useState([])
    const [filtermeeting, setFilterMeeting] = useState([])
    const [paging, setPagging] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const [selectedDates, setSelectedDates] = useState([new Date(), new Date()]);

    // search filter 
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        let minDate = convert(selectedDates[0])
        let maxDate = convert(selectedDates[1])
        if (selectedDates.length == 2) {
            let filterDate = meetings.filter(date => (convert(date.properties.hs_createdate)) >= minDate && (convert(date.properties.hs_createdate)) <= maxDate)
            setFilterMeeting(filterDate)
        }

    }, [selectedDates])


    useEffect(() => {
        //get data from hubspot api
        fetchMeetings(paging)
    }, [])

    //fetch meetings data
    const fetchMeetings = (page) => {
        setLoading(true)
        getMeetings(page)
            .then(res => {

                setMeetings(res.data.results)
                if (res?.data?.paging) {
                    setPagging(res?.data?.paging?.next?.after)

                } else setPagging(undefined)
                setSelectedDates([new Date(new Date().setDate(new Date().getDate() - 2)), new Date()])

                setLoading(false)

            })
            .catch(err => {
                console.log("err", err)
                setLoading(false)
            })
    }


    //on edit handler
    const onEditClick = () => {
        let editedData = meetings.find(x => x.id == selected[0])
        setEditData(editedData)
        setEditOpen(!isEditOpen)
    }


    //onActionChangeHandle 
    const onActionChangeHandle = (val) => {
        setAction(val)

        if (val == "delete") {
            if (selected.length) {
                setLoading(true)

                deleteMeeting(selected[0]).then(res => {
                    deleteFireBaseData(selected[0]).then((res) => {
                        toast({
                            title: "Meeting deleted.",
                            description: "We've deleted your Meeting for you.",
                            status: "success",
                            duration: 9000,
                            isClosable: true,
                        })
                        setSelected([])
                        fetchMeetings()
                        setLoading(false)

                    })

                })
                    .catch(err => toast({
                        title: "Error",
                        description: err.message,
                        status: "success",
                        duration: 9000,
                        isClosable: true,
                    }))
            } else {
                toast({
                    title: "Error",
                    description: "Please select only one record",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }

        } else {
            if (selected.length === 1) {
                onEditClick()
            } else {
                toast({
                    title: "Error",
                    description: "Please select only one record",
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }

        }
    }

    //onFilterChangeHandle 
    const onFilterChangeHandle = (val) => {
        setFilter(val)
    }

    //table chackbox 

    const onSelectTableRow = (isAllSelected, id) => {
        let ids = [...selected]

        if (ids.includes(id)) {
            let index = ids.findIndex(x => x == id)
            let editIds = ids.splice(index, 1)
            setSelected(ids)
            setSelectedAll(isAllSelected)
        } else {
            ids.push(id)
            setSelected(ids)
            setSelectedAll(isAllSelected)
        }


    }
    const onSelectAllTableRow = (isAllSelected, id) => {
        let allIds = meetings.map(ele => ele.id)
        setSelected(isAllSelected ? allIds : [])
        setSelectedAll(isAllSelected)

    }

    //sort by oldest value and recent 
    const onSortChangeHandle = (val) => {
        if (val !== 'recent') {
            let sortTitle = meetings.sort((a, b) => a.properties.hs_createdate.localeCompare(b.properties.hs_createdate));
            setFilterMeeting(sortTitle);

        } else {
            let sortTitle = meetings.sort((a, b) => b.properties.hs_createdate.localeCompare(a.properties.hs_createdate));
            setFilterMeeting(sortTitle);
        }
        setSort(val)
    }


    // filter by meeting title value
    const searchHandleChange = (event) => {
        setSearchValue(event.target.value)
        const searchData = meetings.filter(value => value.properties.hs_meeting_title.toLowerCase().includes(event.target.value.toLowerCase()))
        if (event.target.value) {
            setFilterMeeting(searchData)
        } else
            setFilterMeeting(meetings)


    }

    return (
        <>
            {loading ? <Stack maxnH="100vh">
                <Skeleton height="20px" />
                <Skeleton height="20px" />
                <Skeleton height="20px" />
            </Stack> : <>
                <Box fontSize="xl" bgColor='#f7fafc'>
                    <Grid maxW="1200px" m={"10px auto"} maxnH="100vh" p={3} >
                        <Header onEditClick={onEditClick}
                            onActionChangeHandle={onActionChangeHandle}
                            action={action}
                            onFilterChangeHandle={onFilterChangeHandle}
                            filter={filter}
                            onSortChangeHandle={onSortChangeHandle}
                            sort={sort}
                            selectedDates={selectedDates}
                            setSelectedDates={setSelectedDates}
                            searchHandleChange={searchHandleChange}
                            searchValue={searchValue}
                        />
                        <TableData data={filtermeeting} onSelectTableRow={onSelectTableRow} selected={selected} selectedAll={selectedAll}
                            onSelectAllTableRow={onSelectAllTableRow} />
                        <Footer fetchMeetings={fetchMeetings} paging={paging} filtermeeting={filtermeeting} />
                    </Grid>
                </Box>

                <EditMeeting isOpen={isEditOpen} onOpen={onEditClick} editData={editData} fetchMeetings={fetchMeetings} setLoading={setLoading} />
            </>}
        </>
    );
}

export default Demo;
