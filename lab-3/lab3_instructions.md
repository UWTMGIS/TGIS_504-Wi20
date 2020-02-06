# Lab 3: Collector and Survey123 for ArcGIS

## TGIS 504, Winter 2020, Dr. Emma Slager
### Introduction

Mobile GIS has the potential to simplify, streamline, and greatly improve GIS data collection and data entry. Mobile data collection can save time and money, simplify data entry, and reduce room for errors and data redundancy, among many other benefits. 

For the next two lab assignments, you are to identify a problem in which mobile GIS data collection will be useful. This could be for an individual researcher, your current employer, a public health survey, a citizen science initiative, or something else. In Lab 2 you will be developing a mobile data collection tool using Esri products. Lab 3 you will be building a mobile data collection workflow using an open source alternative. For the next two labs, you may collect the same data to then compare the system requirements, data entry experience, and resulting data output. 

For agencies that have a well-established workflow in which ArcGIS is already integrated, Collector and Survey123 for ArcGIS are popular choices for data collection from field crews. Some of you have likely used these applications before in one form or another.

The general steps involved in this lab are as follows:

·     Identify a data collection problem for which a mobile app could be useful 
·     Plan data to be collected and the form to collect it in
·     Build a form-centric data collection survey using Survey123 online
·     Build a geodatabase and feature class(es) for your Collector app
·     Build and share a map to be used in the Collector app
·     Brief reflective essay

***An important note:*** *Esri has recently released a new version of Collector; however, it is currently only available on iPhone and not Android. Therefore, we will be using Collector for ArcGIS **(Classic).** If you have an iPhone and wish to use the latest version, you may do so, but note that the instructions here are written for Classic.*

### Part 1: Identify a problem 

Before we start building our data collection tools, we first need a problem that could benefit from mobile GIS data collection. If you completed this week's reading response, you've already gotten a start on this. 

Think of a situation for which field-based data collection would be helpful. You can be as whimsical or as practical as you wish to be. If an aspect of your capstone project would lend itself well to this assignment, consider prototyping a data collection tool that you might improve on down the road for your capstone. If some process you’ve completed for your job could be made more efficient with mobile data collection, consider creating a tool that will help you streamline that task. If you have a personal interest in some phenomenon that could be catalogued with a digital inventory, think about making a tool that will enable you and an organization of others who share your interest to build that inventory.

It will be helpful to identify a problem that will inform the goal of data collection. Is the aim to eventually run some sort of spatial analysis? Is the aim to illuminate a social or environmental injustice? Think about the goal to help decide what data it will be necessary to collect. If you are having trouble identifying a specific problem to address, see below for some suggestions. 

In a brief paragraph, describe your scenario/define the data collection problem you are trying to help solve and include this in your lab write-up. 

***Hypothetic data collection scenarios***

