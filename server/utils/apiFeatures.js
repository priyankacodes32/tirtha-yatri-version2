/**
 * Small chainable helper that applies filtering, text search, price range,
 * sorting and pagination to a Mongoose Query, driven by req.query.
 *
 * Usage:
 *   const features = new ApiFeatures(TourPackage.find(baseFilter), req.query, baseFilter)
 *     .filter(['category', 'travelMode', 'isFeatured'])
 *     .search(['title', 'shortDescription'])
 *     .priceRange('discountedPrice')
 *     .sort('-createdAt')
 *     .paginate();
 *   const data = await features.query;
 *   const count = await features.countDocuments(BaseModel);
 *
 * `baseFilter` (e.g. { published: true } / { isActive: true }) is optional
 * but should always be passed alongside a query already scoped to it —
 * otherwise countDocuments()/pages would be computed without that
 * constraint even though the returned `data` correctly honors it.
 */
class ApiFeatures {
  constructor(query, queryString = {}, baseFilter = {}) {
    this.query = query;
    this.queryString = queryString;
    this.filterObj = { ...baseFilter };
    this.page = Number(queryString.page) || 1;
    this.limit = Number(queryString.limit) || 12;
  }

  filter(allowedFields = []) {
    for (const field of allowedFields) {
      const value = this.queryString[field];
      if (value !== undefined && value !== '' && value !== 'all') {
        this.filterObj[field] = value;
      }
    }
    this.query = this.query.find(this.filterObj);
    return this;
  }

  search(fields = []) {
    const term = this.queryString.search;
    if (term && fields.length) {
      const regex = new RegExp(term.trim(), 'i');
      const orClause = fields.map((field) => ({ [field]: regex }));
      this.filterObj.$or = orClause;
      this.query = this.query.find({ $or: orClause });
    }
    return this;
  }

  priceRange(field = 'discountedPrice') {
    const { minPrice, maxPrice } = this.queryString;
    if (minPrice || maxPrice) {
      const range = {};
      if (minPrice) range.$gte = Number(minPrice);
      if (maxPrice) range.$lte = Number(maxPrice);
      this.filterObj[field] = range;
      this.query = this.query.find({ [field]: range });
    }
    return this;
  }

  sort(defaultSort = '-createdAt') {
    const sortBy = this.queryString.sort
      ? this.queryString.sort.split(',').join(' ')
      : defaultSort;
    this.query = this.query.sort(sortBy);
    return this;
  }

  paginate() {
    const skip = (this.page - 1) * this.limit;
    this.query = this.query.skip(skip).limit(this.limit);
    return this;
  }

  async countDocuments(Model) {
    return Model.countDocuments(this.filterObj);
  }
}

export default ApiFeatures;
