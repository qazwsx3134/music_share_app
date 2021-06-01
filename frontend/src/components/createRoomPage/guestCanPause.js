import React from 'react'
import PropTypes from 'prop-types'
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControlLabel from "@material-ui/core/FormControlLabel"

const GuestCanPause = ({ guestCanPause, handleGuestCanPause }) => {
    return (
        <div>
            <FormHelperText>
                <div align="center">Guest Control of playbackState</div>
            </FormHelperText>
            <RadioGroup row defaultValue={`${guestCanPause}`} onChange={handleGuestCanPause}>
                <FormControlLabel
                    value="true"
                    control={<Radio color="primary" />}
                    label="Play/Pause"
                    labelPlacement="bottom"
                />
                <FormControlLabel
                    value="false"
                    control={<Radio color="secondary" />}
                    label="No Control"
                    labelPlacement="bottom"
                />
            </RadioGroup>
        </div>
    )
}

GuestCanPause.propTypes = {

}

export default GuestCanPause
