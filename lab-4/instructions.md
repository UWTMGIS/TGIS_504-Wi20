# Lab 4: Open Data Kit for data collection

## TGIS 504, Winter 2020, Dr. Emma Slager

### Introduction

The goal of this lab is to gain experience with a suite of tools known collectively as Open Data Kit (ODK), a free and open source alternative to Esri's data collection tools. This is useful if you ever work with an organization that doesn't have an Esri license. The output you'll produce is similar to what you produced in lab 3 with Survey123 and Collector for ArcGIS, though the process is somewhat different. For this lab, you may address the same data collection problem as you did in the last lab. 

Whereas lab 3 focused on the front-end issue of designing an effective survey scheme, this lab will focus on the back-end issue of implementing an effective data storage system that you have full control over. Back-end development is often less sexy than the front-end work of making maps and apps, but doing it well is essential to making a good final product. With out-of-the-box tools like Survey123 and Collector for ArcGIS, Esri handles most or all of the back-end work, but many of the projects you'll undertake in your capstones or future careers will require you to set up your own databases and host them on your own servers. This lab is meant in part to be an introduction to one way of doing this. 

Open Data Kit (ODK) is an open source mobile application designed for primary data collection and decision support. ODK was developed by researchers in the Computer Science Department at the University of Washington. The aim for this tool was to develop a customizable, free data collection tool specifically for use in low resource settings such as developing counties. 

We’ll be using three ODK tools: 

| Tool      | Function                                          | Software and hardware you'll use in conjunction with this tool |
| --------- | ------------------------------------------------- | -------------------------------------------------------- |
| ODK Build & XLSForm | A web interface and authoring standard you'll use to create your data form | -Web browser<br />-MS Excel |
| ODK Aggregate |A server system you'll use to store your data form and the data that users collect|-Web browser<br />-VirtualBox Virtual Machine|
| ODK Collect |An Android app that users will employ to collect data|-Android mobile device OR an Android emulator|

##### Lab Overview

The general steps of the lab are as follows: 

* Build a sample data collection form using ODK Build and XLS Form
* Build a full data collection form that replicates the data collection form you made with Esri's tools in the last lab
* Set up a server using ODK Aggregate to host your form and the data your users will collect
* Test your form and server by collecting sample data points with ODK Collect mobile app
* Export your collected data from ODK
* Reflect on differences in developer experience and user experience between Esri's tools and ODK's tools for mobile data collection

### Technology notes before you begin

ODK Collect is a mobile app that is only available on Android. Because it is designed for use in low resource settings and because Android devices are far more accessible and common in such settings, the developers have not made an iOS version. Most of the work you’ll do in this lab will be with ODK Build and ODK Aggregate, which do not require an Android device. However, for testing and sample data collection, you will need to access the Android app. Since most of you have iOS mobile devices, you have two options for this: either, you can coordinate borrowing the School of Urban Studies' two Android devices available for checkout from the lab or enlist the help of friends who have Android devices, or, you can install an Android emulator on your personal computer. 

An Android emulator is a virtual device that you run from a computer. It allows you to run apps just as you would from an Android mobile device, using your computer's screen and controls to interact with the virtual device. If you choose to install an emulator, I recommend using [Bluestacks] (https://www.bluestacks.com/), although you are welcome to use any emulator software that you prefer. Because you do not have administrative privileges to install new software on the lab computers, you will have to install the emulator on your personal computer. 

This lab also asks you to install a virtual machine with the open source software VirtualBox in order to run ODK Aggregate. This will also have to be done on your personal computer. If you anticipate any challenges related to using your own computer (for instance, if it's being repaired or is on its very last legs, or if don't have enough RAM or available storage space to install and run the virtual machine), please let me know! We have work-arounds. 

### Part 1: Build a data collection form using ODK Build and XLSForm

The first ODK tool we’ll be using is Build, which is a web-based interface and does not require downloading any software. You can find the full documentation for Build here: https://docs.opendatakit.org/build-intro/

#### Step 1: Create an account and build your first form

