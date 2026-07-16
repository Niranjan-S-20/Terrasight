import ee
import os
from dotenv import load_dotenv

load_dotenv()
ee.Initialize(project=os.getenv("terrasight-project"))

def get_yearly_ndvi(region, start_year, end_year):

    yearly_data = []

    for year in range(start_year, end_year + 1):

        start = f"{year}-01-01"
        end = f"{year}-12-31"

        collection = (
            ee.ImageCollection("COPERNICUS/S2_SR")
            .filterBounds(region)
            .filterDate(start, end)
            .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
        )

        image = collection.median()

        ndvi = image.normalizedDifference(['B8', 'B4']).rename("NDVI")

        mean = ndvi.reduceRegion(
            reducer=ee.Reducer.mean(),
            geometry=region,
            scale=10,
            maxPixels=1e9
        ).getInfo()["NDVI"]

        tile = ndvi.visualize(
            min=0,
            max=1,
            palette=["red","yellow","green"]
        ).getMapId()["tile_fetcher"].url_format

        yearly_data.append({
            "year": year,
            "ndvi": mean,
            "tile_url": tile
        })

    return yearly_data
