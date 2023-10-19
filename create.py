import os
from pymongo import MongoClient

# Step 1: Connect to the MongoDB database
mongo_client = MongoClient("mongodb://localhost:27017/")
database_name = "Get-papers"
collection_name = "cse_subjects"

# Step 2: Query the MongoDB collection and retrieve the names
database = mongo_client[database_name]
collection = database[collection_name]

folder_names = [item["Subjects"] for item in collection.find({}, {"Subjects": 1})]

# Step 3: Create folders using the names obtained from the database
base_folder_path = "D:\Database-project\Get_paper\Get_Papers\public\docs"  # Replace this with your desired base folder path

for name in folder_names:
    folder_path = os.path.join(base_folder_path, name)
    try:
        os.makedirs(folder_path)
        print(f"Folder '{name}' created successfully at: {folder_path}")
    except FileExistsError:
        print(f"Folder '{name}' already exists at: {folder_path}")
    except Exception as e:
        print(f"Error creating folder '{name}': {e}")

# Close the MongoDB connection
mongo_client.close()