Visit https://build.opendatakit.org/ and follow the prompts to create an account. When you've logged in, your screen should look something like this: 

![](H:\Courses\TGIS_504_MobileDev\2020Winter\labs\lab4\images\screen-1-build.png)

You can click the form title to edit it or add new question fields with the menu that runs along the bottom. For your first form, you'll recreate the public art survey I made for the week 6 reading response activity:

* Name your form 'Art Survey by [your name]'

* Add a new _Text_ field. Notice that a menu opens on the right side of the screen, allowing you to modify the attributes associated with the field. The 'Data Name' is what ArcGIS would call the field name; don't use spaces in this. For your first question, set this to "title". The 'Label' is what your user will see; set this to "Provide a title for the artwork". Always make the text in this field understandable for your user. The 'Hint' and 'Default Value' properties are optional. You can include a hint for questions that are less self-explanatory or provide a default value if you want an answer two auto-fill. Click on each of the remaining properties for more information about these options. 

  ![text-question-build](H:\Courses\TGIS_504_MobileDev\2020Winter\labs\lab4\images\text-question-build.JPG)

* Add a _Choose One_ field for the artwork's medium and give it an appropriate Data Name and Label. Make four options called Sculpture, Architecture, Painting or Mural, and Other. Note that the 'English' field is what will be visible to the user while the 'Underlying Value' field is how the data will be formally categorized in the database. No spaces in the underlying value field. 

* When you've entered all four options, select the 'Follow-up Question' checkbox and select other from the dropdown menu. Now add a new *Text* question. This will be the follow-up if 'other' is selected in the previous question. Make the Data Name 'other_specify,' and give it the Label 'If Other, please specify'

* Add a *Choose One* field for the size of the artwork. Give it an appropriate Data Name and Label and make 3 possible options. 

* Add a *Choose One* field asking the user to give their opinion on whether it is good or bad art. 

* Add a *Text* field asking for a description. Limit the length to 200 characters maximum. 

* Add a *Location* field Give it a Data Name and a Label. Choose 'Point' for the Kind and 'Manual (No GPS)' for the Style. This style will enable your user to select the location of the point on a map manually rather than using their device’s GPS sensor. Alternatively, you can set the style to utilize one of the GPS options, or create two location fields: one that uses GPS and one that is manual for users whose devices do not have GPS access. 

* Add a *Media* field. Give it a Data Name and a Label. Choose 'Image' for the kind. 

* Save your form!

#### Step 2: Edit the form using XLSForm

Do you remember how Survey123 provided the option of creating a form by either using a GUI or by uploading an XLSForm? XLSForm is a standard for authoring forms that can be used on a variety of platforms. This is very helpful if, say, you first authored a form on ODK Build and then decided you wanted to deploy it on Survey123. Instead of building the form entirely anew (an arduous task for forms that are even moderately long), you can download it from one platform and transfer it to the other. In this step, you’ll learn how to download your Build form in the XLSForm format, modify it, then package it for use elsewhere. 

Begin by viewing the documentation for XLSForm here: http://xlsform.org/en/. This is essentially a method for organizing feature attributes and domains. The survey worksheet is analogous to the feature attribute table you designed in the last lab, and the choices worksheet is analogous to your domains table. Scan the documentation and observe what kinds of questions are possible, how you would set an accuracy threshold for GPS data, what kind of metadata can be recorded, how to set constraints on responses, etc. You will answer some questions about the documentation in a bit. 

Now, return to Build, download your form as an XLSForm, and make some changes to it in Excel by following these steps:

