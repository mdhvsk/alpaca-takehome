

## Approach

I first apporached the backend to set up LLM calls and note retrieval and saving. I started off creatign the models needed, followed by a service layer that makes the actual computation and calls. I then had a routing layer where the router was kept which was called in the main.py file. I then created the frontend design to be able to integrate well with the backend models.I created a form for therapists to input in useful information and provided a text area for therapists to type in their notes. I provided two follow up actions, either to refine the current text or to save the text. The saved text goes to a dashboard of previous user records. The refined section allows users to edit the post made. When savign the copy, I save a copy of the written down notes and professional notes. 



## Design Decisions
For now I decided against Rich text editing and bullet points for the scope of this project. In order to view and save user records, I connected this project to a supabase db to be able to save and retrieve notes. I used the gpt 4-0125 model as that was one of the default models used in documentation. I provided specific details for organized notes so that in the future I could use the segmented sections to make UI enhancements on the professional notes. 


## Assumptions
I made assumptions regarding the specific parameters the therapist was needed. As well I assumed the therapist would take notes in a text format, not other types of formatting like bullet points, tables, etc.


## Sources
- Supabase Docs
- Shadcn Docs
- FastAPI Docs
- Claude
- StackOverFlow