*Hypothetical Scenario One: Earthquake Preparedness Survey*
Create a tool that volunteers can use to survey the homes in their neighborhoods and make sure they are ready for an earthquake. In this scenario, the end result of the survey tool would be a database of locations that have been surveyed and the hazards that are present at those locations, which neighborhood leaders could use to direct their efforts at building local earthquake resilience. Read more about Earthquake preparedness here: [http://www.redcross.org/prepare/disaster/earthquake](http://www.redcross.org/prepare/disaster/earthquake)

*Hypothetical Scenario Two: Historic home Inventory*
Have you ever been on the Tacoma historic home tour ([https://tacomaweekly.com/featured-city-life/historic-homes-of-tacoma-tour-2018/](https://tacomaweekly.com/featured-city-life/historic-homes-of-tacoma-tour-2018/))? There are many volunteers who love to talk about and show their homes. However, there is not an extensive inventory of their homes. Create a tool for Historic Homes of Tacoma Tour volunteers to create an inventory of homes that have been included in the tour, identifying the houses historic details and significant features. In this case, the end result of the survey tool would be a database of historic homes and their features that history buffs could query to find homes that they want to visit in future tours.

*Hypothetical Scenario Three: Inventory of black-owned businesses*
Consumers often wish to use their purchasing power to support businesses that support their interests or their communities in some way. In U.S. cities where legacies of redlining and discrimination have produced limited access to investment capital, black-owned businesses often struggle to compete with other entrepreneurs. Make a tool that volunteers can use to make an inventory of black-owned businesses in Tacoma to make it easier for consumers who wish to support black-owned businesses to find places to shop. Further reading: https://www.wsj.com/articles/blacks-lag-in-business-ownership-but-gap-is-narrowing-1472702465

### Part 2: Planning your data entry

After you have identified your data collection problem, make a detailed plan. Will users be collecting point data, line data, or polygons? What fields will each of these classes of features need to include, and how will the data in those fields be structured? Do you want surveyors to be able to enter information in a text box, or limit their choices to dropdown menus? Any other considerations? Are there any data you might want to collect but feel you should leave out of your survey for some reason (e.g. privacy or safety concerns)? 

Once you've got an overall sense of the data you need to collect, produce a schema using the tables below. An editable version (.docx) of these tables are available in the lab 3 folder on GitHub. Copy the table into your lab write up (add rows as needed) and submit it with your final lab submission. Organize your charts to mimic the flow of data entry—i.e. the first field name in the list represents the first question your user will answer in the data entry process, the second field represents the second question, and so on. Similarly, organize your domain options in the order you intend to present them to the user. 

*Please complete your schema tables before class in week 6. We will do a peer review exercise together in class on that day.*

| **Feature Class: [name]** |           |          |            |            |           |
| ------------------------- | --------- | -------- | ---------- | ---------- | --------- |
| **Field  Name**           | **Alias** | **Type** | **Length** | **Domain** | **Notes** |
|                           |           |          |            |            |           |
|                           |           |          |            |            |           |
|                           |           |          |            |            |           |
|                           |           |          |            |            |           |
|                           |           |          |            |            |           |
|                           |           |          |            |            |           |
|                           |           |          |            |            |           |

| **Domain  Name**                | **Domain  List**                        |
| ------------------------------- | --------------------------------------- |
| Domain x (numbers, e.g.)        | 1, 2, 3, 4, 5, 6                        |
| Domain y (boolean option, e.g.) | Yes, No                                 |
| Domain z (string options, e.g.) | Option 1 , Option 2, Option 3, Option 4 |

**Notes about schemas**

* The *feature class* can be point, line, or polygon and you should give it a descriptive name. You only need to include one feature class in your survey, but you may include more. 
* The *field name* should have no spaces or special characters (underscores are OK). Each question in your survey represents a field. 
* The *alias* should be a human readable version of the field name. 
* The *type* can include: 
  * Date—Date (and time)
  * Float – Numbers with fractional values (decimals), precise to six decimal places
  * Double—Numbers with fractional values (decimals), precise beyond six decimal places but requiring larger storage capacity than float fields
  * Short Integer—Whole numbers from -32,768 to 32,767
  * Long Integer—Whole numbers from -2,147,483,648 to 2,147,483,647, requiring larger storage capacity than short integer fields
  * Text/String—Any sequence of characters
  * Blob—Handles photos
* *Length* is the number of allowed characters in the field's value.
* *Domain* is ArcMap's term for a list of choices for users to input data. Providing dropdown choices can be very useful for limiting user error and aiding standardization, but it can also be limiting, so you need to ensure you provide choices for the full range of possible answers. Not every field will utilize a domain, but those that do should be specified in the second Domain table. 
* *Notes* are any additional information about the question you want to provide to the surveyor. 

Below is an example of what your data schema tables should look like. This example uses two feature classes (both are points) and three domains. Your data schema should be of similar length and level of detail. 

| **Feature Class: Building** |                                  |               |            |            |                                                              |
| --------------------------- | -------------------------------- | ------------- | ---------- | ---------- | ------------------------------------------------------------ |
| **Field  Name**             | **Alias**                        | **Type**      | **Length** | **Domain** | **Notes**                                                    |
| OwnerName                   | Owner Name                       | Text          | 100        | NA         |                                                              |
| MailingAddress              | Mailing Address                  | Text          | 100        | NA         | Filled in based on Parcel                                    |
| NumberOfResidents           | Number of Residents              | Short Integer | NA         | Numbers    |                                                              |
| EmergencyFood               | Emergency Food (Y/N)             | Text          | NA         | YesNo      | Easily accessible container of food  appropriate for number of residents. |
| EmergencyWater              | Emergency Water (Y/N)            | Text          | NA         | YesNo      | 1 gallon per person per day for 3 days or more, or a way to filter water. |
| EmergencySupplies           | Emergency Supplies (Y/N)         | Text          | NA         | YesNo      | Things like emergency radio, camp stove, flashlight, emergency blankets |
| EmergencyPlan               | Emergency Plan (Y/N)             | Text          | NA         | YesNo      | On the emergency plan there should be an out of state contact, and places to meet if not at home. Health  information should also be included. |
| FireExtinguisher            | Fire Extinguisher (Y/N)          | Text          | NA         | YesNo      | Check expiration date                                        |
| BracedWaterheater           | Water Heater is secured (Y/N)    | Text          | NA         | YesNo      |                                                              |
| GasShutOff                  | Knows how to Shut off Gas (Y/N)  | Text          | NA         | YesNo      | Ask home owner                                               |
| FallingHazards              | Falling hazards are Secure (Y/N) | Text          | NA         | YesNo      | Bolt bookcases, cabinets and other tall furniture to wall studs. Hang heavy items, such as pictures and  mirrors, away from beds, couches and anywhere people sleep or sit. |
| Completed                   | Home Assessment Completed        | Text          | NA         | Status     | Status of home assessment.                                   |
| TotalHazards                | Total Hazards                    | Short Integer | 4          | NA         |                                                              |

| **Feature Class: Hazard** |                 |          |            |            |            |
| ------------------------- | --------------- | -------- | ---------- | ---------- | ---------- |
| **Field  Name**           | **Alias**       | **Type** | **Length** | **Domain** | **Notes**  |
| HazardType                | Hazard Type     | Text     | 100        | Hazard     |            |
| Picture                   | Photo of Hazard | Blob     | NA         |            | Name Photo |

| **Domain  Name** | **Domain  List**                                             |
| ---------------- | ------------------------------------------------------------ |
| Numbers          | 0,1,2,3,4,5,6,7,8,9,10, ... 25                               |
| YesNo            | Yes, No                                                      |
| Status           | Incomplete, partially complete, complete                     |
| Hazard           | Falling hazards, Water Heater Unsecured, Hanging Plants, Mirrors or Pictures Above Bed, Flammable Liquid, Masonry Chimney, Unsecured Cabinets, Expired Fire Extinguisher, Overhead Electrical Lines |

### Part 3: Form-centric data collection with Survey123

Collector is probably the most widely used Esri product for field-based data collection, but another option is Survey123 for ArcGIS. Whereas Collector is map-centric (users begin by selecting their location on a map), Survey123 is form-centric (users answer questions about the feature they’re collecting data on, and location is one of these questions). When location is relevant to the data inquiry but not a primary consideration, Survey123 may be a better choice for data collection. 

The goal of this part of the lab is to gain familiarity with basic use of Survey123. We will also use this as a first-draft of the data collection schema you'll implement with Collector. Later, you will reflect on the differences in development and user experience between Survey123 and Collector. 

* Navigate to this link https://survey123.arcgis.com/, and click Sign In. You will need to sign in using your UWT organizational login. (These were assigned in fall quarter. Look for an email from Greg Lund if you need a reminder of your credentials.)
* Click ‘My Surveys’ and then press ‘Create a New Survey’ and get started. There are two ways to create as Survey123 survey, using a web designer with a GUI or downloading a desktop application that lets you author your survey through XLSForms. We’ll use the web designer, which is simpler but will do for our purposes. It does not require you to download any software. Click ‘Get Started’ on the web designer option. 
* Give your survey a name that captures your data collection goal. Give it tags and a descriptive summary and click 'Create'. Under the Design tab, you will see an option to add questions to your survey. You will be creating a survey that enables a user to collect the information you planned out in Step 2. Select the necessary question options and edit the fields and answer options to achieve this. Make sure you include a question for collecting geographic information. Note that Survey123 only gives you the option for collecting points, not lines or polygons. If your plan involved lines or polygons, adjust as necessary, but know that Collector allows more diverse data formats so you can add those back later. 
* Experiment with Appearance options and under settings, enable and customize a Thank You Screen. 
* Click 'Publish'. Before finalizing your survey, click the 'Modify schema' button. Here you can view the field names of what will become a feature layer of the data collected with your survey. You can edit the Name field, which you might do to simplify the attribute table of your future feature layer. Review this schema and make any changes you want to make before finalizing your survey. 
* Click 'Publish' again and set your sharing settings to share the survey with members of the MSGT 2019-2020 cohort (under the 'Collaborate' tab). Copy the link to your survey into your lab write-up. 

### Part 4: Build a geodatabase to store the data your users will gather with Collector

While a form-centric survey is good for some data collection problems, others require a map-centric survey. For this, Collector for ArcGIS is Esri's mobile app solution. Before we can start gathering data with Collector, however, we need to build the geodatabase that will hold the data once it is collected. Your geodatabase should have a structure based on the data schema you mapped out in Part 2. It needs to include a feature class for every class of feature your user will collect (point, line, or polygon) as well as fields for all of the tabular information you want to collect about each feature. 

Using your data schema, build your geodatabase, define your domains, and create your feature class(es) in ArcMap. Reference the directions found in this tutorial: http://doc.arcgis.com/en/collector/android/create-maps/prepare-data-desktop.htm. (We will also have gone through this tutorial together in class in Week 5.)

Symbolize your data appropriately and share your feature service online on your UWT ArcGIS Online account. Make sure your service is editable and that you know the URL by which you can reference it. 

### Part 5: Create a map for data collection

The next step to implementing Collector for ArcGIS is to build a map to customize the user’s experience of data collection further. To build the map, follow these directions, using your own file geodatabase in place of the Damage Assessment layer referenced in the directions and making choices specific to your scenario as suggested below: https://doc.arcgis.com/en/collector-classic/windows/create-maps/create-and-share-a-collector-map.htm Please include your name in your map’s title, as I will need this information when I grade. 

Customize your map in the following ways, and document the customizations you made to include in your lab write-up: 

* Use a basemap that is appropriate for your data collection scenario and purpose. Will your user likely collect data in bright light? Use a high contrast base map. Will your user need street-level detail or will a generalized basemap work? Would aerial imagery be useful to your user? Will the symbolization you created for your feature classes appear clearly on the basemap you selected? Make your choice based on these and other factors specific to your project. 
* Configure popup windows in ways that are appropriate for your application. Most simply, you can customize how each feature’s title appears, change the alias for any of the data fields, and select and de-select fields to include in the popup window. For more advanced customizations: might your user want to do math based on attribute information collected (for example, calculate how many fire hazards out of all possible hazards are present at the location to draw attention to how much preparedness improvement needs to be undertaken)? Will your user collect data that can be visualized in a chart or graph on the fly? This is possible! 
* Customize application settings. Will your user need to determine routes, measure distances, change the basemap, search for locations, etc.? Turn off any features they won’t need to keep things simple, and enable any features that will be useful. Set an appropriate extent if applicable. Make sure that the option to ‘Use in Collector for ArcGIS’ is checked. 

Once you have built your map and customized it appropriately, follow the instructions at the link above and share it with the cohort (MSGT 2018-2019) via the UWT ArcGIS organization. Now open the Collector (Classic) app on your mobile device (first download it if you haven’t already) and navigate to your map. Open it and test out data collection in Collector using your app.

### Part 6: Brief reflective essay

**Please answer the following questions: **

1. In this lab you used ArcMap, Esri Online, browser based Survey123, and Collector. As the developer, how did you find working within ArcGIS to build these data collection tools? Please include a description of the process of building the form, the geodatabase, and the online map. How easy or difficult was the process? How much time did the various steps take? This should be a ~2 paragraph narrative to reflect on the process. I encourage you to use vocabulary about design and evaluation that we've used in class and in readings.

2. What was something you wish you could have done with either Collector or Survey123 that you were unable to do? Elaborate.
3. Reflecting on the data collection problem you set out to solve, do you think a form-centric or map-centric approach is better for your scenario? Please elaborate and explain why.
4. Does your form introduce any risks associated with inclusion in the dataset or exclusion from the dataset? Justify your answer and explain any steps you might take to mitigate those risks. 

### Deliverables

* Description of the data collection problem you are trying to solve (Part 1)
* Data schema tables (Part 2)
* A link to your Survey123 form (Part 3)
* The name of your Collector map (Part 5)
* Description of the customization choices you made to the basemap, popup windows, and application settings and why you made the choices you did (Part 5)
* Brief reflective essay (Part 6)