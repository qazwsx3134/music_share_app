import React from 'react'
import PropTypes from 'prop-types'

import TextField from "@material-ui/core/TextField"
import FormHelperText from "@material-ui/core/FormHelperText"

const VotesToSkip = ({ votesToSkip, handleVotesToSkip }) => {
    return (
        <div>
            <TextField
                required={true}
                type="number"
                onChange={handleVotesToSkip}
                defaultValue={votesToSkip}
                inputProps={{
                    min: 1,
                    style: { textAlign: "center" },
                }}
            />
            <FormHelperText>
                <div align="center">Vote required to skip song</div>
            </FormHelperText>
        </div>
    )
}

VotesToSkip.propTypes = {

}

export default VotesToSkip
