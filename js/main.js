//Import necessasry modules

//Write the code to gather info from the user
//add event listener to search button and access location button
    //IF yes: Do they want us to get their location?
        //Try to grab lat and long of browser location
            //if success save lat and long to the local storage

        //throw in error handling to handle if their browser features set to 'privacy'
            //alert banner (that Tery made!!!) that will notify user of privacy settings or if the browser is unable to grab their lat and long
            //banner removed once user has a successful submit of a location
        
    //Else:
        //Get user's input into from search bar
        //Call the search module for error handling
        //save the return from callling search function
        //save the city to the local storage
        
    
    //Do you want F or C
        //Add event listener to checkboxes to get which box is checked
        //add a placeholder that the user can change to the HTML
        //Throw error if both boxes are checked
    
    //AFTER WE GATHER THE INFORMATION: EITHER THE CITY OR THE LAT AND LONG based on the user's selction AND THE DEGREE
        //THEN: we can create an instance of the getAPI class
        //do an init() on the instance