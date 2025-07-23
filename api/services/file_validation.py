from fastapi import HTTPException, UploadFile
import os

ALLOWED_FILE_TYPES = {
    "csv": "text/csv",
    "xls": "application/vnd.ms-excel",
    "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "json": "application/json",
    "parquet": "application/octet-stream",
}

def validate_file(file: UploadFile):
    file_extension = os.path.splitext(file.filename)[1][1:].lower()
    if file_extension not in ALLOWED_FILE_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file extension '{file_extension}'. Allowed: {', '.join(ALLOWED_FILE_TYPES.keys())}",
        )

    file.file.seek(0, os.SEEK_END)  
    file_size = file.file.tell()
    file.file.seek(0, os.SEEK_SET) 

    if file_size > 5 * 1024 * 1024:
        raise HTTPException(
            status_code=400,
            detail="File size exceeds the maximum allowed size of 5MB."
        )
