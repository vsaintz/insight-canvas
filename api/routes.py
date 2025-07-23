from fastapi import APIRouter, UploadFile, HTTPException
from services.file_validation import validate_file
from services.file_processing import read_file
from pydantic import BaseModel
from typing import List

router = APIRouter()

data_storage = {"data": None} 


@router.post("/upload-data/")
async def upload_data(file: UploadFile):
    validate_file(file)
    data = read_file(file)
    data_storage["data"] = data

    return {"message": "File uploaded successfully."}


@router.get("/get-columns/")
async def get_columns():
    if data_storage["data"] is None:
        raise HTTPException(status_code=404, detail="No data available.")
    
    df = data_storage["data"]
    return {"columns": df.columns.tolist()}

class ColumnSelection(BaseModel):
    selected_columns: List[str]

@router.post("/get-processed-data/")
async def get_processed_data(payload: ColumnSelection):
    if data_storage["data"] is None:
        raise HTTPException(status_code=404, detail="No data available.")
    
    selected_columns = payload.selected_columns

    if not selected_columns:
        raise HTTPException(status_code=400, detail="No columns selected.")
    
    df = data_storage["data"]

    print("Available columns in DataFrame:", df.columns.tolist())

    if not set(selected_columns).issubset(df.columns):
        raise HTTPException(
            status_code=400,
            detail=f"Selected columns {selected_columns} not found in the file.",
        )
    
    filtered_data = df[selected_columns]
    return {"processed_data": filtered_data.to_dict(orient="records")}


