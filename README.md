# Looker KPI Tile Visualization

**Overview**

This custom visualization presents data in an interactive tile-based layout, offering a clear and concise view of key performance indicators (KPIs). Each tile displays a KPI's current value, recent trend (sparkline or gauge), status (Normal, Unusual, Alert), and change percentage. The visualization supports drill-through actions via customizable links associated with each tile. 

**Features**

*   **Tile-Based Layout:** Organizes KPIs into a grid of visually appealing tiles.
*   **KPI Visualization:** Presents KPI values, trends, and status with clear visual cues. 
*   **Drill-Through Actions:** Allows users to interact with tiles and access underlying data or related content.
*   **Customizable Appearance:** Provides options to tailor the visualization's colors and styles. 
*   **Responsive Design:** Adapts seamlessly to different screen sizes.

**Installation**

1.  **Clone or Download:** Obtain the visualization code from the repository.
2.  **Place in Looker:** Copy the visualization files into your Looker's `custom_visualizations` directory.
3.  **Configure in Looker:**
    *   Navigate to the Looker project where you want to use the visualization.
    *   Create a new visualization or edit an existing one.
    *   In the visualization settings, select the "Tile Visualization" from the list of available visualizations.


![Image](https://github.com/zacharagosa/kpi_tiles/blob/f9be5823001e3b69caf97cb611adf8756e7e8a1d/tile_viz.png)
![Dataset](https://github.com/zacharagosa/kpi_tiles/blob/f9be5823001e3b69caf97cb611adf8756e7e8a1d/data_structure.png)


**Configuration**

The visualization offers the following configuration options:

*   **Tile Color:** Customize the color scheme for different KPI values or statuses.
    *   Specify a list of colors and associated value ranges or conditions. 

**Data Requirements**

The visualization expects data in the following format:

*   **Dimensions:** At least one dimension is required to group the data into tiles. 
*   **Measures:** One or more measures are needed to provide the KPI values for each tile. 
*   **Optional:** Additional fields can be used to provide labels, descriptions, or links for each tile.


Acknowledgments

The visualization leverages the following libraries:
@mui/material
@mui/x-charts
notistack

**Example Usage**

```lookml
view: my_view {
  dimension: product_category {
    type: string
    sql: ${TABLE}.product_category ;;
  }

  measure: total_sales {
    type: sum
    sql: ${TABLE}.sales_amount ;;
  }

  measure: sales_growth {
    type: percent_of_previous
    sql: ${total_sales} ;;
  }
}