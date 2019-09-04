import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import mongodb from 'mongodb';

const ObjectIdScalar = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'MongoDB object id scalar',
  parseValue(value) {
    try {
      return new mongodb.ObjectId(value);
    } catch (e) {
      return null;
    }
  },
  serialize(value) {
    return value ? value.toString() : null;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      try {
        return new mongodb.ObjectId(ast.value);
      } catch (e) {
        return null;
      }
    }
    return null;
  },
});

export default ObjectIdScalar;
