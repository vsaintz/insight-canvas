import pandas as pd
from fastapi import UploadFile, HTTPException
import io


def read_file(file: UploadFile):
    try:
        file_content = file.file.read()
        file.file.seek(0)  

        if file.filename.endswith(".csv"):
            return pd.read_csv(io.StringIO(file_content.decode("utf-8")))
        elif file.filename.endswith(".xlsx"):
            return pd.read_excel(io.BytesIO(file_content))
        else:
            raise HTTPException(status_code=400, detail="Unsupported file format")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading file: {str(e)}")


def extract_columns(file: UploadFile):
    try:
        df = read_file(file)
        return {"columns": df.columns.tolist()}
    except Exception as e:
        raise HTTPException(
            status_code=400, detail=f"Error extracting columns: {str(e)}"
        )


def process_uploaded_file(file: UploadFile, selected_columns: list):
    """Processes the uploaded file based on the selected columns."""
    try:
        df = read_file(file)

        if not set(selected_columns).issubset(df.columns):
            raise HTTPException(
                status_code=400,
                detail=f"Selected columns {selected_columns} not found in the file",
            )

        filtered_data = df[selected_columns]

        processed_data = filtered_data.to_dict(orient="records")

        return {"processed_data": processed_data}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error processing file: {str(e)}")
