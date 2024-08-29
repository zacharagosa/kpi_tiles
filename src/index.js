import Tile from './Tile'
import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { Box } from '@mui/system';


looker.plugins.visualizations.add({
  options: {
    color_list: {
      type: "object_list",
      label: 'Tile Color',
      section: 'Colors',
      newItem: {
        color: '#F0000D',
        value: '',
        show_label: true
      },
      options: {
        value: {
          label: 'Value',
          type: 'string',
          default: '',
          placeholder: 'A value in the first column, to change the top color of the tiles',
        },
        color: {
          type: 'string',
          display: 'color',
          label: 'Color'
        }
      }
    },
  },

  // Set up the initial state of the visualizationval[props.vertical_col].value
  create: function(element, config) {
    element.innerHTML = `
      <style>
        .usecase-vis {
          /* Vertical centering */
          height: 100%;
          width: 100%;
          margin: 0 !important;
          display: flex;
          justify-content: center;
          text-align: center;
        }
      </style>
    `;

    this._vis_element = document.getElementById('vis')
    this._vis_element.className = "usecase-vis";

  },

  // Render in response to the data or settings changing
  updateAsync: function(data, element, config, queryResponse, details, done) {

    // Clear any errors from previous updates
    this.clearErrors();

    // Throw some errors and exit if the shape of the data isn't what this chart needs
    if (queryResponse.fields.dimensions.length == 0) {
      this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
      return;
    }


    // update the state with our new data

function pivotToEAV(data, metadata) {
  console.log(metadata.fields.measures[0].description);

  const pivotedData = [];
  const statusOptions = ["Unusual", "Alert", "Normal"];
  let entityId = 0; // Start with the initial entity ID

      if (data.length > 0) {
        const firstRow = data[0];
        let isFirstObject = true; // Flag to track the first iteration

        console.log(metadata)
        for (const [attribute, value] of Object.entries(firstRow)) {
              if (isFirstObject) {
              isFirstObject = false; // No longer the first object
              continue; // Skip to the next iteration of the loop
            }
          const valuesByKey = extractValues(data, attribute);
            const roundedLastValues = valuesByKey.map(val => {
                if (typeof val === 'number' && Math.round(val) === 0) {
                    return Math.round(val * 1000) / 1000; // Round to 2 digits
                } else {
                    return val; // Leave as is if not a number or already rounds to non-zero
                }
            });

            const target = calculateTarget(valuesByKey);

            // Ensure metadata field exists before creating the object
          if (metadata.fields.measures[entityId] && metadata.fields.measures[entityId].name) {
              const [metricDescription, metricDirection] = metadata.fields.measures[entityId].description.split("|")

              const pivotedObject = {
              entity: entityId,
              attribute: metadata.fields.measures[entityId] ? metadata.fields.measures[entityId].label_short : null,
              value: value.value,
              rendered_value: value.rendered,
              status: getStatus(calculateChange(valuesByKey)),
              last_values: roundedLastValues,
              change: calculateChange(valuesByKey),
              target: target,
              positive_good: metricDirection === "direction:higher",
              unit: metricDescription,
              links: metadata.data[entityId][metadata.fields.measures[entityId].name].links
            };

            pivotedData.push(pivotedObject);
            entityId++
          }
        }
      }

      return pivotedData;

      // Helper Functions
      function extractValues(data, attribute) {
        const values = [];
        Object.keys(data).forEach((key) => {
          values.push(data[key][attribute].value);
        });
        return values;
      }

      function calculateSum(values) {
        return values.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
      }

      function calculateTarget(values) {
        return calculateSum(values) / values.length;
      }

    function getStatus(change) {
        if (Math.abs(change) > 10) {
            return "Alert";
        } else if (Math.abs(change) >= 5 && Math.abs(change) <= 10) {
            return "Unusual";
        } else {
            return "Normal";
        }

    }
      function calculateChange(values) {
        return ((values[0] - values[1]) / values[0]) * 100.0;
      }


}

const result = pivotToEAV(queryResponse.data, queryResponse);
console.log(result);



    this.chart = ReactDOM.render(
        <TileGroup
          data={result} 
         />,
      this._vis_element
    );

    done()

  }
});


export function TileGroup(props) {
  return (
    // <Box display={'flex'} flexWrap={"wrap"}>
    <Box 
      sx={{
      display: 'grid',
      columnGap: 1,
      rowGap: 1,

      gridTemplateColumns: 'repeat(3, 1fr)',
      }} 
    >

      {
          props.data.map((tileData, i) => 
            <Tile 
              key={i}
              kpi={tileData.attribute}
              value={tileData.value}
              kpi_target={tileData.target}
              status={tileData.status}
              rendered_value={tileData.rendered_value }
              array_of_values={tileData.last_values}             
              unit={tileData.unit }
              change={tileData.change }
              links={tileData.links }
              positive_good = {tileData.positive_good}
            />
          )
        }
    </Box>
  )
}




