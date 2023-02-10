import React, {useState} from 'react'

import MuiAlert, {AlertProps} from '@mui/material/Alert'
import {Snackbar} from "@mui/material";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props, ref) {
    return <MuiAlert elevation={6}
                     ref={ref}
                     variant='filled'
                     {...
                         props
                     }
    />
})

type ErrorSnackBarPropsType = {
    errorMessage: string | null
    closeError: () => void
}

export function ErrorSnackbar({errorMessage,closeError,...restProps}: ErrorSnackBarPropsType) {

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return closeError()
        }
        closeError()
    }
    const open = errorMessage ? true : undefined
    return (
        <Snackbar open={open}
                  autoHideDuration={3000}
                  onClose={handleClose}>
            <Alert onClose={handleClose}
                   severity='error'
                   sx={
                       {
                           width: '100%'
                       }
                   }>
                {errorMessage}
            </Alert>
        </Snackbar>
    )
}
