const { default: SummaryApi } = require("../common")

const fetchCategoryWiseProduct = async (category) => {
    const response = await fetch(SummaryApi.allCategoryProduct.url, {
        method: SummaryApi.allCategoryProduct.method,
        headers: {
            "content-type" : "application/json"
        },
        body: JSON.stringify({
            category: category
        })
    })
    const dataResponse = await response.json()
    return dataResponse
}

export default fetchCategoryWiseProduct