import React from 'react';
import {MultiRelationSelector} from '../selectors/RelationSelector';
import enums from '../../../../specs/enums.json';

const productsCategories = Object
  .keys(enums.productionTypes.groups)
  .map(value => ({value, label: value}));

export default React.memo(props => (
  <MultiRelationSelector {...props} groupBy={productsCategories} />
));
