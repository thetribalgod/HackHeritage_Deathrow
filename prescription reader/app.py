import os
import pathlib
from dotenv import load_dotenv
import streamlit as st
import google.generativeai as genai
from PIL import Image

#Load the environment variables
load_dotenv()

#Set up the key to access the gemini model
genai.configure(api_key=os.environ['API_KEY'])


#Load the Image
def load_image(image_file):
    img = Image.open(image_file)
    return img

#Get the summary for the image you have uploaded
def get_imagesummary_response(imagefilename):
    # model = genai.GenerativeModel('gemini-1.5-flash')
    cookie_picture = {
        'mime_type': 'image/png',
        'data': pathlib.Path(imagefilename).read_bytes()
    }
    prompt = "Extract paitent name,age and summary of the prescription and explain all diagnosis,medication in detail section wise"
    response = genai.GenerativeModel(model_name='gemini-1.5-flash').generate_content( 
        contents=[prompt, cookie_picture]
    )
    print(response.text)
    return response.text

st.set_page_config(page_title="Doctor Prescription Summeriser")
st.header("Doctor Prescription Summeriser Application")
image_file = st.file_uploader("Upload An Image",type=['png','jpeg','jpg'])
if image_file is not None:
    file_details = {"FileName":image_file.name,"FileType":image_file.type}
    with open((image_file.name),"wb") as f: 
        f.write(image_file.getbuffer())         
    response = get_imagesummary_response(image_file.name)

if image_file:
    st.subheader("Prescription summary")
    st.write(response)