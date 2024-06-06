const FormatAadharNumber = (value) => {
    return  `XXXX-XXXX-${value
        .toString()
        .slice(-4)}`
}

export default FormatAadharNumber