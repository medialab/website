import React, {useState, useEffect, useCallback} from 'react';
import {
  SortableContainer,
  SortableElement,
  SortableHandle
} from 'react-sortable-hoc';
import Select from 'react-select';
import keyBy from 'lodash/keyBy';
import find from 'lodash/fp/find';
import truncate from 'lodash/truncate';
import client from '../../client';
import ReorderIcon from 'material-icons-svg/components/baseline/Reorder';
import PopoutSelector from './PopoutSelector';
import enums from '../../../../specs/enums.json';

import labels from '../../../../specs/labels';

const noOptionsMessages = {
  activities: () => 'Pas d"activité correspondante',
  people: () => 'Pas de membre correspondant',
  productions: () => 'Pas de productions correspondantes'
};

const labelSearchModel = {
  activities: 'activités',
  people: 'membres',
  productions: 'productions'
};

const DragHandle = SortableHandle(() => (
  <span className="handle" style={{marginTop: '5px', marginRight: '5px'}}>
    <ReorderIcon width={20} height={20} fill="rgba(10, 10, 10, 0.2)" />
  </span>
));

const SortableItem = SortableElement(({value, label, onDrop}) => (
  <li>
    <span className="tag is-medium" style={{marginBottom: 3}}>
      <DragHandle />
      {label}
      <button className="delete is-small" onClick={() => onDrop(value)} />
    </span>
  </li>
));

const SortableList = SortableContainer(({items, onDrop, optionsIndex}) => (
  <ul className="sortable">
    {items.map((value, i) => (
      <SortableItem
        key={i}
        index={i}
        value={value}
        label={optionsIndex[value].label}
        onDrop={onDrop}
      />
    ))}
  </ul>
));

const useFetchModel = (model, mapper) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    client.list({params: {model}}, (err, response) => {
      if (err) {
        console.error(err.message);
        setLoading(false);
        return;
      }
      setData(response.map(mapper));
      setLoading(false);
    });
  }, [model]);
  return [data, loading];
};

function getKeyByValue(object, value) {
  return Object.keys(object).find(key => object[key] === value);
}

const RelationSelectorContainer = BaseComponent => {
  return React.memo(props => {
    const {
      self,
      model,
      onDrop,
      onMove,
      max = Infinity,
      selected = [],
      sortable = false,
      onAdd
    } = props;

    const mapGeneric = item => ({
      value: item.id,
      label: labels[model](item)
    });

    const extractProductionData = item => {
      return assignDeep(
        {},
        item.spire && item.spire.generatedFields,
        item.hal && item.hal.generatedFields,
        item
      );
    };

    const mapForProductions = item => ({
      ...mapGeneric(extractProductionData(item)),
      type: getKeyByValue(
        enums.productionTypes.groups,
        find(group => {
          let matched = group.values.includes(item.type);

          if (!matched && item.hal && item.hal.generatedFields.type)
            matched = group.values.includes(item.hal.generatedFields.type);

          if (!matched && item.spire && item.spire.generatedFields.type)
            matched = group.values.includes(item.spire.generatedFields.type);

          return matched;
        }, enums.productionTypes.groups)
      )
    });

    const [options, loading] = useFetchModel(
      model,
      props.categories ? mapForProductions : mapGeneric
    );

    const handleChange = useCallback(
      option => {
        if (option && option.value) onAdd(option.value);
      },
      [onAdd]
    );

    const selectedSet = new Set(selected);

    const optionsIndex = keyBy(options, item => item.value);

    let filteredOptions = options;

    if (self) filteredOptions = options.filter(o => o.value !== self);

    return (
      <div>
        <div className="columns">
          <div className={'column is-4'}>
            <BaseComponent
              categories={props.categories}
              isDisabled={selected.length >= max}
              value={null}
              onChange={handleChange}
              options={filteredOptions.filter(o => !selectedSet.has(o.value))}
              isLoading={loading}
              menuPlacement="top"
              placeholder={'rechercher dans les ' + labelSearchModel[model]}
              noOptionsMessage={noOptionsMessages[model]}
              styles={{menu: provided => ({...provided, zIndex: 1000})}}
            />
          </div>
          <div className="column is-8">
            {!loading &&
              !sortable &&
              (selected.length ? (
                <ul className="tags-container">
                  {selected.map(id => {
                    const title = optionsIndex[id].label;
                    return (
                      <li key={id}>
                        <span
                          title={title}
                          className="tag is-medium"
                          style={{marginBottom: 3}}>
                          {truncate(title, {length: 30, omission: '...'})}
                          &nbsp;
                          <button
                            className="delete is-small"
                            onClick={() => onDrop(id)}
                          />
                        </span>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>
                  <em>pas d'élément...</em>
                </p>
              ))}
          </div>
        </div>
        {!loading && sortable && (
          <div className="columns">
            <div className="column is-6">
              <SortableList
                useDragHandle
                items={selected}
                optionsIndex={optionsIndex}
                onDrop={onDrop}
                onSortEnd={onMove}
              />
            </div>
          </div>
        )}
      </div>
    );
  });
};

export const MultiRelationSelector = RelationSelectorContainer(PopoutSelector);

// TODO: UX inform user about max if one
export default RelationSelectorContainer(Select);
