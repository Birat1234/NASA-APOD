# NASA-APOD

### Astronomy Picture of the Day
Astronomy Picture of the Day is a website provided by NASA and Michigan Technological University. According to the website, "Each day a different image or photograph of our universe is featured, along with a brief explanation written by a professional astronomer." The photograph does not necessarily correspond to a celestial event on the exact day that it is displayed, and images are sometimes repeated. However, the pictures and descriptions often relate to current events in astronomy and space exploration.

### NASA APOD API
NASA allows developers to access NASA data, including imagery, eminently through different APIs and APOD is one of them. Developers can retrieve the current picture of the day, or the picture for a given date. An API key is required for high-volume usage. All API calls are RESTful. To generate API key we have to visit https://api.nasa.gov/ and sign up for an application programming interface (API) key to access and use web services available on the Data.gov developer network. We can also use DEMO_KEY for initially exploring APIs prior to signing up, but it has much lower rate limits. In this project key is generated with  count = 10, which means it will return 10 pictures at a time.

       const count = 10; 
       const apiKey = 'DEMO_KEY'; 
       const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`; 
       
### What it will return
1. Image
2. Title of the image
3. Descriotion
4. Date
5. Copyright

### Add to Favourites
Here we have 'Add to favourites' section, which on click stores all the informations of a particular image in localstorage. We can view or remove them by clicking on 'favourites' button in  navigation bar. 
