class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filter() {
        const queryObj = { ...this.queryString };
        const excludeFields = ['page', 'sort', 'limit', 'fields', 'officerDetailsIncludes'];
        excludeFields.forEach(el => delete queryObj[el]);

        return this;
    }

    officerDetailsIncludes() {
        if (this.queryString.officerDetailsIncludes === 'true') {
            this.query = this.query.populate({
                path: "head officers",
                select: "-__v -location -role"
            });
        } else {
            this.query = this.query.select("-officers").populate({
                path: "head",
                select: "-__v -location -role -number"
            });
        }

        return this;
    }

    // sort() {
    //     if (this.queryString.sort) {
    //         const sortBy = this.queryString.sort.split(",").join(" ");
    //         this.query = this.query.sort(sortBy);
    //     } 
    // }
}

module.exports = APIFeatures;
