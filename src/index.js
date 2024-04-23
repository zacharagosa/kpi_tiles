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
    console.log(queryResponse)


    this.chart = ReactDOM.render(
        <TileGroup
          data={data} 
          kpi_col={queryResponse.fields.dimensions[0].name}
          value_col={queryResponse.fields.dimensions[1].name}
          status_col={queryResponse.fields.dimensions[2].name}
          rendered_val_col={queryResponse.fields.dimensions[3].name}
          target_col={queryResponse.fields.dimensions[4].name}
          unit_col={queryResponse.fields.dimensions[5].name}
          array_of_values_col={queryResponse.fields.dimensions[7].name}
          change_col={queryResponse.fields.dimensions[6].name}

          // buttons = {buttons ? buttons : null}
          // colorList={config.color_list}
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
          props.data.map((val, i) => 
            <Tile 
              key={i}
              kpi={val[props.kpi_col].value}
              value={props.value_col ? val[props.value_col].value: null}
              kpi_target={props.target_col ? val[props.target_col].value: null}
              status={props.status_col ? val[props.status_col].value: null }
              rendered_value={props.rendered_val_col ? val[props.rendered_val_col].value: null }
              array_of_values={
                props.array_of_values_col && val[props.array_of_values_col] && val[props.array_of_values_col].value
                  ? val[props.array_of_values_col].value.split(',')
                  : null
              }             
             unit={props.unit_col ? val[props.unit_col].value: null }
             change={props.change_col ? val[props.change_col].value: null }
            />
          )
        }
    </Box>
  )
};




