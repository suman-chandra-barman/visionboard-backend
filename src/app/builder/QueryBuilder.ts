import { FilterQuery, Query } from 'mongoose';
import { USER_ROLE } from '../modules/user/user.constant';
import { JwtPayload } from 'jsonwebtoken';

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  getByUserRole(user: JwtPayload) {
    if (user?.role === USER_ROLE.User) {
      this.modelQuery = this.modelQuery.find({
        user: user?.userId,
      });
    }
    return this;
  }
  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm || '';
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }
  filterByFrameMaterial() {
    const material = this?.query?.frameMaterial;
    if (material) {
      this.modelQuery = this.modelQuery.find({
        frameMaterial: { $regex: material, $options: 'i' },
      });
    }
    return this;
  }

  filterByFrameShape() {
    const frameShape = this?.query?.frameShape;
    if (frameShape) {
      this.modelQuery = this.modelQuery.find({
        frameShape: { $regex: frameShape, $options: 'i' },
      });
    }
    return this;
  }
  filterByLensType() {
    const lensType = this?.query?.lensType;
    if (lensType) {
      this.modelQuery = this.modelQuery.find({
        lensType: { $regex: lensType, $options: 'i' },
      });
    }
    return this;
  }
  filterByBrand() {
    const { brand, gender, color, minPrice, maxPrice } = this?.query;

    if (brand) {
      this.modelQuery = this.modelQuery.find({
        brand: { $regex: brand, $options: 'i' },
      });
    }
    if (gender) {
      this.modelQuery = this.modelQuery.find({
        gender,
      });
    }
    if (color) {
      this.modelQuery = this.modelQuery.find({
        color: { $regex: color, $options: 'i' },
      });
    }
    if (minPrice || maxPrice) {
      const query: {
        price?: {
          $gte?: number;
          $lte?: number;
        };
      } = {};
      if (minPrice !== undefined && maxPrice !== undefined) {
        query.price = {
          $gte: parseFloat(minPrice as string),
          $lte: parseFloat(maxPrice as string),
        };
      } else if (minPrice !== undefined) {
        query.price = { $gte: parseFloat(minPrice as string) };
      } else if (maxPrice !== undefined) {
        query.price = { $lte: parseFloat(maxPrice as string) };
      }
      this.modelQuery = this.modelQuery.find(query);
    }
    return this;
  }
}

export default QueryBuilder;
