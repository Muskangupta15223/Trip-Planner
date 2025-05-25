export const SelectTravelesList=[

      {
        id:1,
       title:'Just Me',
       desc:'A sole traveles in exploration',
       icon:'👤',
       people:'1'
      },
       {
        id:2,
        title:'A Couple',
        desc:'Two traveles in exploration',
        icon:'💏',
        people:'2'
       },
       {
        id:3,
        title:'Family',
        desc:'Family in exploration',
        icon:'👪',
        people:'3 to 5'
       },
       {
        id:4,
        title:'Friends',
        icon:'🧑‍🤝‍🧑',
        desc:'thrill-seeks',
        people:'5-10 peoples'
       }
]
export const SelectBudgetList=[
    {
        id:1,
        title:'Cheap',
        desc:'stays conscious about cost',
        icon:'💰'
       },
     {
        id:2,
        title:'Moderate',
        desc:'Cost on average side',
        icon:'💷'
     
       },
       {
        id:3,
        title:'Luxury',
        desc:'Dont think about Cost',
        icon:'💸'
       }
  
]
export const AI_PROMPT='Generate Travel Plan for Location: {location}  for {totalDays} days for {traveller} people with {budget} budget.Give me a Hotels Option list with Hotel Name , Hotel Location, Hotel image url, geo Coordinates, Rating and description, Price , and suggest itinerary with Place Name , Place Location, Place image url, geo Coordinates of place , Rating and description,  ticket Price time travel each of the location for {totalDays} with each day plan activities with best time to visit in JSON format'