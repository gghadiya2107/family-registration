const { getCookieValues } = require("./cookies")

const getDefaultData = () => {
    const data = getCookieValues("userData")
    console.log('userData', data)
    let obj = {
        district : data?.district_code,
        municipal : data?.municipality_id,
        ward : data?.ward_id
    }
    return obj
}

export default getDefaultData;