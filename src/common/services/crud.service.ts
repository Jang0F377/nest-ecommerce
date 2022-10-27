import { Injectable } from '@nestjs/common';
import {
  FilterQuery,
  Model,
  ProjectionType,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';

@Injectable()
export class CRUDService {
  public async findOne<T>(
    filter: FilterQuery<T>,
    model: Model<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T> {
    const numberOfDocuments = await model.count(filter);
    if (numberOfDocuments > 1) return null;

    return model.findOne(filter, projection, options);
  }

  public async findMany<T>(
    model: Model<T>,

    filter?: FilterQuery<T>,
    projection?: ProjectionType<T>,
    options?: QueryOptions<T>,
  ): Promise<T[]> {
    return model.find(filter, projection, options);
  }

  public async deleteOne<T>(
    filter: FilterQuery<T>,
    model: Model<T>,
    options?: QueryOptions<T>,
  ): Promise<T> {
    return model.findOneAndDelete(filter, options);
  }

  public async create<T>(input: UpdateQuery<T>, model: Model<T>): Promise<T> {
    return model.create(input);
  }

  public async deleteMany<T>(
    model: Model<T>,
    filter?: FilterQuery<T>,
    options?: QueryOptions<T>,
  ): Promise<T[]> {
    const deleteResult = await model.deleteMany(filter, options);
    return deleteResult as any;
  }

  public async updateOne<T>(
    filter: FilterQuery<T>,
    input: UpdateQuery<T>,
    model: Model<T>,
    options?: QueryOptions<T>,
  ): Promise<T> {
    return model.findOneAndUpdate(filter, input, {
      new: true,
      ...options,
    });
  }
}
