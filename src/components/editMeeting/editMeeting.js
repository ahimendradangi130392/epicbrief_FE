import React, { useState, useEffect } from 'react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Lorem,
    Input,
    Textarea
} from '@chakra-ui/react'
import { editMeeting } from '../../services';
import { updateFireBaseData } from '../../firebase';
import RichTextEditor from './editor';

function EditMeeting(props) {
    const { isOpen, onOpen, editData, fetchMeetings, setLoading } = props
    const [input, setInput] = useState({
        hs_meeting_body: editData?.properties?.hs_meeting_body,
        hs_meeting_title: editData?.properties?.hs_meeting_title
    })

    useEffect(() => {

        setInput({
            hs_meeting_body: editData?.properties?.hs_meeting_body,
            hs_meeting_title: editData?.properties?.hs_meeting_title
        })

    }, [props])

    const handleInputChange = (e) => {
        if (!e["target"]) {
            setInput((prevState) => {
                return {
                    ...prevState,
                    ["hs_meeting_body"]: e
                }

            })
        } else {
            const { name, value } = e.target;
            setInput((prevState) => {
                return {
                    ...prevState,
                    [name]: value
                }

            })
        }

    }


    const Submit = () => {
        setLoading(true)
        editMeeting(input, editData.id).then(res => {
            updateFireBaseData(input, editData.id).then(r => {
                fetchMeetings()
                onOpen()
                setLoading(false)
            })

        }).catch(err => {

        })
    }
    const isError = input === ''
    return (
        <>

            <Modal isOpen={isOpen} onClose={onOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Meeting</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl isInvalid={isError}>
                            <FormLabel>Name</FormLabel>
                            <Input name="hs_meeting_title" type='text' value={input.hs_meeting_title} onChange={handleInputChange} />
                            {isError && (
                                <FormErrorMessage> required.</FormErrorMessage>
                            )}
                        </FormControl>

                        <RichTextEditor
                            value={input.hs_meeting_body}
                            ClassName="rte-container"
                            init={{
                                height: 500,
                                menubar: false,
                                plugins: [
                                    "advlist",
                                    "anchor",
                                    "autolink",
                                    "help",
                                    "image",
                                    "link",
                                    "lists",
                                    "searchreplace",
                                    "table",
                                    "wordcount",
                                    "autosave",
                                ],
                                toolbar:
                                    "undo redo | blocks | " +
                                    "bold italic forecolor | alignleft aligncenter " +
                                    "alignright alignjustify | bullist numlist outdent indent | " +
                                    "removeformat | help",
                                content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                            }}
                            onEditorChange={handleInputChange}
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={Submit}>
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onOpen}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditMeeting