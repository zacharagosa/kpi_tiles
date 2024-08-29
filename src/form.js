import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';

// Function to handle Slack message sending (using Axios for example)
const sendToSlack = async (formData) => {
    // ... your existing sendToSlack logic ...
};

const MyForm = ({ formData, onClose }) => {
    const [formState, setFormState] = useState({
        message: '',
        recipient: '',
        channel: '',
    });
    const recipientOptions = formData.find(
        (field) => field.name === "Recipient"
    )?.options;
    const channelOptions = formData.find(
        (field) => field.name === "Channel"
    )?.options;

    const message = formData.find(
        (field) => field.name === "Message"
    )?.default;

    const { enqueueSnackbar } = useSnackbar();
    useEffect(() => {
        if (formData) {
            const initialValues = formData.reduce((acc, field) => {
                if (field.name === "Recipient") {
                    acc[field.name] = field.default;
                } else {
                    acc[field.name] = field.default || "";
                }
                return acc;
            }, {});
            setFormState(initialValues);
        }
    }, [formData]);

    const handleChange = (event) => {
        setFormState({
            ...formState,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        // ... (your existing handleSubmit logic)
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, minWidth: 300 }}>
            {/* ... your existing message and channel TextFields ... */}
            <TextField
                required
                fullWidth
                id="message"
                label="Message"
                name="message"
                margin="normal"
                multiline
                rows={2}
                value={message}
                onChange={handleChange}
            />
            <FormControl fullWidth margin="normal">
                <InputLabel id="recipient-label" >Recipient</InputLabel>
                <Select
                    labelId="recipient-label"
                    id="recipient"
                    name="recipient"
                    value={formState.recipient}
                    onChange={handleChange}
                    displayEmpty // Show placeholder even when value is empty


                >
                    {recipientOptions &&
                        recipientOptions.map((option) => (
                            <MenuItem key={option.name} value={option.name}>
                                {option.label}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel id="channel-label" >Channel</InputLabel>
                <Select
                    labelId="channel-label"
                    id="channel"
                    name="channel"
                    value={formState.channel}
                    onChange={handleChange}
                    displayEmpty // Show placeholder even when value is empty
                >
                    {channelOptions &&
                        channelOptions.map((option) => (
                            <MenuItem key={option.name} value={option.name}>
                                {option.label}
                            </MenuItem>
                        ))}
                </Select>
            </FormControl>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
                Send
            </Button>
        </Box>
    );
};

export default MyForm;