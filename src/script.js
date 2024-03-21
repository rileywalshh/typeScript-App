//This empty array will be the database for the artists added from the form.
let artists = [];
//This is used to keep track of the unique artist Id.
let artistId = 0;
//These are used to retrieve container and button elements, if no matching element is found the variables will be null.
const otherArtists = document.getElementById('artists');
const featuredArtists = document.getElementById('featuredArtists');
const addArtistButton = document.getElementById('addArtistButton');
const displayFeaturedArtistsButton = document.getElementById('displayFeaturedButton');
const displayAllArtistsButton = document.getElementById('displayAllButton');
const errorContainer = document.getElementById('errorContainer');
const searchButton = document.getElementById('searchButton');
//Adds an event listener to the document, with the event being waiting for the DOM content of the page to fully load before the function is executed.
document.addEventListener('DOMContentLoaded', () => {
    //This function is to check the input fields of the form and confirm they are not empty, it returns a boolean value of true if all required fields have been filled.
    const checkRequiredFields = () => {
        //It uses querySelectorAll to select all input and select elements within the form that has addArtist as its id.
        const requiredFields = document.querySelectorAll('#addArtist input[required], #addArtist select[required]');
        let allFieldsFilled = true;
        //It then uses forEach to iterate over each field in the requiredFields list.
        requiredFields.forEach(field => {
            //Then it uses an if statement to check if the field is empty after trimming away whitespace with .trim, if one is empty it sets allFieldsFilled to false.
            if (!field.value.trim()) {
                allFieldsFilled = false;
                //Toggles the visibility of the error message asking the user to fill all fields.
                if (errorContainer)
                    errorContainer.style.display = 'block';
                field.classList.add('fieldError');
            }
            else {
                field.classList.remove('fieldError');
            }
        });
        return allFieldsFilled;
    };
    //This if statement checks if both addArtistButton and errorContainer exists.
    if (addArtistButton && errorContainer) {
        //If true, ti adds an eventListener to the addArtistButton.
        addArtistButton.addEventListener('click', (event) => {
            //This prevents the form from submitting and refreshing the page.
            event.preventDefault();
            //This is to keep the error message on the form hidden by default.
            errorContainer.style.display = 'none';
            //This if statement checks if checkRequiredFields returns true and all fields are filled.
            if (checkRequiredFields()) {
                //Then calls the handleFormSubmit function to add the artist.
                handleFormSubmit();
            }
        });
    }
    /*This if statement checks if searchButton exists, if it does it adds an event listener to the button that will call featureArtistsById function and uses the searchId as an argument, which is a value retrieved by selecting the search element with getElementById and using .value. */
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const searchId = document.getElementById('searchArtistId').value;
            featureArtistById(searchId);
        });
    }
    //This if statement checks if displayFeaturedArtistsButton exists, and if so it adds an event listener to call upon the hideOtherArtists function.
    if (displayFeaturedArtistsButton) {
        displayFeaturedArtistsButton.addEventListener('click', () => {
            hideOtherArtists();
        });
    }
    //This if statement checks if displayAllArtistsButton exists, if it does it adds an event listener for the "Display All Artists" button, it calls the displayAllArtists() function.
    if (displayAllArtistsButton) {
        displayAllArtistsButton === null || displayAllArtistsButton === void 0 ? void 0 : displayAllArtistsButton.addEventListener('click', () => {
            displayAllArtists();
        });
    }
});
/*This function was inspired by a design from stackoverflow. This function is used to add an artists to the list of artists, with an Id. It uses Omit to create  a newArtist object without an id.*/
function addArtistToList(newArtist) {
    //The id value is incremented.
    artistId++;
    /*This creates a new object called artistWithId, it takes all the properties of newArtists as well as the current value of artistId converted to type String.*/
    const artistWithId = Object.assign(Object.assign({}, newArtist), { id: artistId.toString() });
    //The artist with the id is then pushed into the artists array that will be displayed on the table.
    artists.push(artistWithId);
    //For debugging purposes, the console logs the artist name to confirm it was successful.
    console.log(`Artist ${artistWithId.name} added successfully.`);
    //The artistsTable is regenerated to update any changes.
    generateArtistsTable();
}
//This function is used to feature an artist. It uses the Id passed by the search function.
function featureArtistById(artistId) {
    //It will use findIndex to iterate through the array until the matching artistId is found.
    const artistIndex = artists.findIndex(artist => artist.id === artistId);
    //If it is found, confirming the index is not -1, it will set isFeatured for that artists to true.
    if (artistIndex > -1) {
        artists[artistIndex].isFeatured = true;
        //It will then regenerate both tables, moving the featured artists to its new table.
        generateArtistsTable();
        generateFeaturedArtistsTable();
    }
    else {
        //If the iterator could not find the correct index, it will let the console know with a log.
        console.log(`Artist with ID ${artistId} not found.`);
    }
}
//This function is used to hide the otherArtists table, so that only the featured is visible.
function hideOtherArtists() {
    //It uses an if statement to check if both elements exist, (they should), and then if true it changes the display of otherArtists to none making it invisible.
    if (otherArtists && featuredArtists) {
        // Hide the all artists div and show the featured artists div.
        otherArtists.style.display = 'none';
        featuredArtists.style.display = 'block';
        //It then regenerates the featured table to update any changes.
        generateFeaturedArtistsTable();
    }
}
//This function is for making both tables visible. it uses an if statement to check if the otherArtists element exists, (it should).
function displayAllArtists() {
    if (otherArtists) {
        //If its true, it will pass another if statement checking if otherArtists display is none, if true it will change it to block thus making it visible.
        if (otherArtists.style.display === 'none')
            otherArtists.style.display = 'block';
        //It will then regenerate both tables, updating any changes.
        generateArtistsTable();
        generateFeaturedArtistsTable();
    }
}
//This function is responsible for generating the table for the artists.
function generateArtistsTable() {
    //it uses getElementById to select the div element that will display the table.
    const artistsDiv = document.getElementById('artists');
    /*it uses an if statement to check if the select was successful, then sets the innerHTML to an empty string, effectively clearing it of existing content.
    it then creates a table using createElement('table').
    it then creates a header for the table using createTHead(); and inserts a row at the header by selecting the 'header' and using header.insertRow();
    it then defines the titles for each column on the table and stores in an array, being the fields that will require input, i made a featured column to determine when an artist has been searched.*/
    if (artistsDiv) {
        artistsDiv.innerHTML = '';
        const table = document.createElement('table');
        const header = table.createTHead();
        const headerRow = header.insertRow();
        const headers = ['ID', 'Name', 'DOB', 'Gender', 'Contact Info', 'Artworks', 'Featured'];
        //then it will iterate over each header using a forEach loop, it creates a header cell for each element in the headers array, it uses .textContent to set the text of the header, and appendChild(headerCell) to create the cell.
        headers.forEach(headerText => {
            const headerCell = document.createElement('th');
            headerCell.textContent = headerText;
            headerRow.appendChild(headerCell);
        });
        //next it moves onto creating the table body with .createTBody();
        const body = table.createTBody();
        //it then uses .filter to find and exclude any featured artists in the array as they will go on the featured table.
        //it will also create a new row in the table body for each artist that is found in the array.
        artists.filter((artist) => !artist.isFeatured).forEach((artist) => {
            const row = body.insertRow();
            //prepares the artists data that will be displayed for each individual artist.
            //all data associated with the artwork is put into a single string and displayed in the same cell.
            const artistData = [
                artist.id,
                artist.name,
                artist.dob.toLocaleDateString(),
                artist.gender,
                artist.contactInfo,
                artist.artworks.map((artwork) => `${artwork.type}, ${artwork.exhibitionDate.toLocaleDateString()}, Notes: ${artwork.specialNotes || 'None'}`).join('; '),
                artist.isFeatured ? 'Yes' : 'No'
            ];
            //it then uses a forEach loop that will create a cell in the row for each piece of artists data in the array, e.g. 'name','email','etc.
            //and uses .textContent to display said artist data.
            artistData.forEach((text) => {
                const cell = row.insertCell();
                cell.textContent = text.toString();
            });
            //This part is responsible for creating an additional cell at the end of the row that will hold a delete button, capable of removing its own row.
            const deleteCell = row.insertCell();
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            //upon clicking the button it will prompt the user to confirm if it wants to delete the artist.
            //this function is available to all delete buttons created this way.
            deleteButton.onclick = () => {
                if (confirm(`Are you sure you want to delete artist ${artist.name}?`)) {
                    //if confirmed, it calls deleteArtist and deletes the artist of the chosen row.
                    deleteArtist(artist.id);
                }
            };
            //appends the delete button to its own cell.
            deleteCell.appendChild(deleteButton);
        });
        // Append the full table to the div that will display the table.
        artistsDiv.appendChild(table);
    }
}
/*This function is responsible for generating the featuredArtistsTable.
It follows the same logic as the function above.*/
function generateFeaturedArtistsTable() {
    const featuredArtistsDiv = document.getElementById('featuredArtists');
    if (featuredArtistsDiv) {
        featuredArtistsDiv.innerHTML = '';
        const table = document.createElement('table');
        const header = table.createTHead();
        const headerRow = header.insertRow();
        const headers = ['ID', 'Name', 'DOB', 'Gender', 'Contact Info', 'Artworks', 'Featured'];
        headers.forEach(headerText => {
            const headerCell = document.createElement('th');
            headerCell.textContent = headerText;
            headerRow.appendChild(headerCell);
        });
        const body = table.createTBody();
        artists.filter((artist) => artist.isFeatured).forEach((artist) => {
            const row = body.insertRow();
            const artistData = [
                artist.id,
                artist.name,
                artist.dob.toLocaleDateString(),
                artist.gender,
                artist.contactInfo,
                //if isFeatured is yes:true, it will be placed in the featured artist array and displayed in the featured table.
                artist.artworks.map((artwork) => `${artwork.type}, ${artwork.exhibitionDate.toLocaleDateString()}, Notes: ${artwork.specialNotes || 'None'}`).join('; '),
                artist.isFeatured ? 'Yes' : 'No'
            ];
            artistData.forEach((text) => {
                const cell = row.insertCell();
                cell.textContent = text.toString();
            });
            const deleteCell = row.insertCell();
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => {
                if (confirm(`Are you sure you want to delete artist ${artist.name}?`)) {
                    deleteArtist(artist.id);
                }
            };
            deleteCell.appendChild(deleteButton);
        });
        featuredArtistsDiv.appendChild(table);
    }
}
//this function is responsible for handling the form submission, the parameter is the event of the form being submitted.
function handleFormSubmit(event) {
    /*the event of submission is prevented as by default, a page will reload once it sends off a forms data to the server. This stops the page from reloading so the tables created from the artists data are not lost.*/
    event === null || event === void 0 ? void 0 : event.preventDefault();
    //These are to collect the values of the input fields, which is used to determine if they are empty or not.
    const artistName = document.getElementById('artistName').value;
    const artistDOB = document.getElementById('artistDOB').value;
    const artistGender = document.getElementById('artistGender').value;
    const artistContactInfo = document.getElementById('artistEmail').value;
    const artworkType = document.getElementById('artWorkType').value;
    const exhibitionDate = document.getElementById('exhibitionDate').value;
    const specialNotes = document.getElementById('specialNotes').value;
    //This creates a new artist object with the collected values.
    const newArtist = {
        //toString is used for type consistency, since Artists.ts id: is of type string.
        id: artistId.toString(),
        name: artistName,
        //This turns the data for dob into a Date object.
        dob: new Date(artistDOB),
        gender: artistGender,
        contactInfo: artistContactInfo,
        //By default, artists are not featured so will automatically go to the artists table.
        isFeatured: false,
        //This creates an artwork object holding the artwork type, exhibition date, and special notes if any.
        artworks: [{
                type: artworkType,
                exhibitionDate: new Date(exhibitionDate),
                //The special notes are not required, but will be included in the object if the field was not empty.
                specialNotes: specialNotes || undefined
            }]
    };
    //This calls the addArtistToList function, which will pass the (newArtist) object.
    addArtistToList(newArtist);
    //The generateArtistsTable function is then called, updating the table to display new artists.
    generateArtistsTable();
}
/*This is the function that handles deleting an artists once a delete button is pressed. It takes artistId has an argument, the artist Id is determined by what row the delete button is pressed.*/
function deleteArtist(artistId) {
    /*It uses .findIndex to iterate over the array of artists and returns the artists whose Id matches the argument, if it cannot be found it returns -1 thus signalling the search did not work.*/
    const artistIndex = artists.findIndex(artist => artist.id === artistId);
    if (artistIndex > -1) {
        //if the artist id is found, the artist is deleted using .splice
        artists.splice(artistIndex, 1);
        //Once it has been deleted, both tables generation functions are called to regenerate them and show any updates.
        generateArtistsTable();
        generateFeaturedArtistsTable();
    }
    else {
        //For debugging purposes, if no Id was found a console message is logged alerting the failure.
        console.log(`Artist with ID ${artistId} not found.`);
    }
}
export {};