*  In Build, select File>>Export to XLSForm. This will generate an Excel file download. 
* Open the file in Excel. Notice that there are 4 sheets in the file: survey, choices, settings, warnings. Look at each one in turn. What is the syntax for the constraint that limits your description field to 200 characters? This is called a [regular expression](https://docs.opendatakit.org/form-regex/), which is used to place constraints on String (text) fields. Numeric fields can also be constrained using a variety of mathematical operators.
* Go to the Choices sheet. Recall that we made only 4 options for the medium field. We left out a couple of options that would be good to include: 'Poster or Sticker' and 'Mixed Media'. Add these in by right-clicking on the row that contains the 'other' option and selecting 'Insert...' >> 'Entire row'. Edit the new row to create options for 'Poster or Sticker', then repeat to add a 'Mixed Media' option. 
* Save your Excel file as an .xlsx in the location where you keep your lab files. 

Excel makes a good environment for editing XLSForm documents because it is human readable and already familiar to most people building data collection forms. However, to make the form more easily machine readable, we'll convert it to an XML file. This is a file format requires far less storage space than Excel's XLSX files, and it's much easier for computer servers and web browsers to process. To convert the Excel file to XML, we'll use a tool called XLSForm Online.

* Visit https://opendatakit.org/xlsform/ and use the 'Choose File' button to select the .xlsx file you just created in Excel. Click 'Submit'.

* If your form has any issues, you will get an error warning that will give you information about what to fix (such as a failure to include label text or some kind of syntax error). If the conversion is successful, you should see the following message: 

  ![xlsforms-online](H:\Courses\TGIS_504_MobileDev\2020Winter\labs\lab4\images\xlsforms-online.png)

* Click the 'Preview in Enketo' button. Enketo is an ODK tool that can style and display any form written in XML. You should be able to preview your form. If you notice any errors, correct them in Excel and reconvert your form to XML. 

* Return to XLSForm Online and click 'Download XForm'. This will prompt a download of your form in XML. Save this file to submit as a deliverable on Canvas. 

#### Step 3: Digging Deeper into XLSForm

Now that you’ve gotten familiar with how to manipulate your data form with XLSform and packaged it to be machine readable as an XML file, return to the XLSForm documentation (http://xlsform.org/en/) and answer the following questions for your write-up: 

1. What is the default threshold for accuracy at which XLSForm will collect GPS data? Describe the process for changing the accuracy threshold on GPS data when editing with Excel. What sheet do you do this in, what columns are required, etc.? 
2. What are three options that XLSForm makes available for collecting metadata? Would any of these be useful to collect for the data collection scenario you developed for your apps? 
3. Let’s say you’ve designed a form to use when surveying households that would like to foster rescue cats. Your organization allows each household to foster up to three cats at once, but no more. One of your questions asks how many cats the potential hosts would like to foster, and you need to set the possible responses to be no more than 3. How would you set up this constraint in the Survey form sheet in Excel? Fill in the chart below to establish this constraint: 

| type | name | label | constraint |
| ---- | ---- | ----- | ---------- |
|      |      |       |            |

### Part 2: Building your own form

Now that you know how to use ODK Build and XLSForm, build a data collection form similar to the one you created in Lab 2. Create a new form in ODK Build and add all of the same questions as you did when making your Collector for ArcGIS tool. You might experiment with the ‘bulk edit’ tool when adding multiple options to increase efficiency. You might even feel comfortable enough with XLSForm syntax to build your form entirely in Excel, which can be highly efficient once you’ve gotten the hang of it. 

The output of this part will be an XML file that contains all the data necessary for your form. You will use the XML file in Part 4 below. You should also answer the question below in your write-up:

4. Did you make any changes in your form between Lab 3 and Lab 4? If so, why? Were they changes that were necessary because of the technological differences between the ArcGIS tools and the ODK tools, or were they changes you decided to make for some other reason? If there are any differences between your forms in these two labs, I expect to see them explained and justified here. 

### Part 3: Using ODK Aggregate

The next step in deploying your ODK data collection system is setting up the server to host the form and store collected data. For this, we will use ODK Aggregate. Read the documentation here: https://docs.opendatakit.org/aggregate-intro/. Aggregate uses an SQL database structure and is written in Java. To run Aggregate, we need to install it on a server, either local or cloud-based. There are many different commercial cloud-based server options, such as DigitalOcean, Google Cloud Platform, Microsoft Azure, or Amazon Web Services, and most organizations that have a substantial amount of technology infrastructure will have their own local server(s) as well. 

You're going to install Aggregate on a virtual machine run on your personal computer. This is essentially a mock-up of a local server, but unlike a true server, it will only operate when you are running the virtual machine, not 24/7, and it isn't robustly backed up and secured in the way you'd want a true server to be. Since this is just a learning exercise, it will do for our purposes. The installation is also somewhat streamlined compared to installing on a cloud or local server, but it will nonetheless give you a good sense of what an Aggregate deployment entails. 

As you proceed with the rest of Part 3, you will be utilizing ODK's installation instructions. *Read these carefully, go slowly, and ask for help as needed.* This is a different set of technical skills than you have been honing so far in this class. You will use some new software and interact with it in command line. 

#### Step 1: Install the Aggregate virtual machine

* Visit https://docs.opendatakit.org/aggregate-vm/ and work through the steps in the 'Setting up the VM' section of the instructions. In the final step of these instructions, you will choose a password for the administration of your Aggregate server. As far as I know, there is no password recovery mechanism for this, so **consider recording your password in a secure place.**
* Next work through the steps in the 'Securing the VM' section of the instructions. You'll be working in command line here. 

At this point, you've installed Aggregate on the virtual machine and secured both your Aggregate site and the virtual machine. Note that the Aggregate VM comes pre-configured; if you were deploying this for real, you would need to do some more configuring, such as selecting the size of the database, setting up back-ups procedures, and establishing security settings. The exact process for this varies on the server you're using (DigitalOcean vs. Azure vs. local server, etc.), and if you're curious about how to install on these platforms, please peruse those instructions here: https://docs.opendatakit.org/aggregate-install/

#### Step 2: Upload your data collection form to your Aggregate site

You can now interact with your Aggregate site from the same computer on which you are running the VM. This means you can upload your data collection form to Aggregate, which is the next step in making your form accessible to data collectors. 

* On your Aggregate site (in your web browser, at the address [http://localhost:10080](http://localhost:10080/)), select the 'Form Management' tab and click on 'Add New Form'.
* In the 'Form definition (xml file):' entry field, click ‘Choose File’ and navigate to the location where you stored your XML output from Part 2 of the lab. Click ‘Upload Form’.
* Close the upload window and you should now see your form in your Forms List. 

Please submit a screenshot of your form uploaded to your server with your deliverables. 

#### Step 3: Making Aggregate available at a globally accessible address

By default, the virtual machine that you're using to host the Aggregate server can only be accessed by the computer on which the VM is installed. However, we can change some settings on the VM to make the Aggregate site available at a globally accessible address. A URL is the most common example of a globally accessible address, but you can also use the IP address of the virtual machine for this. 

* Return to https://docs.opendatakit.org/aggregate-vm/ and follow the directions in the 'Connecting to the VM from external apps' section. 
* Once you've completed these steps, you will no longer be able to access your Aggregate site at [http://localhost:10080](http://localhost:10080/). Instead, direct your web browser to visit the IP address of your VM, also specifying the port (8080 if you're using an HTTP connection, 8443 if you're using HTTPS). The IP address is assigned to each VM individually, so you will have to find the exact address of *your* virtual machine from the VM console, but it will look something like this: ```http://192.168.5.2:8080```

If you are once again able to view your Aggregate site and can see the form you uploaded in the Form Management tab, you've successfully completed this step. 

### Part 4: Collecting data with ODK Collect

The final step in deploying your ODK data collection system is to use your form with ODK Collect. For this part of the lab, you’ll need access to an Android mobile device or an Android emulator installed on a computer. If you have an Android device, you can simply download the the ODK Collect app from the Google Play Store and skip ahead to Step 1. If you need to set up an Android emulator, follow the instructions below. 

#### *Aside*: setting up an Android emulator

An Android emulator is another virtual machine, but this time, it emulates a mobile phone rather than a computer server. A common use of emulators is to be able to play video games that are only available on a mobile OS from a desktop or laptop, but another common use is to test apps that you are developing for mobile devices without having to physically get your hands on all of the devices you want to test. The emulator mimics a *particular* device--meaning you will emulate, for instance, a Samsung Galaxy S10 running the Android 10.0 operating system. Note, however, that your emulator will not have the same sensor hardware that you'd find on a mobile device, so it won't have GPS, for example.  

There are numerous emulator providers out there. Some a geared more towards a gaming audience and others toward app developers; some are free or free-with-ads and some cost money. If you'd like to read more about emulators and some of the different options, please see these articles: 

- Android emulators for Mac computers: https://www.macworld.co.uk/feature/mac-software/best-android-emulators-mac-3677782/ 

* Android emulators for Windows computers: https://fossbytes.com/best-android-emulators-pc/ 

* Android emulators for Linux computers: https://thedroidguy.com/2019/01/5-best-android-emulator-linux-in-2019-1087692 

The emulator I like to use is called BlueStacks. It's geared towards gamers and includes ads, but set-up is a breeze and it works smoothly overall. 

* Visit https://www.bluestacks.com/ and click the download button to download the installer for your operating system. 
* Run the installer and open the emulator program
* Click on the Google Play Store icon and sign in with a Google account. If you don't have a personal Google account or don't want to use it, your UW email address will also work. 
* I recommend toggling OFF the option to back up your data to Google drive. Click 'Accept' to accept the terms of service. 
* In the app search bar, search for ODK Collect and install the app. (The icon looks like a clipboard.)

You're now set to proceed to step 1. 

#### Step 1: Download your form, collect data, and submit it

In this step, you'll connect ODK Collect to the form you have stored on your Aggregate site. **Note:** **your Aggregate virtual machine must be running for this to work.** If you've stopped your VM, you can start it again from VirtualBox. It will need to stay running the entire time you are collecting data. 

* Open the ODK Collect app and tap the vertical three dot menu in the upper right corner

* Select 'General Settings' and then 'Server'

* Tap the URL settings, and change the URL to the IP address and port of you Aggregate virtual machine. Again, this will be unique to your VM, but it will look something like this: ```http://192.168.5.2:8080```. 

* Leave the username and password blank and use the back button to return to the main menu. 

* Click 'Get Blank Form'. After the app connects to your server, you should see your form listed. 

* Check the box to the right of the form name and tap ‘Get Selected’.

* Back at the home screen, select ‘Fill Blank Form’ and tap on your form in the list of available forms. You should now see the first question of your form.

* Fill in the form with sample information, entering data for every field in your questionnaire. After answering each question, click the icon that looks like an arrow pointing at a dot to advance to the next question:

  <img src="H:\Courses\TGIS_504_MobileDev\2020Winter\labs\lab4\images\collect-ex2.jpg" alt="collect-ex " />

* Note that collecting GPS data with ODK Collect (if your location field requires GPS location rather than manual location entry and you're using a GPS-enabled device) can take a moment. When you’ve selected your point, line or polygon’s location, click the ‘save’ icon, then continue to the next question. 

* Once you’ve answered all questions, select ‘Go To End’. Tap ‘Save Form and Exit’. 

* Back on the Main Menu, click 'Send Finalized Form' to submit the data back to your Aggregate server. Check the box next to all forms you want to send and then click 'Send Selected'.

* Repeat this process yourself or—better yet!—get friends, family members, or classmates to collect at least five points. Anyone can collect data anonymously if they download the app and connect to your server using the same process as you did above. If you aren’t moving around to collect various entries, please manually offset your GPS locations so that they aren’t stacked on top of one another. 

#### Step 2: View submissions in Aggregate and export your data

* After you and/or others have collected at least five data points, return to your Aggregate server and log in as the administrator. 

* Under the ‘Submissions’ tab, you should now see all the data points submitted via ODK Collect. 

* Delete any entries that were submitted in error.
* In the upper right, notice that there are options to Visualize, Export, or Publish the data. Experiment with the Visualization options. 
* Finally, export your data. Click the ‘Export’ button. Notice that you can export your data in three different, familiar forms: CSV, KML, and JSON. 
* Select 'JSON file' and click ‘Export’. It takes a moment for the file to be generated. 
* Click the link to download the file and save it in the location where you store your lab files. You will submit this on Canvas with the rest of your deliverables. 

### Part 5: Critical Reflection

In your write-up, please answer the following questions: 

1. From a _developer’s_ stand point – which tool would you rank higher in terms of usability, Collector for ArcGIS or the ODK system? Justify your answer and use terminology from class and readings where appropriate. 

2. From a _data collector as end user’s_ stand point – which tool would you rank higher in terms of usability, Collector for ArcGIS or ODK? Justify your answer and use terminology from class and readings where appropriate. 

3. From a _data analyst_ point of view, which tool would you rank higher in terms of the data output usability, Collector for ArcGIS or ODK? Justify your answer and use terminology from class and readings where appropriate.

4. As we learned in class, ODK’s tools are built to be modular, meaning you can use Build without using Aggregate or vice versa depending on your needs, and you can combine aspects of ODK’s tools with tools from other services. Is there a way in which you might deploy Esri tools in combination with ODK’s tools, using the best aspects of each as they apply to your scenario? Think about all aspects of the process, from data collection to data storage to data analysis and describe how and why you might go about this. If you prefer one complete set of tools over the other and would choose to use only ODK or Esri, justify that choice. 

### Deliverables

Submit your work as attached files on Canvas. You should submit 1 .xml file, 1 screenshot, 1 JSON file, and 1 .docx or .pdf file with answers to all of the questions.

* XML of your Art Survey form (Part 1, step 2)

* Answers to the following questions about XLSForm and your data collection form (Part 1 step 3 and part 2): 

  1. What is the default threshold for accuracy at which XLSForm will collect GPS data? Describe the process for changing the accuracy threshold on GPS data when editing with Excel. What sheet do you do this in, what columns are required, etc.? 

  2. What are three options that XLSForm makes available for collecting metadata? Would any of these be useful to collect for the data collection scenario you developed for your apps? 

  3. Let’s say you’ve designed a form to use when surveying households that would like to foster rescue cats. Your organization allows each household to foster up to three cats at once, but no more. One of your questions asks how many cats the potential hosts would like to foster, and you need to set the possible responses to be no more than 3. How would you set up this constraint in the Survey form sheet in Excel? Fill in the chart below to establish this constraint: 

     |      |      |       |            |
     | ---- | ---- | ----- | ---------- |
     | type | name | label | constraint |

  4. Did you make any changes in your form between Lab 3 and Lab 4? If so, why? Were they changes that were necessary because of the technological differences between the ArcGIS tools and the ODK tools, or were they changes you decided to make for some other reason? If there are any differences between your forms in these two labs, I expect to see them explained and justified here. 

* Screenshot of your form uploaded to Aggregate (Part 3, step 2)

* JSON file of your exported form submissions (Part 4, step 2)

* Answers to the following questions (Part 5):

  1. From a _developer’s_ stand point – which tool would you rank higher in terms of usability, Collector for ArcGIS or the ODK system? Justify your answer and use terminology from class and readings where appropriate. 
  2. From a _data collector as end user’s_ stand point – which tool would you rank higher in terms of usability, Collector for ArcGIS or ODK? Justify your answer and use terminology from class and readings where appropriate
  3. From a _data analyst_ point of view, which tool would you rank higher in terms of the data output usability, Collector for ArcGIS or ODK? Justify your answer and use terminology from class and readings where appropriate.
  4. As we learned in class, ODK’s tools are built to be modular, meaning you can use Build without using Aggregate or vice versa depending on your needs, and you can combine aspects of ODK’s tools with tools from other services. Is there a way in which you might deploy Esri tools in combination with ODK’s tools, using the best aspects of each as they apply to your scenario? Think about all aspects of the process, from data collection to data storage to data analysis and describe how and why you might go about this. If you prefer one complete set of tools over the other and would choose to use only ODK or Esri, justify that choice. 