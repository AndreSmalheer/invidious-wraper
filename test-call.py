import requests
import json

def get_video_data(video_id):
    response = requests.get(f"http://100.100.22.66:3000/api/v1/videos/{video_id}")
    data = response.json()

    return data

def search(query):
    params = {
        "q": query,
    }

    response = requests.get("http://100.100.22.66:3000/api/v1/search", params=params)

    if response.status_code == 200:
        return response.json()
    else:
        print("Error:", response.status_code)

if __name__ == "__main__":
    # data= get_video_data("dQw4w9WgXcQ")

    # print(data)

    data = search("Slogo")
    print(data)
