/**
 * Function to get tour details
 * 1st line require - imports the Mongoose Tour model from the models
 * folder so that code can interact with the tour collection in the database
 * 
 * getTours is an async function taking request and response objexts
 * queries the database to find all tours for logged in user
 * send all tours in JSON format
 */
//adding more details here 
const Tour = require('../models/Tour').default;

const getTours = async(req,res) => {
    try {
        const tours = await Tour.find({});               // Find all Tours
        res.json(tours);
    }catch(error){
        res.status(500).json({message:error.message});
    }
};

/**
 * function to add tours
 * extracting data from incoming request body - req.body
 * ORM/ODM to create new entry in the database via Tour.create associating
 * automatically with the loggedin user
 * If succeeded, 201(created) - returns newly created tour data in JSON format
 * if error - print error message
 */

const addTour = async(req,res) => {
    console.log("incoming body",req.body);
    const{tourName,maxGroupSize,source, destination, dateFrom, dateTo, inclusions, exclusions, pricePerPerson,userId} = req.body;
    try {
        const tour = await Tour.create({tourName,maxGroupSize,source, destination, dateFrom, dateTo, inclusions, exclusions, pricePerPerson,userId:req.user ? req.user.id: userId});
        console.log("response",res.body);
        res.status(201).json(tour);
    }catch(error){
        console.log("==message Mongoose error");
        console.error(error);
        res.status(500).json({message:error.message});
    }
};

/**
 * Function to update an existing tour in MongoDB database 
 * using Mongoose
 * First searches for Tour by Id
 * updating field values conditionally i.e. if new values are
 * there in reguest bosy - it updates otherwise it keeps the existing value ||
 * For completed ?? - nullish coalescing operator it will fallback to old value if completed is null or undefined
 * updates tour details in database
 */
const updateTour = async(req,res) => {
    const{tourName, maxGroupSize, source, destination, dateFrom, dateTo, inclusions, exclusions, pricePerPerson,userId} = req.body;
    try{
        const tour = await Tour.findById(req.params.id);
        console.log("tourid ",tour);
        if(!tour)return res.status(404).json({message:'Tour not found'});
        
        tour.tourName = tourName || tour.tourName
        tour.maxGroupSize = maxGroupSize || tour.maxGroupSize
        tour.source = source || tour.source
        tour.destination = destination || tour.destination
        tour.dateFrom = dateFrom || tour.dateFrom
        tour.dateTo = dateTo || tour.dateTo
        tour.inclusions = inclusions || tour.inclusions
        tour.exclusions = exclusions || tour.exclusions
        tour.pricePerPerson = pricePerPerson || tour.pricePerPerson
        //tour.completed = completed ?? tour.completed             // for future development , this can be updated based on the dateTo 
        
        const updatedTour = await tour.save();
        res.json(updatedTour);      
    }catch(error){
        res.status(500).json({message:error.message});
    }
};


/**
 * function to delete tour
 * 
 */
const deleteTour = async(req,res) => {
try{
    const tour = await Tour.findById(req.params.id);
    if(!tour)return res.status(404).json({message:'Tour not found'});

    await tour.remove();
    res.json({message:'Tour deleted'});
    }catch(error){
        res.status(500).json({message:error.message});
    }

};

module.exports = {getTours,addTour,updateTour,deleteTour};
